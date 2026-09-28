import { db } from "@/firebase/config";
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
  getDoc,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { Order } from "@/types";

export const createOrderAndDiscountStock = async (
  orderData: Omit<Order, "id">,
): Promise<string> => {
  return await runTransaction(db, async (transaction) => {
    // 1. FASE DE LECTURAS (Todas las lecturas deben ejecutarse primero)
    const productUpdates: { ref: any; newStock: number }[] = [];

    for (const item of orderData.items) {
      const productRef = doc(db, "productos", item.id);
      const productDoc = await transaction.get(productRef);

      if (!productDoc.exists()) {
        throw new Error(`El producto "${item.titulo}" ya no existe.`);
      }

      const currentStock = productDoc.data().stock ?? 0;
      if (currentStock < item.quantity) {
        throw new Error(
          `Stock insuficiente para "${item.titulo}". Stock disponible: ${currentStock}, solicitado: ${item.quantity}`,
        );
      }

      const newStock = Math.max(0, currentStock - item.quantity);
      productUpdates.push({ ref: productRef, newStock });
    }

    // 2. FASE DE ESCRITURAS (Solo escrituras / updates)
    for (const update of productUpdates) {
      transaction.update(update.ref, { stock: update.newStock });
    }

    // 3. Crear el documento de la orden en la colección "ordenes"
    const orderRef = doc(collection(db, "ordenes"));
    transaction.set(orderRef, {
      ...orderData,
      createdAt: serverTimestamp(),
    });

    return orderRef.id;
  });
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const docRef = doc(db, "ordenes", orderId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as Order;
    }
    return null;
  } catch (error) {
    console.error(`Error al obtener la orden ${orderId}:`, error);
    throw error;
  }
};

export const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
  try {
    const q = query(
      collection(db, "ordenes"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Order);
  } catch (error) {
    console.error("Error al obtener órdenes del usuario:", error);
    return [];
  }
};
