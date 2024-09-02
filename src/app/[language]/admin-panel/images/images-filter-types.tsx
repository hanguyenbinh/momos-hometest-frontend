import { ImageColumn, ImageStatusSelect } from "@/services/api/types/image";
import { SortEnum } from "@/services/api/types/sort-type";

export type ImageFilterType = {
  url?: string;
  status?: ImageStatusSelect;
};

export type ImageSortType = {
  orderBy: keyof ImageColumn;
  order: SortEnum;
};
