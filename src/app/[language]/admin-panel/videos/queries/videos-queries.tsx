import { createQueryKeys } from "@/services/react-query/query-key-factory";
import { useInfiniteQuery } from "@tanstack/react-query";
import { VideoFilterType, VideoSortType } from "../videos-filter-types";
import { useGetVideosService } from "@/services/api/services/videos";

export const videosQueryKeys = createQueryKeys(["videos"], {
  list: () => ({
    key: [],
    sub: {
      by: ({
        sort,
        filter,
      }: {
        filter: VideoFilterType | undefined;
        sort?: VideoSortType | undefined;
      }) => ({
        key: [sort, filter],
      }),
    },
  }),
});

export const useVideoListQuery = ({
  sort,
  filter,
}: {
  filter?: VideoFilterType | undefined;
  sort?: VideoSortType | undefined;
} = {}) => {
  const fetch = useGetVideosService();

  const query = useInfiniteQuery({
    queryKey: videosQueryKeys.list().sub.by({ sort, filter }).key,
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
          data: data.videos,
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
