import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import {
  PrivateRoutes,
  AdminRoutes,
  RedirectIfLoggedIn,
} from "./components/ProtectedRoutes";
import { SearchProvider } from "./context/SearchContext";

// PAGES
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import AboutUs from "./pages/AboutUs/AboutUs";
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import Admin from "./pages/Admin/Admin";
import NotFound from "./pages/NotFound/NotFound";
import GestionDeCupones from "./pages/GestionDeCupones/GestionDeCupones";

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route element={<Layout />}>
          {/* RUTAS PUBLICAS */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/sobre-nosotros" element={<AboutUs />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />

          {/* SI ESTA LOGUEADO */}
          <Route element={<RedirectIfLoggedIn />}>
            <Route path="/auth" element={<Auth />} />
          </Route>

          {/* RUTAS PROTEGIDAS */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/gestion-cupones" element={<GestionDeCupones />} />
          </Route>

          {/* COMPONENTE CATCH-ALL PARA RUTAS INEXISTENTES */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </SearchProvider>
  );
}

export default App;
