import { Form, Button, Spinner } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";
import styles from "./AuthContainer.module.css";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const { signup, loading } = useAuth();
  const [dataForm, setDataForm] = useState({
    fullname: "",
    email: "",
    pass: "",
    confirmPass: "",
    username: "",
  });

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dataForm.pass === dataForm.confirmPass) {
      try {
        await signup(
          dataForm.email,
          dataForm.pass,
          dataForm.fullname,
          dataForm.username,
        );
        alert("¡Cuenta creada exitosamente!");
      } catch (error: any) {
        alert(`Error al registrarse: ${error.message}`);
      }
    } else {
      alert("Las contraseñas no coinciden");
    }
  };
  return (
    <div className={styles.formContainer}>
      <h2 className="font-serif text-center mb-4 text-accent-primary tracking-wider uppercase h3">
        Crear Cuenta
      </h2>
      <Form onSubmit={handleSignUp}>
        <Form.Group className="mb-3" controlId="registerFullname">
          <Form.Label className="text-text-secondary small">
            Nombre completo
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre y Apellido"
            onChange={(e) =>
              setDataForm({ ...dataForm, fullname: e.target.value })
            }
            className={`${styles.customInput} w-100`}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerUsername">
          <Form.Label className="text-text-secondary small">
            Nombre de usuario
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre de usuario"
            onChange={(e) =>
              setDataForm({ ...dataForm, username: e.target.value })
            }
            className={`${styles.customInput} w-100`}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="registerEmail">
          <Form.Label className="text-text-secondary small">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="correo@ejemplo.com.ar"
            onChange={(e) =>
              setDataForm({ ...dataForm, email: e.target.value })
            }
            className={`${styles.customInput} w-100`}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPassword">
          <Form.Label className="text-text-secondary small">
            Contraseña
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Mínimo 6 caracteres"
            onChange={(e) => setDataForm({ ...dataForm, pass: e.target.value })}
            className={`${styles.customInput} w-100`}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="registerConfirmPassword">
          <Form.Label className="text-text-secondary small">
            Confirmar Contraseña
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Repite tu contraseña"
            onChange={(e) =>
              setDataForm({ ...dataForm, confirmPass: e.target.value })
            }
            className={`${styles.customInput} w-100`}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          className="btn-gold w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-3"
          disabled={loading}
        >
          <FaUserPlus />
          <span>Registrarse</span>
          {loading && <Spinner animation="border" size="sm" />}
        </Button>
      </Form>

      <div className="text-center mt-3">
        <a
          onClick={onSwitchToLogin}
          className="text-accent-primary small text-decoration-none"
          style={{ cursor: "pointer" }}
        >
          ¿Ya tienes una cuenta? Inicia sesión aquí
        </a>
      </div>
    </div>
  );
}
