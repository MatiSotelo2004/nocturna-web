import { Form, Button, Spinner } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import styles from "./AuthContainer.module.css";
import { useState } from "react";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}
export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const { login, loading } = useAuth();

  const [dataForm, setDataForm] = useState({
    email: "",
    pass: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(dataForm.email, dataForm.pass);
    } catch (error: any) {
      alert(`Error al iniciar sesión: ${error.message}`);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className="font-serif text-center mb-4 text-accent-primary tracking-wider uppercase h3">
        Iniciar Sesión
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label className="text-text-secondary small">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={dataForm.email}
            onChange={(e) =>
              setDataForm({ ...dataForm, email: e.target.value })
            }
            placeholder="correo@ejemplo.com.ar"
            className={`${styles.customInput} w-100`}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="loginPassword">
          <Form.Label className="text-text-secondary small">
            Contraseña
          </Form.Label>
          <Form.Control
            type="password"
            name="pass"
            value={dataForm.pass}
            onChange={(e) => setDataForm({ ...dataForm, pass: e.target.value })}
            placeholder="********"
            className={`${styles.customInput} w-100`}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          className="btn-gold w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-3"
          disabled={loading}
        >
          <FaSignInAlt />
          <span>Ingresar</span>
          {loading && <Spinner animation="border" size="sm" />}
        </Button>
      </Form>

      <div className="text-center mt-3">
        <a
          onClick={onSwitchToRegister}
          className="text-accent-primary small text-decoration-none"
          style={{ cursor: "pointer" }}
        >
          ¿No tienes cuenta? Crea una aquí
        </a>
      </div>
    </div>
  );
}
