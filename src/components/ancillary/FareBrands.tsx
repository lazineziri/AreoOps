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
import { Badge } from "@/components/ui/badge";
import { FareBrand } from "@/types/ancillary";
import AddFareBrandDialog from "./AddFareBrandDialog";

import EditFareBrandDialog from "./EditFareBrandDialog";

export default function FareBrands() {
  const [editingBrand, setEditingBrand] = React.useState<FareBrand | null>(
    null,
  );

  const [fareBrands, setFareBrands] = React.useState<FareBrand[]>([
    {
      id: "1",
      code: "BASIC",
      name: "Basic Economy",
      description: "Basic fare with minimal services",
      cabinClass: "Y",
      services: ["carry_on", "seat_selection"],
      active: true,
    },
    {
      id: "2",
      code: "FLEX",
      name: "Flexible Economy",
      description: "Flexible fare with additional services",
      cabinClass: "Y",
      services: ["carry_on", "checked_bag", "seat_selection", "meal"],
      active: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleAddFareBrand = (newBrand: Omit<FareBrand, "id">) => {
    setFareBrands([
      ...fareBrands,
      { ...newBrand, id: String(fareBrands.length + 1) },
    ]);
  };

  const handleDelete = (id: string) => {
    setFareBrands(fareBrands.filter((brand) => brand.id !== id));
  };

  const filteredBrands = fareBrands.filter(
    (brand) =>
      brand.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search fare brands..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AddFareBrandDialog onAdd={handleAddFareBrand} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Cabin Class</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBrands.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell className="font-medium">{brand.code}</TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>{brand.description}</TableCell>
                <TableCell>{brand.cabinClass}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {brand.services.map((service) => (
                      <Badge key={service} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={brand.active}
                    onCheckedChange={() => {
                      setFareBrands(
                        fareBrands.map((b) =>
                          b.id === brand.id ? { ...b, active: !b.active } : b,
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
                      onClick={() => setEditingBrand(brand)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(brand.id)}
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

      {editingBrand && (
        <EditFareBrandDialog
          brand={editingBrand}
          open={true}
          onOpenChange={(open) => !open && setEditingBrand(null)}
          onUpdate={(updatedBrand) => {
            setFareBrands(
              fareBrands.map((b) =>
                b.id === updatedBrand.id ? updatedBrand : b,
              ),
            );
            setEditingBrand(null);
          }}
        />
      )}
    </div>
  );
}
