import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";

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

import { loadCart } from "./services/cartService";

function App() {
  const [cart, setCart] = useState([]);

  // Restore cart automatically from Firestore
  useEffect(() => {
    const restoreCart = async () => {
      const phone = localStorage.getItem("customerPhone");

      if (!phone) return;

      try {
        const savedCart = await loadCart(phone);

        if (savedCart?.items && savedCart.items.length > 0) {
          setCart(savedCart.items);
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error("Failed to restore cart:", error);
      }
    };

    restoreCart();
  }, []);

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

          {/* Admin Layout */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="dashboard"
              element={<AdminDashboard />}
            />

            <Route
              path="foods"
              element={<FoodManagement />}
            />

            <Route
              path="orders"
              element={<OrderManagement />}
            />

            <Route
              path="tables"
              element={<TableManagement />}
            />

            <Route
              path="reservations"
              element={<ReservationManagement />}
            />

            <Route
              path="staff"
              element={<StaffManagement />}
            />

            <Route
              path="sales"
              element={<SalesDashboard />}
            />

            <Route
              path="inventory"
              element={<Inventory />}
            />

            <Route
              path="inventory/add"
              element={<AddInventory />}
            />
          </Route>

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

          {/* Cashier */}

          <Route
            path="/cashier"
            element={
              <ProtectedRoute allowedRoles={["cashier"]}>
                <CashierDashboard />
              </ProtectedRoute>
            }
          />

          {/* Utility */}

          <Route
            path="/create-tables"
            element={<CreateTables />}
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