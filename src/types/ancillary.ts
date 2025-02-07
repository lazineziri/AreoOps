export interface FareBrand {
  id: string;
  code: string;
  name: string;
  description: string;
  cabinClass: string;
  services: string[];
  active: boolean;
}

export interface Service {
  id: string;
  code: string;
  name: string;
  description: string;
  category: "reservation" | "flight";
  price: number;
  currencyCode: string;
  active: boolean;
}

export interface Voucher {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  validFrom: string;
  validTo: string;
  usageLimit?: number;
  usageCount: number;
  applicableServices: string[];
  active: boolean;
}
