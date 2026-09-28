import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

export const PrivateRoutes = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return <LoadingSpinner text="Verificando sesión..." minHeight="70vh" size="lg" />;
  }

  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export const AdminRoutes = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const userData = useAuthStore((state) => state.userData);

  if (loading) {
    return <LoadingSpinner text="Verificando permisos..." minHeight="70vh" size="lg" />;
  }

  return user && userData?.isAdmin ? <Outlet /> : <Navigate to="/dashboard" />;
};

export const RedirectIfLoggedIn = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return <LoadingSpinner text="Cargando..." minHeight="70vh" size="lg" />;
  }

  return user ? <Navigate to="/dashboard" /> : <Outlet />;
};
