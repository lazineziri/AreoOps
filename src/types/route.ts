export interface Route {
  id: string;
  origin: string;
  destination: string;
  stops: Stop[];
  distance: string;
  duration: string;
}

export interface Stop {
  airport: string;
  order: number;
  groundTime: string; // Duration in minutes
}
