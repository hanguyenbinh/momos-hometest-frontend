import {
  MediaSourceColumn,
  MediaSourceStatusSelect,
} from "@/services/api/types/media-source";
import { SortEnum } from "@/services/api/types/sort-type";

export type MediaSourceFilterType = {
  url?: string;
  isCSR?: boolean;
  status?: MediaSourceStatusSelect;
};

export type MediaSourceSortType = {
  orderBy: keyof MediaSourceColumn;
  order: SortEnum;
};
