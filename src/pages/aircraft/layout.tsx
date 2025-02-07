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
import { Search } from "lucide-react";
import AddLayoutDialog from "@/components/aircraft/AddLayoutDialog";

interface AircraftLayout {
  id: string;
  name: string;
  description: string;
  layoutCode: string;
  sections: number;
  lastModified: string;
}

export default function AircraftLayoutPage() {
  const [layouts, setLayouts] = React.useState<AircraftLayout[]>([
    {
      id: "1",
      name: "Boeing 737-800 Standard",
      description: "Standard layout for Boeing 737-800",
      layoutCode: "B738-STD",
      sections: 3,
      lastModified: "2024-03-28",
    },
    {
      id: "2",
      name: "Airbus A320 Premium",
      description: "Premium configuration for A320",
      layoutCode: "A320-PRM",
      sections: 2,
      lastModified: "2024-03-27",
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleAddLayout = (layout: {
    name: string;
    description: string;
    layoutCode: string;
  }) => {
    const newLayout: AircraftLayout = {
      ...layout,
      id: String(layouts.length + 1),
      sections: 0,
      lastModified: new Date().toISOString().split("T")[0],
    };
    setLayouts([...layouts, newLayout]);
  };

  const filteredLayouts = layouts.filter(
    (layout) =>
      layout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      layout.layoutCode.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Aircraft Layout</h1>
          <AddLayoutDialog onAdd={handleAddLayout} />
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search layouts..."
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
                  <TableHead>Layout Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Sections</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLayouts.map((layout) => (
                  <TableRow key={layout.id}>
                    <TableCell className="font-medium">{layout.name}</TableCell>
                    <TableCell>{layout.layoutCode}</TableCell>
                    <TableCell>{layout.description}</TableCell>
                    <TableCell>{layout.sections}</TableCell>
                    <TableCell>{layout.lastModified}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
