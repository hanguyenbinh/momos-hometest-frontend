import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { SortEnum } from "../types/sort-type";
import { RequestConfigType } from "./types/request-config";
import wrapperFetchJsonData from "../wrapper-json-data";
import { Image, ImageColumn, ImageStatusSelect } from "../types/image";
import { InfinityImagesPaginationType } from "../types/infinity-pagination";

export type ImagesRequest = {
  page: number;
  limit: number;
  filters?: {
    url?: string;
    status?: ImageStatusSelect;
  };
  sort?: Array<{
    orderBy: keyof ImageColumn;
    order: SortEnum;
  }>;
};

export type ImagesResponse = InfinityImagesPaginationType<Image>;

export function useGetImagesService() {
  const fetch = useFetch();

  return useCallback(
    (data: ImagesRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/media-sources/images`);
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
          wrapperFetchJsonData<ImagesResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}

export type ImageRequest = {
  id: Image["id"];
};

export type ImageResponse = Image;

export function useGetImageService() {
  const fetch = useFetch();

  return useCallback(
    (data: ImageRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/media-sources/images/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<ImageResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}
