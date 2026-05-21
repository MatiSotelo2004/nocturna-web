import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, clearCart, getCartTotal } = useCart();

  if(cart.length ===0){
    return(
        <p>CARRITO VACIOOOOO</p>
    )
  }
  return (
    <>
      <h2>Carritoo</h2>
      {cart.map(item=>(
            <div>
                <h4>{item.titulo}</h4>
                <p>{item.quantity}</p>
                <p>{item.precio}</p>
                <p>{item.precio*item.quantity}</p>
            </div>
      ))}
      <hr/>
      <h3>Total: ${getCartTotal}</h3>
      <button onClick={clearCart}>Vaciar</button>
    </>
  );
}
