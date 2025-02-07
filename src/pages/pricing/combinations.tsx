import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";

export default function PricingCombinationsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pricing Combinations</h1>
        </div>
        <Card className="p-6 bg-white">
          <div>Pricing Combinations configuration coming soon...</div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
