import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { getUserCart, saveUserCart } from "@/services/cartService";

export const useCartSync = () => {
  const user = useAuthStore((state) => state.user);
  const cart = useCartStore((state) => state.cart);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const setCartFromFirebase = useCartStore(
    (state) => state.setCartFromFirebase,
  );

  // Evita sobreescribir Firebase durante la carga inicial antes de haber obtenido los datos remotos
  const isInitialLoad = useRef(true);

  // 1. Cuando el usuario INICIA SESIÓN o cambia de usuario: Cargar el carrito desde Firestore
  useEffect(() => {
    let isMounted = true;

    if (user?.uid) {
      isInitialLoad.current = true;
      getUserCart(user.uid)
        .then((remoteData) => {
          if (!isMounted) return;

          if (remoteData && remoteData.cart && remoteData.cart.length > 0) {
            setCartFromFirebase(remoteData.cart, remoteData.appliedCoupon || null);
          } else {
            // Si en Firebase no había productos pero en local sí (agregados antes de loguearse), los guardamos
            const currentLocalCart = useCartStore.getState().cart;
            const currentCoupon = useCartStore.getState().appliedCoupon;
            if (currentLocalCart.length > 0) {
              saveUserCart(user.uid, currentLocalCart, currentCoupon);
            }
          }
        })
        .finally(() => {
          if (isMounted) {
            isInitialLoad.current = false;
          }
        });
    } else {
      isInitialLoad.current = false;
    }

    return () => {
      isMounted = false;
    };
  }, [user?.uid, setCartFromFirebase]);

  // 2. Cuando el CARRITO CAMBIA: Subir cambios a Firestore si el usuario está autenticado
  useEffect(() => {
    if (user?.uid && !isInitialLoad.current) {
      saveUserCart(user.uid, cart, appliedCoupon);
    }
  }, [cart, appliedCoupon, user?.uid]);
};
