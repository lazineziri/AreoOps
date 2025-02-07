import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";

export default function PricingSeatReservationPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Seat Reservation Pricing</h1>
        </div>
        <Card className="p-6 bg-white">
          <div>Seat Reservation Pricing configuration coming soon...</div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
