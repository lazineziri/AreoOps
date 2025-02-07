export const AIRCRAFT_STATUSES = {
  ACTIVE: "active",
  MAINTENANCE: "maintenance",
  GROUNDED: "grounded",
} as const;

export const FLIGHT_STATUSES = {
  SCHEDULED: "scheduled",
  ACTIVE: "active",
  COMPLETED: "completed",
  DELAYED: "delayed",
  CANCELLED: "cancelled",
} as const;

export const BOOKING_STATUSES = {
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
} as const;

export const MOCK_AIRPORTS = [
  { code: "LAX", name: "Los Angeles International" },
  { code: "JFK", name: "John F. Kennedy International" },
  { code: "ORD", name: "O'Hare International" },
  { code: "DFW", name: "Dallas/Fort Worth International" },
  { code: "ATL", name: "Hartsfield-Jackson Atlanta" },
] as const;
