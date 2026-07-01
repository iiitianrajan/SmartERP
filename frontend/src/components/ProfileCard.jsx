const ProfileCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <div className="flex items-center gap-4">

        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">

          A

        </div>

        <div>

          <h2 className="font-bold text-xl">
            Admin
          </h2>

          <p className="text-gray-500">
            SmartERP Administrator
          </p>

        </div>

      </div>

      <div className="mt-6 space-y-2">

        <p>
          Companies :
          <span className="font-semibold"> 1</span>
        </p>

        <p>
          Role :
          <span className="font-semibold"> Admin</span>
        </p>

        <p>
          Status :
          <span className="text-green-600 font-semibold">
            Active
          </span>
        </p>

      </div>

    </div>
  );
};

export default ProfileCard;