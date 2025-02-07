export interface Flight {
  id: string;
  route: string;
  serviceTypeCode: string;
  flightStatus: string;
  flightCode: string;
  flightIdent: string;
  flightNumber: string;
  active?: boolean;
}
