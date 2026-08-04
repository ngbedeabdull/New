import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
    collection,
    onSnapshot,
    updateDoc,
    doc,
} from "firebase/firestore";

const TableManagement = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "tables"),
            (snapshot) => {
                const tableList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                tableList.sort((a, b) => a.number - b.number);

                setTables(tableList);
            }
        );

        return () => unsubscribe();
    }, []);

    const updateStatus = async (id, status) => {
        await updateDoc(doc(db, "tables", id), {
            status,
        });
    };

    return (
        <section className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-4xl font-bold mb-8">
                🍽️ Table Management
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                {tables.map((table) => (

                    <div
                        key={table.id}
                        className="bg-white rounded-2xl shadow-xl p-6"
                    >

                        <h2 className="text-2xl font-bold">
                            Table {table.number}
                        </h2>

                        <p
                            className={`mt-4 font-bold ${table.status === "Available"
                                    ? "text-green-600"
                                    : table.status === "Occupied"
                                        ? "text-red-600"
                                        : table.status === "Reserved"
                                            ? "text-orange-600"
                                            : "text-gray-600"
                                }`}
                        >
                            {table.status}
                        </p>

                        <select
                            className="border rounded-lg w-full mt-6 p-3"
                            value={table.status}
                            onChange={(e) =>
                                updateStatus(table.id, e.target.value)
                            }
                        >
                            <option>Available</option>
                            <option>Occupied</option>
                            <option>Reserved</option>
                        </select>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default TableManagement;