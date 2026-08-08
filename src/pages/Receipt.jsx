import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Receipt = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReceipt = async () => {
      if (!id) {
        setError("Receipt ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(
          doc(db, "orders", id)
        );

        if (snap.exists()) {
          setOrder({
            id: snap.id,
            ...snap.data(),
          });
        } else {
          setError("Receipt not found.");
        }
      } catch (err) {
        console.error(
          "Failed to load receipt:",
          err
        );

        setError(
          "Unable to load receipt."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [id]);

  // Safely format Firestore Timestamp / Date
  const getPaymentDate = () => {
    if (!order?.paidAt) {
      return "N/A";
    }

    try {
      // Firestore Timestamp
      if (
        typeof order.paidAt.toDate ===
        "function"
      ) {
        return order.paidAt
          .toDate()
          .toLocaleString();
      }

      // Firestore timestamp object
      if (
        typeof order.paidAt === "object" &&
        order.paidAt.seconds
      ) {
        return new Date(
          order.paidAt.seconds * 1000
        ).toLocaleString();
      }

      // JavaScript Date / date string
      const date = new Date(
        order.paidAt
      );

      if (!Number.isNaN(date.getTime())) {
        return date.toLocaleString();
      }

      return "N/A";
    } catch (err) {
      console.error(
        "Payment date error:",
        err
      );

      return "N/A";
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-600">
          Loading Receipt...
        </h2>
      </div>
    );
  }

  // Error / Receipt not found
  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

        <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full">

          <div className="text-5xl mb-4">
            🧾
          </div>

          <h2 className="text-2xl font-bold text-red-600">
            Receipt Not Found
          </h2>

          <p className="text-gray-600 mt-3">
            {error ||
              "We could not find this receipt."}
          </p>

        </div>

      </div>
    );
  }

  const items = Array.isArray(order.items)
    ? order.items
    : [];

  const total = Number(
    order.total || 0
  );

  return (
    <>
      {/* Print Styling */}

      <style>
        {`
          @media print {
            body {
              background: white !important;
            }

            .no-print {
              display: none !important;
            }

            .receipt-container {
              box-shadow: none !important;
              border: none !important;
              margin: 0 !important;
              width: 100% !important;
              max-width: 100% !important;
            }

            @page {
              margin: 10mm;
            }
          }
        `}
      </style>

      <section className="min-h-screen bg-gray-100 flex justify-center items-center p-4 md:p-6">

        <div
          className="receipt-container bg-white shadow-2xl rounded-xl w-full max-w-md p-6 md:p-8"
        >

          {/* Restaurant Header */}

          <div className="text-center">

            <h1 className="text-3xl font-bold text-red-600">
              MJ Restaurant
            </h1>

            <p className="text-gray-500 mt-1">
              Thank you for dining with us ❤️
            </p>

          </div>

          <hr className="my-6" />

          {/* Customer Information */}

          <div className="space-y-2 text-sm">

            <p>
              <strong>Receipt No:</strong>{" "}
              {order.id}
            </p>

            <p>
              <strong>Customer:</strong>{" "}
              {order.customerName ||
                "N/A"}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.phone || "N/A"}
            </p>

            <p>
              <strong>Table:</strong>{" "}
              {order.tableNumber ||
                "N/A"}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {order.paymentMethod ||
                "N/A"}
            </p>

            <p>
              <strong>Status:</strong>{" "}

              <span className="text-green-600 font-bold">
                {order.paymentStatus ||
                  "Unpaid"}
              </span>

            </p>

          </div>

          <hr className="my-6" />

          {/* Ordered Items */}

          <h2 className="font-bold text-xl mb-4">
            Ordered Items
          </h2>

          {items.length > 0 ? (

            <div>

              {items.map(
                (food, index) => {

                  const price =
                    Number(
                      food.price || 0
                    );

                  const quantity =
                    Number(
                      food.quantity || 0
                    );

                  const itemTotal =
                    price * quantity;

                  return (
                    <div
                      key={`${food.id || "food"}-${index}`}
                      className="flex justify-between border-b py-3"
                    >

                      <div>

                        <p className="font-semibold">
                          {food.name ||
                            "Food"}
                        </p>

                        <p className="text-gray-500 text-sm">
                          ₦
                          {price.toLocaleString()}{" "}
                          × {quantity}
                        </p>

                      </div>

                      <p className="font-semibold">
                        ₦
                        {itemTotal.toLocaleString()}
                      </p>

                    </div>
                  );
                }
              )}

            </div>

          ) : (

            <p className="text-gray-500 text-center py-4">
              No items found.
            </p>

          )}

          <hr className="my-6" />

          {/* Total */}

          <div className="flex justify-between items-center">

            <span className="text-xl font-bold">
              Total
            </span>

            <span className="text-3xl font-bold text-green-600">
              ₦{total.toLocaleString()}
            </span>

          </div>

          {/* Payment Date */}

          <div className="mt-8 text-center text-gray-500">

            <p className="font-semibold">
              Payment Date
            </p>

            <p className="text-sm mt-1">
              {getPaymentDate()}
            </p>

          </div>

          {/* Print Button */}

          <button
            onClick={() =>
              window.print()
            }
            className="no-print mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition"
          >
            🖨️ Print Receipt
          </button>

        </div>

      </section>
    </>
  );
};

export default Receipt;