import Footer from "@/components/Layout/Footer/Footer";
import Header from "@/components/Layout/Header/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <main className="bg-secondary min-vh-100">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
