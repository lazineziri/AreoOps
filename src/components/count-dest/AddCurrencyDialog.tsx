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
import { Currency } from "@/types/currency";

interface AddCurrencyDialogProps {
  onAdd: (currency: Omit<Currency, "id">) => void;
}

export default function AddCurrencyDialog({ onAdd }: AddCurrencyDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const currency: Omit<Currency, "id"> = {
      code: formData.get("code") as string,
      name: formData.get("name") as string,
      symbol: formData.get("symbol") as string,
      countries: (formData.get("countries") as string)
        .split(",")
        .map((c) => c.trim()),
      exchangeRate: parseFloat(formData.get("exchangeRate") as string),
      active: formData.get("active") === "on",
    };

    onAdd(currency);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Currency
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Currency</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Currency Code</Label>
              <Input id="code" name="code" placeholder="USD" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="US Dollar" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input id="symbol" name="symbol" placeholder="$" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="countries">Countries (comma-separated)</Label>
              <Input
                id="countries"
                name="countries"
                placeholder="US, CA"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="exchangeRate">Exchange Rate (to USD)</Label>
              <Input
                id="exchangeRate"
                name="exchangeRate"
                type="number"
                step="0.0001"
                placeholder="1.0"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Active</Label>
              <Switch id="active" name="active" defaultChecked />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Currency
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
