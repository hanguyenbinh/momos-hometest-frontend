import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { SortEnum } from "../types/sort-type";
import { RequestConfigType } from "./types/request-config";
import wrapperFetchJsonData from "../wrapper-json-data";
import { InfinityVideosPaginationType } from "../types/infinity-pagination";
import { Video, VideoColumn, VideoStatusSelect } from "../types/video";

export type VideosRequest = {
  page: number;
  limit: number;
  filters?: {
    url?: string;
    status?: VideoStatusSelect;
  };
  sort?: Array<{
    orderBy: keyof VideoColumn;
    order: SortEnum;
  }>;
};

export type VideosResponse = InfinityVideosPaginationType<Video>;

export function useGetVideosService() {
  const fetch = useFetch();

  return useCallback(
    (data: VideosRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/media-sources/videos`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());
      if (data.filters) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filters = data.filters as any;
        Object.keys(filters).forEach((k) => {
          if (k === "status") {
            requestUrl.searchParams.append(k, filters[k].id);
          } else requestUrl.searchParams.append(k, filters[k]);
        });
      }

      if (data.sort) {
        requestUrl.searchParams.append("sort", data.sort[0].order);
        requestUrl.searchParams.append("order", data.sort[0].orderBy);
      }

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<VideosResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}

export type VideoRequest = {
  id: Video["id"];
};

export type VideoResponse = Video;

export function useGetVideoService() {
  const fetch = useFetch();

  return useCallback(
    (data: VideoRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/media-sources/videos/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<VideoResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}
