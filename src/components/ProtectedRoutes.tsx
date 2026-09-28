import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { Spinner } from "react-bootstrap";

export const PrivateRoutes = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return (
      <div
        className="d-flex align-items-center"
        style={{ flexDirection: "column" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export const AdminRoutes = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const userData = useAuthStore((state) => state.userData);
  if (loading) {
    return (
      <div
        className="d-flex align-items-center"
        style={{ flexDirection: "column" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return user && userData?.isAdmin ? <Outlet /> : <Navigate to="/dashboard" />;
};

export const RedirectIfLoggedIn = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  if (loading) {
    return (
      <div
        className="d-flex align-items-center"
        style={{ flexDirection: "column" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return user ? <Navigate to="/dashboard" /> : <Outlet />;
};
