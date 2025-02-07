import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";

interface MaintenanceEvent {
  id: string;
  aircraftId: string;
  aircraftName: string;
  type: "scheduled" | "unscheduled";
  startDate: Date;
  endDate: Date;
  description: string;
}

interface MaintenanceCalendarProps {
  events?: MaintenanceEvent[];
  onEventClick?: (event: MaintenanceEvent) => void;
  onDateSelect?: (date: Date) => void;
}

const defaultEvents: MaintenanceEvent[] = [
  {
    id: "1",
    aircraftId: "AC001",
    aircraftName: "Boeing 737-800",
    type: "scheduled",
    startDate: new Date(),
    endDate: addDays(new Date(), 2),
    description: "Routine maintenance check",
  },
  {
    id: "2",
    aircraftId: "AC002",
    aircraftName: "Airbus A320",
    type: "unscheduled",
    startDate: addDays(new Date(), 3),
    endDate: addDays(new Date(), 4),
    description: "Emergency inspection",
  },
];

const MaintenanceCalendar = ({
  events = defaultEvents,
  onEventClick = () => {},
  onDateSelect = () => {},
}: MaintenanceCalendarProps) => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [view, setView] = React.useState<"month" | "week">("month");

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  const getDayEvents = (date: Date) => {
    return events.filter(
      (event) => date >= event.startDate && date <= event.endDate,
    );
  };

  return (
    <Card className="p-6 bg-white w-full h-full">
      <div className="flex flex-col h-full gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Maintenance Calendar</h2>
          </div>
          <Tabs
            value={view}
            onValueChange={(v) => setView(v as "month" | "week")}
          >
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-7 gap-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border"
            components={{
              day: ({ date }) => {
                const dayEvents = getDayEvents(date);
                return (
                  <div className="relative w-full h-full min-h-[100px] p-1">
                    <div className="text-sm">{format(date, "d")}</div>
                    <div className="mt-1 space-y-1">
                      {dayEvents.map((event) => (
                        <Badge
                          key={event.id}
                          variant={
                            event.type === "scheduled"
                              ? "default"
                              : "destructive"
                          }
                          className="cursor-pointer text-xs w-full truncate"
                          onClick={() => onEventClick(event)}
                        >
                          {event.aircraftName}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              },
            }}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Selected Date Events</h3>
          <div className="space-y-2">
            {getDayEvents(selectedDate).map((event) => (
              <Card key={event.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{event.aircraftName}</h4>
                    <p className="text-sm text-gray-500">{event.description}</p>
                    <p className="text-sm text-gray-500">
                      {format(event.startDate, "PPP")} -{" "}
                      {format(event.endDate, "PPP")}
                    </p>
                  </div>
                  <Badge
                    variant={
                      event.type === "scheduled" ? "default" : "destructive"
                    }
                  >
                    {event.type}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => onEventClick(event)}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MaintenanceCalendar;
