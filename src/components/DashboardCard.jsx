const DashboardCard = ({
  title,
  value,
  color,
  icon,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-6
        shadow-lg
        border
        border-gray-100
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        hover:scale-105
        cursor-pointer
      "
    >
      <div className="flex items-center justify-between mb-5">
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl">
          {icon}
        </div>

        <span className={`text-2xl font-bold ${color}`}>
          {value}
        </span>
      </div>

      <h3 className="text-gray-500 text-sm uppercase tracking-wide">
        {title}
      </h3>
    </div>
  );
};

export default DashboardCard;