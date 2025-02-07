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
import { Flight } from "@/types/flight";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddFlightDialogProps {
  onAdd: (flight: Omit<Flight, "id">) => void;
  routes: Array<{ id: string; name: string }>;
  serviceTypes: Array<{ code: string; name: string }>;
  flightStatuses: Array<{ code: string; name: string }>;
}

export default function AddFlightDialog({
  onAdd,
  routes,
  serviceTypes,
  flightStatuses,
}: AddFlightDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const flight: Omit<Flight, "id"> = {
      route: formData.get("route") as string,
      serviceTypeCode: formData.get("serviceTypeCode") as string,
      flightStatus: formData.get("flightStatus") as string,
      flightCode: formData.get("flightCode") as string,
      flightIdent: formData.get("flightIdent") as string,
      flightNumber: formData.get("flightNumber") as string,
      active: true,
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
          Add Flight
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Flight</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="route">Route</Label>
              <Select name="route" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select route" />
                </SelectTrigger>
                <SelectContent>
                  {routes.map((route) => (
                    <SelectItem key={route.id} value={route.id}>
                      {route.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="serviceTypeCode">Service Type</Label>
              <Select name="serviceTypeCode" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((type) => (
                    <SelectItem key={type.code} value={type.code}>
                      {type.name}
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
              <Label htmlFor="flightCode">Flight Code</Label>
              <Input
                id="flightCode"
                name="flightCode"
                placeholder="AA"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="flightIdent">Flight Ident</Label>
              <Input
                id="flightIdent"
                name="flightIdent"
                placeholder="AA123"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="flightNumber">Flight Number</Label>
              <Input
                id="flightNumber"
                name="flightNumber"
                placeholder="123"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Flight
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
