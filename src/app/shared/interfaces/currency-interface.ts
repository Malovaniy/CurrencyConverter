export interface ICurrencyInterface {
  currency: string;
  amount: number;
}
export interface IRatesInterface {
  [key: string]: any;
  UAH: {[key: string]: number} | null;
  EUR: {[key: string]: number} | null;
  USD: {[key: string]: number} | null;
}
