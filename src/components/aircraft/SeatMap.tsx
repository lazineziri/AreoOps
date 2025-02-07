import { CabinClass, Seat } from "@/types/aviation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SeatMapProps {
  cabinClass: CabinClass;
  onSeatClick?: (seat: Seat) => void;
}

export default function SeatMap({ cabinClass, onSeatClick }: SeatMapProps) {
  const rows = Array.from({ length: cabinClass.rows }, (_, i) => i + 1);
  const columns = Array.from({ length: cabinClass.seatsPerRow }, (_, i) =>
    String.fromCharCode(65 + i),
  );

  const getSeatByPosition = (row: number, column: string) => {
    return cabinClass.seatMap.find(
      (seat) => seat.row === row && seat.column === column,
    );
  };

  const getSeatColor = (seat: Seat) => {
    switch (seat.status) {
      case "available":
        return "bg-green-100 hover:bg-green-200 text-green-700";
      case "occupied":
        return "bg-red-100 text-red-700";
      case "blocked":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{cabinClass.name}</h3>
        <Badge variant="outline">{cabinClass.code}</Badge>
      </div>

      <div className="flex flex-col items-center space-y-2">
        {rows.map((row) => (
          <div key={row} className="flex items-center space-x-2">
            <span className="w-6 text-center text-sm text-gray-500">{row}</span>
            {columns.map((col) => {
              const seat = getSeatByPosition(row, col);
              if (!seat) return null;

              return (
                <TooltipProvider key={`${row}${col}`}>
                  <Tooltip>
                    <TooltipTrigger>
                      <button
                        className={cn(
                          "w-8 h-8 rounded-lg text-xs font-medium transition-colors",
                          getSeatColor(seat),
                        )}
                        onClick={() => onSeatClick?.(seat)}
                        disabled={seat.status === "occupied"}
                      >
                        {row}
                        {col}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Seat {row}
                        {col}
                      </p>
                      <p className="capitalize">{seat.type} Seat</p>
                      <p className="capitalize">{seat.status}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
