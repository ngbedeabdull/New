import { Link } from "react-router-dom";

const Navbar = ({ cart }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] w-full bg-red-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-2 sm:px-4 py-3">

        <h1 className="text-lg sm:text-xl md:text-2xl font-bold flex-shrink-0">
          🍽️ MJ
        </h1>

        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base whitespace-nowrap">

          <Link
            to="/"
            className="hover:text-yellow-300 transition"
          >
            Home
          </Link>

          <Link
            to="/menu"
            className="hover:text-yellow-300 transition"
          >
            Menu
          </Link>

          <Link
            to="/reservation"
            className="hover:text-yellow-300 transition"
          >
            Reservation
          </Link>

          <Link
            to="/cart"
            className="hover:text-yellow-300 transition font-semibold"
          >
            🛒 Cart ({cart.length})
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;