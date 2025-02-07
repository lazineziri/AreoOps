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
import AddUtcDialog from "@/components/count-dest/AddUtcDialog";
import { UtcZone } from "@/types/utc";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UtcZonePage() {
  const [utcZones, setUtcZones] = React.useState<UtcZone[]>([
    {
      id: "1",
      abbreviation: "UTC",
      name: "Coordinated Universal Time",
      group: "UTC",
      offsetHours: 0,
      active: true,
    },
    {
      id: "2",
      abbreviation: "GMT",
      name: "Greenwich Mean Time",
      group: "Europe/London",
      offsetHours: 0,
      active: true,
    },
    {
      id: "3",
      abbreviation: "EST",
      name: "Eastern Standard Time",
      group: "America/New_York",
      offsetHours: -5,
      active: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [editingZone, setEditingZone] = React.useState<UtcZone | null>(null);

  const handleAddUtc = (newUtc: Omit<UtcZone, "id">) => {
    setUtcZones([...utcZones, { ...newUtc, id: String(utcZones.length + 1) }]);
  };

  const handleUpdateUtc = (updatedUtc: UtcZone) => {
    setUtcZones(
      utcZones.map((zone) => (zone.id === updatedUtc.id ? updatedUtc : zone)),
    );
    setEditingZone(null);
  };

  const handleDelete = (id: string) => {
    setUtcZones(utcZones.filter((zone) => zone.id !== id));
  };

  const filteredZones = utcZones.filter(
    (zone) =>
      zone.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.group.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">UTC Zones</h1>
          <AddUtcDialog onAdd={handleAddUtc} />
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search UTC zones..."
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
                  <TableHead>Abbreviation</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Offset Hours</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredZones.map((zone) => (
                  <TableRow key={zone.id}>
                    <TableCell className="font-medium">
                      {zone.abbreviation}
                    </TableCell>
                    <TableCell>{zone.name}</TableCell>
                    <TableCell>{zone.group}</TableCell>
                    <TableCell>
                      {zone.offsetHours >= 0 ? "+" : ""}
                      {zone.offsetHours}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={zone.active}
                        onCheckedChange={() => {
                          setUtcZones(
                            utcZones.map((z) =>
                              z.id === zone.id
                                ? { ...z, active: !z.active }
                                : z,
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
                          onClick={() => setEditingZone(zone)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(zone.id)}
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

      {editingZone && (
        <Dialog open={true} onOpenChange={() => setEditingZone(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit UTC Zone</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);

                const updatedZone: UtcZone = {
                  ...editingZone,
                  abbreviation: formData.get("abbreviation") as string,
                  name: formData.get("name") as string,
                  group: formData.get("group") as string,
                  offsetHours: parseFloat(
                    formData.get("offsetHours") as string,
                  ),
                };

                handleUpdateUtc(updatedZone);
              }}
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Abbreviation</label>
                  <Input
                    name="abbreviation"
                    defaultValue={editingZone.abbreviation}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input name="name" defaultValue={editingZone.name} required />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Group</label>
                  <Input
                    name="group"
                    defaultValue={editingZone.group}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Offset Hours</label>
                  <Input
                    name="offsetHours"
                    type="number"
                    step="0.5"
                    defaultValue={editingZone.offsetHours}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Update UTC Zone
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
