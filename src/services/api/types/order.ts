import { Customer } from "./customer";
import { OrderItems } from "./order-items";

// export enum OrderProviderEnum {
//   EMAIL = "email",
//   GOOGLE = "google",
// }

export enum OrderStatus {
  CREATED = "CREATED",
  CANCELLED = "CANCELLED",
  PROCESSING = "PROCESSING",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export type OrderStatusSelect = {
  id: number | string;
  name?: string;
};

export type Order = {
  id: number;
  customerId: number;
  customer: Customer;
  status: OrderStatus;
  total: number;
  items: OrderItems[];
};

export type OrderColumn = {
  id: number;
  customerName: string;
  customerPhone: string;
  status: OrderStatus;
  total: number;
  items: number;
};
