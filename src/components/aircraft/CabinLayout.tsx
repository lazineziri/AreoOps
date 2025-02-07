import { CabinLayout as ICabinLayout } from "@/types/aviation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DoorOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CabinLayoutProps {
  layout: ICabinLayout;
  onSeatClick?: (seat: any) => void;
}

export default function CabinLayout({ layout, onSeatClick }: CabinLayoutProps) {
  // Calculate total rows and max seats per row across all classes
  const totalRows = layout.cabinClasses.reduce(
    (acc, curr) => acc + curr.rows,
    0,
  );
  const maxSeatsPerRow = Math.max(
    ...layout.cabinClasses.map((c) => c.seatsPerRow),
  );

  // Create a map of row numbers to cabin class
  const rowToCabinClass = new Map();
  let currentRow = 1;
  layout.cabinClasses.forEach((cabinClass) => {
    for (let i = 0; i < cabinClass.rows; i++) {
      rowToCabinClass.set(currentRow + i, cabinClass);
    }
    currentRow += cabinClass.rows;
  });

  // Exit door positions (adjust based on aircraft type)
  const exitRows = layout.name.includes("737") ? [1, 15] : [1, 12];

  return (
    <Card className="p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{layout.name}</h2>
        <div className="flex gap-2">
          {layout.cabinClasses.map((cabinClass) => (
            <Badge key={cabinClass.id} variant="outline">
              {cabinClass.name}
            </Badge>
          ))}
        </div>
      </div>

      <div className="relative bg-gray-50 p-6 rounded-lg">
        {/* Cabin Layout */}
        <div className="flex flex-col items-center space-y-6">
          {Array.from({ length: totalRows }, (_, rowIndex) => {
            const row = rowIndex + 1;
            const cabinClass = rowToCabinClass.get(row);
            const isExitRow = exitRows.includes(row);
            const isFirstRowOfClass =
              cabinClass && rowToCabinClass.get(row - 1)?.id !== cabinClass.id;

            return (
              <div key={row}>
                {/* Class separator */}
                {isFirstRowOfClass && (
                  <div className="h-12 -mt-2 mb-8 flex items-center justify-center border-t-2 border-gray-300">
                    <Badge
                      variant="outline"
                      className="bg-white px-4 py-1 text-base"
                    >
                      {cabinClass.name}
                    </Badge>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  {/* Left exit */}
                  <div className="w-16">
                    {isExitRow && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="bg-yellow-100 p-2 rounded-md border border-yellow-300">
                              <DoorOpen className="h-8 w-8 text-yellow-600" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>Emergency Exit</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>

                  {/* Row number */}
                  <div className="w-8 text-center text-sm font-medium text-gray-500">
                    {row}
                  </div>

                  {/* Seats */}
                  <div className="flex gap-8">
                    {/* Left seats */}
                    <div className="flex gap-2">
                      {Array.from(
                        { length: Math.floor(maxSeatsPerRow / 2) },
                        (_, seatIndex) => {
                          if (
                            !cabinClass ||
                            seatIndex >= Math.floor(cabinClass.seatsPerRow / 2)
                          ) {
                            return (
                              <div key={seatIndex} className="w-10 h-10" />
                            );
                          }
                          const column = String.fromCharCode(65 + seatIndex);
                          const seat = cabinClass.seatMap.find(
                            (s) => s.row === row && s.column === column,
                          );
                          return renderSeat(
                            row,
                            column,
                            seat,
                            cabinClass,
                            onSeatClick,
                          );
                        },
                      )}
                    </div>

                    {/* Aisle */}
                    <div className="w-8" />

                    {/* Right seats */}
                    <div className="flex gap-2">
                      {Array.from(
                        { length: Math.floor(maxSeatsPerRow / 2) },
                        (_, seatIndex) => {
                          const actualIndex =
                            seatIndex + Math.floor(maxSeatsPerRow / 2);
                          if (
                            !cabinClass ||
                            actualIndex >= cabinClass.seatsPerRow
                          ) {
                            return (
                              <div key={seatIndex} className="w-10 h-10" />
                            );
                          }
                          const column = String.fromCharCode(65 + actualIndex);
                          const seat = cabinClass.seatMap.find(
                            (s) => s.row === row && s.column === column,
                          );
                          return renderSeat(
                            row,
                            column,
                            seat,
                            cabinClass,
                            onSeatClick,
                          );
                        },
                      )}
                    </div>
                  </div>

                  {/* Right exit */}
                  <div className="w-16">
                    {isExitRow && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="bg-yellow-100 p-2 rounded-md border border-yellow-300">
                              <DoorOpen className="h-8 w-8 text-yellow-600" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>Emergency Exit</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 items-center text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border border-green-200" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100 border border-red-200" />
          <span>Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-100 border border-gray-200" />
          <span>Blocked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-blue-400" />
          <span>Infant Seat</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-purple-400" />
          <span>Special Needs</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-yellow-400" />
          <span>Crew Seat</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-yellow-100 p-1 rounded border border-yellow-300">
            <DoorOpen className="h-4 w-4 text-yellow-600" />
          </div>
          <span>Emergency Exit</span>
        </div>
      </div>
    </Card>
  );
}

function renderSeat(
  row: number,
  column: string,
  seat: any,
  cabinClass: any,
  onSeatClick?: (seat: any) => void,
) {
  if (!seat) return null;

  const seatColor = {
    available: "bg-green-100 hover:bg-green-200 text-green-700",
    occupied: "bg-red-100 text-red-700",
    blocked: "bg-gray-100 text-gray-700",
  }[seat.status];

  const seatTypeStyles = {
    regular: "",
    infant: "border-2 border-blue-400",
    special_needs: "border-2 border-purple-400",
    crew: "border-2 border-yellow-400",
  }[seat.seatType || "regular"];

  return (
    <TooltipProvider key={`${row}${column}`}>
      <Tooltip>
        <TooltipTrigger>
          <button
            className={cn(
              "w-10 h-10 rounded-t-lg text-xs font-medium transition-colors",
              seatColor,
              seatTypeStyles,
              cabinClass.id === "business" &&
                "bg-opacity-80 border-2 border-blue-200",
            )}
            onClick={() => onSeatClick?.(seat)}
            disabled={seat.status === "occupied"}
          >
            {row}
            {column}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Seat {row}
            {column}
          </p>
          <p className="capitalize">{cabinClass.name}</p>
          <p className="capitalize">{seat.type} Seat</p>
          <p className="capitalize">{seat.status}</p>
          {seat.seatType && (
            <p className="capitalize">{seat.seatType.replace("_", " ")} Seat</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
