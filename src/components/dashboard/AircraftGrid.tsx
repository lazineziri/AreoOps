import React from "react";
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
import { Card } from "@/components/ui/card";
import { Search, SlidersHorizontal } from "lucide-react";
import StatusIndicator from "./StatusIndicator";

interface Aircraft {
  id: string;
  registration: string;
  model: string;
  status: "active" | "maintenance" | "grounded";
  location: string;
  nextMaintenance: string;
}

interface AircraftGridProps {
  aircraft?: Aircraft[];
  onAircraftSelect?: (aircraft: Aircraft) => void;
}

const defaultAircraft: Aircraft[] = [
  {
    id: "1",
    registration: "N12345",
    model: "Boeing 737-800",
    status: "active",
    location: "LAX",
    nextMaintenance: "2024-05-15",
  },
  {
    id: "2",
    registration: "N67890",
    model: "Airbus A320",
    status: "maintenance",
    location: "JFK",
    nextMaintenance: "2024-04-01",
  },
  {
    id: "3",
    registration: "N11223",
    model: "Boeing 787-9",
    status: "grounded",
    location: "ORD",
    nextMaintenance: "2024-04-10",
  },
];

const AircraftGrid = ({
  aircraft = defaultAircraft,
  onAircraftSelect = () => {},
}: AircraftGridProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredAircraft = aircraft.filter(
    (item) =>
      item.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
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
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Registration</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Next Maintenance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAircraft.map((item) => (
              <TableRow
                key={item.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onAircraftSelect(item)}
              >
                <TableCell className="font-medium">
                  {item.registration}
                </TableCell>
                <TableCell>{item.model}</TableCell>
                <TableCell>
                  <StatusIndicator status={item.status} />
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.nextMaintenance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default AircraftGrid;
