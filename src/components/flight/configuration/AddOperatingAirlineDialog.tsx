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
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface Airline {
  id: string;
  code: string;
  name: string;
  country: string;
  active: boolean;
}

interface AddOperatingAirlineDialogProps {
  onAdd: (airline: Omit<Airline, "id">) => void;
}

export default function AddOperatingAirlineDialog({
  onAdd,
}: AddOperatingAirlineDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const airline: Omit<Airline, "id"> = {
      code: formData.get("code") as string,
      name: formData.get("name") as string,
      country: formData.get("country") as string,
      active: formData.get("active") === "on",
    };

    onAdd(airline);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Airline
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Operating Airline</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Airline Code</Label>
              <Input id="code" name="code" placeholder="AA" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="American Airlines"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="United States"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Active</Label>
              <Switch id="active" name="active" defaultChecked />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Airline
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
