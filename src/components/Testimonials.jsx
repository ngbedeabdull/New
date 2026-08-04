const Testimonials = () => {
  const reviews = [
    {
      name: "John",
      comment:
        "The food was amazing! The QR ordering system made everything so easy.",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      name: "Sarah",
      comment:
        "Fast service and delicious meals. I'll definitely come back.",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      name: "Michael",
      comment:
        "One of the best restaurant experiences I've had. Highly recommended!",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      name: "David",
      comment:
        "Excellent customer service, tasty meals, and a wonderful atmosphere. I highly recommend MJ Restaurant to everyone.",
      rating: "⭐⭐⭐⭐⭐",
    },
  ];

  return (
    <section className="w-full py-20 px-10 bg-gray-50">

      <h2 className="text-4xl font-bold text-center text-red-600 mb-12">
        What Our Customers Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-2xl hover:shadow-2xl transition duration-300 p-8"
          >
            <p className="text-yellow-500 text-2xl">
              {review.rating}
            </p>

            <p className="text-gray-600 italic leading-7 mt-5">
              "{review.comment}"
            </p>

            <h3 className="font-bold text-xl mt-8">
              — {review.name}
            </h3>
          </div>
        ))}

      </div>

    </section>
  );
};

export default Testimonials;