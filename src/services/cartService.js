import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

const CART_COLLECTION = "carts";

// ==========================
// Save or Update Cart
// ==========================
export const saveCart = async (
  phone,
  customerName,
  tableNumber,
  cart
) => {
  if (!phone) return;

  const cartRef = doc(db, CART_COLLECTION, phone);
  const snap = await getDoc(cartRef);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await setDoc(
    cartRef,
    {
      customerName,
      phone,
      tableNumber,
      items: cart,
      total,

      // Keep original creation time
      createdAt: snap.exists()
        ? snap.data().createdAt
        : serverTimestamp(),

      // Always update this
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

// ==========================
// Load Cart
// ==========================
export const loadCart = async (phone) => {
  if (!phone) return null;

  const snap = await getDoc(
    doc(db, CART_COLLECTION, phone)
  );

  if (!snap.exists()) return null;

  return snap.data();
};

// ==========================
// Delete Cart
// ==========================
export const deleteCart = async (phone) => {
  if (!phone) return;

  await deleteDoc(
    doc(db, CART_COLLECTION, phone)
  );
};