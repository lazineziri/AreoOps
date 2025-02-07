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
import { Country } from "@/types/country";

interface AddCountryDialogProps {
  onAdd: (country: Omit<Country, "id">) => void;
}

export default function AddCountryDialog({ onAdd }: AddCountryDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const country: Omit<Country, "id"> = {
      code: formData.get("code") as string,
      name: formData.get("name") as string,
      locationCode: formData.get("locationCode") as string,
      currencies: (formData.get("currencies") as string)
        .split(",")
        .map((c) => c.trim()),
      active: formData.get("active") === "on",
    };

    onAdd(country);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Country
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Country</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Country Code</Label>
              <Input id="code" name="code" placeholder="US" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="United States"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="locationCode">Location Code</Label>
              <Input
                id="locationCode"
                name="locationCode"
                placeholder="NA"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currencies">Currencies (comma-separated)</Label>
              <Input
                id="currencies"
                name="currencies"
                placeholder="USD"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Active</Label>
              <Switch id="active" name="active" defaultChecked />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Country
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
