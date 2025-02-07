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
import { Airport } from "@/types/airport";

interface AddAirportDialogProps {
  onAdd: (airport: Omit<Airport, "id">) => void;
}

export default function AddAirportDialog({ onAdd }: AddAirportDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const airport: Omit<Airport, "id"> = {
      country: formData.get("country") as string,
      utcZone: formData.get("utcZone") as string,
      airportType: formData.get("airportType") as string,
      ident: formData.get("ident") as string,
      name: formData.get("name") as string,
      iataCode: formData.get("iataCode") as string,
      localCode: formData.get("localCode") as string,
      latitudeDeg: parseFloat(formData.get("latitudeDeg") as string),
      longitudeDeg: parseFloat(formData.get("longitudeDeg") as string),
      elevationFt: parseInt(formData.get("elevationFt") as string),
      municipality: formData.get("municipality") as string,
      scheduledService: formData.get("scheduledService") === "on",
      gpsCode: formData.get("gpsCode") as string,
      homeLink: formData.get("homeLink") as string,
      wikiLink: formData.get("wikiLink") as string,
      keywords: (formData.get("keywords") as string)
        .split(",")
        .map((k) => k.trim()),
      active: formData.get("active") === "on",
      airportProperties: (formData.get("airportProperties") as string)
        .split(",")
        .map((p) => p.trim()),
      airportComConfProperties: (
        formData.get("airportComConfProperties") as string
      )
        .split(",")
        .map((p) => p.trim()),
      daylightSavings: formData.get("daylightSavings") === "on",
    };

    onAdd(airport);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Airport
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Airport</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Airport Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ident">Identifier</Label>
              <Input id="ident" name="ident" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="iataCode">IATA Code</Label>
              <Input id="iataCode" name="iataCode" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="localCode">Local Code</Label>
              <Input id="localCode" name="localCode" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="municipality">Municipality</Label>
              <Input id="municipality" name="municipality" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="utcZone">UTC Zone</Label>
              <Input id="utcZone" name="utcZone" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="airportType">Airport Type</Label>
              <Input id="airportType" name="airportType" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="latitudeDeg">Latitude</Label>
              <Input
                id="latitudeDeg"
                name="latitudeDeg"
                type="number"
                step="0.000001"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="longitudeDeg">Longitude</Label>
              <Input
                id="longitudeDeg"
                name="longitudeDeg"
                type="number"
                step="0.000001"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="elevationFt">Elevation (ft)</Label>
              <Input
                id="elevationFt"
                name="elevationFt"
                type="number"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gpsCode">GPS Code</Label>
              <Input id="gpsCode" name="gpsCode" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="homeLink">Home Link</Label>
              <Input id="homeLink" name="homeLink" type="url" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="wikiLink">Wiki Link</Label>
              <Input id="wikiLink" name="wikiLink" type="url" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input id="keywords" name="keywords" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="airportProperties">
                Properties (comma-separated)
              </Label>
              <Input id="airportProperties" name="airportProperties" />
            </div>
            <div className="grid gap-2 col-span-2">
              <Label htmlFor="airportComConfProperties">
                Communication Properties (comma-separated)
              </Label>
              <Input
                id="airportComConfProperties"
                name="airportComConfProperties"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="scheduledService">Scheduled Service</Label>
              <Switch
                id="scheduledService"
                name="scheduledService"
                defaultChecked
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
            Add Airport
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
