import { createQueryKeys } from "@/services/react-query/query-key-factory";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ImageFilterType, ImageSortType } from "../images-filter-types";
import { useGetImagesService } from "@/services/api/services/images";

export const imagesQueryKeys = createQueryKeys(["images"], {
  list: () => ({
    key: [],
    sub: {
      by: ({
        sort,
        filter,
      }: {
        filter: ImageFilterType | undefined;
        sort?: ImageSortType | undefined;
      }) => ({
        key: [sort, filter],
      }),
    },
  }),
});

export const useImageListQuery = ({
  sort,
  filter,
}: {
  filter?: ImageFilterType | undefined;
  sort?: ImageSortType | undefined;
} = {}) => {
  const fetch = useGetImagesService();

  const query = useInfiniteQuery({
    queryKey: imagesQueryKeys.list().sub.by({ sort, filter }).key,
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
          data: data.images,
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
