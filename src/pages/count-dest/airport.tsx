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
import AddAirportDialog from "@/components/count-dest/AddAirportDialog";
import { Airport } from "@/types/airport";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AirportPage() {
  const [airports, setAirports] = React.useState<Airport[]>([
    {
      id: "1",
      country: "US",
      utcZone: "UTC-5",
      airportType: "large_airport",
      ident: "KJFK",
      name: "John F Kennedy International Airport",
      iataCode: "JFK",
      localCode: "JFK",
      latitudeDeg: 40.6413,
      longitudeDeg: -73.7781,
      elevationFt: 13,
      municipality: "New York",
      scheduledService: true,
      gpsCode: "KJFK",
      homeLink: "https://www.jfkairport.com",
      wikiLink:
        "https://en.wikipedia.org/wiki/John_F._Kennedy_International_Airport",
      keywords: ["NYC", "New York", "International"],
      active: true,
      airportProperties: ["International", "24/7", "Customs"],
      airportComConfProperties: ["Tower", "Ground", "Approach"],
      daylightSavings: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [editingAirport, setEditingAirport] = React.useState<Airport | null>(
    null,
  );

  const handleAddAirport = (newAirport: Omit<Airport, "id">) => {
    setAirports([
      ...airports,
      { ...newAirport, id: String(airports.length + 1) },
    ]);
  };

  const handleUpdateAirport = (updatedAirport: Airport) => {
    setAirports(
      airports.map((airport) =>
        airport.id === updatedAirport.id ? updatedAirport : airport,
      ),
    );
    setEditingAirport(null);
  };

  const handleDelete = (id: string) => {
    setAirports(airports.filter((airport) => airport.id !== id));
  };

  const filteredAirports = airports.filter(
    (airport) =>
      airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.iataCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.municipality.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Airports</h1>
          <AddAirportDialog onAdd={handleAddAirport} />
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search airports..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border overflow-hidden overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>IATA</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Municipality</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>UTC</TableHead>
                  <TableHead>Coordinates</TableHead>
                  <TableHead>Elevation</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>DST</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAirports.map((airport) => (
                  <TableRow key={airport.id}>
                    <TableCell className="font-medium">
                      {airport.iataCode}
                    </TableCell>
                    <TableCell>{airport.name}</TableCell>
                    <TableCell>{airport.municipality}</TableCell>
                    <TableCell>{airport.country}</TableCell>
                    <TableCell>{airport.airportType}</TableCell>
                    <TableCell>{airport.utcZone}</TableCell>
                    <TableCell>
                      {airport.latitudeDeg.toFixed(4)},{" "}
                      {airport.longitudeDeg.toFixed(4)}
                    </TableCell>
                    <TableCell>{airport.elevationFt} ft</TableCell>
                    <TableCell>
                      <Switch
                        checked={airport.scheduledService}
                        onCheckedChange={() => {
                          setAirports(
                            airports.map((a) =>
                              a.id === airport.id
                                ? {
                                    ...a,
                                    scheduledService: !a.scheduledService,
                                  }
                                : a,
                            ),
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={airport.active}
                        onCheckedChange={() => {
                          setAirports(
                            airports.map((a) =>
                              a.id === airport.id
                                ? { ...a, active: !a.active }
                                : a,
                            ),
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={airport.daylightSavings}
                        onCheckedChange={() => {
                          setAirports(
                            airports.map((a) =>
                              a.id === airport.id
                                ? { ...a, daylightSavings: !a.daylightSavings }
                                : a,
                            ),
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingAirport(airport)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(airport.id)}
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

      {editingAirport && (
        <Dialog open={true} onOpenChange={() => setEditingAirport(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Airport</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);

                const updatedAirport: Airport = {
                  ...editingAirport,
                  name: formData.get("name") as string,
                  ident: formData.get("ident") as string,
                  iataCode: formData.get("iataCode") as string,
                  localCode: formData.get("localCode") as string,
                  country: formData.get("country") as string,
                  municipality: formData.get("municipality") as string,
                  utcZone: formData.get("utcZone") as string,
                  airportType: formData.get("airportType") as string,
                  latitudeDeg: parseFloat(
                    formData.get("latitudeDeg") as string,
                  ),
                  longitudeDeg: parseFloat(
                    formData.get("longitudeDeg") as string,
                  ),
                  elevationFt: parseInt(formData.get("elevationFt") as string),
                  gpsCode: formData.get("gpsCode") as string,
                  homeLink: formData.get("homeLink") as string,
                  wikiLink: formData.get("wikiLink") as string,
                  keywords: (formData.get("keywords") as string)
                    .split(",")
                    .map((k) => k.trim()),
                  airportProperties: (
                    formData.get("airportProperties") as string
                  )
                    .split(",")
                    .map((p) => p.trim()),
                  airportComConfProperties: (
                    formData.get("airportComConfProperties") as string
                  )
                    .split(",")
                    .map((p) => p.trim()),
                };

                handleUpdateAirport(updatedAirport);
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Airport Name</label>
                  <Input
                    name="name"
                    defaultValue={editingAirport.name}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Identifier</label>
                  <Input
                    name="ident"
                    defaultValue={editingAirport.ident}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">IATA Code</label>
                  <Input
                    name="iataCode"
                    defaultValue={editingAirport.iataCode}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Local Code</label>
                  <Input
                    name="localCode"
                    defaultValue={editingAirport.localCode}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Country</label>
                  <Input
                    name="country"
                    defaultValue={editingAirport.country}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Municipality</label>
                  <Input
                    name="municipality"
                    defaultValue={editingAirport.municipality}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">UTC Zone</label>
                  <Input
                    name="utcZone"
                    defaultValue={editingAirport.utcZone}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Airport Type</label>
                  <Input
                    name="airportType"
                    defaultValue={editingAirport.airportType}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Latitude</label>
                  <Input
                    name="latitudeDeg"
                    type="number"
                    step="0.000001"
                    defaultValue={editingAirport.latitudeDeg}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Longitude</label>
                  <Input
                    name="longitudeDeg"
                    type="number"
                    step="0.000001"
                    defaultValue={editingAirport.longitudeDeg}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Elevation (ft)</label>
                  <Input
                    name="elevationFt"
                    type="number"
                    defaultValue={editingAirport.elevationFt}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">GPS Code</label>
                  <Input
                    name="gpsCode"
                    defaultValue={editingAirport.gpsCode}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Home Link</label>
                  <Input
                    name="homeLink"
                    type="url"
                    defaultValue={editingAirport.homeLink}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Wiki Link</label>
                  <Input
                    name="wikiLink"
                    type="url"
                    defaultValue={editingAirport.wikiLink}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Keywords (comma-separated)
                  </label>
                  <Input
                    name="keywords"
                    defaultValue={editingAirport.keywords.join(", ")}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Properties (comma-separated)
                  </label>
                  <Input
                    name="airportProperties"
                    defaultValue={editingAirport.airportProperties.join(", ")}
                  />
                </div>
                <div className="grid gap-2 col-span-2">
                  <label className="text-sm font-medium">
                    Communication Properties (comma-separated)
                  </label>
                  <Input
                    name="airportComConfProperties"
                    defaultValue={editingAirport.airportComConfProperties.join(
                      ", ",
                    )}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Update Airport
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
