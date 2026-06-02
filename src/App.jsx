import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";

// PAGES
import Home from "./pages/Home";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./pages/ItemDetailContainer";
import Cart from "./pages/Cart";
import AboutUs from "./pages/AboutUs";
import Auth from "./pages/Auth";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ItemListContainer />} />
        <Route path="/sobre-nosotros" element={<AboutUs />} />
        <Route path="/producto/:id" element={<ItemDetailContainer />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/Auth" element={<Auth />} />
      </Route>
    </Routes>
  );
}

export default App;
