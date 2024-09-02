export type InfinityPaginationType<T> = {
  hasNextPage: boolean;
  users: T[];
};
export type InfinityMediaSourcesPaginationType<T> = {
  hasNextPage: boolean;
  mediaSources: T[];
};
export type InfinityImagesPaginationType<T> = {
  hasNextPage: boolean;
  images: T[];
};
export type InfinityVideosPaginationType<T> = {
  hasNextPage: boolean;
  videos: T[];
};
