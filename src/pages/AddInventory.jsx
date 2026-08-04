import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddInventory = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const saveItem = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "inventory"), {
        name,
        quantity: Number(quantity),
        createdAt: new Date(),
      });

      alert("Inventory item added successfully!");

      navigate("/admin/inventory");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          📦 Add Inventory Item
        </h1>

        <form onSubmit={saveItem} className="space-y-5">

          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
          >
            Save Item
          </button>

        </form>

      </div>

    </section>
  );
};

export default AddInventory;