"use client";

import { RoleEnum } from "@/services/api/types/role";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useTranslation } from "@/services/i18n/client";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { useOrderListQuery } from "./queries/orders-queries";
import { TableVirtuoso } from "react-virtuoso";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import TableComponents from "@/components/table/table-components";
import { Order, OrderColumn } from "@/services/api/types/order";
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects";

import OrderFilter from "./order-filter";
import { useRouter, useSearchParams } from "next/navigation";
import TableSortLabel from "@mui/material/TableSortLabel";
import { OrderFilterType } from "./order-filter-types";
import { SortEnum } from "@/services/api/types/sort-type";

type OrdersColumnKeys = keyof OrderColumn;

const TableCellLoadingContainer = styled(TableCell)(() => ({
  padding: 0,
}));

function TableSortCellWrapper(
  props: PropsWithChildren<{
    width?: number;
    orderBy: OrdersColumnKeys;
    order: SortEnum;
    column: OrdersColumnKeys;
    handleRequestSort: (
      event: React.MouseEvent<unknown>,
      property: OrdersColumnKeys
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

function Orders() {
  const { t: tOrders } = useTranslation("admin-panel-orders");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [{ order, orderBy }, setSort] = useState<{
    order: SortEnum;
    orderBy: OrdersColumnKeys;
  }>(() => {
    const searchParamsSort = searchParams.get("sort");
    if (searchParamsSort) {
      return JSON.parse(searchParamsSort);
    }
    return { order: SortEnum.DESC, orderBy: "id" };
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: OrdersColumnKeys
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
      return JSON.parse(searchParamsFilter) as OrderFilterType;
    }

    return undefined;
  }, [searchParams]);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useOrderListQuery({ filter, sort: { order, orderBy } });

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const result = useMemo(() => {
    const result =
      (data?.pages.flatMap((page) => page?.data) as Order[]) ?? ([] as Order[]);

    return removeDuplicatesFromArrayObjects(result, "id");
  }, [data]);

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} pt={3}>
        <Grid container item spacing={3} xs={12}>
          <Grid item xs>
            <Typography variant="h3">
              {tOrders("admin-panel-orders:title")}
            </Typography>
          </Grid>
          <Grid container item xs="auto" wrap="nowrap" spacing={2}>
            <Grid item xs="auto">
              <OrderFilter />
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
                    {tOrders("admin-panel-orders:table.id-column")}
                  </TableSortCellWrapper>
                  <TableSortCellWrapper
                    orderBy={orderBy}
                    order={order}
                    column="customerName"
                    handleRequestSort={handleRequestSort}
                  >
                    {tOrders("admin-panel-orders:table.customer-name-column")}
                  </TableSortCellWrapper>
                  <TableSortCellWrapper
                    orderBy={orderBy}
                    order={order}
                    column="customerPhone"
                    handleRequestSort={handleRequestSort}
                  >
                    {tOrders("admin-panel-orders:table.customer-phone-column")}
                  </TableSortCellWrapper>
                  <TableSortCellWrapper
                    orderBy={orderBy}
                    order={order}
                    column="total"
                    handleRequestSort={handleRequestSort}
                  >
                    {tOrders("admin-panel-orders:table.total-column")}
                  </TableSortCellWrapper>
                  <TableSortCellWrapper
                    orderBy={orderBy}
                    order={order}
                    column="status"
                    handleRequestSort={handleRequestSort}
                  >
                    {tOrders("admin-panel-orders:table.status-column")}
                  </TableSortCellWrapper>

                  <TableCell>
                    {tOrders("admin-panel-orders:table.item-count-column")}
                  </TableCell>

                  <TableCell style={{ width: 130 }}></TableCell>
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
            itemContent={(index, order) => (
              <>
                <TableCell style={{ width: 100 }}>{order?.id}</TableCell>
                <TableCell style={{ width: 200 }}>
                  {order.customer.name}
                </TableCell>
                <TableCell style={{ width: 200 }}>
                  {order.customer.phone}
                </TableCell>
                <TableCell style={{ width: 200 }}>
                  {Number(order.total).toFixed(2)} $
                </TableCell>
                <TableCell style={{ width: 100 }}>{order.status}</TableCell>
                <TableCell style={{ width: 100 }}>
                  {order.items.length}
                </TableCell>
              </>
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPageRequiredAuth(Orders, { roles: [RoleEnum.ADMIN] });
