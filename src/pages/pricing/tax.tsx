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
import { Tax } from "@/types/tax";
import AddTaxDialog from "@/components/pricing/AddTaxDialog";
import EditTaxDialog from "@/components/pricing/EditTaxDialog";

// Mock currencies data - in a real app, this would come from your currency module
const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
];

export default function PricingTaxPage() {
  const [taxes, setTaxes] = React.useState<Tax[]>([
    {
      id: "1",
      currencyCode: "USD",
      taxType: "VAT",
      name: "Value Added Tax",
      description: "Standard VAT rate",
      amount: 10.0,
      active: true,
    },
    {
      id: "2",
      currencyCode: "EUR",
      taxType: "GST",
      name: "Goods and Services Tax",
      description: "Standard GST rate",
      amount: 20.0,
      active: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [editingTax, setEditingTax] = React.useState<Tax | null>(null);

  const handleAddTax = (newTax: Omit<Tax, "id">) => {
    setTaxes([...taxes, { ...newTax, id: String(taxes.length + 1) }]);
  };

  const handleUpdateTax = (updatedTax: Tax) => {
    setTaxes(taxes.map((tax) => (tax.id === updatedTax.id ? updatedTax : tax)));
    setEditingTax(null);
  };

  const handleDelete = (id: string) => {
    setTaxes(taxes.filter((tax) => tax.id !== id));
  };

  const filteredTaxes = taxes.filter(
    (tax) =>
      tax.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tax.taxType.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tax Configuration</h1>
          <AddTaxDialog onAdd={handleAddTax} currencies={currencies} />
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search taxes..."
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
                  <TableHead>Tax Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTaxes.map((tax) => (
                  <TableRow key={tax.id}>
                    <TableCell className="font-medium">{tax.taxType}</TableCell>
                    <TableCell>{tax.name}</TableCell>
                    <TableCell>{tax.description}</TableCell>
                    <TableCell>{tax.currencyCode}</TableCell>
                    <TableCell>{tax.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Switch
                        checked={tax.active}
                        onCheckedChange={() => {
                          setTaxes(
                            taxes.map((t) =>
                              t.id === tax.id ? { ...t, active: !t.active } : t,
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
                          onClick={() => setEditingTax(tax)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(tax.id)}
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

        {editingTax && (
          <EditTaxDialog
            tax={editingTax}
            open={true}
            onOpenChange={(open) => !open && setEditingTax(null)}
            onUpdate={handleUpdateTax}
            currencies={currencies}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
