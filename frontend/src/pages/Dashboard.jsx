import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import RecentActivity from "../components/RecentActivity";
import QuickActions from "../components/QuickActions";
import SalesChart from "../components/SalesChart";
import ProfileCard from "../components/ProfileCard";

import {
  Building2,
  Users,
  Truck,
  Package,
  ShoppingCart,
  Receipt,
} from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to SmartERP Dashboard</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Total Companies"
          value="1"
          color="bg-blue-600"
          icon={<Building2 size={26} />}
        />

        <DashboardCard
          title="Customers"
          value="0"
          color="bg-green-600"
          icon={<Users size={26} />}
        />

        <DashboardCard
          title="Suppliers"
          value="0"
          color="bg-purple-600"
          icon={<Truck size={26} />}
        />

        <DashboardCard
          title="Stock Items"
          value="0"
          color="bg-orange-500"
          icon={<Package size={26} />}
        />

        <DashboardCard
          title="Sales"
          value="₹0"
          color="bg-red-500"
          icon={<ShoppingCart size={26} />}
        />

        <DashboardCard
          title="Purchases"
          value="₹0"
          color="bg-teal-600"
          icon={<Receipt size={26} />}
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <SalesChart />

        <ProfileCard />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RecentActivity />

        <QuickActions />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
