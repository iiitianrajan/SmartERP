import React from "react";
import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-white shadow-sm h-16 flex items-center justify-between px-6">

      {/* Left Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          SmartERP
        </h2>
      </div>

      {/* Center Section */}
      <div className="w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        <button className="relative text-xl">
          <Bell/>
        </button>

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <p className="font-semibold">Admin</p>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Navbar;