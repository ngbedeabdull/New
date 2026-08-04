import { Link } from "react-router-dom";

const FeaturedMenu = () => {
  return (
    <section className="w-full py-20 px-10">

      <h2 className="text-4xl font-bold text-center text-red-600 mb-10">
        Featured Menu
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl transition duration-300">
          <img
            src="/images/burger.jpg"
            alt="Burger"
            className="w-full h-56 object-cover"
          />

          <div className="p-5">
            <h3 className="text-2xl font-bold">
              🍔 Burger
            </h3>

            <p className="text-gray-500 mt-2">
              Best Seller
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl transition duration-300">
          <img
            src="/images/pizza.jpeg"
            alt="Pizza"
            className="w-full h-56 object-cover"
          />

          <div className="p-5">
            <h3 className="text-2xl font-bold">
              🍕 Pizza
            </h3>

            <p className="text-gray-500 mt-2">
              Chef's Choice
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl transition duration-300">
          <img
            src="/images/chicken.jpeg"
            alt="Chicken"
            className="w-full h-56 object-cover"
          />

          <div className="p-5">
            <h3 className="text-2xl font-bold">
              🍗 Fried Chicken
            </h3>

            <p className="text-gray-500 mt-2">
              Most Ordered
            </p>
          </div>
        </div>

      </div>

      <div className="text-center mt-14">
        <Link
          to="/menu"
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          View Full Menu →
        </Link>
      </div>

    </section>
  );
};

export default FeaturedMenu;