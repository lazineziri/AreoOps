import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import AddAllotmentDialog from "@/components/cuscon/AddAllotmentDialog";
import { Allotment } from "@/types/allotment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function AllotmentPage() {
  const [allotments, setAllotments] = React.useState<Allotment[]>([
    {
      id: "1",
      name: "Summer Special",
      allotmentType: "FIA",
      contractId: "CNT-001",
      contractName: "Summer Contract 2024",
      ticketingRules: "Standard ticketing rules apply",
      currencyCode: "USD",
      cabinClass: "Y",
      flightNumber: "FL001",
      description: "Summer special allotment for economy class",
      validFrom: "2024-06-01T00:00:00Z",
      validTo: "2024-08-31T23:59:59Z",
      active: true,
      selectedDays: [1, 3, 5], // Monday, Wednesday, Friday
    },
  ]);

  // Mock data for dropdowns
  const contracts = [
    { id: "CNT-001", name: "Summer Contract 2024" },
    { id: "CNT-002", name: "Winter Contract 2024" },
  ];

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
  ];

  const cabinClasses = [
    { code: "F", name: "First Class" },
    { code: "J", name: "Business Class" },
    { code: "Y", name: "Economy Class" },
  ];

  const flights = [
    { number: "FL001", name: "FL001 - JFK-LAX" },
    { number: "FL002", name: "FL002 - LAX-JFK" },
  ];

  const [searchTerm, setSearchTerm] = React.useState("");
  const [editingAllotment, setEditingAllotment] =
    React.useState<Allotment | null>(null);

  const handleAddAllotment = (newAllotment: Omit<Allotment, "id">) => {
    setAllotments([
      ...allotments,
      { ...newAllotment, id: String(allotments.length + 1) },
    ]);
  };

  const handleUpdateAllotment = (updatedAllotment: Allotment) => {
    setAllotments(
      allotments.map((allotment) =>
        allotment.id === updatedAllotment.id ? updatedAllotment : allotment,
      ),
    );
    setEditingAllotment(null);
  };

  const handleDelete = (id: string) => {
    setAllotments(allotments.filter((allotment) => allotment.id !== id));
  };

  const filteredAllotments = allotments.filter(
    (allotment) =>
      allotment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      allotment.contractName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      allotment.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatSelectedDays = (days: number[]) => {
    return days.map((day) => DAYS_OF_WEEK[day].slice(0, 3)).join(", ");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Allotments</h1>
          <AddAllotmentDialog
            onAdd={handleAddAllotment}
            contracts={contracts}
            currencies={currencies}
            cabinClasses={cabinClasses}
            flights={flights}
          />
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search allotments..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contract</TableHead>
                  <TableHead>Flight</TableHead>
                  <TableHead>Cabin</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Operating Days</TableHead>
                  <TableHead>Valid From</TableHead>
                  <TableHead>Valid To</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAllotments.map((allotment) => (
                  <TableRow key={allotment.id}>
                    <TableCell className="font-medium">
                      {allotment.name}
                    </TableCell>
                    <TableCell>{allotment.allotmentType}</TableCell>
                    <TableCell>{allotment.contractName}</TableCell>
                    <TableCell>{allotment.flightNumber}</TableCell>
                    <TableCell>{allotment.cabinClass}</TableCell>
                    <TableCell>{allotment.currencyCode}</TableCell>
                    <TableCell>
                      {formatSelectedDays(allotment.selectedDays)}
                    </TableCell>
                    <TableCell>
                      {new Date(allotment.validFrom).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(allotment.validTo).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={allotment.active}
                        onCheckedChange={() => {
                          setAllotments(
                            allotments.map((a) =>
                              a.id === allotment.id
                                ? { ...a, active: !a.active }
                                : a,
                            ),
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingAllotment(allotment)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(allotment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {editingAllotment && (
        <Dialog open={true} onOpenChange={() => setEditingAllotment(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Allotment</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);

                const selectedDays = DAYS_OF_WEEK.map((_, index) => {
                  return formData.get(`day-${index}`) === "on" ? index : -1;
                }).filter((day) => day !== -1);

                const updatedAllotment: Allotment = {
                  ...editingAllotment,
                  name: formData.get("name") as string,
                  allotmentType: formData.get("allotmentType") as
                    | "FIA"
                    | "POA"
                    | "PRA",
                  contractId: formData.get("contractId") as string,
                  contractName:
                    contracts.find((c) => c.id === formData.get("contractId"))
                      ?.name || "",
                  ticketingRules: formData.get("ticketingRules") as string,
                  currencyCode: formData.get("currencyCode") as string,
                  cabinClass: formData.get("cabinClass") as string,
                  flightNumber: formData.get("flightNumber") as string,
                  description: formData.get("description") as string,
                  validFrom: formData.get("validFrom") as string,
                  validTo: formData.get("validTo") as string,
                  selectedDays,
                };

                handleUpdateAllotment(updatedAllotment);
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingAllotment.name}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="allotmentType">Allotment Type</Label>
                  <Select
                    name="allotmentType"
                    defaultValue={editingAllotment.allotmentType}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FIA">Fixed Allotment (FIA)</SelectItem>
                      <SelectItem value="POA">Pool Allotment (POA)</SelectItem>
                      <SelectItem value="PRA">
                        Pro Rata Allotment (PRA)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contractId">Contract</Label>
                  <Select
                    name="contractId"
                    defaultValue={editingAllotment.contractId}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue />
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
                  <Select
                    name="currencyCode"
                    defaultValue={editingAllotment.currencyCode}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue />
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
                  <Select
                    name="cabinClass"
                    defaultValue={editingAllotment.cabinClass}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cabinClasses.map((cabinClass) => (
                        <SelectItem
                          key={cabinClass.code}
                          value={cabinClass.code}
                        >
                          {cabinClass.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="flightNumber">Flight</Label>
                  <Select
                    name="flightNumber"
                    defaultValue={editingAllotment.flightNumber}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue />
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
                        <Checkbox
                          id={`day-${index}`}
                          name={`day-${index}`}
                          defaultChecked={editingAllotment.selectedDays.includes(
                            index,
                          )}
                        />
                        <Label htmlFor={`day-${index}`}>
                          {day.slice(0, 3)}
                        </Label>
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
                    defaultValue={editingAllotment.validFrom.slice(0, 16)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="validTo">Valid To</Label>
                  <Input
                    id="validTo"
                    name="validTo"
                    type="datetime-local"
                    defaultValue={editingAllotment.validTo.slice(0, 16)}
                    required
                  />
                </div>
                <div className="grid gap-2 col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingAllotment.description}
                    required
                  />
                </div>
                <div className="grid gap-2 col-span-2">
                  <Label htmlFor="ticketingRules">
                    Ticketing and Fare Rules
                  </Label>
                  <Textarea
                    id="ticketingRules"
                    name="ticketingRules"
                    defaultValue={editingAllotment.ticketingRules}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Update Allotment
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
