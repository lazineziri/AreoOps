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
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Allotment } from "@/types/allotment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface AddAllotmentDialogProps {
  onAdd: (allotment: Omit<Allotment, "id">) => void;
  contracts: Array<{ id: string; name: string }>;
  currencies: Array<{ code: string; name: string }>;
  cabinClasses: Array<{ code: string; name: string }>;
  flights: Array<{ number: string; name: string }>;
}

export default function AddAllotmentDialog({
  onAdd,
  contracts,
  currencies,
  cabinClasses,
  flights,
}: AddAllotmentDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const selectedDays = DAYS_OF_WEEK.map((_, index) => {
      return formData.get(`day-${index}`) === "on" ? index : -1;
    }).filter((day) => day !== -1);

    const allotment: Omit<Allotment, "id"> = {
      name: formData.get("name") as string,
      allotmentType: formData.get("allotmentType") as "FIA" | "POA" | "PRA",
      contractId: formData.get("contractId") as string,
      contractName:
        contracts.find((c) => c.id === formData.get("contractId"))?.name || "",
      ticketingRules: formData.get("ticketingRules") as string,
      currencyCode: formData.get("currencyCode") as string,
      cabinClass: formData.get("cabinClass") as string,
      flightNumber: formData.get("flightNumber") as string,
      description: formData.get("description") as string,
      validFrom: formData.get("validFrom") as string,
      validTo: formData.get("validTo") as string,
      active: formData.get("active") === "on",
      selectedDays,
    };

    onAdd(allotment);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Allotment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Allotment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="allotmentType">Allotment Type</Label>
              <Select name="allotmentType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FIA">Fixed Allotment (FIA)</SelectItem>
                  <SelectItem value="POA">Pool Allotment (POA)</SelectItem>
                  <SelectItem value="PRA">Pro Rata Allotment (PRA)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contractId">Contract</Label>
              <Select name="contractId" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select contract" />
                </SelectTrigger>
                <SelectContent>
                  {contracts.map((contract) => (
                    <SelectItem key={contract.id} value={contract.id}>
                      {contract.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currencyCode">Currency</Label>
              <Select name="currencyCode" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cabinClass">Cabin Class</Label>
              <Select name="cabinClass" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select cabin class" />
                </SelectTrigger>
                <SelectContent>
                  {cabinClasses.map((cabinClass) => (
                    <SelectItem key={cabinClass.code} value={cabinClass.code}>
                      {cabinClass.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="flightNumber">Flight</Label>
              <Select name="flightNumber" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select flight" />
                </SelectTrigger>
                <SelectContent>
                  {flights.map((flight) => (
                    <SelectItem key={flight.number} value={flight.number}>
                      {flight.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label className="mb-2 block">Operating Days</Label>
              <div className="grid grid-cols-7 gap-4">
                {DAYS_OF_WEEK.map((day, index) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox id={`day-${index}`} name={`day-${index}`} />
                    <Label htmlFor={`day-${index}`}>{day.slice(0, 3)}</Label>
                  </div>
                ))}
              </div>
            </div>
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
            <div className="grid gap-2 col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" required />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="active">Active</Label>
              <Switch id="active" name="active" defaultChecked />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Allotment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
