"use client";

import { useTranslation } from "@/services/i18n/client";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { OrderFilterType } from "./order-filter-types";
import FormTextInput from "@/components/form/text-input/form-text-input";
import { OrderStatus, OrderStatusSelect } from "@/services/api/types/order";
import FormSelectInput from "@/components/form/select/form-select";

type OrderFilterFormData = OrderFilterType;

function OrderFilter() {
  const { t } = useTranslation("admin-panel-orders");
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm<OrderFilterFormData>({
    defaultValues: {
      customerName: "",
      customerPhone: "",
      minTotal: 0,
      maxTotal: 0,
      status: {
        id: OrderStatus.CREATED,
      },
    },
  });

  const { handleSubmit, reset } = methods;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "order-filter-popover" : undefined;

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) {
      handleClose();
      const filterParsed = JSON.parse(filter);
      reset(filterParsed);
    }
  }, [searchParams, reset]);

  return (
    <FormProvider {...methods}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Container
          sx={{
            minWidth: 300,
          }}
        >
          <form
            onSubmit={handleSubmit((data) => {
              const searchParams = new URLSearchParams(window.location.search);
              searchParams.set("filter", JSON.stringify(data));
              router.push(
                window.location.pathname + "?" + searchParams.toString()
              );
            })}
          >
            <Grid container spacing={2} mb={3} mt={3}>
              <Grid item xs={12}>
                <FormTextInput<OrderFilterFormData>
                  name="customerName"
                  label={t("admin-panel-orders:filter.inputs.customer-name")}
                ></FormTextInput>
                <FormTextInput<OrderFilterFormData>
                  name="customerPhone"
                  label={t("admin-panel-orders:filter.inputs.customer-phone")}
                ></FormTextInput>
                <FormTextInput<OrderFilterFormData>
                  name="minTotal"
                  label={t("admin-panel-orders:filter.inputs.min-total")}
                ></FormTextInput>
                <FormTextInput<OrderFilterFormData>
                  name="maxTotal"
                  label={t("admin-panel-orders:filter.inputs.max-total")}
                ></FormTextInput>
                <FormSelectInput<
                  OrderFilterFormData,
                  Pick<OrderStatusSelect, "id">
                >
                  name="status"
                  testId="status"
                  label={t("admin-panel-orders:filter.inputs.status")}
                  options={Object.keys(OrderStatus).map((item) => {
                    console.log(item);
                    return { id: item };
                  })}
                  keyValue="id"
                  renderOption={(option) => option.id}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  {t("admin-panel-orders:filter.actions.apply")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Popover>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        {t("admin-panel-orders:filter.actions.filter")}
      </Button>
    </FormProvider>
  );
}

export default OrderFilter;
