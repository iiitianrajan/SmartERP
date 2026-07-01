import React from "react";
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  ArrowRightLeft,
  Boxes,
  Calculator,
  Landmark,
  Wallet,
  FileText,
  BarChart3,
  Settings,
  Shield,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Companies",
    icon: <Building2 size={20} />,
  },
  {
    name: "Masters",
    icon: <BookOpen size={20} />,
  },
  {
    name: "Transactions",
    icon: <ArrowRightLeft size={20} />,
  },
  {
    name: "Inventory",
    icon: <Boxes size={20} />,
  },
  {
    name: "Accounting",
    icon: <Calculator size={20} />,
  },
  {
    name: "Banking",
    icon: <Landmark size={20} />,
  },
  {
    name: "Payroll",
    icon: <Wallet size={20} />,
  },
  {
    name: "GST",
    icon: <FileText size={20} />,
  },
  {
    name: "Reports",
    icon: <BarChart3 size={20} />,
  },
  {
    name: "Utilities",
    icon: <Settings size={20} />,
  },
  {
    name: "Administration",
    icon: <Shield size={20} />,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white shadow-lg">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold tracking-wide">
          SmartERP
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Billing & Inventory
        </p>

      </div>

      {/* Menu */}
      <nav className="mt-4">

        {menuItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-4 px-6 py-3 cursor-pointer hover:bg-slate-800 hover:text-blue-400 transition-all duration-200"
          >
            {item.icon}

            <span className="text-sm font-medium">
              {item.name}
            </span>
          </div>
        ))}

      </nav>

    </aside>
  );
};

export default Sidebar;