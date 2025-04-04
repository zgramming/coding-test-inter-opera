"use client";

import { SalesRepository } from "@/features/sales/sales.repository";
import { BarChart } from "@mantine/charts";
import { Card, CardSection, LoadingOverlay, Stack } from "@mantine/core";

export const ChartSalesOverviewComponent = () => {
  const { data, isLoading } =
    SalesRepository.hooks.useGetDashboardSalesOverview();
  return (
    <Card withBorder shadow="sm" radius="md">
      <CardSection withBorder inheritPadding py="xs">
        Sales Overview
      </CardSection>
      <LoadingOverlay visible={isLoading} />
      <Stack p={"lg"}>
        <BarChart
          h={300}
          data={data?.data ?? []}
          dataKey="name"
          series={[
            {
              name: "value",
              label: "Deal Value",
              color: "teal.8",
            },
          ]}
          valueFormatter={(value) =>
            value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          }
          withBarValueLabel
          withLegend
        />
      </Stack>
    </Card>
  );
};
