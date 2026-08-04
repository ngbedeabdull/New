import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import DashboardCard from "../components/DashboardCard";
import PaymentChart from "../components/PaymentChart";
import SalesChart from "../components/SalesChart";

const SalesDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Live Paid Orders
  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      orderBy("paidAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const orderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(
          orderList.filter(
            (order) => order.paymentStatus === "Paid"
          )
        );

        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const today = new Date();

  // Convert Firestore Timestamp safely
  const convertDate = (date) => {
    if (!date) return null;

    return typeof date?.toDate === "function"
      ? date.toDate()
      : new Date(date);
  };

  // Today
  const isToday = (date) => {
    const d = convertDate(date);

    if (!d) return false;

    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  // This Week
  const isThisWeek = (date) => {
    const d = convertDate(date);

    if (!d) return false;

    // First day of the current week (Sunday)
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    firstDayOfWeek.setHours(0, 0, 0, 0);

    // Last day is today
    const lastDayOfWeek = new Date(today);
    lastDayOfWeek.setHours(23, 59, 59, 999);

    return d >= firstDayOfWeek && d <= lastDayOfWeek;
  };

  // This Month
  const isThisMonth = (date) => {
    const d = convertDate(date);

    if (!d) return false;

    return (
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  // Dashboard Statistics
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    const todayRevenue = orders
      .filter((order) => isToday(order.paidAt))
      .reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
      );

    const weeklyRevenue = orders
      .filter((order) => isThisWeek(order.paidAt))
      .reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
      );

    const monthlyRevenue = orders
      .filter((order) => isThisMonth(order.paidAt))
      .reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
      );

    const cashRevenue = orders
      .filter((o) => o.paymentMethod === "Cash")
      .reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
      );

    const cardRevenue = orders
      .filter((o) => o.paymentMethod === "Card")
      .reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
      );

    const transferRevenue = orders
      .filter((o) => o.paymentMethod === "Transfer")
      .reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
      );

    const cashCount = orders.filter(
      (o) => o.paymentMethod === "Cash"
    ).length;

    const cardCount = orders.filter(
      (o) => o.paymentMethod === "Card"
    ).length;

    const transferCount = orders.filter(
      (o) => o.paymentMethod === "Transfer"
    ).length;

    const averageSale =
      orders.length > 0
        ? totalRevenue / orders.length
        : 0;

    const totalFoodSold = orders.reduce((sum, order) => {
      const qty =
        order.items?.reduce(
          (total, item) =>
            total + Number(item.quantity || 0),
          0
        ) || 0;

      return sum + qty;
    }, 0);

    const foodMap = {};

    orders.forEach((order) => {
      order.items?.forEach((food) => {
        if (!foodMap[food.name]) {
          foodMap[food.name] = 0;
        }

        foodMap[food.name] += Number(
          food.quantity || 0
        );
      });
    });

    const bestSellingFoods = Object.entries(foodMap)
      .map(([name, quantity]) => ({
        name,
        quantity,
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    return {
      totalRevenue,
      todayRevenue,
      weeklyRevenue,
      monthlyRevenue,
      cashRevenue,
      cardRevenue,
      transferRevenue,
      cashCount,
      cardCount,
      transferCount,
      averageSale,
      totalFoodSold,
      bestSellingFoods,
    };
  }, [orders]);

  const chartData = [
    {
      date: "Today",
      revenue: stats.todayRevenue,
    },
    {
      date: "Week",
      revenue: stats.weeklyRevenue,
    },
    {
      date: "Month",
      revenue: stats.monthlyRevenue,
    },
    {
      date: "Total",
      revenue: stats.totalRevenue,
    },
  ];

  const paymentData = [
    {
      name: "Cash",
      value: stats.cashRevenue,
    },
    {
      name: "Card",
      value: stats.cardRevenue,
    },
    {
      name: "Transfer",
      value: stats.transferRevenue,
    },
  ];

  const recentOrders = orders.slice(0, 10);

  return (
    <section className="min-h-screen bg-gray-100 p-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">
            📊 Sales Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor your restaurant performance in real time.
          </p>
        </div>

        <div className="mt-5 md:mt-0">
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            🟢 Live
          </span>
        </div>
      </div>

      {/* Revenue Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <DashboardCard
          title="Total Revenue"
          value={`₦${stats.totalRevenue.toLocaleString()}`}
          color="text-green-600"
          icon="💰"
        />

        <DashboardCard
          title="Today's Sales"
          value={`₦${stats.todayRevenue.toLocaleString()}`}
          color="text-blue-600"
          icon="📅"
        />

        <DashboardCard
          title="Weekly Sales"
          value={`₦${stats.weeklyRevenue.toLocaleString()}`}
          color="text-orange-600"
          icon="📈"
        />

        <DashboardCard
          title="Monthly Sales"
          value={`₦${stats.monthlyRevenue.toLocaleString()}`}
          color="text-purple-600"
          icon="🗓️"
        />

      </div>

      {/* Extra Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <DashboardCard
          title="Average Sale"
          value={`₦${stats.averageSale.toLocaleString()}`}
          color="text-indigo-600"
          icon="🧾"
        />

        <DashboardCard
          title="Paid Orders"
          value={orders.length}
          color="text-green-600"
          icon="✅"
        />

        <DashboardCard
          title="Food Sold"
          value={stats.totalFoodSold}
          color="text-red-600"
          icon="🍔"
        />

      </div>

      {/* Payment Breakdown */}

      <div className="mt-10">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">
    💳 Payment Breakdown
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Cash */}
    <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-3xl shadow-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl">

      <h3 className="text-xl font-bold">
        💵 Cash
      </h3>

      <h2 className="text-4xl font-extrabold mt-4 tracking-wide">
        ₦{stats.cashRevenue.toLocaleString()}
      </h2>

      <p className="mt-3 text-green-100 font-medium">
        {stats.cashCount} Payments
      </p>

    </div>

    {/* Card */}
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-3xl shadow-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl">

      <h3 className="text-xl font-bold">
        💳 Card
      </h3>

      <h2 className="text-4xl font-extrabold mt-4 tracking-wide">
        ₦{stats.cardRevenue.toLocaleString()}
      </h2>

      <p className="mt-3 text-blue-100 font-medium">
        {stats.cardCount} Payments
      </p>

    </div>

    {/* Transfer */}
    <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-3xl shadow-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl">

      <h3 className="text-xl font-bold">
        🏦 Transfer
      </h3>

      <h2 className="text-4xl font-extrabold mt-4 tracking-wide">
        ₦{stats.transferRevenue.toLocaleString()}
      </h2>

      <p className="mt-3 text-purple-100 font-medium">
        {stats.transferCount} Payments
      </p>

    </div>

  </div>
</div>

      {/* Best Selling Foods & Recent Paid Orders */}

      <div className="mt-10 grid lg:grid-cols-2 gap-8">

        {/* Best Selling Foods */}

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            🍔 Best Selling Foods
          </h2>

          {stats.bestSellingFoods.length > 0 ? (

            <div className="space-y-4">

              {stats.bestSellingFoods.map((food, index) => (

                <div
                  key={food.name}
                  className="flex justify-between items-center border-b pb-3"
                >

                  <div className="flex items-center gap-4">

                    <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </span>

                    <div>
                      <h3 className="font-semibold">
                        {food.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Rank #{index + 1}
                      </p>
                    </div>

                  </div>

                  <span className="font-bold text-green-600">
                    {food.quantity} Sold
                  </span>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-gray-500">
              No sales yet.
            </p>

          )}

        </div>

        {/* Recent Paid Orders */}

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            🧾 Recent Paid Orders
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">
              Loading sales...
            </p>
          ) : orders.length > 0 ? (

            <div className="space-y-4">

              {recentOrders.map((order) => (

                <div
                  key={order.id}
                  className="flex justify-between items-center border-b pb-4"
                >

                  <div>

                    <h3 className="font-bold">
                      {order.customerName || "Walk-in Customer"}
                    </h3>

                    <p className="text-gray-500">
                      Table {order.tableNumber}
                    </p>

                    <p className="text-sm text-gray-400">
                      {order.paymentMethod}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">

                      {order.paidAt
                        ? (
                          typeof order.paidAt?.toDate === "function"
                            ? order.paidAt.toDate()
                            : new Date(order.paidAt)
                        ).toLocaleString()
                        : "No payment date"}

                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-bold text-green-600">
                      ₦{Number(order.total || 0).toLocaleString()}
                    </p>

                    <span className="text-green-600 font-semibold">
                      Paid
                    </span>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-gray-500">
              No paid orders yet.
            </p>

          )}

        </div>

      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-8">
        <SalesChart data={chartData} />

        <PaymentChart data={paymentData} />
      </div>

      {/* Sales Summary */}

      <div className="mt-10 bg-white rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          📈 Sales Summary
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-gray-100 rounded-xl p-6">

            <p className="text-gray-500">
              Total Paid Orders
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-3">
              {orders.length}
            </h2>

          </div>

          <div className="bg-gray-100 rounded-xl p-6">

            <p className="text-gray-500">
              Best Payment Method
            </p>

            <h2 className="text-2xl font-bold mt-3">

              {stats.cashRevenue >= stats.cardRevenue &&
                stats.cashRevenue >= stats.transferRevenue
                ? "💵 Cash"
                : stats.cardRevenue >= stats.transferRevenue
                  ? "💳 Card"
                  : "🏦 Transfer"}

            </h2>

          </div>

          <div className="bg-gray-100 rounded-xl p-6">

            <p className="text-gray-500">
              Best Selling Food
            </p>

            <h2 className="text-xl font-bold mt-3">

              {stats.bestSellingFoods.length > 0
                ? stats.bestSellingFoods[0].name
                : "No Sales"}

            </h2>

          </div>

          <div className="bg-gray-100 rounded-xl p-6">

            <p className="text-gray-500">
              Average Sale
            </p>

            <h2 className="text-3xl font-bold text-indigo-600 mt-3">
              ₦{stats.averageSale.toLocaleString()}
            </h2>

          </div>

        </div>

      </div>

      {/* Action Buttons */}

      <div className="mt-10 flex flex-wrap gap-4">

        <button
          onClick={() => window.print()}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition"
        >
          🖨️ Print Report
        </button>

        <button
          onClick={() => {
            const headers = [
              "Customer",
              "Table",
              "Amount",
              "Payment Method",
              "Payment Status",
              "Payment Date",
            ];

            const rows = orders.map((order) => [
              order.customerName || "Walk-in Customer",
              order.tableNumber,
              order.total,
              order.paymentMethod,
              order.paymentStatus,
              convertDate(order.paidAt)?.toLocaleString() || "N/A",
            ]);

            const csv = [
              headers.join(","),
              ...rows.map((row) => row.join(",")),
            ].join("\n");

            const blob = new Blob([csv], {
              type: "text/csv",
            });

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = "sales-report.csv";
            link.click();

            URL.revokeObjectURL(url);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
        >
          📥 Export CSV
        </button>

      </div>

      {/* Live Status */}

      <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-4">

        <p className="text-green-700 font-semibold">
          🟢 Live Firestore Sync Active
        </p>

        <p className="text-sm text-green-600 mt-1">
          Sales dashboard updates automatically whenever a payment is completed.
        </p>

      </div>

      {/* Footer */}

      <div className="mt-12 text-center text-gray-500">

        <p className="font-semibold">
          MJ Restaurant Management System
        </p>

        <p className="text-sm mt-2">
          Sales Dashboard • Live Firestore Updates
        </p>

      </div>

    </section>
  );
};

export default SalesDashboard;