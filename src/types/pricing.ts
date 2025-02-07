export interface Season {
  id: string;
  code: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  active: boolean;
  profiles: PricingProfile[];
}

export interface PricingProfile {
  id: string;
  code: string;
  name: string;
  description: string;
  active: boolean;
  classes: PricingClass[];
}

export interface PricingClass {
  id: string;
  cabinClass: string;
  basePrice: number;
  currencyCode: string;
  fareBrandModifiers: FareBrandModifier[];
  ancillaryModifiers: AncillaryModifier[];
}

export interface FareBrandModifier {
  fareBrandId: string;
  fareBrandName: string;
  modifierType: "percentage" | "fixed";
  value: number;
}

export interface AncillaryModifier {
  ancillaryId: string;
  ancillaryName: string;
  modifierType: "percentage" | "fixed";
  value: number;
}
