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
import { Tax } from "@/types/tax";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditTaxDialogProps {
  tax: Tax;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (tax: Tax) => void;
  currencies: Array<{ code: string; name: string }>;
}

export default function EditTaxDialog({
  tax,
  open,
  onOpenChange,
  onUpdate,
  currencies,
}: EditTaxDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const updatedTax: Tax = {
      ...tax,
      currencyCode: formData.get("currencyCode") as string,
      taxType: formData.get("taxType") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      amount: parseFloat(formData.get("amount") as string),
      active: formData.get("active") === "on",
    };

    onUpdate(updatedTax);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Tax</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="currencyCode">Currency</Label>
              <Select
                name="currencyCode"
                defaultValue={tax.currencyCode}
                required
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.name} ({currency.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taxType">Tax Type</Label>
              <Input
                id="taxType"
                name="taxType"
                defaultValue={tax.taxType}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={tax.name} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                defaultValue={tax.description}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                defaultValue={tax.amount}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Active</Label>
              <Switch id="active" name="active" defaultChecked={tax.active} />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Update Tax
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
