import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header/>
      <main className="bg-secondary min-h-screen">
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
}

export default Layout;
