import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 px-10">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Restaurant */}
        <div>
          <h2 className="text-3xl font-bold text-red-500 mb-5">
            🍽️ MJ Restaurant
          </h2>

          <p className="text-gray-300 leading-7">
            Serving delicious meals made with fresh ingredients.
            Experience fast ordering with our modern QR Code
            restaurant system.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-bold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-red-500">Home</Link></li>
            <li><Link to="/menu" className="hover:text-red-500">Menu</Link></li>
            <li><Link to="/about" className="hover:text-red-500">About</Link></li>
            <li><Link to="/contact" className="hover:text-red-500">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-bold mb-5">
            Contact
          </h3>

          <p className="mb-3">📍 Anyigba, Kogi State</p>
          <p className="mb-3">📞 +234 706 063 1377</p>
          <p>📧 your@email.com</p>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-2xl font-bold mb-5">
            Opening Hours
          </h3>

          <p className="mb-2">Mon - Fri: 8AM - 10PM</p>
          <p className="mb-2">Saturday: 9AM - 11PM</p>
          <p>Sunday: 12PM - 9PM</p>
        </div>

      </div>

      <hr className="border-gray-700 my-10" />

      <div className="text-center text-gray-400">
        <p>
          © {new Date().getFullYear()} MJ Restaurant. All Rights Reserved.
        </p>

        <p className="mt-2">
          Designed & Developed by Abdullahi Gideon
        </p>
      </div>

    </footer>
  );
};

export default Footer;