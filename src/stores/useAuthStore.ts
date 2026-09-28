import { create } from "zustand";
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

// INTERFACES
export interface UserData {
  fullName: string;
  email: string;
  userName: string;
  isAdmin: boolean;
}

export interface AuthState {
  user: FirebaseUser | null;
  userData: UserData;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  signup: (
    email: string,
    pass: string,
    fullname: string,
    username: string,
  ) => Promise<UserCredential>;
  initializeAuth: () => () => void;
}

const initialUserData: UserData = {
  fullName: "",
  email: "",
  userName: "",
  isAdmin: false,
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  userData: initialUserData,
  loading: false,
  login: (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  logout: async () => {
    await signOut(auth);
    set({ userData: initialUserData });
  },
  signup: async (email, pass, fullname, username) => {
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
  },
  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      set({ loading: true });

      if (currentUser) {
        set({ user: currentUser });

        try {
          const userRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            set({
              userData: {
                fullName: data.fullName || "",
                email: currentUser.email || "",
                userName: data.userName || "",
                isAdmin: data.isAdmin || false,
              },
            });
          } else {
            set({
              userData: {
                fullName: "",
                email: "",
                userName: "",
                isAdmin: false,
              },
            });
            console.log("No se encontró el documento del usuario");
          }
        } catch (error) {
          console.error("Error al obtener el documento:", error);
        }
      } else {
        set({ user: null });
      }
      set({ loading: false });
    });
    return unsubscribe;
  },
}));
