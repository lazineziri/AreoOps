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
import AddCabinClassDialog from "./AddCabinClassDialog";

interface CabinClass {
  id: string;
  code: string;
  name: string;
  description: string;
}

export default function CabinClasses() {
  const [cabinClasses, setCabinClasses] = React.useState<CabinClass[]>([
    {
      id: "1",
      code: "F",
      name: "First Class",
      description: "Premium cabin with maximum comfort",
    },
    {
      id: "2",
      code: "J",
      name: "Business Class",
      description: "Enhanced comfort and service",
    },
    {
      id: "3",
      code: "Y",
      name: "Economy Class",
      description: "Standard seating and service",
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleAddCabinClass = (newClass: Omit<CabinClass, "id">) => {
    setCabinClasses([
      ...cabinClasses,
      { ...newClass, id: String(cabinClasses.length + 1) },
    ]);
  };

  const handleDelete = (id: string) => {
    setCabinClasses(cabinClasses.filter((c) => c.id !== id));
  };

  const filteredClasses = cabinClasses.filter(
    (cabinClass) =>
      cabinClass.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cabinClass.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search cabin classes..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AddCabinClassDialog onAdd={handleAddCabinClass} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClasses.map((cabinClass) => (
              <TableRow key={cabinClass.id}>
                <TableCell className="font-medium">{cabinClass.code}</TableCell>
                <TableCell>{cabinClass.name}</TableCell>
                <TableCell>{cabinClass.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(cabinClass.id)}
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
