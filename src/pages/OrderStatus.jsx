import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

const OrderStatus = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderId = localStorage.getItem("orderId");

    if (!orderId) return;

    const unsubscribe = onSnapshot(
      doc(db, "orders", orderId),
      (docSnap) => {
        if (docSnap.exists()) {
          const orderData = docSnap.data();

          setOrder(orderData);

          // Automatically clear saved order after delivery
          if (orderData.status === "Delivered") {
            localStorage.removeItem("orderId");
          }
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // No active order
  if (!order) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">

          <h1 className="text-5xl mb-4">📦</h1>

          <h2 className="text-3xl font-bold text-gray-800">
            No Active Order
          </h2>

          <p className="text-gray-500 mt-4">
            You don't have any active order yet.
          </p>

          <Link
            to="/menu"
            className="inline-block mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold"
          >
            🍴 Order Food
          </Link>

        </div>
      </section>
    );
  }

  const steps = [
    "Pending",
    "Preparing",
    "Ready",
    "On The Way",
    "Delivered",
  ];

  const normalizedStatus = (order.status || "")
    .toLowerCase()
    .trim();

  const currentStep = steps.findIndex(
    (step) => step.toLowerCase() === normalizedStatus
  );

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-6">

      <div className="bg-white rounded-2xl shadow-xl p-5 md:p-8 w-full max-w-4xl">

        <h1 className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-8">
          🍽️ Order Status
        </h1>

        <div className="space-y-4">

          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>

          <p>
            <strong>Phone:</strong> {order.phone}
          </p>

          <p>
            <strong>Table Number:</strong> {order.tableNumber}
          </p>

          <p>
            <strong>Total:</strong> ₦
            {Number(order.total).toLocaleString()}
          </p>

          <div className="mt-10">

            <h2 className="text-2xl font-bold text-center mb-8">
              Order Progress
            </h2>

            <div className="flex items-start justify-between w-full">

              {steps.map((step, index) => (

                <div
                  key={step}
                  className="flex items-center flex-1"
                >

                  <div className="flex flex-col items-center w-full">

                    <div
                      className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-base md:text-xl transition-all ${
                        index <= currentStep
                          ? "bg-green-600"
                          : "bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <p
                      className={`mt-2 text-[10px] md:text-sm text-center leading-tight ${
                        index <= currentStep
                          ? "text-green-600 font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      {step}
                    </p>

                  </div>

                  {index !== steps.length - 1 && (

                    <div
                      className={`flex-1 h-1 mx-1 md:mx-2 rounded-full ${
                        index < currentStep
                          ? "bg-green-600"
                          : "bg-gray-300"
                      }`}
                    />
                  )}

                </div>

              ))}

            </div>

          </div>

          {/* Current Status */}

          <div className="mt-10">

            <h2 className="text-xl font-bold text-center mb-4">
              Current Status
            </h2>

            <div
              className={`text-center py-4 rounded-xl text-white text-xl md:text-2xl font-bold ${
                order.status === "Pending"
                  ? "bg-orange-500"
                  : order.status === "Preparing"
                  ? "bg-blue-600"
                  : order.status === "Ready"
                  ? "bg-green-500"
                  : order.status === "On The Way"
                  ? "bg-purple-600"
                  : "bg-green-700"
              }`}
            >
              {order.status}
            </div>

          </div>

          {/* Delivered Message */}

          {order.status === "Delivered" && (

            <div className="mt-10 bg-green-100 border border-green-500 rounded-xl p-6 text-center">

              <h2 className="text-3xl font-bold text-green-700">
                🎉 Order Delivered!
              </h2>

              <p className="mt-3 text-gray-700">
                Thank you for choosing MJ Restaurant.
              </p>

              <p className="text-gray-700">
                We hope you enjoyed your meal ❤️
              </p>

              <Link
                to="/menu"
                className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold"
              >
                🍴 Order Again
              </Link>

            </div>

          )}

        </div>

      </div>

    </section>
  );
};

export default OrderStatus;