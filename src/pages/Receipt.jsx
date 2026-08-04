import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Receipt = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const snap = await getDoc(doc(db, "orders", id));

        if (snap.exists()) {
          setOrder({
            id: snap.id,
            ...snap.data(),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchReceipt();
  }, [id]);

  // Automatically open print dialog
  useEffect(() => {
    if (order) {
      setTimeout(() => {
        window.print();
      }, 1000);
    }
  }, [order]);

  if (!order) {
    return (
      <div className="text-center mt-20 text-2xl">
        Loading Receipt...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-8">

        <div className="text-center">

          <h1 className="text-3xl font-bold text-red-600">
            MJ Restaurant
          </h1>

          <p className="text-gray-500">
            Thank you for dining with us
          </p>

        </div>

        <hr className="my-6" />

        <div className="space-y-2">

          <p>
            <strong>Receipt No:</strong> {order.id}
          </p>

          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>

          <p>
            <strong>Phone:</strong> {order.phone}
          </p>

          <p>
            <strong>Table:</strong> {order.tableNumber}
          </p>

          <p>
            <strong>Payment:</strong> {order.paymentMethod}
          </p>

          <p>
            <strong>Status:</strong> {order.paymentStatus}
          </p>

        </div>

        <hr className="my-6" />

        <h2 className="font-bold text-xl mb-4">
          Ordered Items
        </h2>

        {order.items.map((food, index) => (

          <div
            key={index}
            className="flex justify-between border-b py-2"
          >

            <span>
              {food.name} × {food.quantity}
            </span>

            <span>
              ₦{(food.price * food.quantity).toLocaleString()}
            </span>

          </div>

        ))}

        <hr className="my-6" />

        <h2 className="text-3xl font-bold text-green-600 text-right">
          Total: ₦{Number(order.total).toLocaleString()}
        </h2>

        <div className="mt-8 text-center text-gray-500">

          <p>
            Payment Date
          </p>

          <p>
            {order.paidAt
              ? new Date(order.paidAt.seconds * 1000).toLocaleString()
              : "N/A"}
          </p>

        </div>

        <button
          onClick={() => window.print()}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold"
        >
          🖨 Print Again
        </button>

      </div>

    </section>
  );
};

export default Receipt;