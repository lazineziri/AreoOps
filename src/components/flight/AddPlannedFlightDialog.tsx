import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
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

interface AddPlannedFlightDialogProps {
  onAdd: (flight: Omit<PlannedFlight, "id" | "active">) => void;
  flights: Array<{ id: string; name: string }>;
  aircraft: Array<{ id: string; registration: string }>;
  flightStatuses: Array<{ code: string; name: string }>;
  operatingAirlines: Array<{ code: string; name: string }>;
}

export default function AddPlannedFlightDialog({
  onAdd,
  flights,
  aircraft,
  flightStatuses,
  operatingAirlines,
}: AddPlannedFlightDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const flight: Omit<PlannedFlight, "id" | "active"> = {
      flightId: formData.get("flightId") as string,
      aircraftId: formData.get("aircraftId") as string,
      flightStatus: formData.get("flightStatus") as string,
      operatingAirline: formData.get("operatingAirline") as string,
      validFrom: formData.get("validFrom") as string,
      validTo: formData.get("validTo") as string,
      flightFrequency: parseInt(formData.get("flightFrequency") as string),
      departureTimeUtc: formData.get("departureTimeUtc") as string,
      arrivalTimeUtc: formData.get("arrivalTimeUtc") as string,
    };

    onAdd(flight);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Planned Flight
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Planned Flight</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="flightId">Flight</Label>
              <Select name="flightId" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select flight" />
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
              <Select name="aircraftId" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select aircraft" />
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
              <Select name="flightStatus" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
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
              <Select name="operatingAirline" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select airline" />
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
                <Input id="validFrom" name="validFrom" type="date" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="validTo">Valid To</Label>
                <Input id="validTo" name="validTo" type="date" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="flightFrequency">Flight Frequency (days)</Label>
              <Input
                id="flightFrequency"
                name="flightFrequency"
                type="number"
                min="1"
                max="365"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="departureTimeUtc">Departure Time (UTC)</Label>
                <Input
                  id="departureTimeUtc"
                  name="departureTimeUtc"
                  type="time"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="arrivalTimeUtc">Arrival Time (UTC)</Label>
                <Input
                  id="arrivalTimeUtc"
                  name="arrivalTimeUtc"
                  type="time"
                  required
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Planned Flight
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
