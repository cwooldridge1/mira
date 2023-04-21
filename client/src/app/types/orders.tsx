export interface Order {
  symbol: string;
  side: string;
  type: string;
  qty: number;
  limit_price?: number;
  time_in_force: string;
}
