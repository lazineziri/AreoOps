export interface Allotment {
  id: string;
  name: string;
  allotmentType: "FIA" | "POA" | "PRA";
  contractId: string;
  contractName: string;
  ticketingRules: string;
  currencyCode: string;
  cabinClass: string;
  flightNumber: string;
  description: string;
  validFrom: string;
  validTo: string;
  active: boolean;
  selectedDays: number[]; // 0-6 representing Sunday-Saturday
}
