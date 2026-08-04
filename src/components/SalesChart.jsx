import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const SalesChart = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            📈 Revenue Trend
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Daily, weekly and monthly revenue overview
          </p>
        </div>

        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
          Live
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#e5e7eb"
          />

          <XAxis
            dataKey="date"
            tick={{ fill: "#6b7280", fontSize: 13 }}
          />

          <YAxis
            tick={{ fill: "#6b7280", fontSize: 13 }}
            tickFormatter={(value) => `₦${value}`}
          />

          <Tooltip
            formatter={(value) =>
              `₦${Number(value).toLocaleString()}`
            }
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,.15)",
            }}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#16a34a"
            strokeWidth={4}
            dot={{
              r: 6,
              fill: "#16a34a",
              strokeWidth: 2,
              stroke: "#fff",
            }}
            activeDot={{
              r: 8,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;