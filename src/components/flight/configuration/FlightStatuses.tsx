import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AddFlightStatusDialog from "./AddFlightStatusDialog";

interface FlightStatus {
  id: string;
  code: string;
  name: string;
  description: string;
  color: "default" | "success" | "warning" | "destructive";
}

export default function FlightStatuses() {
  const [statuses, setStatuses] = React.useState<FlightStatus[]>([
    {
      id: "1",
      code: "SCH",
      name: "Scheduled",
      description: "Flight is scheduled to depart",
      color: "default",
    },
    {
      id: "2",
      code: "ACT",
      name: "Active",
      description: "Flight is currently in progress",
      color: "success",
    },
    {
      id: "3",
      code: "DLY",
      name: "Delayed",
      description: "Flight is delayed",
      color: "warning",
    },
    {
      id: "4",
      code: "CNL",
      name: "Cancelled",
      description: "Flight has been cancelled",
      color: "destructive",
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleAddStatus = (newStatus: Omit<FlightStatus, "id">) => {
    setStatuses([
      ...statuses,
      { ...newStatus, id: String(statuses.length + 1) },
    ]);
  };

  const handleDelete = (id: string) => {
    setStatuses(statuses.filter((s) => s.id !== id));
  };

  const filteredStatuses = statuses.filter(
    (status) =>
      status.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search statuses..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AddFlightStatusDialog onAdd={handleAddStatus} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStatuses.map((status) => (
              <TableRow key={status.id}>
                <TableCell className="font-medium">{status.code}</TableCell>
                <TableCell>{status.name}</TableCell>
                <TableCell>{status.description}</TableCell>
                <TableCell>
                  <Badge variant={status.color}>{status.name}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(status.id)}
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
    </div>
  );
}
