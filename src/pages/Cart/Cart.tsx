import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { db } from "@/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FaArrowLeft } from "react-icons/fa";
import { Coupon } from "@/types";

import EmptyCart from "@/components/Cart/EmptyCart";
import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import CouponSection from "@/components/Cart/CouponSection";

export default function Cart() {
  const { cart, clearCart, getCartTotal, getCartQuantity } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setLoadingCoupon(true);
    setCouponError("");
    setCouponSuccess("");
    try {
      const q = query(
        collection(db, "cupones"),
        where("codigo", "==", couponCode.trim().toUpperCase()),
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setCouponError("El cupón ingresado no es válido.");
        setAppliedCoupon(null);
      } else {
        const couponDoc = querySnapshot.docs[0];
        const couponData = { id: couponDoc.id, ...couponDoc.data() } as Coupon;
        setAppliedCoupon(couponData);
        setCouponSuccess(`Cupón "${couponData.codigo}" aplicado con éxito.`);
      }
    } catch (error) {
      console.error("Error al validar cupón: ", error);
      setCouponError("Error al validar el cupón. Inténtalo de nuevo.");
    } finally {
      setLoadingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponSuccess("");
    setCouponError("");
  };

  const subtotal = getCartTotal();
  const discountAmount = appliedCoupon
    ? (subtotal * Number(appliedCoupon.descuento)) / 100
    : 0;
  const finalTotal = subtotal - discountAmount;

  const handleCheckout = () => {
    if (appliedCoupon) {
      alert(
        `¡Gracias por su compra! Se ha aplicado un descuento del ${appliedCoupon.descuento}% con el cupón "${appliedCoupon.codigo}". Total a abonar: $${finalTotal.toLocaleString("es-AR")}`,
      );
    } else {
      alert("¡Gracias por su compra!");
    }
    clearCart();
    handleRemoveCoupon();
  };

  const handleClearCart = () => {
    clearCart();
    handleRemoveCoupon();
  };

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="py-5">
      <Helmet>
        <title>Tu Carrito | Nocturna</title>
        <meta
          name="description"
          content="Revisa tu carrito de compras de Nocturna y prepárate para finalizar tu pedido."
        />
      </Helmet>

      <Container className="transicion-pagina">
        <h1 className="font-serif text-light mb-5">Carrito de compras</h1>

        <Row className="g-4">
          {/* LISTA DE PRODUCTOS */}
          <Col xs={12} lg={8}>
            <div className="d-flex flex-column gap-3 mb-4">
              <CartItem />
            </div>

            <Link
              to="/productos"
              className="btn btn-outline-gold d-inline-flex align-items-center gap-2 mb-4"
            >
              <FaArrowLeft style={{ fontSize: "0.8rem" }} />
              <span>Seguir comprando</span>
            </Link>
          </Col>

          {/* RESUMEN DE COMPRA */}
          <Col xs={12} lg={4}>
            <CartSummary
              subtotal={subtotal}
              discountAmount={discountAmount}
              finalTotal={finalTotal}
              quantity={getCartQuantity()}
              onCheckout={handleCheckout}
              onClearCart={handleClearCart}
            >
              <CouponSection
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                appliedCoupon={appliedCoupon}
                couponError={couponError}
                couponSuccess={couponSuccess}
                loadingCoupon={loadingCoupon}
                onApplyCoupon={handleApplyCoupon}
                onRemoveCoupon={handleRemoveCoupon}
              />
            </CartSummary>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
