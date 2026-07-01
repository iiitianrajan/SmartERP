const DashboardCard = ({
  title,
  value,
  color = "bg-blue-600",
  icon,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">

      <div
        className={`w-12 h-12 rounded-lg ${color} text-white flex items-center justify-center`}
      >
        {icon}
      </div>

      <h3 className="text-gray-500 text-sm mt-4">
        {title}
      </h3>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
};

export default DashboardCard;