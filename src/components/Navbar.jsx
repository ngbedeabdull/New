import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ cart }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-red-600 text-white shadow-md">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold"
          onClick={() => setOpen(false)}
        >
          🍽️ MJ
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>

          <Link to="/menu" className="hover:text-yellow-300">
            Menu
          </Link>

          <Link to="/reservation" className="hover:text-yellow-300">
            Reservation
          </Link>

          <Link to="/cart" className="font-semibold hover:text-yellow-300">
            🛒 Cart ({cart.length})
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-red-700 px-4 pb-4">

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block py-3 border-b border-red-500"
          >
            🏠 Home
          </Link>

          <Link
            to="/menu"
            onClick={() => setOpen(false)}
            className="block py-3 border-b border-red-500"
          >
            🍔 Menu
          </Link>

          <Link
            to="/reservation"
            onClick={() => setOpen(false)}
            className="block py-3 border-b border-red-500"
          >
            📅 Reservation
          </Link>

          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="block py-3 font-semibold"
          >
            🛒 Cart ({cart.length})
          </Link>

        </div>
      )}

    </nav>
  );
};

export default Navbar;