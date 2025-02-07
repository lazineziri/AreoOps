import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Flight } from "@/types/aviation";

export default function FlightsPage() {
  const [flights] = React.useState<Flight[]>([
    {
      id: "1",
      flightNumber: "FL001",
      routeId: "1",
      aircraftId: "1",
      departureTime: "2024-04-01T10:00:00Z",
      arrivalTime: "2024-04-01T15:30:00Z",
      status: "scheduled",
    },
    {
      id: "2",
      flightNumber: "FL002",
      routeId: "2",
      aircraftId: "2",
      departureTime: "2024-04-01T12:00:00Z",
      arrivalTime: "2024-04-01T16:15:00Z",
      status: "scheduled",
    },
  ]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Flight Management</h1>
        </div>
        <Card className="p-4 bg-white">
          <div>Flights content coming soon...</div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
