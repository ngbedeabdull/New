import { useEffect, useState, useRef, useMemo } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const AdminDashboard = () => {

  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const lastOrderId = useRef(null);
  const lastReservationId = useRef(null);

  // Add notification
  const addNotification = (id, message, type) => {
    setNotifications((prev) =>
      [
        {
          id,
          message,
          type,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ].slice(0, 5)
    );
  };

  // Orders Listener
  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(orderList);

      if (!orderList.length) return;

      const latest = orderList[0];

      if (lastOrderId.current === null) {
        lastOrderId.current = latest.id;
        return;
      }

      if (latest.id !== lastOrderId.current) {
        lastOrderId.current = latest.id;

        addNotification(
          latest.id,
          `🍔 New Order from ${latest.customerName}`,
          "order"
        );
      }
    });

    return () => unsubscribe();
  }, []);

  // Reservations Listener
  useEffect(() => {
    const q = query(
      collection(db, "reservations"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reservationList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReservations(reservationList);

      if (!reservationList.length) return;

      const latest = reservationList[0];

      if (lastReservationId.current === null) {
        lastReservationId.current = latest.id;
        return;
      }

      if (latest.id !== lastReservationId.current) {
        lastReservationId.current = latest.id;

        addNotification(
          latest.id,
          `📅 New Reservation from ${latest.customerName}`,
          "reservation"
        );
      }
    });

    return () => unsubscribe();
  }, []);

  // Dashboard Statistics
  const stats = useMemo(() => {
    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
      (o) => o.status === "Pending"
    ).length;

    const preparingOrders = orders.filter(
      (o) => o.status === "Preparing"
    ).length;

    const readyOrders = orders.filter(
      (o) => o.status === "Ready"
    ).length;

    const deliveredOrders = orders.filter(
      (o) => o.status === "Delivered"
    ).length;

    const paidOrders = orders.filter(
      (o) => o.paymentStatus === "Paid"
    ).length;

    const totalRevenue = orders
      .filter((o) => o.paymentStatus === "Paid")
      .reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
      );

    return {
      totalOrders,
      pendingOrders,
      preparingOrders,
      readyOrders,
      deliveredOrders,
      paidOrders,
      totalRevenue,
      totalReservations: reservations.length,
    };
  }, [orders, reservations]);

  const statusColor = {
    Pending: "text-orange-600 font-semibold",
    Preparing: "text-blue-600 font-semibold",
    Ready: "text-green-600 font-semibold",
    Delivered: "text-gray-600 font-semibold",
    Approved: "text-green-600 font-semibold",
    Rejected: "text-red-600 font-semibold",
  };

  return (
    <section className="min-h-screen bg-gray-100">

      <main className="p-2 md:p-6">

        <h2 className="text-4xl font-bold mb-8">
          Dashboard
        </h2>

        {/* Notifications */}

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">

          <h2 className="text-2xl font-bold mb-5">
            🔔 Live Notifications
          </h2>

          {notifications.length === 0 ? (

            <p className="text-gray-500">
              No new notifications.
            </p>

          ) : (

            notifications.map((notification) => (

              <div
                key={notification.id}
                className="border-l-4 border-red-600 bg-gray-50 p-4 rounded-lg mb-3"
              >

                <div className="flex justify-between">

                  <span>{notification.message}</span>

                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>

                </div>

              </div>

            ))

          )}

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-5">

          <div className="bg-white rounded-xl shadow-lg p-5">
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-3xl font-bold">
              {stats.totalOrders}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5">
            <p className="text-gray-500">Pending</p>
            <h2 className="text-3xl font-bold text-orange-600">
              {stats.pendingOrders}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5">
            <p className="text-gray-500">Preparing</p>
            <h2 className="text-3xl font-bold text-blue-600">
              {stats.preparingOrders}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5">
            <p className="text-gray-500">Ready</p>
            <h2 className="text-3xl font-bold text-green-600">
              {stats.readyOrders}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5">
            <p className="text-gray-500">Delivered</p>
            <h2 className="text-3xl font-bold text-gray-700">
              {stats.deliveredOrders}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5">
            <p className="text-gray-500">Paid</p>
            <h2 className="text-3xl font-bold text-emerald-600">
              {stats.paidOrders}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5">
            <p className="text-gray-500">Revenue</p>
            <h2 className="text-2xl font-bold text-green-600">
              ₦{stats.totalRevenue.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5">
            <p className="text-gray-500">Reservations</p>
            <h2 className="text-3xl font-bold text-purple-600">
              {stats.totalReservations}
            </h2>
          </div>

        </div>

        {/* Recent Orders */}

        <div className="mt-10 bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            📦 Recent Orders
          </h2>

          {orders.slice(0, 5).map((order) => (

            <div
              key={order.id}
              className="flex justify-between border-b py-4"
            >

              <div>

                <h3 className="font-bold text-lg">
                  👤 {order.customerName || "Walk-in Customer"}
                </h3>

                <p className="text-gray-500">
                  🍽️ Table {order.tableNumber}
                </p>

                <p className="text-gray-500">
                  📞 {order.phone}
                </p>

                <div className="mt-2 space-y-1">

                  {order.items?.map((item) => (

                    <p
                      key={item.id}
                      className="text-sm text-gray-600"
                    >
                      • {item.name} × {item.quantity}
                    </p>

                  ))}

                </div>

              </div>

              <div className="text-right">

                <p className="font-bold text-green-600 text-xl">
                  ₦{Number(order.total || 0).toLocaleString()}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  💳 {order.paymentStatus}
                </p>

                <p className="text-sm text-gray-500">
                  {order.paymentMethod || "Not Paid"}
                </p>

                <span className={statusColor[order.status]}>
                  {order.status}
                </span>

              </div>

            </div>

          ))}

        </div>

        {/* Recent Reservations */}

        <div className="mt-10 bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            📅 Recent Reservations
          </h2>

          {reservations.slice(0, 5).map((reservation) => (

            <div
              key={reservation.id}
              className="flex justify-between border-b py-4"
            >

              <div>

                <h3 className="font-bold">
                  {reservation.customerName}
                </h3>

                <p className="text-gray-500">
                  {reservation.date} • {reservation.time}
                </p>

                <p className="text-gray-500">
                  🍽️ Table {reservation.tableNumber || "Not Selected"}
                </p>

              </div>

              <div className="text-right">

                <p className="font-semibold">
                  👥 {reservation.guests} Guest(s)
                </p>

                <span className={statusColor[reservation.status]}>
                  {reservation.status}
                </span>

              </div>

            </div>

          ))}

        </div>

      </main>

    </section>
  );
};

export default AdminDashboard;