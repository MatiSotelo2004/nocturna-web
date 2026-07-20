import { useContext, useState, createContext, ReactNode } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  UserCredential,
} from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect } from "react";

// INTERFACES
type UserData = {
  fullName: string;
  email: string;
  userName: string;
  isAdmin: boolean;
}

type AuthContextType = {
  user: FirebaseUser | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  signup: (
    email: string,
    pass: string,
    fullname: string,
    username: string,
  ) => Promise<UserCredential>;
  loading: boolean;
  userData: UserData;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
    userName: "",
    isAdmin: false,
  });

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);

    setUserData({
      fullName: "",
      email: "",
      userName: "",
      isAdmin: false,
    });
  };

  const signup = async (
    email: string,
    pass: string,
    fullname: string,
    username: string,
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass,
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullname,
        email: email,
        userName: username,
        isAdmin: false,
      });
      return userCredential;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        setUser(currentUser);

        try {
          const userRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const data = docSnap.data();

            setUserData({
              fullName: data.fullName || "",
              email: currentUser.email || "",
              userName: data.userName || "",
              isAdmin: data.isAdmin || false,
            });
          } else {
            setUserData({
              fullName: "",
              email: "",
              userName: "",
              isAdmin: false,
            });
            console.log("No se encontró el documento del usuario");
          }
        } catch (error) {
          console.error("Error al obtener el documento:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sharedData: AuthContextType = {
    user,
    login,
    logout,
    loading,
    signup,
    userData,
  };

  return (
    <AuthContext.Provider value={sharedData}>{children}</AuthContext.Provider>
  );
};
