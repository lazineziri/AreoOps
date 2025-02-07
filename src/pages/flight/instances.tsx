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
import { Badge } from "@/components/ui/badge";

interface FlightInstance {
  id: string;
  plannedFlightId: string;
  flightNumber: string;
  departureDate: string;
  departureTimeUtc: string;
  arrivalTimeUtc: string;
  status: string;
}

export default function FlightInstancesPage() {
  const [instances, setInstances] = React.useState<FlightInstance[]>([
    {
      id: "1",
      plannedFlightId: "PF001",
      flightNumber: "FL001",
      departureDate: "2024-04-01",
      departureTimeUtc: "10:00",
      arrivalTimeUtc: "14:00",
      status: "scheduled",
    },
    {
      id: "2",
      plannedFlightId: "PF001",
      flightNumber: "FL001",
      departureDate: "2024-04-08",
      departureTimeUtc: "10:00",
      arrivalTimeUtc: "14:00",
      status: "scheduled",
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredInstances = instances.filter(
    (instance) =>
      instance.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instance.departureDate.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Flight Instances</h1>
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search instances..."
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
                  <TableHead>Flight Number</TableHead>
                  <TableHead>Departure Date</TableHead>
                  <TableHead>Departure (UTC)</TableHead>
                  <TableHead>Arrival (UTC)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInstances.map((instance) => (
                  <TableRow key={instance.id}>
                    <TableCell className="font-medium">
                      {instance.flightNumber}
                    </TableCell>
                    <TableCell>{instance.departureDate}</TableCell>
                    <TableCell>{instance.departureTimeUtc}</TableCell>
                    <TableCell>{instance.arrivalTimeUtc}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          instance.status === "scheduled"
                            ? "secondary"
                            : "default"
                        }
                      >
                        {instance.status}
                      </Badge>
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
