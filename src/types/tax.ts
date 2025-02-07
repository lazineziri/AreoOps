export interface Tax {
  id: string;
  currencyCode: string;
  taxType: string;
  name: string;
  description: string;
  amount: number;
  active: boolean;
}
