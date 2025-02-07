import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import AddAircraftDialog from "@/components/aircraft/AddAircraftDialog";
import { Aircraft } from "@/types/aviation";
import StatusIndicator from "@/components/dashboard/StatusIndicator";

export default function AircraftPage() {
  const [aircraft, setAircraft] = React.useState<Aircraft[]>([
    {
      id: "1",
      registration: "N12345",
      model: "Boeing 737-800",
      status: "active",
      location: "LAX",
      nextMaintenance: "2024-05-15",
      specifications: {
        manufacturer: "Boeing",
        model: "737-800",
        yearBuilt: 2015,
        capacity: 189,
        range: "5,765 km",
        engineType: "CFM56-7B",
      },
    },
    {
      id: "2",
      registration: "N67890",
      model: "Airbus A320",
      status: "maintenance",
      location: "JFK",
      nextMaintenance: "2024-04-01",
      specifications: {
        manufacturer: "Airbus",
        model: "A320",
        yearBuilt: 2018,
        capacity: 150,
        range: "6,150 km",
        engineType: "CFM LEAP-1A",
      },
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleAddAircraft = (newAircraft: Omit<Aircraft, "id">) => {
    setAircraft([
      ...aircraft,
      { ...newAircraft, id: String(aircraft.length + 1) },
    ]);
  };

  const filteredAircraft = aircraft.filter(
    (item) =>
      item.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Aircraft Management</h1>
          <AddAircraftDialog onAdd={handleAddAircraft} />
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search aircraft..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Registration</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Next Maintenance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAircraft.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.registration}
                    </TableCell>
                    <TableCell>{item.specifications?.manufacturer}</TableCell>
                    <TableCell>{item.model}</TableCell>
                    <TableCell>
                      <StatusIndicator status={item.status} />
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.nextMaintenance}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
