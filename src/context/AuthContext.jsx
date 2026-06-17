import { useContext, useState, createContext } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useEffect } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // CUENTA CON PERMISOS ADMIN
  const EMAIL_ADMIN = "admin@prueba.com";

  const Login = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const Logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const isLoged = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => isLoged();
  }, []);

  const sharedData = {
    user,
    Login,
    Logout,
    loading,
    isAdmin: user?.email === EMAIL_ADMIN,
  };

  return (
    <AuthContext.Provider value={sharedData}>{children}</AuthContext.Provider>
  );
};
