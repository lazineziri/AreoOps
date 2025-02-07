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
import { Switch } from "@/components/ui/switch";
import AddOperatingAirlineDialog from "./AddOperatingAirlineDialog";

interface Airline {
  id: string;
  code: string;
  name: string;
  country: string;
  active: boolean;
}

export default function OperatingAirlines() {
  const [airlines, setAirlines] = React.useState<Airline[]>([
    {
      id: "1",
      code: "AA",
      name: "American Airlines",
      country: "United States",
      active: true,
    },
    {
      id: "2",
      code: "BA",
      name: "British Airways",
      country: "United Kingdom",
      active: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleAddAirline = (newAirline: Omit<Airline, "id">) => {
    setAirlines([
      ...airlines,
      { ...newAirline, id: String(airlines.length + 1) },
    ]);
  };

  const handleDelete = (id: string) => {
    setAirlines(airlines.filter((a) => a.id !== id));
  };

  const filteredAirlines = airlines.filter(
    (airline) =>
      airline.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airline.country.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search airlines..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AddOperatingAirlineDialog onAdd={handleAddAirline} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAirlines.map((airline) => (
              <TableRow key={airline.id}>
                <TableCell className="font-medium">{airline.code}</TableCell>
                <TableCell>{airline.name}</TableCell>
                <TableCell>{airline.country}</TableCell>
                <TableCell>
                  <Switch
                    checked={airline.active}
                    onCheckedChange={() => {
                      setAirlines(
                        airlines.map((a) =>
                          a.id === airline.id ? { ...a, active: !a.active } : a,
                        ),
                      );
                    }}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(airline.id)}
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
