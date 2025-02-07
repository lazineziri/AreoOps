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
import { Switch } from "@/components/ui/switch";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Destination } from "@/types/destination";

interface AddDestinationDialogProps {
  onAdd: (destination: Omit<Destination, "id">) => void;
}

export default function AddDestinationDialog({
  onAdd,
}: AddDestinationDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const destination: Omit<Destination, "id"> = {
      shortName: formData.get("shortName") as string,
      fullName: formData.get("fullName") as string,
      countryCode: formData.get("countryCode") as string,
      utcZone: formData.get("utcZone") as string,
      longitude: parseFloat(formData.get("longitude") as string),
      latitude: parseFloat(formData.get("latitude") as string),
      active: formData.get("active") === "on",
      airports: (formData.get("airports") as string)
        .split(",")
        .map((a) => a.trim()),
      daylightSavings: formData.get("daylightSavings") === "on",
    };

    onAdd(destination);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Destination
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Destination</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="shortName">Short Name</Label>
              <Input
                id="shortName"
                name="shortName"
                placeholder="NYC"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="New York City"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="countryCode">Country Code</Label>
              <Input
                id="countryCode"
                name="countryCode"
                placeholder="US"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="utcZone">UTC Zone</Label>
              <Input id="utcZone" name="utcZone" placeholder="UTC-5" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="0.000001"
                  placeholder="-74.006"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="0.000001"
                  placeholder="40.7128"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="airports">Airports (comma-separated)</Label>
              <Input
                id="airports"
                name="airports"
                placeholder="JFK, LGA, EWR"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Active</Label>
              <Switch id="active" name="active" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="daylightSavings">Daylight Savings</Label>
              <Switch
                id="daylightSavings"
                name="daylightSavings"
                defaultChecked
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Destination
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
