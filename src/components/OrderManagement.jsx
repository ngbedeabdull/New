import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

 useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "orders"),
    (snapshot) => {
      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(orderList);
    }
  );

  return () => unsubscribe();
}, []);


 const deleteOrder = async (id) => {
  if (!window.confirm("Delete this order?")) return;

  try {
    // Get the order first
    const orderRef = doc(db, "orders", id);
    const orderSnap = await getDoc(orderRef);

    if (orderSnap.exists()) {
      const order = orderSnap.data();

      // Free the table before deleting the order
      await updateDoc(
        doc(db, "tables", `table${order.tableNumber}`),
        {
          status: "Available",
        }
      );
    }

    // Delete the order
    await deleteDoc(orderRef);

    alert("Order deleted successfully.");
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

 const updateStatus = async (id, status) => {
  try {
    // Update the order status
    await updateDoc(doc(db, "orders", id), {
      status,
    });

    // If the order is delivered, free the table
    if (status === "Delivered") {
      const orderRef = doc(db, "orders", id);
      const orderSnap = await getDoc(orderRef);

      if (orderSnap.exists()) {
        const order = orderSnap.data();

        await updateDoc(
          doc(db, "tables", `table${order.tableNumber}`),
          {
            status: "Available",
          }
        );
      }
    }

    alert("Order status updated!");

  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

  return (
    <section className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        📦 Order Management
      </h1>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-red-600 text-white">

            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Table</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

          {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-semibold">
                    {order.customerName}
                  </td>

                  <td className="p-4">
                    {order.phone}
                  </td>

                  <td className="p-4 text-center">
                    {order.tableNumber}
                  </td>

                  <td className="p-4 text-green-600 font-bold">
                    ₦{Number(order.total).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order.id, e.target.value)
                      }
                      className="border rounded-lg px-3 py-2"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Ready">Ready</option>
                      <option value="On the Way">On the Way</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-12 text-gray-500 text-lg"
                >
                  📦 No orders available.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default OrderManagement;
