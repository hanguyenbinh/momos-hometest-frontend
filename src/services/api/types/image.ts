import { MediaSource } from "./media-source";

export enum ImageStatusEnum {
  NOT_PROCESSED = "NOT_PROCESSED",
  PROCESSING = "PROCESSING",
  PROCESSED = "PROCESSED",
  FAILURE = "FAILURE",
  DOWNLOADED = "DOWNLOADED",
}

export type ImageStatusSelect = {
  id: number | string;
  name?: string;
};

export type Image = {
  id: number;
  url: number;
  status: ImageStatusEnum;
  sourceId: number;
  source: MediaSource;
};

export type ImageColumn = {
  id: number;
  url: number;
  status: ImageStatusEnum;
  sourceId: number;
};
