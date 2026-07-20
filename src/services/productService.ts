import {
  collection,
  getDocs,
  doc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  addDoc,
  updateDoc,
  deleteDoc,
  limit,
  startAfter,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { Product } from "@/types";

const PRODUCTS_COLLECTION = "productos";
const PAGE_SIZE = 4;


export interface PaginatedProductsResponse {
  productos: Product[];
  ultimoDocumento: QueryDocumentSnapshot<DocumentData> | null;
  hayMas: boolean;
}

const mapDocumentToProducts = (
  docSnapshot: QueryDocumentSnapshot<DocumentData>,
): Product => {
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    titulo: data.titulo || "",
    autor: data.autor || "",
    descripcion: data.descripcion || "",
    calificacion: data.calificacion || 0,
    genero: data.genero || "",
    imagen: data.imagen || "",
    precio: data.precio || 0,
    stock: data.stock || 0,
    tipo: data.tipo || "",
    destacado: data.destacado || false,
  };
};

export const getProductsPage = async (
  lastDocSnapshot?: QueryDocumentSnapshot<DocumentData> | null,
  pageSize: number = PAGE_SIZE,
): Promise<PaginatedProductsResponse> => {
  try {
    const collectionRef = collection(db, PRODUCTS_COLLECTION);
    const constraints: QueryConstraint[] = [limit(pageSize)];
    if (lastDocSnapshot) {
      constraints.push(startAfter(lastDocSnapshot));
    }

    const q = query(collectionRef, ...constraints);
    const querySnapshot = await getDocs(q);

    const productos = querySnapshot.docs.map(mapDocumentToProducts);
    const ultimoDocumento =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    const hayMas = querySnapshot.docs.length === pageSize;

    return {
      productos,
      ultimoDocumento,
      hayMas,
    };
  } catch (error) {
    console.error("Error al obtener la página de productos:", error);
    throw error;
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return querySnapshot.docs.map(mapDocumentToProducts);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

export const getProducts = getAllProducts;

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return mapDocumentToProducts(
        docSnap as QueryDocumentSnapshot<DocumentData>,
      );
    } else {
      console.warn("No se encontró el producto con ID:", id);
      return null;
    }
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id}`, error);
    throw error;
  }
};



export const createProduct = async (
  productData: Omit<Product, "id">,
): Promise<string> => {
  try {
    const docRef = await addDoc(
      collection(db, PRODUCTS_COLLECTION),
      productData,
    );
    return docRef.id;
  } catch (error) {
    console.error("Error al crear un nuevo producto:", error);
    throw error;
  }
};

export const updateProduct = async (
  id: string,
  updateData: Partial<Product>,
): Promise<void> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, updateData as DocumentData);
  } catch (error) {
    console.error(`Error al actualizar el producto con ID ${id}`, error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
    throw error;
  }
};
