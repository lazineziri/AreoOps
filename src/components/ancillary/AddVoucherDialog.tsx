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
import { Voucher } from "@/types/ancillary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AVAILABLE_SERVICES = [
  { id: "all", label: "All Services" },
  { id: "seat_selection", label: "Seat Selection" },
  { id: "baggage", label: "Baggage" },
  { id: "meal", label: "Meal Service" },
  { id: "lounge", label: "Lounge Access" },
  { id: "priority_boarding", label: "Priority Boarding" },
];

interface AddVoucherDialogProps {
  onAdd: (voucher: Omit<Voucher, "id">) => void;
}

export default function AddVoucherDialog({ onAdd }: AddVoucherDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [voucherType, setVoucherType] = useState<"percentage" | "fixed">(
    "percentage",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const voucher: Omit<Voucher, "id"> = {
      code: formData.get("code") as string,
      type: voucherType,
      value: parseFloat(formData.get("value") as string),
      minPurchase: formData.get("minPurchase")
        ? parseFloat(formData.get("minPurchase") as string)
        : undefined,
      maxDiscount: formData.get("maxDiscount")
        ? parseFloat(formData.get("maxDiscount") as string)
        : undefined,
      validFrom: formData.get("validFrom") as string,
      validTo: formData.get("validTo") as string,
      usageLimit: formData.get("usageLimit")
        ? parseInt(formData.get("usageLimit") as string)
        : undefined,
      usageCount: 0,
      applicableServices: selectedServices,
      active: formData.get("active") === "on",
    };

    onAdd(voucher);
    setOpen(false);
    form.reset();
    setSelectedServices([]);
    setVoucherType("percentage");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Voucher
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Voucher</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Voucher Code</Label>
              <Input id="code" name="code" placeholder="SUMMER2024" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Discount Type</Label>
              <Select
                value={voucherType}
                onValueChange={(value: "percentage" | "fixed") =>
                  setVoucherType(value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="value">
                {voucherType === "percentage"
                  ? "Discount Percentage"
                  : "Discount Amount"}
              </Label>
              <Input
                id="value"
                name="value"
                type="number"
                step={voucherType === "percentage" ? "1" : "0.01"}
                min="0"
                max={voucherType === "percentage" ? "100" : undefined}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="minPurchase">Min Purchase</Label>
                <Input
                  id="minPurchase"
                  name="minPurchase"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxDiscount">Max Discount</Label>
                <Input
                  id="maxDiscount"
                  name="maxDiscount"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="validFrom">Valid From</Label>
                <Input
                  id="validFrom"
                  name="validFrom"
                  type="datetime-local"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="validTo">Valid To</Label>
                <Input
                  id="validTo"
                  name="validTo"
                  type="datetime-local"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="usageLimit">Usage Limit</Label>
              <Input
                id="usageLimit"
                name="usageLimit"
                type="number"
                min="0"
                placeholder="Leave empty for unlimited"
              />
            </div>
            <div className="grid gap-2">
              <Label>Applicable Services</Label>
              <div className="grid grid-cols-2 gap-4">
                {AVAILABLE_SERVICES.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={(checked) => {
                        if (service.id === "all") {
                          setSelectedServices(checked ? ["all"] : []);
                        } else {
                          setSelectedServices(
                            checked
                              ? [
                                  ...selectedServices.filter(
                                    (id) => id !== "all",
                                  ),
                                  service.id,
                                ]
                              : selectedServices.filter(
                                  (id) => id !== service.id,
                                ),
                          );
                        }
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
            Add Voucher
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
