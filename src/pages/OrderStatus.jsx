import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const OrderStatus = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderId = localStorage.getItem("orderId");

    if (!orderId) return;

    const unsubscribe = onSnapshot(
      doc(db, "orders", orderId),
      (docSnap) => {
        if (docSnap.exists()) {
          setOrder(docSnap.data());
        }
      }
    );

    return () => unsubscribe();
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">
          No active order found.
        </h2>
      </div>
    );
  }

  const steps = [
    "Pending",
    "Preparing",
    "Ready",
    "On The Way",
    "Delivered",
  ];

  const currentStep = steps.indexOf(order.status);

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full">

        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
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

          {/* Progress Tracker */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-8 text-center">
              Order Progress
            </h2>

            <div className="flex items-center justify-between">

              {steps.map((step, index) => (

                <div
                  key={step}
                  className="flex items-center flex-1"
                >

                  <div className="flex flex-col items-center">

                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${
                        index <= currentStep
                          ? "bg-green-600"
                          : "bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <p
                      className={`mt-3 text-sm text-center ${
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
                      className={`flex-1 h-1 mx-2 rounded-full ${
                        index < currentStep
                          ? "bg-green-600"
                          : "bg-gray-300"
                      }`}
                    ></div>

                  )}

                </div>

              ))}

            </div>

          </div>

          {/* Current Status */}

          <div className="mt-10">

            <h2 className="font-bold text-xl text-center mb-4">
              Current Status
            </h2>

            <div
              className={`text-center py-4 rounded-xl text-white text-2xl font-bold ${
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

            </div>

          )}

        </div>

      </div>

    </section>
  );
};

export default OrderStatus;