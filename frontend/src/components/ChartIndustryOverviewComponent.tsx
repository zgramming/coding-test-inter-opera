import { SalesRepository } from "@/features/sales/sales.repository";
import { PieChart } from "@mantine/charts";
import {
  Card,
  CardSection,
  Stack,
  Group,
  Box,
  Text,
  LoadingOverlay,
} from "@mantine/core";

export const ChartIndustryOverviewComponent = () => {
  const { data, isLoading } =
    SalesRepository.hooks.useGetDashboardIndustryOverview();

  return (
    <Card withBorder shadow="sm" radius="md">
      <CardSection withBorder inheritPadding py="xs">
        Industry Deals Distribution
      </CardSection>
      <Stack p={"lg"}>
        <LoadingOverlay visible={isLoading} />
        <Group gap={"xl"} align="start" justify="space-evenly">
          <PieChart
            size={300}
            withLabelsLine
            labelsPosition="inside"
            labelsType="percent"
            withLabels
            data={data?.data ?? []}
          />
          <Stack>
            <Stack gap={"sm"}>
              {data?.data.map((item) => (
                <Group key={item.name} gap={"xs"}>
                  <Box w={20} h={20} bg={item.color} />
                  <Text>{item.name}</Text>
                  <Text size="xs">
                    {item.value.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </Text>
                </Group>
              ))}
            </Stack>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
};
