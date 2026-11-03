import { Row, Col, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Row className="mb-5 justify-content-center">
      <Col xs={12} md={6}>
        <div className={styles.searchContainer}>
          <Form.Control
            type="text"
            placeholder="Buscar por título o autor..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${styles.searchInput} w-100`}
            aria-label="Buscar productos por nombre"
          />
          <FaSearch className={styles.searchIcon} />
        </div>
      </Col>
    </Row>
  );
}
