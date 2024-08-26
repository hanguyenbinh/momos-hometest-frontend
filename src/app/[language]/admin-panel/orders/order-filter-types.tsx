import { SortEnum } from "@/services/api/types/sort-type";
import { OrderColumn, OrderStatusSelect } from "@/services/api/types/order";

export type OrderFilterType = {
  customerName?: string;
  customerPhone?: string;
  minTotal?: number;
  maxTotal?: number;
  status?: OrderStatusSelect;
};

export type OrderSortType = {
  orderBy: keyof OrderColumn;
  order: SortEnum;
};
