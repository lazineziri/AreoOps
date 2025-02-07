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
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface AddLayoutDialogProps {
  onAdd: (layout: {
    name: string;
    description: string;
    layoutCode: string;
  }) => void;
}

export default function AddLayoutDialog({ onAdd }: AddLayoutDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const layout = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      layoutCode: formData.get("layoutCode") as string,
    };

    onAdd(layout);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Layout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Aircraft Layout</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Layout Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Boeing 737-800 Standard"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Standard layout for Boeing 737-800"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="layoutCode">Layout Code</Label>
              <Input
                id="layoutCode"
                name="layoutCode"
                placeholder="B738-STD"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Layout
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
