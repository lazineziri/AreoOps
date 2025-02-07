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

interface EditVoucherDialogProps {
  voucher: Voucher;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (voucher: Voucher) => void;
}

export default function EditVoucherDialog({
  voucher,
  open,
  onOpenChange,
  onUpdate,
}: EditVoucherDialogProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    voucher.applicableServices,
  );
  const [voucherType, setVoucherType] = useState<"percentage" | "fixed">(
    voucher.type,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const updatedVoucher: Voucher = {
      ...voucher,
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
      applicableServices: selectedServices,
      active: formData.get("active") === "on",
    };

    onUpdate(updatedVoucher);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Voucher</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Voucher Code</Label>
              <Input
                id="code"
                name="code"
                defaultValue={voucher.code}
                required
              />
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
                defaultValue={voucher.value}
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
                  defaultValue={voucher.minPurchase}
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
                  defaultValue={voucher.maxDiscount}
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
                  defaultValue={voucher.validFrom.slice(0, 16)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="validTo">Valid To</Label>
                <Input
                  id="validTo"
                  name="validTo"
                  type="datetime-local"
                  defaultValue={voucher.validTo.slice(0, 16)}
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
                defaultValue={voucher.usageLimit}
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
              <Switch
                id="active"
                name="active"
                defaultChecked={voucher.active}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Update Voucher
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
