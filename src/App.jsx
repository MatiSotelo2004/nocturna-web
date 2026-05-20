import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import "./App.css";

// PAGES
import Home from "./pages/Home"
import ItemListContainer from "./components/ItemListContainer";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home/>} />
        <Route path="/productos" element={<ItemListContainer/>}/>
        <Route path="/sobre-nosotros" element={<h1>ESTANNNN</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
