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
import { Badge } from "@/components/ui/badge";
import { PricingClass } from "@/types/pricing";

export default function PricingClassesPage() {
  const [classes, setClasses] = React.useState<PricingClass[]>([
    {
      id: "1",
      cabinClass: "Y",
      basePrice: 299.99,
      currencyCode: "USD",
      fareBrandModifiers: [
        {
          fareBrandId: "1",
          fareBrandName: "Basic",
          modifierType: "percentage",
          value: -10,
        },
        {
          fareBrandId: "2",
          fareBrandName: "Flex",
          modifierType: "percentage",
          value: 15,
        },
      ],
      ancillaryModifiers: [
        {
          ancillaryId: "1",
          ancillaryName: "Extra Baggage",
          modifierType: "fixed",
          value: 30,
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredClasses = classes.filter((cls) =>
    cls.cabinClass.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatModifier = (type: "percentage" | "fixed", value: number) => {
    if (type === "percentage") {
      return `${value > 0 ? "+" : ""}${value}%`;
    }
    return `${value > 0 ? "+" : ""}$${Math.abs(value)}`;
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pricing Classes</h1>
          <Button>Add Class</Button>
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search classes..."
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
                  <TableHead>Cabin Class</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead>Fare Brand Modifiers</TableHead>
                  <TableHead>Ancillary Modifiers</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell className="font-medium">
                      {cls.cabinClass}
                    </TableCell>
                    <TableCell>
                      {cls.basePrice} {cls.currencyCode}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {cls.fareBrandModifiers.map((mod) => (
                          <Badge
                            key={mod.fareBrandId}
                            variant={mod.value >= 0 ? "default" : "destructive"}
                          >
                            {mod.fareBrandName}:{" "}
                            {formatModifier(mod.modifierType, mod.value)}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {cls.ancillaryModifiers.map((mod) => (
                          <Badge
                            key={mod.ancillaryId}
                            variant={mod.value >= 0 ? "default" : "destructive"}
                          >
                            {mod.ancillaryName}:{" "}
                            {formatModifier(mod.modifierType, mod.value)}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
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
    </DashboardLayout>
  );
}
