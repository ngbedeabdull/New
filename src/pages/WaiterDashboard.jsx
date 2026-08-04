import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const WaiterDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        const readyOrders = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((order) => order.status === "Ready");

        setOrders(readyOrders);
      }
    );

    return () => unsubscribe();
  }, []);

  const deliverOrder = async (order) => {
    try {
      await updateDoc(doc(db, "orders", order.id), {
        status: "Delivered",
      });

      await updateDoc(
        doc(db, "tables", `table${order.tableNumber}`),
        {
          status: "Available",
        }
      );

      alert("Order delivered successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

return (
  <section className="min-h-screen bg-gray-100 p-8">

    <h1 className="text-4xl font-bold mb-8">
      🍽️ Waiter Dashboard
    </h1>

    {orders.length > 0 && (
      <div className="bg-green-100 border-l-4 border-green-600 p-5 rounded-xl mb-8 shadow">

        <h2 className="text-2xl font-bold text-green-700">
          🔔 Orders Ready For Serving
        </h2>

        <p className="text-gray-700 mt-2">
          {orders.length} order(s) waiting to be served.
        </p>

      </div>
    )}

    {orders.length === 0 ? (
      <h2 className="text-center text-2xl text-gray-500">
        ✅ No Ready Orders
      </h2>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600"
          >

            <h2 className="text-2xl font-bold">
              🍽️ Table {order.tableNumber}
            </h2>

            <p className="mt-2">
              👤 {order.customerName}
            </p>

            <div className="my-4">

              {order.items?.map((food, index) => (

                <div
                  key={index}
                  className="flex justify-between border-b py-2"
                >
                  <span>{food.name}</span>

                  <span>x{food.quantity}</span>

                </div>

              ))}

            </div>

            <h2 className="text-2xl font-bold text-green-600">
              ₦{Number(order.total).toLocaleString()}
            </h2>

            <button
              onClick={() => deliverOrder(order)}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
            >
              ✅ Deliver Order
            </button>

          </div>

        ))}

      </div>
    )}

  </section>
);
};

export default WaiterDashboard;