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
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle } from "lucide-react";
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

interface AddFareBrandDialogProps {
  onAdd: (brand: Omit<FareBrand, "id">) => void;
}

export default function AddFareBrandDialog({ onAdd }: AddFareBrandDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const brand: Omit<FareBrand, "id"> = {
      code: formData.get("code") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      cabinClass: formData.get("cabinClass") as string,
      services: selectedServices,
      active: formData.get("active") === "on",
    };

    onAdd(brand);
    setOpen(false);
    form.reset();
    setSelectedServices([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Fare Brand
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Fare Brand</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Code</Label>
              <Input id="code" name="code" placeholder="BASIC" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Basic Economy"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Basic fare with minimal services"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cabinClass">Cabin Class</Label>
              <Select name="cabinClass" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select cabin class" />
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
              <Switch id="active" name="active" defaultChecked />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Fare Brand
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
