import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    try {
      await signOut(auth);

      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("staffRole");
      localStorage.removeItem("orderId");

      navigate("/admin/login");
    } catch (error) {
      alert(error.message);
    }
  };

  const menu = [
    { title: "Dashboard", icon: "🏠", path: "/admin/dashboard" },
    { title: "Food Menu", icon: "🍔", path: "/admin/foods" },
    { title: "Orders", icon: "🛒", path: "/admin/orders" },
    { title: "Tables", icon: "🍽️", path: "/admin/tables" },
    { title: "Reservations", icon: "📅", path: "/admin/reservations" },
    { title: "Staff", icon: "👥", path: "/admin/staff" },
    { title: "Inventory", icon: "📦", path: "/admin/inventory" },
    { title: "Sales", icon: "📊", path: "/admin/sales" },
    { title: "QR Codes", icon: "📱", path: "/qr-codes" },
    { title: "Kitchen", icon: "👨‍🍳", path: "/kitchen" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      <aside className="w-72 bg-red-600 text-white flex flex-col">

        <div className="p-6 border-b border-red-500">
          <h1 className="text-3xl font-bold">
            🍽️ MJ Restaurant
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">

          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                location.pathname === item.path
                  ? "bg-white text-red-600 font-bold"
                  : "hover:bg-red-700"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}

        </nav>

        <div className="p-4 border-t border-red-500">

          <button
            onClick={logout}
            className="w-full bg-white text-red-600 py-3 rounded-xl font-bold hover:bg-gray-100"
          >
            🚪 Logout
          </button>

        </div>

      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;