import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

export interface Section {
  id: string;
  name: string;
  type: "business" | "first" | "economy";
  rows: number;
  seatsPerRow: number;
}

interface SectionConfigProps {
  section: Section;
  onUpdate: (section: Section) => void;
  onDelete: (id: string) => void;
}

export default function SectionConfig({
  section,
  onUpdate,
  onDelete,
}: SectionConfigProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-4 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`name-${section.id}`}>Section Name</Label>
              <Input
                id={`name-${section.id}`}
                value={section.name}
                onChange={(e) => onUpdate({ ...section, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`type-${section.id}`}>Class Type</Label>
              <Select
                value={section.type}
                onValueChange={(value: "business" | "first" | "economy") =>
                  onUpdate({ ...section, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">First Class</SelectItem>
                  <SelectItem value="business">Business Class</SelectItem>
                  <SelectItem value="economy">Economy Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`rows-${section.id}`}>Number of Rows</Label>
              <Input
                id={`rows-${section.id}`}
                type="number"
                min={1}
                value={section.rows}
                onChange={(e) =>
                  onUpdate({ ...section, rows: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`seats-${section.id}`}>Seats per Row</Label>
              <Input
                id={`seats-${section.id}`}
                type="number"
                min={1}
                max={10}
                value={section.seatsPerRow}
                onChange={(e) =>
                  onUpdate({
                    ...section,
                    seatsPerRow: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-600"
          onClick={() => onDelete(section.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
