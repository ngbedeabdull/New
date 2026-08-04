import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "reservations"),
      (snapshot) => {
        const reservationList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReservations(reservationList);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "reservations", id), {
        status,
      });

      alert("Reservation updated!");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const deleteReservation = async (id) => {
    if (!window.confirm("Delete this reservation?")) return;

    try {
      await deleteDoc(doc(db, "reservations", id));

      alert("Reservation deleted.");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        📅 Reservation Management
      </h1>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-red-600 text-white">

            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Guests</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Table</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>
            {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <tr
                key={reservation.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4 font-semibold">
                  {reservation.customerName}
                </td>

                <td className="p-4">
                  {reservation.phone}
                </td>

                <td className="p-4 text-center">
                  {reservation.guests}
                </td>

                <td className="p-4">
                  {reservation.date}
                </td>

                <td className="p-4">
                  {reservation.time}
                </td>

                <td className="p-4 text-center">
                  {reservation.tableNumber || "-"}
                </td>

                <td className="p-4">
                  <select
                    value={reservation.status}
                    onChange={(e) =>
                      updateStatus(
                        reservation.id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg px-3 py-2"
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Approved">
                      Approved
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                    <option value="Completed">
                      Completed
                    </option>
                  </select>
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      deleteReservation(
                        reservation.id
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                className="text-center py-12 text-gray-500 text-lg"
              >
                📅 No reservations available.
              </td>
            </tr>
          )}

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default ReservationManagement;