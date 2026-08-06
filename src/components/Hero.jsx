import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Hero = () => {
  const heroImages = [
    "/images/hero1.png",
    "/images/hero2.jpg",
    "/images/hero3.jpeg",
    "/images/hero4.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(true);

      setTimeout(() => {
        setCurrentImage(nextImage);
        setNextImage((nextImage + 1) % heroImages.length);
        setFadeIn(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [nextImage, heroImages.length]);

  return (
    <section className="relative h-[90vh] overflow-hidden">

      {/* Current Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImages[currentImage]})`,
        }}
      />

      {/* Next Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${heroImages[nextImage]})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">

        <h1 className="text-5xl md:text-7xl font-bold">
          🍽️ MJ Restaurant
        </h1>

        <p className="mt-4 text-xl md:text-2xl">
          Delicious Meals • Fast Service • Easy Ordering
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">

          <Link
            to="/menu"
            className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full text-lg font-semibold transition text-center"
          >
            🍴 View Menu
          </Link>

          <Link
            to="/order-status"
            className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-full text-lg font-semibold transition text-center"
          >
            📦 Track My Order
          </Link>

        </div>

      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentImage(index);
              setNextImage((index + 1) % heroImages.length);
              setFadeIn(false);
            }}
            className={`w-3 h-3 rounded-full transition ${
              currentImage === index
                ? "bg-white scale-125"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default Hero;