import {
  useContext,
  useState,
  createContext,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/types";

type CartItem = Product & {
  quantity: number;
};
type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartQuantity: () => number;
  getCartTotal: () => number;
  substractCart: (itemId: string) => void;
  incrementCart: (itemId: string) => void;
};
type CartProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // USA localStorage PARA RECUPERAR EL CARRITO
    const localData = localStorage.getItem("carrito");
    return localData ? (JSON.parse(localData) as CartItem[]) : [];
  });

  // FUNCION AÑADIR AL CARRITO
  const addToCart = (product: Product, quantity: number) => {
    const itemInCart = cart.find((item) => item.id === product.id);
    const currentQty = itemInCart ? itemInCart.quantity : 0;
    const maxAvailable = product.stock !== undefined ? product.stock : 999;

    if (currentQty + quantity > maxAvailable) {
      alert(
        `No puedes agregar más de ${maxAvailable} unidades de este producto (límite de stock).`,
      );
      return;
    }

    if (itemInCart) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity }]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // FUNCION PARA OBTENER ITEMS TOTALES
  const getCartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // FUNCION PARA OBTENER PRECIO TOTAL
  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  };

  // GUARDA CARRITO EN localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);

  //QUITAR UNA UNIDAD AL PRODUCTO
  const substractCart = (itemId: string) => {
    const itemInCart = cart.find((item) => item.id === itemId);
    if (itemInCart && itemInCart.quantity <= 1) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    } else {
      const updateCart = cart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
      );
      setCart(updateCart);
    }
  };

  // SUMAR UNA UNIDAD AL PRODUCTO
  const incrementCart = (itemId: string) => {
    const updateCart = cart.map((item) => {
      if (item.id === itemId) {
        const maxAvailable = item.stock !== undefined ? item.stock : 999;
        if (item.quantity < maxAvailable) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          alert(
            `No puedes agregar más de ${maxAvailable} unidades (límite de stock).`,
          );
          return item;
        }
      }
      return item;
    });
    setCart(updateCart);
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getCartQuantity,
    getCartTotal,
    substractCart,
    incrementCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
