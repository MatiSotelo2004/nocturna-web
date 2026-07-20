import { useState } from "react";
import { Container } from "react-bootstrap";

import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";

export default function Auth() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  return (
    <Container
      className="d-flex align-items-center justify-content-center py-5"
      style={{ minHeight: "80vh" }}
    >
      <div className="transicion-pagina w-100" style={{ maxWidth: "450px" }}>
        {isLoginPage ? (
          <LoginForm onSwitchToRegister={() => setIsLoginPage(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLoginPage(true)} />
        )}
      </div>
    </Container>
  );
}
