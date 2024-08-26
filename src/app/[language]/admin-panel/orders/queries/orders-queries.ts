import { useGetOrdersService } from "@/services/api/services/orders";
import { createQueryKeys } from "@/services/react-query/query-key-factory";
import { useInfiniteQuery } from "@tanstack/react-query";
import { OrderFilterType, OrderSortType } from "../order-filter-types";

export const ordersQueryKeys = createQueryKeys(["orders"], {
  list: () => ({
    key: [],
    sub: {
      by: ({
        sort,
        filter,
      }: {
        filter: OrderFilterType | undefined;
        sort?: OrderSortType | undefined;
      }) => ({
        key: [sort, filter],
      }),
    },
  }),
});

export const useOrderListQuery = ({
  sort,
  filter,
}: {
  filter?: OrderFilterType | undefined;
  sort?: OrderSortType | undefined;
} = {}) => {
  const fetch = useGetOrdersService();

  const query = useInfiniteQuery({
    queryKey: ordersQueryKeys.list().sub.by({ sort, filter }).key,
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit: 10,
          filters: filter,
          sort: sort ? [sort] : undefined,
        },
        {
          signal,
        }
      );

      if (status === true) {
        return {
          data: data.orders,
          nextPage: data.hasNextPage ? pageParam + 1 : undefined,
        };
      }
    },
    getNextPageParam: (lastPage) => {
      console.log(lastPage);
      return lastPage?.nextPage;
    },
    gcTime: 0,
  });

  return query;
};
