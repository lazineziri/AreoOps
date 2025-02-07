import { CabinLayout } from "@/types/aviation";

export const mockCabinLayouts: Record<string, CabinLayout> = {
  "boeing-737-800": {
    id: "737-800-layout",
    name: "Boeing 737-800 Standard Layout",
    cabinClasses: [
      {
        id: "business",
        name: "Business Class",
        code: "J",
        rows: 4,
        seatsPerRow: 4,
        seatMap: Array.from({ length: 16 }, (_, i) => ({
          id: `J${Math.floor(i / 4) + 1}${String.fromCharCode(65 + (i % 4))}`,
          row: Math.floor(i / 4) + 1,
          column: String.fromCharCode(65 + (i % 4)),
          status: "available",
          type: i % 4 === 0 || i % 4 === 3 ? "window" : "aisle",
        })),
      },
      {
        id: "economy",
        name: "Economy Class",
        code: "Y",
        rows: 20,
        seatsPerRow: 6,
        seatMap: Array.from({ length: 120 }, (_, i) => ({
          id: `Y${Math.floor(i / 6) + 1}${String.fromCharCode(65 + (i % 6))}`,
          row: Math.floor(i / 6) + 1,
          column: String.fromCharCode(65 + (i % 6)),
          status: "available",
          type:
            i % 6 === 0 || i % 6 === 5
              ? "window"
              : i % 6 === 1 || i % 6 === 4
                ? "middle"
                : "aisle",
        })),
      },
    ],
  },
  "airbus-a320": {
    id: "a320-layout",
    name: "Airbus A320 Standard Layout",
    cabinClasses: [
      {
        id: "business",
        name: "Business Class",
        code: "J",
        rows: 3,
        seatsPerRow: 4,
        seatMap: Array.from({ length: 12 }, (_, i) => ({
          id: `J${Math.floor(i / 4) + 1}${String.fromCharCode(65 + (i % 4))}`,
          row: Math.floor(i / 4) + 1,
          column: String.fromCharCode(65 + (i % 4)),
          status: "available",
          type: i % 4 === 0 || i % 4 === 3 ? "window" : "aisle",
        })),
      },
      {
        id: "economy",
        name: "Economy Class",
        code: "Y",
        rows: 22,
        seatsPerRow: 6,
        seatMap: Array.from({ length: 132 }, (_, i) => ({
          id: `Y${Math.floor(i / 6) + 1}${String.fromCharCode(65 + (i % 6))}`,
          row: Math.floor(i / 6) + 1,
          column: String.fromCharCode(65 + (i % 6)),
          status: "available",
          type:
            i % 6 === 0 || i % 6 === 5
              ? "window"
              : i % 6 === 1 || i % 6 === 4
                ? "middle"
                : "aisle",
        })),
      },
    ],
  },
};
