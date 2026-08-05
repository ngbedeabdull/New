import { Link } from "react-router-dom";

const Navbar = ({ cart }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-red-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold flex-shrink-0"
        >
          🍽️ MJ
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3 md:gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">

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
            className="font-semibold hover:text-yellow-300 transition"
          >
            🛒 Cart ({cart.length})
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;