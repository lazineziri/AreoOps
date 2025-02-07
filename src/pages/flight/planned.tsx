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
import { Search, Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import AddPlannedFlightDialog from "@/components/flight/AddPlannedFlightDialog";
import FlightInstances from "@/components/flight/FlightInstances";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlannedFlight {
  id: string;
  flightId: string;
  aircraftId: string;
  flightStatus: string;
  operatingAirline: string;
  validFrom: string;
  validTo: string;
  flightFrequency: number;
  departureTimeUtc: string;
  arrivalTimeUtc: string;
  active: boolean;
}

// Mock data for dropdowns
const flights = [
  { id: "FL001", name: "FL001 - JFK-LAX" },
  { id: "FL002", name: "FL002 - LAX-JFK" },
];

const aircraft = [
  { id: "AC001", registration: "N12345" },
  { id: "AC002", registration: "N67890" },
];

const flightStatuses = [
  { code: "SCH", name: "Scheduled" },
  { code: "ACT", name: "Active" },
  { code: "DLY", name: "Delayed" },
];

const operatingAirlines = [
  { code: "AA", name: "American Airlines" },
  { code: "UA", name: "United Airlines" },
];

export default function PlannedFlightPage() {
  const [plannedFlights, setPlannedFlights] = React.useState<PlannedFlight[]>([
    {
      id: "1",
      flightId: "FL001",
      aircraftId: "AC001",
      flightStatus: "SCH",
      operatingAirline: "AA",
      validFrom: "2024-06-01",
      validTo: "2024-08-31",
      flightFrequency: 7,
      departureTimeUtc: "10:00",
      arrivalTimeUtc: "14:00",
      active: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedFlight, setSelectedFlight] =
    React.useState<PlannedFlight | null>(null);
  const [editingFlight, setEditingFlight] =
    React.useState<PlannedFlight | null>(null);

  const handleAddFlight = (flight: Omit<PlannedFlight, "id" | "active">) => {
    setPlannedFlights([
      ...plannedFlights,
      { ...flight, id: String(plannedFlights.length + 1), active: true },
    ]);
  };

  const handleUpdateFlight = (updatedFlight: PlannedFlight) => {
    setPlannedFlights(
      plannedFlights.map((flight) =>
        flight.id === updatedFlight.id ? updatedFlight : flight,
      ),
    );
    setEditingFlight(null);
  };

  const filteredFlights = plannedFlights.filter(
    (flight) =>
      flight.flightId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.aircraftId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Planned Flights</h1>
          <AddPlannedFlightDialog
            onAdd={handleAddFlight}
            flights={flights}
            aircraft={aircraft}
            flightStatuses={flightStatuses}
            operatingAirlines={operatingAirlines}
          />
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search planned flights..."
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
                  <TableHead>Flight</TableHead>
                  <TableHead>Aircraft</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Operating Airline</TableHead>
                  <TableHead>Valid From</TableHead>
                  <TableHead>Valid To</TableHead>
                  <TableHead>Frequency (days)</TableHead>
                  <TableHead>Departure (UTC)</TableHead>
                  <TableHead>Arrival (UTC)</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFlights.map((flight) => (
                  <React.Fragment key={flight.id}>
                    <TableRow
                      className="cursor-pointer"
                      onClick={() =>
                        setSelectedFlight(
                          selectedFlight?.id === flight.id ? null : flight,
                        )
                      }
                    >
                      <TableCell className="font-medium">
                        {flights.find((f) => f.id === flight.flightId)?.name}
                      </TableCell>
                      <TableCell>
                        {
                          aircraft.find((a) => a.id === flight.aircraftId)
                            ?.registration
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
                        {
                          operatingAirlines.find(
                            (a) => a.code === flight.operatingAirline,
                          )?.name
                        }
                      </TableCell>
                      <TableCell>{flight.validFrom}</TableCell>
                      <TableCell>{flight.validTo}</TableCell>
                      <TableCell>{flight.flightFrequency}</TableCell>
                      <TableCell>{flight.departureTimeUtc}</TableCell>
                      <TableCell>{flight.arrivalTimeUtc}</TableCell>
                      <TableCell>
                        <Switch
                          checked={flight.active}
                          onCheckedChange={() => {
                            setPlannedFlights(
                              plannedFlights.map((f) =>
                                f.id === flight.id
                                  ? { ...f, active: !f.active }
                                  : f,
                              ),
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingFlight(flight);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    {selectedFlight?.id === flight.id && (
                      <TableRow>
                        <TableCell colSpan={11} className="bg-gray-50">
                          <FlightInstances plannedFlight={flight} />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {editingFlight && (
          <Dialog open={true} onOpenChange={() => setEditingFlight(null)}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Planned Flight</DialogTitle>
              </DialogHeader>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);

                  const updatedFlight: PlannedFlight = {
                    ...editingFlight,
                    flightId: formData.get("flightId") as string,
                    aircraftId: formData.get("aircraftId") as string,
                    flightStatus: formData.get("flightStatus") as string,
                    operatingAirline: formData.get(
                      "operatingAirline",
                    ) as string,
                    validFrom: formData.get("validFrom") as string,
                    validTo: formData.get("validTo") as string,
                    flightFrequency: parseInt(
                      formData.get("flightFrequency") as string,
                    ),
                    departureTimeUtc: formData.get(
                      "departureTimeUtc",
                    ) as string,
                    arrivalTimeUtc: formData.get("arrivalTimeUtc") as string,
                  };

                  handleUpdateFlight(updatedFlight);
                }}
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="flightId">Flight</Label>
                    <Select
                      name="flightId"
                      defaultValue={editingFlight.flightId}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {flights.map((flight) => (
                          <SelectItem key={flight.id} value={flight.id}>
                            {flight.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="aircraftId">Aircraft</Label>
                    <Select
                      name="aircraftId"
                      defaultValue={editingFlight.aircraftId}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {aircraft.map((ac) => (
                          <SelectItem key={ac.id} value={ac.id}>
                            {ac.registration}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="flightStatus">Flight Status</Label>
                    <Select
                      name="flightStatus"
                      defaultValue={editingFlight.flightStatus}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {flightStatuses.map((status) => (
                          <SelectItem key={status.code} value={status.code}>
                            {status.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="operatingAirline">Operating Airline</Label>
                    <Select
                      name="operatingAirline"
                      defaultValue={editingFlight.operatingAirline}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {operatingAirlines.map((airline) => (
                          <SelectItem key={airline.code} value={airline.code}>
                            {airline.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="validFrom">Valid From</Label>
                      <Input
                        id="validFrom"
                        name="validFrom"
                        type="date"
                        defaultValue={editingFlight.validFrom}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="validTo">Valid To</Label>
                      <Input
                        id="validTo"
                        name="validTo"
                        type="date"
                        defaultValue={editingFlight.validTo}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="flightFrequency">
                      Flight Frequency (days)
                    </Label>
                    <Input
                      id="flightFrequency"
                      name="flightFrequency"
                      type="number"
                      min="1"
                      max="365"
                      defaultValue={editingFlight.flightFrequency}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="departureTimeUtc">
                        Departure Time (UTC)
                      </Label>
                      <Input
                        id="departureTimeUtc"
                        name="departureTimeUtc"
                        type="time"
                        defaultValue={editingFlight.departureTimeUtc}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="arrivalTimeUtc">Arrival Time (UTC)</Label>
                      <Input
                        id="arrivalTimeUtc"
                        name="arrivalTimeUtc"
                        type="time"
                        defaultValue={editingFlight.arrivalTimeUtc}
                        required
                      />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Update Planned Flight
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
}
