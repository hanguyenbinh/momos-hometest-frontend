import { MediaSource } from "./media-source";

export enum VideoStatusEnum {
  NOT_PROCESSED = "NOT_PROCESSED",
  PROCESSING = "PROCESSING",
  PROCESSED = "PROCESSED",
  FAILURE = "FAILURE",
  DOWNLOADED = "DOWNLOADED",
}

export type VideoStatusSelect = {
  id: number | string;
  name?: string;
};

export type Video = {
  id: number;
  url: number;
  status: VideoStatusEnum;
  sourceId: number;
  source: MediaSource;
};

export type VideoColumn = {
  id: number;
  url: number;
  status: VideoStatusEnum;
  sourceId: number;
};
