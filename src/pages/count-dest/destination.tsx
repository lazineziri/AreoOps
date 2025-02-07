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
import AddDestinationDialog from "@/components/count-dest/AddDestinationDialog";
import { Destination } from "@/types/destination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DestinationPage() {
  const [destinations, setDestinations] = React.useState<Destination[]>([
    {
      id: "1",
      shortName: "NYC",
      fullName: "New York City",
      countryCode: "US",
      utcZone: "UTC-5",
      longitude: -74.006,
      latitude: 40.7128,
      active: true,
      airports: ["JFK", "LGA", "EWR"],
      daylightSavings: true,
    },
    {
      id: "2",
      shortName: "LON",
      fullName: "London",
      countryCode: "GB",
      utcZone: "UTC+0",
      longitude: -0.1276,
      latitude: 51.5074,
      active: true,
      airports: ["LHR", "LGW", "STN", "LTN", "LCY"],
      daylightSavings: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [editingDestination, setEditingDestination] =
    React.useState<Destination | null>(null);

  const handleAddDestination = (newDestination: Omit<Destination, "id">) => {
    setDestinations([
      ...destinations,
      { ...newDestination, id: String(destinations.length + 1) },
    ]);
  };

  const handleUpdateDestination = (updatedDestination: Destination) => {
    setDestinations(
      destinations.map((dest) =>
        dest.id === updatedDestination.id ? updatedDestination : dest,
      ),
    );
    setEditingDestination(null);
  };

  const handleToggleActive = (id: string) => {
    setDestinations(
      destinations.map((dest) =>
        dest.id === id ? { ...dest, active: !dest.active } : dest,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setDestinations(destinations.filter((dest) => dest.id !== id));
  };

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.countryCode.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Destinations</h1>
          <AddDestinationDialog onAdd={handleAddDestination} />
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search destinations..."
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
                  <TableHead>Short Name</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>UTC Zone</TableHead>
                  <TableHead>Coordinates</TableHead>
                  <TableHead>Airports</TableHead>
                  <TableHead>DST</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDestinations.map((dest) => (
                  <TableRow key={dest.id}>
                    <TableCell className="font-medium">
                      {dest.shortName}
                    </TableCell>
                    <TableCell>{dest.fullName}</TableCell>
                    <TableCell>{dest.countryCode}</TableCell>
                    <TableCell>{dest.utcZone}</TableCell>
                    <TableCell>
                      {dest.latitude.toFixed(4)}, {dest.longitude.toFixed(4)}
                    </TableCell>
                    <TableCell>{dest.airports.join(", ")}</TableCell>
                    <TableCell>
                      <Switch
                        checked={dest.daylightSavings}
                        onCheckedChange={() => {
                          setDestinations(
                            destinations.map((d) =>
                              d.id === dest.id
                                ? { ...d, daylightSavings: !d.daylightSavings }
                                : d,
                            ),
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={dest.active}
                        onCheckedChange={() => handleToggleActive(dest.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingDestination(dest)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(dest.id)}
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

      {editingDestination && (
        <Dialog open={true} onOpenChange={() => setEditingDestination(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Destination</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);

                const updatedDestination: Destination = {
                  ...editingDestination,
                  shortName: formData.get("shortName") as string,
                  fullName: formData.get("fullName") as string,
                  countryCode: formData.get("countryCode") as string,
                  utcZone: formData.get("utcZone") as string,
                  longitude: parseFloat(formData.get("longitude") as string),
                  latitude: parseFloat(formData.get("latitude") as string),
                  airports: (formData.get("airports") as string)
                    .split(",")
                    .map((a) => a.trim()),
                };

                handleUpdateDestination(updatedDestination);
              }}
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Short Name</label>
                  <Input
                    name="shortName"
                    defaultValue={editingDestination.shortName}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    name="fullName"
                    defaultValue={editingDestination.fullName}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Country Code</label>
                  <Input
                    name="countryCode"
                    defaultValue={editingDestination.countryCode}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">UTC Zone</label>
                  <Input
                    name="utcZone"
                    defaultValue={editingDestination.utcZone}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Longitude</label>
                    <Input
                      name="longitude"
                      type="number"
                      step="0.000001"
                      defaultValue={editingDestination.longitude}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Latitude</label>
                    <Input
                      name="latitude"
                      type="number"
                      step="0.000001"
                      defaultValue={editingDestination.latitude}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Airports (comma-separated)
                  </label>
                  <Input
                    name="airports"
                    defaultValue={editingDestination.airports.join(", ")}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Update Destination
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
