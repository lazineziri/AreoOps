// Aircraft Types
export interface Aircraft {
  id: string;
  registration: string;
  model: string;
  status: "active" | "maintenance" | "grounded";
  location: string;
  nextMaintenance: string;
  specifications?: AircraftSpecifications;
  cabinLayout?: CabinLayout;
}

export interface AircraftSpecifications {
  manufacturer: string;
  model: string;
  yearBuilt: number;
  capacity: number;
  range: string;
  engineType: string;
}

export interface CabinLayout {
  id: string;
  name: string;
  cabinClasses: CabinClass[];
}

export interface CabinClass {
  id: string;
  name: string; // e.g., "First Class", "Business", "Economy"
  code: string; // e.g., "F", "J", "Y"
  rows: number;
  seatsPerRow: number;
  seatMap: Seat[];
}

export interface Seat {
  id: string;
  row: number;
  column: string; // A, B, C, etc.
  status: "available" | "occupied" | "blocked";
  type: "window" | "middle" | "aisle";
}

// Route Types
export interface Route {
  id: string;
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  stopovers: string[];
}

// Flight Types
export interface Flight {
  id: string;
  flightNumber: string;
  routeId: string;
  aircraftId: string;
  departureTime: string;
  arrivalTime: string;
  status: "scheduled" | "active" | "completed" | "delayed" | "cancelled";
}

// Booking Types
export interface Booking {
  id: string;
  flightId: string;
  passengerId: string;
  seatNumber: string;
  status: "confirmed" | "cancelled";
  price: number;
}

// Allotment Types
export interface Allotment {
  id: string;
  flightId: string;
  agencyId?: string;
  totalSeats: number;
  availableSeats: number;
  price: number;
}
