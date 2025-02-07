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
import { UtcZone } from "@/types/utc";

interface AddUtcDialogProps {
  onAdd: (utc: Omit<UtcZone, "id">) => void;
}

export default function AddUtcDialog({ onAdd }: AddUtcDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const utc: Omit<UtcZone, "id"> = {
      abbreviation: formData.get("abbreviation") as string,
      name: formData.get("name") as string,
      group: formData.get("group") as string,
      offsetHours: parseFloat(formData.get("offsetHours") as string),
      active: formData.get("active") === "on",
    };

    onAdd(utc);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add UTC Zone
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New UTC Zone</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="abbreviation">Abbreviation</Label>
              <Input
                id="abbreviation"
                name="abbreviation"
                placeholder="UTC"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Coordinated Universal Time"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="group">Group</Label>
              <Input
                id="group"
                name="group"
                placeholder="Europe/London"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="offsetHours">Offset Hours</Label>
              <Input
                id="offsetHours"
                name="offsetHours"
                type="number"
                step="0.5"
                placeholder="0"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Active</Label>
              <Switch id="active" name="active" defaultChecked />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add UTC Zone
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
