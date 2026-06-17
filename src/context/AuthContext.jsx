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
  const [loding, setLoding] = useState(true);

  // CUENTA CON PERMISOS ADMIN
  const EMAIL_ADMIN = "admin@prueba.com";

  const Login = (email, pass) => {
    signInWithEmailAndPassword(auth, email, pass);
  };

  const Logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const isLoged = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoding(false);
    });

    return () => isLoged();
  }, []);

  const sharedData = {
    user,
    Login,
    Logout,
    loding,
    isAdmin: user?.email === EMAIL_ADMIN
  };

  <AuthContext.Provider value={sharedData}>
    {children}
  </AuthContext.Provider>
};
