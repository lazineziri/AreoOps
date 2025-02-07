import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { FareBrand } from "@/types/ancillary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AVAILABLE_SERVICES = [
  { id: "carry_on", label: "Carry-on Baggage" },
  { id: "checked_bag", label: "Checked Baggage" },
  { id: "seat_selection", label: "Seat Selection" },
  { id: "meal", label: "Meal Service" },
  { id: "priority_boarding", label: "Priority Boarding" },
  { id: "lounge_access", label: "Lounge Access" },
];

interface EditFareBrandDialogProps {
  brand: FareBrand;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (brand: FareBrand) => void;
}

export default function EditFareBrandDialog({
  brand,
  open,
  onOpenChange,
  onUpdate,
}: EditFareBrandDialogProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    brand.services,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const updatedBrand: FareBrand = {
      ...brand,
      code: formData.get("code") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      cabinClass: formData.get("cabinClass") as string,
      services: selectedServices,
      active: formData.get("active") === "on",
    };

    onUpdate(updatedBrand);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Fare Brand</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Code</Label>
              <Input id="code" name="code" defaultValue={brand.code} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={brand.name} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                defaultValue={brand.description}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cabinClass">Cabin Class</Label>
              <Select
                name="cabinClass"
                defaultValue={brand.cabinClass}
                required
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="F">First Class (F)</SelectItem>
                  <SelectItem value="J">Business Class (J)</SelectItem>
                  <SelectItem value="Y">Economy Class (Y)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Included Services</Label>
              <div className="grid grid-cols-2 gap-4">
                {AVAILABLE_SERVICES.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={(checked) => {
                        setSelectedServices(
                          checked
                            ? [...selectedServices, service.id]
                            : selectedServices.filter(
                                (id) => id !== service.id,
                              ),
                        );
                      }}
                    />
                    <Label htmlFor={service.id}>{service.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Active</Label>
              <Switch id="active" name="active" defaultChecked={brand.active} />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Update Fare Brand
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
