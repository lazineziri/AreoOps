import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import StatusIndicator from "./StatusIndicator";
import { CalendarDays, Plane, Wrench, Grid } from "lucide-react";
import { mockCabinLayouts } from "@/data/mock-data";
import CabinLayout from "@/components/aircraft/CabinLayout";

interface MaintenanceRecord {
  date: string;
  type: string;
  description: string;
  technician: string;
}

interface AircraftSpecifications {
  manufacturer: string;
  model: string;
  yearBuilt: number;
  capacity: number;
  range: string;
  engineType: string;
}

interface AircraftProfileProps {
  aircraftId?: string;
  registrationNumber?: string;
  specifications?: AircraftSpecifications;
  maintenanceHistory?: MaintenanceRecord[];
  status?: "active" | "maintenance" | "grounded";
}

const defaultSpecs: AircraftSpecifications = {
  manufacturer: "Boeing",
  model: "737-800",
  yearBuilt: 2015,
  capacity: 189,
  range: "5,765 km",
  engineType: "CFM56-7B",
};

const defaultMaintenance: MaintenanceRecord[] = [
  {
    date: "2024-03-15",
    type: "Routine Check",
    description: "Regular maintenance inspection",
    technician: "John Smith",
  },
  {
    date: "2024-02-28",
    type: "Engine Service",
    description: "Engine performance optimization",
    technician: "Sarah Johnson",
  },
];

const AircraftProfile = ({
  aircraftId = "AC001",
  registrationNumber = "N12345",
  specifications = defaultSpecs,
  maintenanceHistory = defaultMaintenance,
  status = "active",
}: AircraftProfileProps) => {
  return (
    <Card className="w-full max-w-[800px] bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">
          Aircraft {registrationNumber}
        </CardTitle>
        <StatusIndicator status={status} />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger
              value="specifications"
              className="flex items-center gap-2"
            >
              <Plane className="h-4 w-4" />
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="maintenance"
              className="flex items-center gap-2"
            >
              <Wrench className="h-4 w-4" />
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="status" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Status
            </TabsTrigger>
            <TabsTrigger value="seats" className="flex items-center gap-2">
              <Grid className="h-4 w-4" />
              Seat Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="specifications">
            <Card>
              <CardContent className="pt-6">
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Manufacturer
                    </dt>
                    <dd className="text-lg">{specifications.manufacturer}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Model</dt>
                    <dd className="text-lg">{specifications.model}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Year Built
                    </dt>
                    <dd className="text-lg">{specifications.yearBuilt}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Capacity
                    </dt>
                    <dd className="text-lg">
                      {specifications.capacity} passengers
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Range</dt>
                    <dd className="text-lg">{specifications.range}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Engine Type
                    </dt>
                    <dd className="text-lg">{specifications.engineType}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <Card>
              <CardContent className="pt-6">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {maintenanceHistory.map((record, index) => (
                      <React.Fragment key={index}>
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{record.type}</h4>
                            <p className="text-sm text-gray-500">
                              {record.description}
                            </p>
                            <p className="text-sm text-gray-500">
                              Technician: {record.technician}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {record.date}
                          </div>
                        </div>
                        {index < maintenanceHistory.length - 1 && <Separator />}
                      </React.Fragment>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Current Status</h4>
                    <StatusIndicator status={status} showTooltip={false} />
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Location</h4>
                    <p className="text-gray-500">Gate A12 - Terminal 2</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">
                      Next Scheduled Maintenance
                    </h4>
                    <p className="text-gray-500">
                      2024-04-15 - Routine Inspection
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seats">
            <Card>
              <CardContent className="pt-6">
                <CabinLayout
                  layout={
                    mockCabinLayouts[
                      specifications.model.toLowerCase().replace(" ", "-")
                    ] || mockCabinLayouts["boeing-737-800"]
                  }
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AircraftProfile;
