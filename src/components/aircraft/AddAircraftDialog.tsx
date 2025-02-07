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
import { Aircraft, AircraftSpecifications } from "@/types/aviation";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface AddAircraftDialogProps {
  onAdd: (aircraft: Omit<Aircraft, "id">) => void;
}

export default function AddAircraftDialog({ onAdd }: AddAircraftDialogProps) {
  const [open, setOpen] = useState(false);
  const [specs, setSpecs] = useState<AircraftSpecifications>({
    manufacturer: "",
    model: "",
    yearBuilt: new Date().getFullYear(),
    capacity: 0,
    range: "",
    engineType: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const aircraft: Omit<Aircraft, "id"> = {
      registration: formData.get("registration") as string,
      model: formData.get("model") as string,
      status: "active",
      location: formData.get("location") as string,
      nextMaintenance: formData.get("nextMaintenance") as string,
      specifications: specs,
    };

    onAdd(aircraft);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Aircraft
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Aircraft</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="registration">Registration Number</Label>
              <Input
                id="registration"
                name="registration"
                placeholder="N12345"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input
                id="manufacturer"
                value={specs.manufacturer}
                onChange={(e) =>
                  setSpecs({ ...specs, manufacturer: e.target.value })
                }
                placeholder="Boeing"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                name="model"
                value={specs.model}
                onChange={(e) => setSpecs({ ...specs, model: e.target.value })}
                placeholder="737-800"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="yearBuilt">Year Built</Label>
              <Input
                id="yearBuilt"
                type="number"
                value={specs.yearBuilt}
                onChange={(e) =>
                  setSpecs({ ...specs, yearBuilt: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={specs.capacity}
                onChange={(e) =>
                  setSpecs({ ...specs, capacity: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="range">Range</Label>
              <Input
                id="range"
                value={specs.range}
                onChange={(e) => setSpecs({ ...specs, range: e.target.value })}
                placeholder="5,765 km"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="engineType">Engine Type</Label>
              <Input
                id="engineType"
                value={specs.engineType}
                onChange={(e) =>
                  setSpecs({ ...specs, engineType: e.target.value })
                }
                placeholder="CFM56-7B"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Current Location</Label>
              <Input id="location" name="location" placeholder="LAX" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nextMaintenance">Next Maintenance Date</Label>
              <Input
                id="nextMaintenance"
                name="nextMaintenance"
                type="date"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Aircraft
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
