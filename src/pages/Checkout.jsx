import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  saveCart,
  deleteCart,
} from "../services/cartService";

const Checkout = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const savedTable =
    searchParams.get("table") ||
    localStorage.getItem("tableNumber");

  const [customer, setCustomer] = useState({
    name: localStorage.getItem("customerName") || "",
    phone: localStorage.getItem("customerPhone") || "",
    tableNumber: savedTable || "",
    instruction: "",
  });

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    if (
      !customer.name ||
      !customer.phone ||
      !customer.tableNumber
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      localStorage.setItem(
        "customerName",
        customer.name
      );

      localStorage.setItem(
        "customerPhone",
        customer.phone
      );

      localStorage.setItem(
        "tableNumber",
        customer.tableNumber
      );

      await saveCart(
        customer.phone,
        customer.name,
        customer.tableNumber,
        cart
      );

      const docRef = await addDoc(
        collection(db, "orders"),
        {
          customerName: customer.name,
          phone: customer.phone,
          tableNumber: customer.tableNumber,
          instruction: customer.instruction,
          items: cart,
          total: totalPrice,
          status: "Pending",
          paymentStatus: "Unpaid",
          paymentMethod: "",
          waiter: "",
          createdAt: serverTimestamp(),
        }
      );

      localStorage.setItem(
        "orderId",
        docRef.id
      );

      await updateDoc(
        doc(
          db,
          "tables",
          `table${customer.tableNumber}`
        ),
        {
          status: "Occupied",
        }
      );

      alert("Order placed successfully!");

      await deleteCart(customer.phone);

      setCart([]);

      localStorage.removeItem("cart");

      navigate("/order-status");

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (

    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Checkout
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6">

        <label className="block font-semibold mb-2">
          Customer Name
        </label>

        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="w-full border rounded-lg px-4 py-3 mb-6"
        />

        <label className="block font-semibold mb-2">
          Phone Number
        </label>

        <input
          type="tel"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          placeholder="08012345678"
          className="w-full border rounded-lg px-4 py-3 mb-6"
        />

        <label className="block font-semibold mb-2">
          Table Number
        </label>

        <input
          type="number"
          name="tableNumber"
          value={customer.tableNumber}
          onChange={handleChange}
          placeholder="Enter your table number"
          readOnly={!!savedTable}
          className={`w-full border rounded-lg px-4 py-3 mb-6 ${
            savedTable
              ? "bg-gray-100 cursor-not-allowed"
              : ""
          }`}
        />

        <label className="block font-semibold mb-2">
          Special Instructions (Optional)
        </label>

        <textarea
          rows="4"
          name="instruction"
          value={customer.instruction}
          onChange={handleChange}
          placeholder="Example: No pepper, extra chicken..."
          className="w-full border rounded-lg px-4 py-3"
        />

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Order Summary
        </h2>

        {cart.length > 0 ? (
          cart.map((food) => (
            <div
              key={food.id}
              className="flex justify-between border-b py-2"
            >
              <span>
                {food.name} × {food.quantity}
              </span>

              <span>
                ₦{(food.price * food.quantity).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">
            Your cart is empty.
          </p>
        )}

        <h2 className="text-2xl font-bold mt-6">
          Total: ₦{totalPrice.toLocaleString()}
        </h2>

        <button
          onClick={placeOrder}
          disabled={cart.length === 0}
          className={`w-full mt-6 py-3 rounded-lg text-xl font-bold transition ${
            cart.length === 0
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          Place Order
        </button>

      </div>

    </div>
  );
};

export default Checkout;