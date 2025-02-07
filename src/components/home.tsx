import React from "react";
import { Card } from "@/components/ui/card";
import AircraftGrid from "@/components/dashboard/AircraftGrid";
import AircraftProfile from "@/components/dashboard/AircraftProfile";
import MaintenanceCalendar from "@/components/dashboard/MaintenanceCalendar";
import SidePanel from "@/components/dashboard/SidePanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, Calendar } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Aircraft {
  id: string;
  registration: string;
  model: string;
  status: "active" | "maintenance" | "grounded";
  location: string;
  nextMaintenance: string;
}

const Home = () => {
  const [selectedAircraft, setSelectedAircraft] =
    React.useState<Aircraft | null>(null);
  const [showSidePanel, setShowSidePanel] = React.useState(false);
  const [view, setView] = React.useState<"grid" | "calendar">("grid");

  const handleAircraftSelect = (aircraft: Aircraft) => {
    setSelectedAircraft(aircraft);
    setShowSidePanel(true);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <Card className="p-4 bg-white">
          <Tabs
            value={view}
            onValueChange={(v) => setView(v as "grid" | "calendar")}
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Aircraft Management</h1>
              <TabsList>
                <TabsTrigger value="grid" className="flex items-center gap-2">
                  <Grid className="h-4 w-4" />
                  Grid View
                </TabsTrigger>
                <TabsTrigger
                  value="calendar"
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Calendar View
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="space-y-6">
              <AircraftGrid onAircraftSelect={handleAircraftSelect} />
            </TabsContent>

            <TabsContent value="calendar">
              <MaintenanceCalendar
                onEventClick={(event) => {
                  // In a real app, you would fetch the aircraft details based on the event
                  const mockAircraft = {
                    id: event.aircraftId,
                    registration: event.aircraftName,
                    model: "Unknown",
                    status: "maintenance" as const,
                    location: "Unknown",
                    nextMaintenance: event.startDate.toISOString(),
                  };
                  handleAircraftSelect(mockAircraft);
                }}
              />
            </TabsContent>
          </Tabs>
        </Card>

        {selectedAircraft && (
          <AircraftProfile
            aircraftId={selectedAircraft.id}
            registrationNumber={selectedAircraft.registration}
            status={selectedAircraft.status}
          />
        )}
      </div>

      <SidePanel
        isOpen={showSidePanel}
        aircraftId={selectedAircraft?.id}
        onClose={() => setShowSidePanel(false)}
        onStatusUpdate={(status) => {
          if (selectedAircraft) {
            setSelectedAircraft({
              ...selectedAircraft,
              status: status as "active" | "maintenance" | "grounded",
            });
          }
        }}
      />
    </DashboardLayout>
  );
};

export default Home;
