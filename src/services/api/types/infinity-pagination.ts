export type InfinityPaginationType<T> = {
  hasNextPage: boolean;
  users: T[];
};
export type InfinityOrdersPaginationType<T> = {
  hasNextPage: boolean;
  orders: T[];
};
