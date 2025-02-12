import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { FlightStats } from "./dashboard/stats/FlightStats";
import { SalesStats } from "./dashboard/stats/SalesStats";
import { FlightChart } from "./dashboard/charts/FlightChart";
import { RevenueChart } from "./dashboard/charts/RevenueChart";

const Home = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Flight Statistics */}
        <FlightStats />

        {/* Sales Statistics */}
        <SalesStats />

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-8">
          <FlightChart />
          <RevenueChart />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
