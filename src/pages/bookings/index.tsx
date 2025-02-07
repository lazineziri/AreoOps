import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Booking } from "@/types/aviation";

export default function BookingsPage() {
  const [bookings] = React.useState<Booking[]>([
    {
      id: "1",
      flightId: "1",
      passengerId: "P001",
      seatNumber: "12A",
      status: "confirmed",
      price: 299.99,
    },
    {
      id: "2",
      flightId: "1",
      passengerId: "P002",
      seatNumber: "12B",
      status: "confirmed",
      price: 299.99,
    },
  ]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Booking Management</h1>
        </div>
        <Card className="p-4 bg-white">
          <div>Bookings content coming soon...</div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
