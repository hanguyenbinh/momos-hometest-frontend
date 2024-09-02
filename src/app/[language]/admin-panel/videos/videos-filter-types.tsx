import { VideoColumn, VideoStatusSelect } from "@/services/api/types/video";
import { SortEnum } from "@/services/api/types/sort-type";

export type VideoFilterType = {
  url?: string;
  status?: VideoStatusSelect;
};

export type VideoSortType = {
  orderBy: keyof VideoColumn;
  order: SortEnum;
};
