import { Row, Col } from "react-bootstrap";
import Item from "@/components/Item/Item";
import { Product } from "@/types";

interface ItemListProps {
  productos: Product[];
}

export default function ItemList({ productos }: ItemListProps) {
  return (
    <Row className="g-4">
      {productos.map((prod) => (
        <Col key={prod.id} xs={12} sm={6} md={4} lg={3}>
          <Item {...prod} />
        </Col>
      ))}
    </Row>
  );
}
