export interface Destination {
  id: string;
  shortName: string;
  fullName: string;
  countryCode: string;
  utcZone: string;
  longitude: number;
  latitude: number;
  active: boolean;
  airports: string[];
  daylightSavings: boolean;
}
