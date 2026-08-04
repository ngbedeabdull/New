import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

const KitchenDisplay = () => {
  const [orders, setOrders] = useState([]);
  const [now, setNow] = useState(Date.now());

  // Listen for active orders
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        const orderList = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((order) => order.status !== "Delivered");

        setOrders(orderList);
      }
    );

    return () => unsubscribe();
  }, []);

  // Update timer every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Update order status
  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "orders", id), {
        status,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  // Waiting time
  const getWaitingTime = (createdAt) => {
    if (!createdAt) return "Just now";

    const orderTime = createdAt.toDate().getTime();
    const minutes = Math.floor((now - orderTime) / 60000);

    if (minutes < 1) return "Just now";
    if (minutes === 1) return "1 min";
    if (minutes < 60) return `${minutes} mins`;

    const hours = Math.floor(minutes / 60);
    return `${hours} hr ${minutes % 60} min`;
  };

  // Card color based on waiting time
  const getCardColor = (createdAt) => {
    if (!createdAt) return "bg-white";

    const orderTime = createdAt.toDate().getTime();
    const minutes = Math.floor((now - orderTime) / 60000);

    if (minutes >= 15) {
      return "bg-red-200 border-4 border-red-600";
    }

    if (minutes >= 10) {
      return "bg-yellow-200 border-4 border-yellow-500";
    }

    return "bg-white";
  };

  return (
    <section className="min-h-screen bg-gray-900 text-white p-8">

      <h1 className="text-5xl font-bold text-center mb-10">
        👨‍🍳 Kitchen Display
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-center text-3xl text-green-400">
          ✅ No Active Orders
        </h2>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className={`${getCardColor(order.createdAt)} text-black rounded-2xl shadow-xl p-6 transition-all duration-500`}
            >

              <h2 className="text-2xl font-bold">
                🍽️ Table {order.tableNumber}
              </h2>

              <p className="mt-2 font-semibold">
                👤 {order.customerName}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                ⏱️ Waiting: {getWaitingTime(order.createdAt)}
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

              <div className="mt-5 space-y-3">

                <span
                  className={`px-4 py-2 rounded-full text-white font-bold ${
                    order.status === "Pending"
                      ? "bg-orange-500"
                      : order.status === "Preparing"
                      ? "bg-blue-600"
                      : order.status === "Ready"
                      ? "bg-green-600"
                      : "bg-gray-600"
                  }`}
                >
                  {order.status}
                </span>

                {order.status === "Pending" && (
                  <button
                    onClick={() =>
                      updateStatus(order.id, "Preparing")
                    }
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold"
                  >
                    Start Preparing
                  </button>
                )}

                {order.status === "Preparing" && (
                  <button
                    onClick={() =>
                      updateStatus(order.id, "Ready")
                    }
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold"
                  >
                    Mark Ready
                  </button>
                )}

              </div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
};

export default KitchenDisplay;