import { SortEnum } from "@/services/api/types/sort-type";
import { User } from "@/services/api/types/user";

export type UserFilterType = {
  email?: string;
};

export type UserSortType = {
  orderBy: keyof User;
  order: SortEnum;
};
