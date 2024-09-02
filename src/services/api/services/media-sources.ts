import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { SortEnum } from "../types/sort-type";
import { RequestConfigType } from "./types/request-config";
import wrapperFetchJsonData from "../wrapper-json-data";
import {
  MediaSource,
  MediaSourceColumn,
  MediaSourceStatusSelect,
} from "../types/media-source";
import { InfinityMediaSourcesPaginationType } from "../types/infinity-pagination";

export type MediaSourcesRequest = {
  page: number;
  limit: number;
  filters?: {
    url?: string;
    customerPhone?: string;
    isCSR?: boolean;
    status?: MediaSourceStatusSelect;
  };
  sort?: Array<{
    orderBy: keyof MediaSourceColumn;
    order: SortEnum;
  }>;
};

export type MediaSourcesResponse =
  InfinityMediaSourcesPaginationType<MediaSource>;

export function useGetMediaSourcesService() {
  const fetch = useFetch();

  return useCallback(
    (data: MediaSourcesRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/media-sources`);
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
          wrapperFetchJsonData<MediaSourcesResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}

export type MediaSourceRequest = {
  id: MediaSource["id"];
};

export type MediaSourceResponse = MediaSource;

export function useGetMediaSourceService() {
  const fetch = useFetch();

  return useCallback(
    (data: MediaSourceRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/media-sources/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<MediaSourceResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}
