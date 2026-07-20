import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "react-bootstrap";

export const PrivateRoutes = () => {
  const { user, loading } = useAuth();

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
  const { user, loading, userData } = useAuth();
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
  return user && userData.isAdmin ? <Outlet /> : <Navigate to="/dashboard" />;
};

export const RedirectIfLoggedIn = () => {
  const { user, loading } = useAuth();
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
