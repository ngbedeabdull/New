import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Inventory = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "inventory"),
            (snapshot) => {
                setItems(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <section className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-4xl font-bold mb-8">
                📦 Inventory Management
            </h1>
            <div className="mb-6">
                <Link
                    to="/admin/inventory/add"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold"
                >
                    ➕ Add Item
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                <table className="w-full">

                    <thead className="bg-red-600 text-white">

                        <tr>
                            <th className="p-4">Item</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        {items.map((item) => (

                            <tr key={item.id} className="text-center border-b">

                                <td className="p-4">{item.name}</td>

                                <td>{item.quantity}</td>

                                <td>
                                    {item.quantity <= 5 ? (
                                        <span className="text-red-600 font-bold">
                                            Low Stock
                                        </span>
                                    ) : (
                                        <span className="text-green-600 font-bold">
                                            In Stock
                                        </span>
                                    )}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </section>
    );
};

export default Inventory;