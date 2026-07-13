import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const getProducts = async () => {
    const prodDB = collection(db, "productos");
    const resp = await getDocs(prodDB);
    
    return resp.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
};

export const getProductById = async (id) => {
  const docRef = doc(db, "productos", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error("No se pudo encontrar el producto");
  }
  return { ...docSnap.data(), id: docSnap.id };
};
