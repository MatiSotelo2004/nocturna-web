import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// CONTEXTOS
import { CartProvider } from "./context/CartContext.jsx";
import { AuthContext } from "./context/AuthContext.jsx";

import ScrollToTop from "./components/ScrollToTop.jsx";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContext>
      <CartProvider>
        <ScrollToTop />
        <App />
      </CartProvider>
    </AuthContext>
  </BrowserRouter>,
);
