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
import { Search, Pencil } from "lucide-react";
import { Route } from "@/types/route";
import AddRouteDialog from "./AddRouteDialog";

export default function Routes() {
  const [routes, setRoutes] = React.useState<Route[]>([
    {
      id: "1",
      origin: "JFK",
      destination: "LAX",
      stops: [],
      distance: "2,475 miles",
      duration: "5h 30m",
    },
    {
      id: "2",
      origin: "PRN",
      destination: "SYD",
      stops: [
        { airport: "IST", order: 1, groundTime: "120" },
        { airport: "SIN", order: 2, groundTime: "90" },
      ],
      distance: "12,345 miles",
      duration: "28h 30m",
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleAddRoute = (newRoute: Omit<Route, "id">) => {
    setRoutes([...routes, { ...newRoute, id: String(routes.length + 1) }]);
  };

  const formatRoute = (route: Route) => {
    if (route.stops.length === 0) {
      return `${route.origin} → ${route.destination}`;
    }

    const stops = route.stops.sort((a, b) => a.order - b.order);
    return `${route.origin} → ${stops
      .map((stop) => stop.airport)
      .join(" → ")} → ${route.destination}`;
  };

  const formatStops = (route: Route) => {
    if (route.stops.length === 0) return "Direct";
    return route.stops
      .sort((a, b) => a.order - b.order)
      .map((stop) => `${stop.airport} (${stop.groundTime}min)`)
      .join(", ");
  };

  const filteredRoutes = routes.filter(
    (route) =>
      route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.stops.some((stop) =>
        stop.airport.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search routes..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AddRouteDialog onAdd={handleAddRoute} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route</TableHead>
              <TableHead>Stops</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoutes.map((route) => (
              <TableRow key={route.id}>
                <TableCell className="font-medium">
                  {formatRoute(route)}
                </TableCell>
                <TableCell>{formatStops(route)}</TableCell>
                <TableCell>{route.distance}</TableCell>
                <TableCell>{route.duration}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
