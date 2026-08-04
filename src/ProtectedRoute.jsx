import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isLoggedIn = localStorage.getItem("adminLoggedIn");
  const role = localStorage.getItem("staffRole");

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (role === "kitchen") {
      return <Navigate to="/kitchen" replace />;
    }

    if (role === "waiter") {
      return <Navigate to="/waiter" replace />;
    }

    if (role === "cashier") {
      return <Navigate to="/cashier" replace />;
    }

    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;