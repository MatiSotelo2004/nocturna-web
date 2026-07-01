import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import styles from "./Auth.module.css";
import { useAuth } from "../../context/AuthContext";
import { Spinner } from "react-bootstrap";

export default function Auth() {
  const [loginPage, setLoginPage] = useState(true);

  //Auth
  const { Login, CreateUser, loading } = useAuth();
  const [dataForm, setDataForm] = useState({
    fullname: "",
    email: "",
    pass: "",
    confirmPass: "",
    username: ""
  });


  const handleSubmit = (e) => {
    e.preventDefault()
    Login(dataForm.email, dataForm.pass);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (dataForm.pass === dataForm.confirmPass) {
      CreateUser(dataForm.email, dataForm.pass, dataForm.fullname, dataForm.username);
    }
    else {
      alert("Las contraseñas no coinciden");
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center py-5"
      style={{ minHeight: "80vh" }}
    >
      <div className="transicion-pagina w-100" style={{ maxWidth: "450px" }}>
        {loginPage ? (
          /* LOGIN */
          <div className={styles.formContainer}>
            <h2 className="font-serif text-center mb-4 text-accent-primary tracking-wider uppercase h3">
              Iniciar Sesión
            </h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label className="text-text-secondary small">
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={dataForm.email}
                  onChange={(e) => setDataForm({...dataForm, email: e.target.value})}
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
                  onChange={(e) => setDataForm({...dataForm, pass: e.target.value})}
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
          <div className={styles.formContainer}>
            <h2 className="font-serif text-center mb-4 text-accent-primary tracking-wider uppercase h3">
              Crear Cuenta
            </h2>
            <Form onSubmit={(e) => handleSignUp(e)}>
              <Form.Group className="mb-3" controlId="registerFullname">
                <Form.Label className="text-text-secondary small">
                  Nombre completo
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre y Apellido"
                  onChange={(e)=> setDataForm({...dataForm, fullname: e.target.value})}
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
                  onChange={(e)=> setDataForm({...dataForm, username: e.target.value})}
                  className={`${styles.customInput} w-100`}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label className="text-text-secondary small">
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="correo@ejemplo.com.ar"
                  onChange={(e)=> setDataForm({...dataForm, email: e.target.value})}
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
                  onChange={(e)=> setDataForm({...dataForm, pass: e.target.value})}
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
                  onChange={(e)=> setDataForm({...dataForm, confirmPass: e.target.value})}
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
