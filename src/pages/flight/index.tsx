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
import { Search, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import AddFlightDialog from "@/components/flight/AddFlightDialog";

// Mock data for dropdowns
const routes = [
  { id: "1", name: "JFK-LAX" },
  { id: "2", name: "LAX-JFK" },
];

const serviceTypes = [
  { code: "REG", name: "Regular" },
  { code: "CHT", name: "Charter" },
];

const flightStatuses = [
  { code: "SCH", name: "Scheduled" },
  { code: "ACT", name: "Active" },
  { code: "DLY", name: "Delayed" },
];

interface Flight {
  id: string;
  route: string;
  serviceTypeCode: string;
  flightStatus: string;
  flightCode: string;
  flightIdent: string;
  flightNumber: string;
  active: boolean;
}

export default function FlightPage() {
  const [flights, setFlights] = React.useState<Flight[]>([
    {
      id: "1",
      route: "1",
      serviceTypeCode: "REG",
      flightStatus: "SCH",
      flightCode: "AA",
      flightIdent: "AA123",
      flightNumber: "123",
      active: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleAddFlight = (newFlight: Omit<Flight, "id">) => {
    setFlights([...flights, { ...newFlight, id: String(flights.length + 1) }]);
  };

  const handleDelete = (id: string) => {
    setFlights(flights.filter((flight) => flight.id !== id));
  };

  const filteredFlights = flights.filter(
    (flight) =>
      flight.flightCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.flightIdent.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Flight Management</h1>
          <AddFlightDialog
            onAdd={handleAddFlight}
            routes={routes}
            serviceTypes={serviceTypes}
            flightStatuses={flightStatuses}
          />
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search flights..."
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
                  <TableHead>Flight Code</TableHead>
                  <TableHead>Flight Ident</TableHead>
                  <TableHead>Flight Number</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFlights.map((flight) => (
                  <TableRow key={flight.id}>
                    <TableCell className="font-medium">
                      {flight.flightCode}
                    </TableCell>
                    <TableCell>{flight.flightIdent}</TableCell>
                    <TableCell>{flight.flightNumber}</TableCell>
                    <TableCell>
                      {routes.find((r) => r.id === flight.route)?.name}
                    </TableCell>
                    <TableCell>
                      {
                        serviceTypes.find(
                          (t) => t.code === flight.serviceTypeCode,
                        )?.name
                      }
                    </TableCell>
                    <TableCell>
                      {
                        flightStatuses.find(
                          (s) => s.code === flight.flightStatus,
                        )?.name
                      }
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={flight.active}
                        onCheckedChange={() => {
                          setFlights(
                            flights.map((f) =>
                              f.id === flight.id
                                ? { ...f, active: !f.active }
                                : f,
                            ),
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(flight.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
