import { Table, Button } from "react-bootstrap";
import { Product } from "@/types";

type ProductTableProps = {
  products: Product[];
  handleEdit: (product: Product) => void;
  handleDelete: (productId: string) => Promise<void>;
};

export default function ProductTable({
  products,
  handleEdit,
  handleDelete,
}: ProductTableProps) {
  return (
    <div
      className="table-responsive"
      style={{
        backgroundColor: "rgba(26, 26, 31, 0.9)",
        border: "1px solid rgba(155, 151, 168, 0.15)",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Table hover variant="dark" className="align-middle mb-0">
        <thead>
          <tr className="text-accent-primary">
            <th>Imagen</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Stock</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-text-secondary">
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.imagen}
                  alt={product.titulo}
                  style={{
                    width: "50px",
                    height: "65px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/50x65?text=No+Image";
                  }}
                />
              </td>
              <td className="fw-semibold text-light">{product.titulo}</td>
              <td>{product.autor}</td>
              <td>{product.tipo}</td>
              <td className="text-accent-primary">
                ${product.precio.toLocaleString("es-AR")}
              </td>
              <td>{product.stock}</td>
              <td className="text-end">
                <Button
                  variant="link"
                  className="text-accent-primary me-2 p-0 text-decoration-none"
                  onClick={() => handleEdit(product)}
                  style={{ fontWeight: "600" }}
                >
                  Editar
                </Button>
                <Button
                  variant="link"
                  className="text-accent-secondary p-0 text-decoration-none"
                  onClick={() => handleDelete(product.id)}
                  style={{ fontWeight: "600" }}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
