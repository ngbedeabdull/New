const Gallery = () => {
  const images = [
    "/images/burger.jpg",
    "/images/pizza.jpeg",
    "/images/chicken.jpeg",
    "/images/jollof.jpg",
    "/images/shawarma.jpeg",
    "/images/drink.jpeg",
  ];

  return (
    <section className="w-full py-20 px-10 bg-white">

      <h2 className="text-4xl font-bold text-center text-red-600 mb-12">
        Our Gallery
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-2xl group"
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Gallery;