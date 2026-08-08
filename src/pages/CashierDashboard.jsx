import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const CashierDashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        const orderList = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        // Only show orders that are ready
        // and have not been paid for yet.
        const readyOrders = orderList.filter(
          (order) =>
            order.status === "Ready" &&
            order.paymentStatus !== "Paid"
        );

        setOrders(readyOrders);
      },
      (error) => {
        console.error("Failed to load cashier orders:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const receivePayment = async (order, method) => {
    try {
      // Mark the order as paid and delivered
      await updateDoc(
        doc(db, "orders", order.id),
        {
          status: "Delivered",
          paymentStatus: "Paid",
          paymentMethod: method,
          paidAt: serverTimestamp(),
        }
      );

      // Make the restaurant table available again
      await updateDoc(
        doc(
          db,
          "tables",
          `table${order.tableNumber}`
        ),
        {
          status: "Available",
        }
      );

      // Open receipt
      navigate(`/receipt/${order.id}`);

    } catch (error) {
      console.error("Payment error:", error);
      alert(
        "Payment could not be completed. Please try again."
      );
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          💳 Cashier Dashboard
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <div className="text-5xl mb-4">
              💰
            </div>

            <h2 className="text-2xl font-bold text-gray-700">
              No payments waiting
            </h2>

            <p className="text-gray-500 mt-2">
              Ready orders will appear here when customers
              are ready to pay.
            </p>

          </div>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-xl p-6"
              >

                <div className="flex justify-between items-center mb-4">

                  <h2 className="text-2xl font-bold">
                    🍽️ Table {order.tableNumber}
                  </h2>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                    Ready
                  </span>

                </div>

                <p className="font-semibold">
                  👤 {order.customerName}
                </p>

                <p className="text-gray-500">
                  📞 {order.phone}
                </p>

                <div className="my-5">

                  <h3 className="font-bold mb-2">
                    Ordered Items
                  </h3>

                  {order.items?.map(
                    (food, index) => (

                      <div
                        key={index}
                        className="flex justify-between border-b py-2"
                      >

                        <span>
                          {food.name}
                        </span>

                        <span>
                          ×{food.quantity}
                        </span>

                      </div>

                    )
                  )}

                </div>

                <h2 className="text-3xl font-bold text-green-600 mb-6">
                  ₦
                  {Number(
                    order.total || 0
                  ).toLocaleString()}
                </h2>

                <p className="font-semibold mb-3">
                  Select Payment Method
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                  <button
                    onClick={() =>
                      receivePayment(
                        order,
                        "Cash"
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition"
                  >
                    💵 Cash
                  </button>

                  <button
                    onClick={() =>
                      receivePayment(
                        order,
                        "Card"
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition"
                  >
                    💳 Card
                  </button>

                  <button
                    onClick={() =>
                      receivePayment(
                        order,
                        "Transfer"
                      )
                    }
                    className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold transition"
                  >
                    🏦 Transfer
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
};

export default CashierDashboard;