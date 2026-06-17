import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

export default function Auth() {
  const [loginPage, setLoginPage] = useState(true);

  return (
    <Container className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: "80vh" }}>
      <div className="transicion-pagina w-100" style={{ maxWidth: "450px" }}>
        {loginPage ? (
          /* LOGIN */
          <div className="custom-form-container">
            <h2 className="font-serif text-center mb-4 text-accent-primary tracking-wider uppercase h3">
              Iniciar Sesión
            </h2>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label className="text-text-secondary small">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="correo@ejemplo.com.ar"
                  className="custom-input w-100"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label className="text-text-secondary small">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  className="custom-input w-100"
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                className="btn-gold w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-3"
              >
                <FaSignInAlt />
                <span>Ingresar</span>
              </Button>
            </Form>
            
            <div className="text-center mt-3">
              <a 
                onClick={() => setLoginPage(false)} 
                className="text-accent-primary small text-decoration-none"
                style={{ cursor: "pointer" }}
              >
                ¿No tienes cuenta? Crea una aquí
              </a>
            </div>
          </div>
        ) : (
          /* SIGN UP */
          <div className="custom-form-container">
            <h2 className="font-serif text-center mb-4 text-accent-primary tracking-wider uppercase h3">
              Crear Cuenta
            </h2>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label className="text-text-secondary small">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="correo@ejemplo.com.ar"
                  className="custom-input w-100"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label className="text-text-secondary small">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  className="custom-input w-100"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="registerConfirmPassword">
                <Form.Label className="text-text-secondary small">Confirmar Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repite tu contraseña"
                  className="custom-input w-100"
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                className="btn-gold w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-3"
              >
                <FaUserPlus />
                <span>Registrarse</span>
              </Button>
            </Form>

            <div className="text-center mt-3">
              <a 
                onClick={() => setLoginPage(true)} 
                className="text-accent-primary small text-decoration-none"
                style={{ cursor: "pointer" }}
              >
                ¿Ya tienes una cuenta? Inicia sesión aquí
              </a>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
