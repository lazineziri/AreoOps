export interface Airport {
  id: string;
  country: string;
  utcZone: string;
  airportType: string;
  ident: string;
  name: string;
  iataCode: string;
  localCode: string;
  latitudeDeg: number;
  longitudeDeg: number;
  elevationFt: number;
  municipality: string;
  scheduledService: boolean;
  gpsCode: string;
  homeLink: string;
  wikiLink: string;
  keywords: string[];
  active: boolean;
  airportProperties: string[];
  airportComConfProperties: string[];
  daylightSavings: boolean;
}
