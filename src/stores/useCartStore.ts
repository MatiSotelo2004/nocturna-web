import { Product, CartItem, Coupon } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

export interface CartState {
  cart: CartItem[];
  appliedCoupon: Coupon | null;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  substractCart: (itemId: string) => void;
  incrementCart: (itemId: string) => void;
  getCartQuantity: () => number;
  getCartTotal: () => number;
  getDiscountAmount: () => number;
  getFinalTotal: () => number;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      appliedCoupon: null,

      addToCart: (product: Product, quantity: number) => {
        const { cart } = get();
        const itemInCart = cart.find((item) => product.id === item.id);
        const maxAvailable = product.stock !== undefined ? product.stock : 999;
        const currentQuantity = itemInCart ? itemInCart.quantity : 0;

        if (quantity + currentQuantity > maxAvailable) {
          toast.error(
            `No puedes agregar más de ${maxAvailable} unidades de este producto (límite de stock).`,
          );
          return;
        }

        if (itemInCart) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity }] });
        }
        toast.success(`Se agregó ${product.titulo} al carrito`);
      },

      removeFromCart: (productId: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },

      clearCart: () => {
        set({ cart: [], appliedCoupon: null });
      },

      substractCart: (itemId: string) => {
        const { cart } = get();
        const itemInCart = cart.find((item) => item.id === itemId);
        if (!itemInCart) return;

        if (itemInCart.quantity <= 1) {
          set((state) => ({
            cart: state.cart.filter((item) => item.id !== itemId),
          }));
        } else {
          set({
            cart: cart.map((item) =>
              item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
            ),
          });
        }
      },

      incrementCart: (itemId: string) => {
        const { cart } = get();
        const itemInCart = cart.find((item) => item.id === itemId);
        if (!itemInCart) return;

        const maxAvailable = itemInCart.stock !== undefined ? itemInCart.stock : 999;
        if (itemInCart.quantity + 1 > maxAvailable) {
          toast.error(
            `No puedes agregar más de ${maxAvailable} unidades (límite de stock).`,
          );
          return;
        }

        set({
          cart: cart.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        });
      },

      getCartQuantity: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity * item.precio, 0);
      },

      getDiscountAmount: () => {
        const { appliedCoupon } = get();
        const subtotal = get().getCartTotal();
        return appliedCoupon
          ? (subtotal * Number(appliedCoupon.descuento)) / 100
          : 0;
      },

      getFinalTotal: () => {
        return get().getCartTotal() - get().getDiscountAmount();
      },

      applyCoupon: (coupon: Coupon) => {
        set({ appliedCoupon: coupon });
      },

      removeCoupon: () => {
        set({ appliedCoupon: null });
      },
    }),
    {
      name: "carrito",
      partialize: (state) =>
        ({
          cart: state.cart,
          appliedCoupon: state.appliedCoupon,
        }) as unknown as CartState,
    },
  ),
);
