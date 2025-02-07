import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Grid, Activity, Building2, Settings } from "lucide-react";
import Routes from "@/components/flight/configuration/Routes";
import CabinClasses from "@/components/flight/configuration/CabinClasses";
import FlightStatuses from "@/components/flight/configuration/FlightStatuses";
import OperatingAirlines from "@/components/flight/configuration/OperatingAirlines";
import ServiceTypes from "@/components/flight/configuration/ServiceTypes";

export default function FlightConfigurationPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Flight Configuration</h1>
        </div>

        <Card className="p-6 bg-white">
          <Tabs defaultValue="routes" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="routes" className="flex items-center gap-2">
                <Grid className="h-4 w-4" />
                Routes
              </TabsTrigger>
              <TabsTrigger
                value="cabin-classes"
                className="flex items-center gap-2"
              >
                <Plane className="h-4 w-4" />
                Cabin Classes
              </TabsTrigger>
              <TabsTrigger
                value="flight-statuses"
                className="flex items-center gap-2"
              >
                <Activity className="h-4 w-4" />
                Flight Statuses
              </TabsTrigger>
              <TabsTrigger
                value="operating-airlines"
                className="flex items-center gap-2"
              >
                <Building2 className="h-4 w-4" />
                Operating Airlines
              </TabsTrigger>
              <TabsTrigger
                value="service-types"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Service Types
              </TabsTrigger>
            </TabsList>

            <TabsContent value="routes">
              <Routes />
            </TabsContent>

            <TabsContent value="cabin-classes">
              <CabinClasses />
            </TabsContent>

            <TabsContent value="flight-statuses">
              <FlightStatuses />
            </TabsContent>

            <TabsContent value="operating-airlines">
              <OperatingAirlines />
            </TabsContent>

            <TabsContent value="service-types">
              <ServiceTypes />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
}
