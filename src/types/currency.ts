export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  countries: string[];
  exchangeRate: number;
  active: boolean;
}
