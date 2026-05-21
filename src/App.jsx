import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";

// PAGES
import Home from "./pages/Home"
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./pages/ItemDetailContainer";
import Cart from "./components/Cart";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home/>} />
        <Route path="/productos" element={<ItemListContainer/>}/>
        <Route path="/sobre-nosotros" element={<h1>ESTANNNN</h1>} />
        <Route path="/producto/:id" element={<ItemDetailContainer/>} />
        <Route path="/carrito" element={<Cart/>} />

      </Route>
    </Routes>
  );
}

export default App;
