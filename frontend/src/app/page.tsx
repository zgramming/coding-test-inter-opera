"use client";

import PaginationComponent, {
  PaginationSize,
} from "@/components/PaginationComponent";
import {
  Alert,
  Button,
  Divider,
  Grid,
  GridCol,
  Group,
  Kbd,
  LoadingOverlay,
  Paper,
  Select,
  Stack,
  Table,
  TableScrollContainer,
  TableTbody,
  TableTh,
  TableThead,
  TableTr,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconAi, IconSearch } from "@tabler/icons-react";
import { KeyboardEvent, useEffect, useState } from "react";
import { SalesRepository } from "@/features/sales/sales.repository";
import { ChartSalesOverviewComponent } from "@/components/ChartSalesOverviewComponent";
import { ChartRegionOverviewComponent } from "@/components/ChartRegionOverviewComponent";
import { ChartIndustryOverviewComponent } from "@/components/ChartIndustryOverviewComponent";
import { TableRow } from "@/components/TableRowComponent";
import { SideNavbarComponent } from "@/components/SideNavbarComponent";
import { ModalAI } from "@/components/ModalAskAIComponent";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePagination, setPagination] = useState(1);
  const [sizePagination, setSizePagination] = useState<PaginationSize>("10");
  const [searchQuery, setSearchQuery] = useDebouncedState<string | undefined>(
    "",
    500
  );
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>();

  const { data: sale, isLoading } = SalesRepository.hooks.useGetSales({
    page: activePagination,
    limit: Number(sizePagination),
    region: selectedRegion,
    search: searchQuery,
  });

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onChangeRegion = (value: string | null) => {
    if (value === null) {
      setSelectedRegion(undefined);
    } else {
      setSelectedRegion(value);
    }
  };

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    if (value.length === 0 || value === "") {
      setSearchQuery(undefined);
    } else {
      setSearchQuery(value);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        onOpenModal();
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener("keydown", (e) => handleKeyDown(e as any));
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.removeEventListener("keydown", (e) => handleKeyDown(e as any));
    };
  }, []);

  const regions = [...new Set(sale?.data.map((item) => item.region))];

  return (
    <>
      <Grid gutter={0}>
        <GridCol
          span={{
            base: 12,
            sm: 3,
            lg: 2,
          }}
        >
          <SideNavbarComponent />
        </GridCol>
        <GridCol
          span={{
            base: 12,
            sm: 9,
            lg: 10,
          }}
        >
          <Stack p={"lg"} bg={"white"} mih={"100vh"}>
            <Alert
              variant="light"
              color="teal"
              radius="xl"
              title="AI Feature"
              icon={<IconAi />}
            >
              You can use AI to ask questions related to the sales report. To
              fast access this feature, you can use the shortcut <Kbd>Ctrl</Kbd>{" "}
              + <Kbd>K</Kbd>. Or you can click the{" "}
              <Button
                variant="subtle"
                color="teal"
                size="compact-xs"
                onClick={onOpenModal}
              >
                <IconAi size={24} />
              </Button>
            </Alert>
            <Paper withBorder shadow="sm" radius="md" p={"lg"}>
              <Group justify="space-between">
                <Text>List of all Sales Reports</Text>
              </Group>
              <Divider my={"md"} />
              <Group gap={"md"}>
                <TextInput
                  size="xs"
                  placeholder="Search by name, role"
                  rightSection={<IconSearch size={16} />}
                  onChange={onChangeSearch}
                  defaultValue={searchQuery}
                />

                <Select
                  size="xs"
                  placeholder="Pick Region"
                  data={[...regions].map((region) => ({
                    value: region,
                    label: region,
                  }))}
                  nothingFoundMessage="No options"
                  searchable
                  clearable
                  onChange={onChangeRegion}
                />
              </Group>
              <Stack>
                <LoadingOverlay visible={isLoading} />
                <TableScrollContainer minWidth={500}>
                  <Table verticalSpacing={"md"} striped highlightOnHover>
                    <TableThead>
                      <TableTr>
                        <TableTh>NO</TableTh>
                        <TableTh>NAME</TableTh>
                        <TableTh>ROLE</TableTh>
                        <TableTh>REGION</TableTh>
                        <TableTh>SKILLS</TableTh>
                        <TableTh>DEALS</TableTh>
                        <TableTh>CLIENTS</TableTh>
                      </TableTr>
                    </TableThead>
                    <TableTbody>
                      {sale?.data.map((salesRep, index) => {
                        return (
                          <TableRow
                            index={index}
                            item={salesRep}
                            key={salesRep.id}
                          />
                        );
                      })}
                    </TableTbody>
                  </Table>
                </TableScrollContainer>
                <PaginationComponent
                  activePagination={activePagination}
                  onChangePagination={setPagination}
                  onChangePaginationSize={setSizePagination}
                  paginationSize={sizePagination}
                  total={sale?.total_items ?? 0}
                />
              </Stack>
            </Paper>

            <ChartSalesOverviewComponent />
            <ChartRegionOverviewComponent />
            <ChartIndustryOverviewComponent />
          </Stack>
        </GridCol>
      </Grid>
      <ModalAI
        opened={isModalOpen}
        onClose={() => {
          onCloseModal();
        }}
      />
    </>
  );
}
