import { Link } from "react-router-dom";

const Navbar = ({ cart }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] w-full bg-red-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-2xl font-bold">
          🍽️ MJ
        </h1>

        <div className="space-x-6">
          <Link to="/">Home</Link>

          <Link to="/menu">Menu</Link>

          <Link to="/reservation">Reservation</Link>

          <Link to="/cart">
            🛒 Cart ({cart.length})
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;