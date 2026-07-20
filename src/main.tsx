import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// CONTEXTOS
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import ScrollToTop from "./components/ScrollToTop";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <App />
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  </BrowserRouter>,
);
