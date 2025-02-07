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
import AddServiceTypeDialog from "./AddServiceTypeDialog";

interface ServiceType {
  id: string;
  code: string;
  name: string;
  description: string;
}

export default function ServiceTypes() {
  const [serviceTypes, setServiceTypes] = React.useState<ServiceType[]>([
    {
      id: "1",
      code: "REG",
      name: "Regular",
      description: "Standard scheduled flight service",
    },
    {
      id: "2",
      code: "CHT",
      name: "Charter",
      description: "Private charter flight service",
    },
    {
      id: "3",
      code: "CGO",
      name: "Cargo",
      description: "Cargo transportation service",
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleAddServiceType = (newType: Omit<ServiceType, "id">) => {
    setServiceTypes([
      ...serviceTypes,
      { ...newType, id: String(serviceTypes.length + 1) },
    ]);
  };

  const handleDelete = (id: string) => {
    setServiceTypes(serviceTypes.filter((s) => s.id !== id));
  };

  const filteredTypes = serviceTypes.filter(
    (serviceType) =>
      serviceType.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      serviceType.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search service types..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AddServiceTypeDialog onAdd={handleAddServiceType} />
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
            {filteredTypes.map((serviceType) => (
              <TableRow key={serviceType.id}>
                <TableCell className="font-medium">
                  {serviceType.code}
                </TableCell>
                <TableCell>{serviceType.name}</TableCell>
                <TableCell>{serviceType.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(serviceType.id)}
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
