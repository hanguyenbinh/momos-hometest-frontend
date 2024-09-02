import { useInfiniteQuery } from "@tanstack/react-query";
import {
  MediaSourceFilterType,
  MediaSourceSortType,
} from "../media-sources-filter-types";
import { useGetMediaSourcesService } from "@/services/api/services/media-sources";
import { createQueryKeys } from "@/services/react-query/query-key-factory";

export const mediaSourcesQueryKeys = createQueryKeys(["mediaSources"], {
  list: () => ({
    key: [],
    sub: {
      by: ({
        sort,
        filter,
      }: {
        filter: MediaSourceFilterType | undefined;
        sort?: MediaSourceSortType | undefined;
      }) => ({
        key: [sort, filter],
      }),
    },
  }),
});

export const useMediaSourceListQuery = ({
  sort,
  filter,
}: {
  filter?: MediaSourceFilterType | undefined;
  sort?: MediaSourceSortType | undefined;
} = {}) => {
  const fetch = useGetMediaSourcesService();

  const query = useInfiniteQuery({
    queryKey: mediaSourcesQueryKeys.list().sub.by({ sort, filter }).key,
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
          data: data.mediaSources,
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
