import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

const CashierDashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        const orderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Show only Ready orders
        setOrders(
          orderList.filter(
            (order) => order.status === "Ready"
          )
        );
      }
    );

    return () => unsubscribe();
  }, []);

  // Receive Payment
  const receivePayment = async (order, method) => {
    try {
      // Update Order
      await updateDoc(doc(db, "orders", order.id), {
        status: "Delivered",
        paymentStatus: "Paid",
        paymentMethod: method,
        paidAt: new Date(),
      });

      // Free the table
      await updateDoc(
        doc(db, "tables", `table${order.tableNumber}`),
        {
          status: "Available",
        }
      );

      // Open receipt page
      navigate(`/receipt/${order.id}`);

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        💳 Cashier Dashboard
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-center text-2xl text-gray-600">
          No payments waiting.
        </h2>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-xl p-6"
            >

              <h2 className="text-2xl font-bold">
                🍽️ Table {order.tableNumber}
              </h2>

              <p className="mt-2 font-semibold">
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

              <h2 className="text-3xl font-bold text-green-600 mb-5">
                ₦{Number(order.total).toLocaleString()}
              </h2>

              <div className="grid grid-cols-3 gap-3">

                <button
                  onClick={() => receivePayment(order, "Cash")}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
                >
                  💵 Cash
                </button>

                <button
                  onClick={() => receivePayment(order, "Card")}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                >
                  💳 Card
                </button>

                <button
                  onClick={() => receivePayment(order, "Transfer")}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold"
                >
                  🏦 Transfer
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
};

export default CashierDashboard;