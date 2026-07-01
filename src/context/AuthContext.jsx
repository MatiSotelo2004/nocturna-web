import { useContext, useState, createContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
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
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    username: "",
    isAdmin: false,
  });

  const Login = async (email, pass) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass,
      );
      setUser(userCredential.user);
      console.log("Bienvenido", userCredential.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const Logout = () => {
    return signOut(auth);
  };

  const CreateUser = async (email, pass, fullname, username) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      pass,
    );
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      fullname,
      email,
      username,
      isAdmin: false,
    });
    return userCredential;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setUser(user);

      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
            console.log("Datos del usuario:", docSnap.data());
          } else {
            console.log("No se encontró el documento del usuario");
          }
        } catch (error) {
          console.error("Error al obtener el documento:", error);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sharedData = {
    user,
    Login,
    Logout,
    loading,
    isAdmin: user?.isAdmin === true || false,
    CreateUser,
    userData,
  };

  return (
    <AuthContext.Provider value={sharedData}>{children}</AuthContext.Provider>
  );
};
