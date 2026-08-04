import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderStatus from "./pages/OrderStatus";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import FoodManagement from "./pages/FoodManagement";

import OrderManagement from "./components/OrderManagement";
import ReservationManagement from "./components/ReservationManagement";

import CreateTables from "./pages/CreateTables";
import TableManagement from "./pages/TableManagement";

import Reservation from "./pages/Reservation";

import KitchenDisplay from "./pages/KitchenDisplay";
import StaffManagement from "./pages/StaffManagement";
import WaiterDashboard from "./pages/WaiterDashboard";
import CashierDashboard from "./pages/CashierDashboard";
import OrderDetails from "./pages/OrderDetails";
import Receipt from "./pages/Receipt";
import SalesDashboard from "./pages/SalesDashboard";
import Inventory from "./pages/Inventory";
import AddInventory from "./pages/AddInventory";
import QRCodeGenerator from "./pages/QRCodeGenerator";




function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <Navbar cart={cart} />

      <div className="pt-20">
        <Routes>

          {/* Customer Routes */}

          <Route
            path="/"
            element={<Home cart={cart} setCart={setCart} />}
          />

          <Route
            path="/menu"
            element={<Menu cart={cart} setCart={setCart} />}
          />

          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />

          <Route
            path="/checkout"
            element={<Checkout cart={cart} setCart={setCart} />}
          />

          <Route
            path="/order-status"
            element={<OrderStatus />}
          />

          <Route
            path="/reservation"
            element={<Reservation />}
          />

          {/* Admin Login */}

          <Route
            path="/admin"
            element={<Navigate to="/admin/login" replace />}
          />

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          {/* Admin Routes */}

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/foods"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <FoodManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <OrderManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/tables"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <TableManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/reservations"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ReservationManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/staff"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <StaffManagement />
              </ProtectedRoute>
            }
          />

          {/* Kitchen */}

          <Route
            path="/kitchen"
            element={
              <ProtectedRoute allowedRoles={["kitchen"]}>
                <KitchenDisplay />
              </ProtectedRoute>
            }
          />

          {/* Waiter */}

          <Route
            path="/waiter"
            element={
              <ProtectedRoute allowedRoles={["waiter"]}>
                <WaiterDashboard />
              </ProtectedRoute>
            }
          />

          {/* Utility */}

          <Route
            path="/create-tables"
            element={<CreateTables />}
          />

          <Route
            path="/cashier"
            element={
              <ProtectedRoute allowedRoles={["cashier"]}>
                <CashierDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/receipt/:id"
            element={<Receipt />}
          />

          <Route
            path="/admin/sales"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <SalesDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/inventory"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Inventory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/inventory/add"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddInventory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/qr-codes"
            element={<QRCodeGenerator />}
          />

          {/* 404 */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </div>
    </>
  );
}

export default App;