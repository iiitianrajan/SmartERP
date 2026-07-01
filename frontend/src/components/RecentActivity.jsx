const activities = [
  {
    id: 1,
    title: "Company Created",
    description: "ABC Traders was added.",
    time: "10 mins ago",
  },
  {
    id: 2,
    title: "User Login",
    description: "Admin logged into SmartERP.",
    time: "30 mins ago",
  },
  {
    id: 3,
    title: "Database Connected",
    description: "PostgreSQL connection established.",
    time: "Today",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-5">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((activity) => (

          <div
            key={activity.id}
            className="border-b pb-4 last:border-none"
          >

            <h3 className="font-semibold">
              {activity.title}
            </h3>

            <p className="text-gray-500 text-sm">
              {activity.description}
            </p>

            <span className="text-xs text-gray-400">
              {activity.time}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentActivity;