import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";

export default function FlightSettingsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Flight Settings</h1>
        </div>
        <Card className="p-4 bg-white">
          <div>Flight Settings content coming soon...</div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
