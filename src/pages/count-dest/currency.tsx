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
import AddCurrencyDialog from "@/components/count-dest/AddCurrencyDialog";
import { Currency } from "@/types/currency";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CurrencyPage() {
  const [currencies, setCurrencies] = React.useState<Currency[]>([
    {
      id: "1",
      code: "USD",
      name: "US Dollar",
      symbol: "$",
      countries: ["US", "EC", "SV"],
      exchangeRate: 1.0,
      active: true,
    },
    {
      id: "2",
      code: "EUR",
      name: "Euro",
      symbol: "€",
      countries: ["DE", "FR", "IT", "ES"],
      exchangeRate: 0.92,
      active: true,
    },
    {
      id: "3",
      code: "GBP",
      name: "British Pound",
      symbol: "£",
      countries: ["GB"],
      exchangeRate: 0.79,
      active: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [editingCurrency, setEditingCurrency] = React.useState<Currency | null>(
    null,
  );

  const handleAddCurrency = (newCurrency: Omit<Currency, "id">) => {
    setCurrencies([
      ...currencies,
      { ...newCurrency, id: String(currencies.length + 1) },
    ]);
  };

  const handleUpdateCurrency = (updatedCurrency: Currency) => {
    setCurrencies(
      currencies.map((currency) =>
        currency.id === updatedCurrency.id ? updatedCurrency : currency,
      ),
    );
    setEditingCurrency(null);
  };

  const handleDelete = (id: string) => {
    setCurrencies(currencies.filter((currency) => currency.id !== id));
  };

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Currencies</h1>
          <AddCurrencyDialog onAdd={handleAddCurrency} />
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search currencies..."
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
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Countries</TableHead>
                  <TableHead>Exchange Rate</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCurrencies.map((currency) => (
                  <TableRow key={currency.id}>
                    <TableCell className="font-medium">
                      {currency.code}
                    </TableCell>
                    <TableCell>{currency.name}</TableCell>
                    <TableCell>{currency.symbol}</TableCell>
                    <TableCell>{currency.countries.join(", ")}</TableCell>
                    <TableCell>{currency.exchangeRate.toFixed(4)}</TableCell>
                    <TableCell>
                      <Switch
                        checked={currency.active}
                        onCheckedChange={() => {
                          setCurrencies(
                            currencies.map((c) =>
                              c.id === currency.id
                                ? { ...c, active: !c.active }
                                : c,
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
                          onClick={() => setEditingCurrency(currency)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(currency.id)}
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

      {editingCurrency && (
        <Dialog open={true} onOpenChange={() => setEditingCurrency(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Currency</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);

                const updatedCurrency: Currency = {
                  ...editingCurrency,
                  code: formData.get("code") as string,
                  name: formData.get("name") as string,
                  symbol: formData.get("symbol") as string,
                  countries: (formData.get("countries") as string)
                    .split(",")
                    .map((c) => c.trim()),
                  exchangeRate: parseFloat(
                    formData.get("exchangeRate") as string,
                  ),
                };

                handleUpdateCurrency(updatedCurrency);
              }}
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Currency Code</label>
                  <Input
                    name="code"
                    defaultValue={editingCurrency.code}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    name="name"
                    defaultValue={editingCurrency.name}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Symbol</label>
                  <Input
                    name="symbol"
                    defaultValue={editingCurrency.symbol}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Countries (comma-separated)
                  </label>
                  <Input
                    name="countries"
                    defaultValue={editingCurrency.countries.join(", ")}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Exchange Rate (to USD)
                  </label>
                  <Input
                    name="exchangeRate"
                    type="number"
                    step="0.0001"
                    defaultValue={editingCurrency.exchangeRate}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Update Currency
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
