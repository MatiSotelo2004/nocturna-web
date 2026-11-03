import { db } from "@/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CartItem, Coupon } from "@/types";

export interface RemoteCartData {
  cart: CartItem[];
  appliedCoupon: Coupon | null;
  updatedAt: string;
}

export const saveUserCart = async (
  userId: string,
  cart: CartItem[],
  appliedCoupon: Coupon | null,
): Promise<void> => {
  try {
    const cartRef = doc(db, "carritos", userId);
    await setDoc(cartRef, {
      cart,
      appliedCoupon: appliedCoupon || null,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error al guardar el carrito en Firestore:", error);
  }
};

export const getUserCart = async (
  userId: string,
): Promise<RemoteCartData | null> => {
  try {
    const cartRef = doc(db, "carritos", userId);
    const snap = await getDoc(cartRef);
    if (snap.exists()) {
      return snap.data() as RemoteCartData;
    }
    return null;
  } catch (error) {
    console.error("Error al obtener el carrito de Firestore:", error);
    return null;
  }
};
