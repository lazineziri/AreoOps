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
import AddCountryDialog from "@/components/count-dest/AddCountryDialog";
import { Country } from "@/types/country";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CountryPage() {
  const [countries, setCountries] = React.useState<Country[]>([
    {
      id: "1",
      code: "US",
      name: "United States",
      locationCode: "NA",
      currencies: ["USD"],
      active: true,
    },
    {
      id: "2",
      code: "GB",
      name: "United Kingdom",
      locationCode: "EU",
      currencies: ["GBP"],
      active: true,
    },
    {
      id: "3",
      code: "FR",
      name: "France",
      locationCode: "EU",
      currencies: ["EUR"],
      active: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [editingCountry, setEditingCountry] = React.useState<Country | null>(
    null,
  );

  const handleAddCountry = (newCountry: Omit<Country, "id">) => {
    setCountries([
      ...countries,
      { ...newCountry, id: String(countries.length + 1) },
    ]);
  };

  const handleUpdateCountry = (updatedCountry: Country) => {
    setCountries(
      countries.map((country) =>
        country.id === updatedCountry.id ? updatedCountry : country,
      ),
    );
    setEditingCountry(null);
  };

  const handleDelete = (id: string) => {
    setCountries(countries.filter((country) => country.id !== id));
  };

  const filteredCountries = countries.filter(
    (country) =>
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.locationCode.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Countries</h1>
          <AddCountryDialog onAdd={handleAddCountry} />
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search countries..."
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
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location Code</TableHead>
                  <TableHead>Currencies</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCountries.map((country) => (
                  <TableRow key={country.id}>
                    <TableCell className="font-medium">
                      {country.code}
                    </TableCell>
                    <TableCell>{country.name}</TableCell>
                    <TableCell>{country.locationCode}</TableCell>
                    <TableCell>{country.currencies.join(", ")}</TableCell>
                    <TableCell>
                      <Switch
                        checked={country.active}
                        onCheckedChange={() => {
                          setCountries(
                            countries.map((c) =>
                              c.id === country.id
                                ? { ...c, active: !c.active }
                                : c,
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
                          onClick={() => setEditingCountry(country)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(country.id)}
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

      {editingCountry && (
        <Dialog open={true} onOpenChange={() => setEditingCountry(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Country</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);

                const updatedCountry: Country = {
                  ...editingCountry,
                  code: formData.get("code") as string,
                  name: formData.get("name") as string,
                  locationCode: formData.get("locationCode") as string,
                  currencies: (formData.get("currencies") as string)
                    .split(",")
                    .map((c) => c.trim()),
                };

                handleUpdateCountry(updatedCountry);
              }}
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Country Code</label>
                  <Input
                    name="code"
                    defaultValue={editingCountry.code}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    name="name"
                    defaultValue={editingCountry.name}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Location Code</label>
                  <Input
                    name="locationCode"
                    defaultValue={editingCountry.locationCode}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Currencies (comma-separated)
                  </label>
                  <Input
                    name="currencies"
                    defaultValue={editingCountry.currencies.join(", ")}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Update Country
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
