export enum MediaSourceStatusEnum {
  NOT_PROCESSED = "NOT_PROCESSED",
  PROCESSING = "PROCESSING",
  PROCESSED = "PROCESSED",
  FAILURE = "FAILURE",
  DOWNLOADED = "DOWNLOADED",
}

export type MediaSourceStatusSelect = {
  id: number | string;
  name?: string;
};

export type MediaSource = {
  id: number;
  url: number;
  status: MediaSourceStatusEnum;
  isCSR: boolean;
  totalImages: number;
  totalVideos: number;
};

export type MediaSourceColumn = {
  id: number;
  url: number;
  status: MediaSourceStatusEnum;
  isCSR: boolean;
  totalImages: number;
  totalVideos: number;
};
