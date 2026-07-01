const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-5">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <button className="bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700">
          New Company
        </button>

        <button className="bg-green-600 text-white rounded-lg py-3 hover:bg-green-700">
          New Customer
        </button>

        <button className="bg-purple-600 text-white rounded-lg py-3 hover:bg-purple-700">
          New Supplier
        </button>

        <button className="bg-orange-500 text-white rounded-lg py-3 hover:bg-orange-600">
          Reports
        </button>

      </div>

    </div>
  );
};

export default QuickActions;