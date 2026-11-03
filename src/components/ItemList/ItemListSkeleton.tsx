import { Row, Col } from "react-bootstrap";
import ItemSkeleton from "@/components/Item/ItemSkeleton";

interface ItemListSkeletonProps {
  count?: number;
}

export default function ItemListSkeleton({ count = 8 }: ItemListSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, index) => index);

  return (
    <Row className="g-4">
      {skeletons.map((idx) => (
        <Col key={idx} xs={12} sm={6} md={4} lg={3}>
          <ItemSkeleton />
        </Col>
      ))}
    </Row>
  );
}
