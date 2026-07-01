import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom"; 

// PAGES
import Home from "./pages/Home/Home";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./pages/ItemDetailContainer/ItemDetailContainer";
import Cart from "./pages/Cart/Cart";
import AboutUs from "./pages/AboutUs/AboutUs";
import Auth from "./pages/Auth/Auth";
import Dash from "./pages/Dash/Dash";
import Gestion from "./pages/Gestion/Gestion";




function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* RUTAS PUBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ItemListContainer />} />
        <Route path="/sobre-nosotros" element={<AboutUs />} />
        <Route path="/producto/:id" element={<ItemDetailContainer />} />
        <Route path="/carrito" element={<Cart />} />

        {/* RUTAS PROTEGIDAS */}
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Dash" element={<Dash />} />
        <Route path="/Gestion" element={<Gestion />} />

      </Route>
    </Routes>
  );
}

export default App;
