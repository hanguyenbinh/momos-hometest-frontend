import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { Order, OrderColumn, OrderStatusSelect } from "../types/order";
import { InfinityOrdersPaginationType } from "../types/infinity-pagination";
import { SortEnum } from "../types/sort-type";
import { RequestConfigType } from "./types/request-config";
import wrapperFetchJsonData from "../wrapper-json-data";

export type OrdersRequest = {
  page: number;
  limit: number;
  filters?: {
    customerName?: string;
    customerPhone?: string;
    minTotal?: number;
    maxTotal?: number;
    status?: OrderStatusSelect;
  };
  sort?: Array<{
    orderBy: keyof OrderColumn;
    order: SortEnum;
  }>;
};

export type OrdersResponse = InfinityOrdersPaginationType<Order>;

export function useGetOrdersService() {
  const fetch = useFetch();

  return useCallback(
    (data: OrdersRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/order`);
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
          wrapperFetchJsonData<OrdersResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}

export type OrderRequest = {
  id: Order["id"];
};

export type OrderResponse = Order;

export function useGetOrderService() {
  const fetch = useFetch();

  return useCallback(
    (data: OrderRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/order/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<OrderResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}

export type OrderPostRequest = Pick<Order, "customerId" | "items">;

export type OrderPostResponse = Order;

export function usePostOrderService() {
  const fetch = useFetch();

  return useCallback(
    (data: OrderPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/order`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<OrderPostResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}

export type OrderPatchRequest = {
  id: Order["id"];
  data: Partial<Pick<Order, "items">>;
};

export type OrderPatchResponse = Order;

export function usePatchOrderService() {
  const fetch = useFetch();

  return useCallback(
    (data: OrderPatchRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/order/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<OrderPatchResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}

export type OrdersDeleteRequest = {
  id: Order["id"];
};

export type OrdersDeleteResponse = undefined;

export function useDeleteOrdersService() {
  const fetch = useFetch();

  return useCallback(
    (data: OrdersDeleteRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/order/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<OrdersDeleteResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}
