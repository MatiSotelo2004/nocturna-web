import { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { Container, Card, Table, Badge } from "react-bootstrap";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import {
  FaCheckCircle,
  FaShoppingBag,
  FaUser,
  FaReceipt,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { getOrderById } from "@/services/orderService";
import { Order } from "@/types";

export default function CheckoutSuccess() {
  const location = useLocation();
  const { orderId: paramOrderId } = useParams();
  const orderId = (location.state?.orderId || paramOrderId) as string | undefined;

  const [order, setOrder] = useState<Order | null>(
    (location.state?.orderData as Order) || null,
  );
  const [loading, setLoading] = useState<boolean>(!order && Boolean(orderId));

  useEffect(() => {
    if (!order && orderId) {
      getOrderById(orderId)
        .then((data) => {
          setOrder(data);
        })
        .catch((err) => {
          console.error("Error cargando orden:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [orderId, order]);

  if (loading) {
    return (
      <Container className="py-5 text-center text-light transicion-pagina">
        <LoadingSpinner
          text="Cargando el resumen de tu compra..."
          minHeight="50vh"
          size="lg"
        />
      </Container>
    );
  }

  if (!order && !orderId) {
    return (
      <Container className="py-5 text-center text-light">
        <h2 className="font-serif mb-3">No se encontró información de la orden</h2>
        <p className="text-text-secondary mb-4">
          No pudimos localizar la información de este pedido.
        </p>
        <Link to="/productos" className="btn btn-gold">
          Ir al catálogo de libros
        </Link>
      </Container>
    );
  }

  return (
    <section className="py-5">
      <Helmet>
        <title>¡Compra Exitosa! | Nocturna</title>
        <meta
          name="description"
          content="Tu pedido ha sido procesado con éxito en Nocturna."
        />
      </Helmet>

      <Container className="transicion-pagina" style={{ maxWidth: "800px" }}>
        <Card
          className="bg-secondary text-light p-4 p-md-5 border-0 shadow-lg"
          style={{
            borderRadius: "16px",
            borderColor: "rgba(155, 151, 168, 0.15)",
          }}
        >
          {/* ENCABEZADO DE ÉXITO */}
          <div className="text-center mb-4">
            <div className="d-inline-flex p-3 rounded-circle mb-3 bg-dark border border-warning">
              <FaCheckCircle
                className="text-accent-primary"
                style={{ fontSize: "3rem" }}
              />
            </div>
            <h1 className="font-serif h2 mb-2">¡Gracias por tu compra!</h1>
            <p className="text-text-secondary mb-3">
              Tu pedido ha sido procesado correctamente y el stock ha sido
              actualizado en el inventario.
            </p>

            {orderId && (
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded bg-dark border border-secondary">
                <FaReceipt className="text-accent-primary" />
                <span className="small text-text-secondary">N° de Transacción:</span>
                <Badge bg="transparent" className="text-accent-primary fw-bold p-0">
                  #{orderId}
                </Badge>
              </div>
            )}
          </div>

          {/* DATOS DEL CLIENTE */}
          {order && (
            <div
              className="p-3 rounded mb-4"
              style={{
                backgroundColor: "rgba(13, 13, 15, 0.6)",
                border: "1px solid rgba(155, 151, 168, 0.15)",
              }}
            >
              <div className="row g-2 small">
                <div className="col-12 col-md-6">
                  <span className="text-text-secondary d-block">Comprador:</span>
                  <span className="fw-semibold text-light">
                    {order.clienteNombre}
                  </span>
                </div>
                <div className="col-12 col-md-6">
                  <span className="text-text-secondary d-block">Correo de contacto:</span>
                  <span className="fw-semibold text-light">
                    {order.clienteEmail}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* DETALLE DEL PEDIDO */}
          <h2 className="font-serif h5 mb-3 border-bottom pb-2" style={{ borderColor: "rgba(155, 151, 168, 0.15)" }}>
            Detalle del pedido
          </h2>

          <Table responsive variant="dark" className="bg-transparent align-middle mb-4">
            <thead>
              <tr className="text-text-secondary small border-bottom" style={{ borderColor: "rgba(155, 151, 168, 0.15)" }}>
                <th>Producto</th>
                <th className="text-center">Cant.</th>
                <th className="text-end">Precio</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order?.items.map((item) => (
                <tr key={item.id} style={{ borderColor: "rgba(155, 151, 168, 0.1)" }}>
                  <td className="py-3">
                    <div className="d-flex align-items-center gap-3">
                      {item.imagen && (
                        <img
                          src={item.imagen}
                          alt={item.titulo}
                          style={{
                            width: "48px",
                            height: "64px",
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                        />
                      )}
                      <div>
                        <div className="fw-semibold text-light">{item.titulo}</div>
                        <small className="text-text-secondary">{item.autor}</small>
                      </div>
                    </div>
                  </td>
                  <td className="text-center text-light">{item.quantity}</td>
                  <td className="text-end text-text-secondary">
                    ${item.precio.toLocaleString("es-AR")}
                  </td>
                  <td className="text-end fw-semibold text-light">
                    ${(item.precio * item.quantity).toLocaleString("es-AR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* DESGLOSE TOTALES */}
          <div
            className="p-3 rounded mb-4"
            style={{
              backgroundColor: "rgba(13, 13, 15, 0.6)",
              border: "1px solid rgba(155, 151, 168, 0.15)",
            }}
          >
            <div className="d-flex justify-content-between text-text-secondary mb-2">
              <span>Subtotal</span>
              <span>${(order?.subtotal || 0).toLocaleString("es-AR")}</span>
            </div>

            {order?.descuento && order.descuento > 0 ? (
              <div className="d-flex justify-content-between text-success mb-2 small">
                <span>
                  Descuento aplicado {order.cupon ? `(${order.cupon.codigo})` : ""}
                </span>
                <span>-${order.descuento.toLocaleString("es-AR")}</span>
              </div>
            ) : null}

            <div
              className="d-flex justify-content-between align-items-center border-top pt-3 mt-2"
              style={{ borderColor: "rgba(155, 151, 168, 0.15)" }}
            >
              <span className="fw-bold text-light h6 mb-0">Total Pagado</span>
              <span className="text-accent-primary fw-bold h4 mb-0">
                ${(order?.total || 0).toLocaleString("es-AR")}
              </span>
            </div>
          </div>

          {/* ACCIONES */}
          <div className="d-flex flex-column flex-sm-row gap-3">
            <Link
              to="/productos"
              className="btn btn-gold flex-grow-1 d-flex align-items-center justify-content-center gap-2"
            >
              <FaShoppingBag />
              <span>Seguir explorando</span>
            </Link>
            <Link
              to="/dashboard"
              className="btn btn-outline-gold d-flex align-items-center justify-content-center gap-2"
            >
              <FaUser />
              <span>Mi Cuenta</span>
            </Link>
          </div>
        </Card>
      </Container>
    </section>
  );
}
