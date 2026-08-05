import { Link } from "react-router-dom";

const Navbar = ({ cart }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-red-600 text-white shadow-md">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex-shrink-0 text-xl md:text-2xl font-bold no-underline hover:text-white"
        >
          🍽️ MJ
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4 md:gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">

          <Link
            to="/"
            className="no-underline hover:text-yellow-300 transition duration-200"
          >
            Home
          </Link>

          <Link
            to="/menu"
            className="no-underline hover:text-yellow-300 transition duration-200"
          >
            Menu
          </Link>

          <Link
            to="/reservation"
            className="no-underline hover:text-yellow-300 transition duration-200"
          >
            Reservation
          </Link>

          <Link
            to="/cart"
            className="no-underline font-semibold hover:text-yellow-300 transition duration-200"
          >
            🛒 Cart ({cart.length})
          </Link>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;