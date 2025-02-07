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
import { Service } from "@/types/ancillary";
import AddServiceDialog from "./AddServiceDialog";

import EditServiceDialog from "./EditServiceDialog";

export default function Services() {
  const [editingService, setEditingService] = React.useState<Service | null>(
    null,
  );

  const [services, setServices] = React.useState<Service[]>([
    {
      id: "1",
      code: "CARRY_ON",
      name: "Carry-on Baggage",
      description: "One carry-on bag up to 7kg",
      category: "flight",
      price: 0,
      currencyCode: "USD",
      active: true,
    },
    {
      id: "2",
      code: "CHECKED_BAG",
      name: "Checked Baggage",
      description: "One checked bag up to 23kg",
      category: "flight",
      price: 30,
      currencyCode: "USD",
      active: true,
    },
    {
      id: "3",
      code: "SEAT_SELECTION",
      name: "Seat Selection",
      description: "Advanced seat selection",
      category: "reservation",
      price: 15,
      currencyCode: "USD",
      active: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleAddService = (newService: Omit<Service, "id">) => {
    setServices([
      ...services,
      { ...newService, id: String(services.length + 1) },
    ]);
  };

  const handleDelete = (id: string) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const filteredServices = services.filter(
    (service) =>
      service.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search services..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AddServiceDialog onAdd={handleAddService} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.code}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      service.category === "flight" ? "default" : "secondary"
                    }
                  >
                    {service.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  {service.price === 0
                    ? "Free"
                    : `${service.price} ${service.currencyCode}`}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={service.active}
                    onCheckedChange={() => {
                      setServices(
                        services.map((s) =>
                          s.id === service.id ? { ...s, active: !s.active } : s,
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
                      onClick={() => setEditingService(service)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(service.id)}
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

      {editingService && (
        <EditServiceDialog
          service={editingService}
          open={true}
          onOpenChange={(open) => !open && setEditingService(null)}
          onUpdate={(updatedService) => {
            setServices(
              services.map((s) =>
                s.id === updatedService.id ? updatedService : s,
              ),
            );
            setEditingService(null);
          }}
        />
      )}
    </div>
  );
}
