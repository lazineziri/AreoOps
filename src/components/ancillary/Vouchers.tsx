import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Voucher } from "@/types/ancillary";
import AddVoucherDialog from "./AddVoucherDialog";
import EditVoucherDialog from "./EditVoucherDialog";

export default function Vouchers() {
  const [editingVoucher, setEditingVoucher] = React.useState<Voucher | null>(
    null,
  );

  const [vouchers, setVouchers] = React.useState<Voucher[]>([
    {
      id: "1",
      code: "SUMMER2024",
      type: "percentage",
      value: 15,
      minPurchase: 100,
      maxDiscount: 50,
      validFrom: "2024-06-01T00:00:00Z",
      validTo: "2024-08-31T23:59:59Z",
      usageLimit: 1000,
      usageCount: 0,
      applicableServices: ["seat_selection", "baggage"],
      active: true,
    },
    {
      id: "2",
      code: "WELCOME10",
      type: "fixed",
      value: 10,
      validFrom: "2024-01-01T00:00:00Z",
      validTo: "2024-12-31T23:59:59Z",
      usageCount: 150,
      applicableServices: ["all"],
      active: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleAddVoucher = (newVoucher: Omit<Voucher, "id">) => {
    setVouchers([
      ...vouchers,
      { ...newVoucher, id: String(vouchers.length + 1) },
    ]);
  };

  const handleDelete = (id: string) => {
    setVouchers(vouchers.filter((voucher) => voucher.id !== id));
  };

  const filteredVouchers = vouchers.filter(
    (voucher) =>
      voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatValue = (voucher: Voucher) => {
    if (voucher.type === "percentage") {
      return `${voucher.value}%`;
    }
    return `$${voucher.value}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search vouchers..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AddVoucherDialog onAdd={handleAddVoucher} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Validity</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVouchers.map((voucher) => (
              <TableRow key={voucher.id}>
                <TableCell className="font-medium">{voucher.code}</TableCell>
                <TableCell className="capitalize">{voucher.type}</TableCell>
                <TableCell>{formatValue(voucher)}</TableCell>
                <TableCell>
                  {new Date(voucher.validFrom).toLocaleDateString()} -{" "}
                  {new Date(voucher.validTo).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {voucher.usageCount}
                  {voucher.usageLimit ? ` / ${voucher.usageLimit}` : ""}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {voucher.applicableServices.map((service) => (
                      <Badge key={service} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={voucher.active}
                    onCheckedChange={() => {
                      setVouchers(
                        vouchers.map((v) =>
                          v.id === voucher.id ? { ...v, active: !v.active } : v,
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
                      onClick={() => setEditingVoucher(voucher)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(voucher.id)}
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

      {editingVoucher && (
        <EditVoucherDialog
          voucher={editingVoucher}
          open={true}
          onOpenChange={(open) => !open && setEditingVoucher(null)}
          onUpdate={(updatedVoucher) => {
            setVouchers(
              vouchers.map((v) =>
                v.id === updatedVoucher.id ? updatedVoucher : v,
              ),
            );
            setEditingVoucher(null);
          }}
        />
      )}
    </div>
  );
}
