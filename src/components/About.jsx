import { useState, useEffect } from "react";

const About = () => {
  const images = [
    "/images/restaurant1.jpg",
    "/images/restaurant2.jpeg",
    "/images/restaurant3.jpeg",
    "/images/restaurant4.jpeg",
    "/images/restaurant5.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 flex items-center">
      <div className="w-full px-10 grid md:grid-cols-2 gap-12 items-center">

        {/* Image Slider */}
        <div className="relative">
          <img
            src={images[currentImage]}
            alt="MJ Restaurant"
            className="rounded-2xl shadow-2xl w-full h-[450px] object-cover transition-all duration-700"
          />

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition ${
                  currentImage === index
                    ? "bg-white"
                    : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* About Text */}
        <div>
          <h2 className="text-4xl font-bold text-red-600 mb-6">
            About MJ Restaurant
          </h2>

          <p className="text-gray-600 leading-8 mb-6">
            MJ Restaurant is dedicated to serving delicious meals prepared
            with fresh ingredients. Whether you're dining in, ordering from
            your table through our QR Code system, or enjoying takeaway,
            we ensure every meal is made with quality and care.
          </p>

          <p className="text-gray-600 leading-8 mb-8">
            Our mission is to make food ordering fast, convenient and
            enjoyable. Simply scan the QR code, browse the menu,
            place your order and relax while we prepare your meal.
          </p>

          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg">
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
};

export default About;