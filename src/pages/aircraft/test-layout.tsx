import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import CabinLayout from "@/components/aircraft/CabinLayout";
import SectionConfig, { Section } from "@/components/aircraft/SectionConfig";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function TestLayoutPage() {
  const [sections, setSections] = React.useState<Section[]>([
    {
      id: "1",
      name: "Business Class",
      type: "business",
      rows: 4,
      seatsPerRow: 4,
    },
    {
      id: "2",
      name: "Economy Class",
      type: "economy",
      rows: 20,
      seatsPerRow: 6,
    },
  ]);

  const handleAddSection = () => {
    const newSection: Section = {
      id: String(sections.length + 1),
      name: "New Section",
      type: "economy",
      rows: 1,
      seatsPerRow: 6,
    };
    setSections([...sections, newSection]);
  };

  const handleUpdateSection = (updatedSection: Section) => {
    setSections(
      sections.map((section) =>
        section.id === updatedSection.id ? updatedSection : section,
      ),
    );
  };

  const handleDeleteSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Test Layout Configurator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card className="p-4 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Section Configuration</h2>
                <Button onClick={handleAddSection} className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Add Section
                </Button>
              </div>
              <div className="space-y-4">
                {sections.map((section) => (
                  <SectionConfig
                    key={section.id}
                    section={section}
                    onUpdate={handleUpdateSection}
                    onDelete={handleDeleteSection}
                  />
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-4 bg-white">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <CabinLayout
              layout={{
                id: "preview",
                name: "Layout Preview",
                cabinClasses: sections.map((section) => ({
                  id: section.id,
                  name: section.name,
                  code:
                    section.type === "business"
                      ? "J"
                      : section.type === "first"
                        ? "F"
                        : "Y",
                  rows: section.rows,
                  seatsPerRow: section.seatsPerRow,
                  seatMap: Array.from(
                    { length: section.rows * section.seatsPerRow },
                    (_, i) => ({
                      id: `${section.id}-${Math.floor(i / section.seatsPerRow) + 1}${String.fromCharCode(
                        65 + (i % section.seatsPerRow),
                      )}`,
                      row: Math.floor(i / section.seatsPerRow) + 1,
                      column: String.fromCharCode(
                        65 + (i % section.seatsPerRow),
                      ),
                      status: "available",
                      type:
                        i % section.seatsPerRow === 0 ||
                        i % section.seatsPerRow === section.seatsPerRow - 1
                          ? "window"
                          : i % section.seatsPerRow === 1 ||
                              i % section.seatsPerRow ===
                                section.seatsPerRow - 2
                            ? "middle"
                            : "aisle",
                    }),
                  ),
                })),
              }}
            />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
