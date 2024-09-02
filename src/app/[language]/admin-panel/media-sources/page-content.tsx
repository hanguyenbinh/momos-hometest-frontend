"use client";

import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useTranslation } from "@/services/i18n/client";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import TableComponents from "@/components/table/table-components";
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects";

import MediaSourceFilter from "./media-sources-filter";
import { useRouter, useSearchParams } from "next/navigation";
import TableSortLabel from "@mui/material/TableSortLabel";
import { MediaSourceFilterType } from "./media-sources-filter-types";
import { SortEnum } from "@/services/api/types/sort-type";
import {
  MediaSource,
  MediaSourceColumn,
} from "@/services/api/types/media-source";
import { useMediaSourceListQuery } from "./queries/meida-sources-queries";

type MediaSourcesColumnKeys = keyof MediaSourceColumn;

const TableCellLoadingContainer = styled(TableCell)(() => ({
  padding: 0,
}));

function TableSortCellWrapper(
  props: PropsWithChildren<{
    width?: number;
    orderBy: MediaSourcesColumnKeys;
    order: SortEnum;
    column: MediaSourcesColumnKeys;
    handleRequestSort: (
      event: React.MouseEvent<unknown>,
      property: MediaSourcesColumnKeys
    ) => void;
  }>
) {
  return (
    <TableCell
      style={{ width: props.width }}
      sortDirection={props.orderBy === props.column ? props.order : false}
    >
      <TableSortLabel
        active={props.orderBy === props.column}
        direction={props.orderBy === props.column ? props.order : SortEnum.ASC}
        onClick={(event) => props.handleRequestSort(event, props.column)}
      >
        {props.children}
      </TableSortLabel>
    </TableCell>
  );
}

function MediaSources() {
  const { t: tMediaSources } = useTranslation("admin-panel-mediaSources");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [{ order, orderBy }, setSort] = useState<{
    order: SortEnum;
    orderBy: MediaSourcesColumnKeys;
  }>(() => {
    const searchParamsSort = searchParams.get("sort");
    if (searchParamsSort) {
      return JSON.parse(searchParamsSort);
    }
    return { order: SortEnum.DESC, orderBy: "id" };
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: MediaSourcesColumnKeys
  ) => {
    const isAsc = orderBy === property && order === SortEnum.ASC;
    const searchParams = new URLSearchParams(window.location.search);
    const newOrder = isAsc ? SortEnum.DESC : SortEnum.ASC;
    const newOrderBy = property;
    searchParams.set(
      "sort",
      JSON.stringify({ order: newOrder, orderBy: newOrderBy })
    );
    setSort({
      order: newOrder,
      orderBy: newOrderBy,
    });
    router.push(window.location.pathname + "?" + searchParams.toString());
  };

  const filter = useMemo(() => {
    const searchParamsFilter = searchParams.get("filter");
    if (searchParamsFilter) {
      return JSON.parse(searchParamsFilter) as MediaSourceFilterType;
    }

    return undefined;
  }, [searchParams]);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useMediaSourceListQuery({ filter, sort: { order, orderBy } });

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const result = useMemo(() => {
    const result =
      (data?.pages.flatMap((page) => page?.data) as MediaSource[]) ??
      ([] as MediaSource[]);

    return removeDuplicatesFromArrayObjects(result, "id");
  }, [data]);

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} pt={3}>
        <Grid container item spacing={3} xs={12}>
          <Grid item xs>
            <Typography variant="h3">
              {tMediaSources("admin-panel-mediaSources:title")}
            </Typography>
          </Grid>
          <Grid container item xs="auto" wrap="nowrap" spacing={2}>
            <Grid item xs="auto">
              <MediaSourceFilter />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} mb={2}>
          <TableVirtuoso
            style={{ height: 500 }}
            data={result}
            components={TableComponents}
            endReached={handleScroll}
            overscan={20}
            fixedHeaderContent={() => (
              <>
                <TableRow>
                  <TableSortCellWrapper
                    width={100}
                    orderBy={orderBy}
                    order={order}
                    column="id"
                    handleRequestSort={handleRequestSort}
                  >
                    {tMediaSources("admin-panel-mediaSources:table.id-column")}
                  </TableSortCellWrapper>
                  <TableSortCellWrapper
                    orderBy={orderBy}
                    order={order}
                    column="url"
                    handleRequestSort={handleRequestSort}
                  >
                    {tMediaSources(
                      "admin-panel-mediaSources:table.customer-name-column"
                    )}
                  </TableSortCellWrapper>
                  <TableSortCellWrapper
                    orderBy={orderBy}
                    order={order}
                    column="isCSR"
                    handleRequestSort={handleRequestSort}
                  >
                    {tMediaSources(
                      "admin-panel-mediaSources:table.customer-phone-column"
                    )}
                  </TableSortCellWrapper>
                  <TableSortCellWrapper
                    orderBy={orderBy}
                    order={order}
                    column="totalImages"
                    handleRequestSort={handleRequestSort}
                  >
                    {tMediaSources(
                      "admin-panel-mediaSources:table.total-column"
                    )}
                  </TableSortCellWrapper>
                  <TableSortCellWrapper
                    orderBy={orderBy}
                    order={order}
                    column="totalVideos"
                    handleRequestSort={handleRequestSort}
                  >
                    {tMediaSources(
                      "admin-panel-mediaSources:table.total-column"
                    )}
                  </TableSortCellWrapper>
                  <TableSortCellWrapper
                    orderBy={orderBy}
                    order={order}
                    column="status"
                    handleRequestSort={handleRequestSort}
                  >
                    {tMediaSources(
                      "admin-panel-mediaSources:table.status-column"
                    )}
                  </TableSortCellWrapper>
                </TableRow>
                {isFetchingNextPage && (
                  <TableRow>
                    <TableCellLoadingContainer colSpan={6}>
                      <LinearProgress />
                    </TableCellLoadingContainer>
                  </TableRow>
                )}
              </>
            )}
            itemContent={(index, mediaSource) => (
              <>
                <TableCell style={{ width: 100 }}>{mediaSource?.id}</TableCell>
                <TableCell style={{ width: 200 }}>{mediaSource.url}</TableCell>
                <TableCell style={{ width: 100 }}>
                  {mediaSource.isCSR ? "yes" : "no"}
                </TableCell>
                <TableCell style={{ width: 100 }}>
                  {mediaSource.totalImages}
                </TableCell>
                <TableCell style={{ width: 100 }}>
                  {mediaSource.totalVideos}
                </TableCell>
                <TableCell style={{ width: 100 }}>
                  {mediaSource.status}
                </TableCell>
              </>
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPageRequiredAuth(MediaSources);
