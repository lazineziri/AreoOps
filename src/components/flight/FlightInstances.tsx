import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, addDays } from "date-fns";

interface FlightInstance {
  id: string;
  plannedFlightId: string;
  flightNumber: string;
  departureDate: string;
  departureTimeUtc: string;
  arrivalTimeUtc: string;
  status: string;
}

interface FlightInstancesProps {
  plannedFlight: {
    id: string;
    flightId: string;
    validFrom: string;
    validTo: string;
    flightFrequency: number;
    departureTimeUtc: string;
    arrivalTimeUtc: string;
  };
}

export default function FlightInstances({
  plannedFlight,
}: FlightInstancesProps) {
  const generateInstances = () => {
    const instances: FlightInstance[] = [];
    const startDate = new Date(plannedFlight.validFrom);
    const endDate = new Date(plannedFlight.validTo);
    let currentDate = startDate;
    let instanceId = 1;

    // Generate instances based on frequency
    while (currentDate <= endDate) {
      // Create one instance per frequency days
      for (let i = 0; i < plannedFlight.flightFrequency; i++) {
        const instanceDate = addDays(currentDate, i);
        if (instanceDate <= endDate) {
          instances.push({
            id: `${plannedFlight.id}-${instanceId}`,
            plannedFlightId: plannedFlight.id,
            flightNumber: plannedFlight.flightId,
            departureDate: format(instanceDate, "yyyy-MM-dd"),
            departureTimeUtc: plannedFlight.departureTimeUtc,
            arrivalTimeUtc: plannedFlight.arrivalTimeUtc,
            status: "scheduled",
          });
          instanceId++;
        }
      }
      // Move to next set of days based on frequency
      currentDate = addDays(currentDate, plannedFlight.flightFrequency);
    }

    return instances;
  };

  const instances = generateInstances();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Flight Instances</h3>
        <Badge variant="secondary">{instances.length} instances</Badge>
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
            {instances.map((instance) => (
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
                      instance.status === "scheduled" ? "secondary" : "default"
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
    </div>
  );
}
