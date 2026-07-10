import { useContext, useState, createContext, useEffect } from "react";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // USA localStorage PARA RECUPERAR EL CARRITO
    const localData = localStorage.getItem("carrito");
    return localData ? JSON.parse(localData) : [];
  });

  // FUNCION AÑADIR AL CARRITO
  const addToCart = (product, quantity) => {
    const itemInCart = cart.find((item) => item.id === product.id);
    const currentQty = itemInCart ? itemInCart.quantity : 0;
    const maxAvailable = product.stock !== undefined ? product.stock : 999;

    if (currentQty + quantity > maxAvailable) {
      alert(`No puedes agregar más de ${maxAvailable} unidades de este producto (límite de stock).`);
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

  const removeFromCart = (productId) => {
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
  const substractCart = (itemId) => {
    const itemInCart = cart.find((item) => item.id === itemId);
    if (itemInCart.quantity <= 1) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    } else {
      const updateCart = cart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
      );
      setCart(updateCart);
    }
  };

  // SUMAR UNA UNIDAD AL PRODUCTO
  const incrementCart = (itemId) => {
    const updateCart = cart.map((item) => {
      if (item.id === itemId) {
        const maxAvailable = item.stock !== undefined ? item.stock : 999;
        if (item.quantity < maxAvailable) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          alert(`No puedes agregar más de ${maxAvailable} unidades (límite de stock).`);
          return item;
        }
      }
      return item;
    });
    setCart(updateCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartQuantity,
        getCartTotal,
        substractCart,
        incrementCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
