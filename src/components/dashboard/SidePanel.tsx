import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusIndicator from "./StatusIndicator";
import { Plane, Calendar, AlertCircle } from "lucide-react";

interface FlightAssignment {
  flightNumber: string;
  destination: string;
  departureTime: string;
}

interface SidePanelProps {
  isOpen?: boolean;
  aircraftId?: string;
  onClose?: () => void;
  onStatusUpdate?: (status: string) => void;
  onFlightAssign?: (assignment: FlightAssignment) => void;
}

const SidePanel = ({
  isOpen = true,
  aircraftId = "AC123",
  onClose = () => {},
  onStatusUpdate = () => {},
  onFlightAssign = () => {},
}: SidePanelProps) => {
  const defaultFlightAssignment: FlightAssignment = {
    flightNumber: "",
    destination: "",
    departureTime: "",
  };

  return (
    <div
      className={`fixed right-0 top-0 h-screen w-[300px] bg-white border-l border-gray-200 shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Aircraft {aircraftId}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <AlertCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="status" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="status" className="flex-1">
            <Plane className="h-4 w-4 mr-2" />
            Status
          </TabsTrigger>
          <TabsTrigger value="flight" className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Flight
          </TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="p-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Current Status</Label>
                <StatusIndicator status="active" className="w-full" />
              </div>
              <div className="space-y-2">
                <Label>Update Status</Label>
                <Select onValueChange={onStatusUpdate} defaultValue="active">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="grounded">Grounded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="flight" className="p-4">
          <Card className="p-4">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                onFlightAssign(defaultFlightAssignment);
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="flightNumber">Flight Number</Label>
                <Input id="flightNumber" placeholder="Enter flight number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" placeholder="Enter destination" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="departureTime">Departure Time</Label>
                <Input id="departureTime" type="datetime-local" />
              </div>
              <Button type="submit" className="w-full">
                Assign Flight
              </Button>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SidePanel;
