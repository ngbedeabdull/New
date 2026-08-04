import { useState } from "react";

const ReserveTable = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    guests: "",
    date: "",
    time: "",
    request: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowSuccessModal(true);

    setForm({
      name: "",
      phone: "",
      email: "",
      guests: "",
      date: "",
      time: "",
      request: "",
    });
  };

  return (
    <section className="w-full py-20 px-10 bg-gray-50">

      <h2 className="text-5xl font-bold text-center text-red-600 mb-4">
        Reserve a Table
      </h2>

      <p className="text-center text-gray-600 text-xl mb-14">
        Book your table in advance and enjoy an unforgettable dining experience.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* Left Image */}
        <div>
          <img
            src="/images/restaurant.jpeg"
            alt="Reserve a Table"
            className="w-full h-[650px] object-cover rounded-3xl shadow-2xl"
          />
        </div>

        {/* Reservation Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <h3 className="text-3xl font-bold text-center mb-8">
            Book Your Table
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="👤 Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-red-600"
            />

            <input
              type="tel"
              name="phone"
              placeholder="📞 Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-red-600"
            />

            <input
              type="email"
              name="email"
              placeholder="📧 Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-red-600"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <input
                type="number"
                name="guests"
                placeholder="👥 Guests"
                min="1"
                max="20"
                value={form.guests}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-4 text-lg outline-none focus:ring-2 focus:ring-red-600"
              />

              <input
                type="date"
                name="date"
                min={new Date().toISOString().split("T")[0]}
                value={form.date}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-4 text-lg outline-none focus:ring-2 focus:ring-red-600"
              />

              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-4 text-lg outline-none focus:ring-2 focus:ring-red-600"
              />

            </div>

            <textarea
              name="request"
              rows="4"
              placeholder="📝 Special Requests (Optional)"
              value={form.request}
              onChange={handleChange}
              className="w-full border rounded-xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-red-600 resize-none"
            />

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 hover:scale-105 transition duration-300 text-white py-4 rounded-xl text-xl font-bold"
            >
              🍽️ Reserve Now
            </button>

          </form>

        </div>

      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">

            <div className="text-6xl mb-4">✅</div>

            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Reservation Confirmed!
            </h2>

            <p className="text-gray-600 leading-7 mb-8">
              Thank you for choosing <strong>MJ Restaurant</strong>.
              <br />
              Your reservation has been received successfully.
              <br />
              Our team will contact you shortly to confirm your booking.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </section>
  );
};

export default ReserveTable;