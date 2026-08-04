import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const Reservation = () => {
  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    guests: "",
    date: "",
    time: "",
    tableNumber: "",
    request: "",
  });

  const handleChange = (e) => {
    setReservation({
      ...reservation,
      [e.target.name]: e.target.value,
    });
  };

  const bookTable = async (e) => {
    e.preventDefault();

    if (
      !reservation.name ||
      !reservation.phone ||
      !reservation.guests ||
      !reservation.date ||
      !reservation.time
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "reservations"), {
        customerName: reservation.name,
        phone: reservation.phone,
        guests: Number(reservation.guests),
        date: reservation.date,
        time: reservation.time,
        tableNumber: reservation.tableNumber,
        request: reservation.request,
        status: "Pending",
        createdAt: new Date(),
      });

      alert("Reservation booked successfully!");

      setReservation({
        name: "",
        phone: "",
        guests: "",
        date: "",
        time: "",
        tableNumber: "",
        request: "",
      });

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
          🍽️ Reserve a Table
        </h1>

        <form onSubmit={bookTable} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={reservation.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={reservation.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            name="guests"
            placeholder="Number of Guests"
            value={reservation.guests}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="date"
            name="date"
            value={reservation.date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="time"
            name="time"
            value={reservation.time}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            name="tableNumber"
            placeholder="Preferred Table (Optional)"
            value={reservation.tableNumber}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="request"
            rows="4"
            placeholder="Special Request"
            value={reservation.request}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-lg font-bold"
          >
            Reserve Table
          </button>

        </form>

      </div>
    </section>
  );
};

export default Reservation;