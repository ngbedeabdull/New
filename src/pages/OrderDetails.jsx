import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const docRef = doc(db, "orders", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrder({
            id: docSnap.id,
            ...docSnap.data(),
          });
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold text-red-600 mb-6">
          🍽️ Order Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div>
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Table:</strong> {order.tableNumber}</p>
          </div>

          <div>
            <p>
              <strong>Status:</strong>

              <span
                className={`ml-2 px-3 py-1 rounded-full text-white
                  ${
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
            </p>

            <p>
              <strong>Total:</strong>

              <span className="text-green-600 font-bold text-xl ml-2">
                ₦{Number(order.total).toLocaleString()}
              </span>
            </p>

          </div>

        </div>

        <h2 className="text-2xl font-bold mb-4">
          Ordered Items
        </h2>

        <div className="space-y-3">

          {order.items?.map((food, index) => (

            <div
              key={index}
              className="flex justify-between border rounded-lg p-3"
            >

              <span>{food.name}</span>

              <span>x{food.quantity}</span>

            </div>

          ))}

        </div>

        {order.notes && (
          <div className="mt-8">

            <h2 className="text-xl font-bold mb-2">
              Kitchen Notes
            </h2>

            <div className="bg-yellow-100 p-4 rounded-lg">
              {order.notes}
            </div>

          </div>
        )}

      </div>

    </section>
  );
};

export default OrderDetails;