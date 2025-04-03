"use client";

import { PaginationSize } from "@/components/PaginationComponent";
import { SideNavbar } from "@/components/SideNavbar";
import { SalesReportData } from "@/interfaces/sales-report.interface";
import { saleReports } from "@/utils/constant";
import {
  ActionIcon,
  Alert,
  Badge,
  Card,
  CardSection,
  Divider,
  Grid,
  GridCol,
  Group,
  Kbd,
  Paper,
  Select,
  Stack,
  Table,
  TableScrollContainer,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconAi, IconFilter, IconSearch, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function Page() {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [activePagination, setPagination] = useState(1);
  const [sizePagination, setSizePagination] = useState<PaginationSize>("10");
  const [searchQuery, setSearchQuery] = useDebouncedState<string | undefined>(
    undefined,
    500
  );

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    if (value.length === 0 || value === "") {
      setSearchQuery(undefined);
    } else {
      setSearchQuery(value);
    }
  };

  return (
    <Grid gutter={0}>
      <GridCol
        span={{
          base: 12,
          sm: 3,
          lg: 2,
        }}
      >
        <SideNavbar />
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
            withCloseButton
            title="AI Feature"
            icon={<IconAi size={16} />}
          >
            You can use AI to ask questions related to the sales report. To fast
            access this feature, you can use the shortcut <Kbd>Ctrl</Kbd> +{" "}
            <Kbd>K</Kbd>.
          </Alert>
          <Paper withBorder shadow="sm" radius="md" p={"lg"}>
            <Group justify="space-between">
              <Text>List of all Sales Reports</Text>
              <ActionIcon
                variant="filled"
                aria-label="Filter"
                onClick={() => setIsOpenFilter((prev) => !prev)}
              >
                {isOpenFilter && <IconX size={16} />}
                {!isOpenFilter && <IconFilter size={16} />}
              </ActionIcon>
            </Group>
            <Divider my={"md"} />
            <Group gap={"md"}>
              <TextInput
                size="xs"
                placeholder="Search"
                rightSection={<IconSearch size={16} />}
              />

              <Select
                size="xs"
                placeholder="Pick Region"
                data={[
                  "North America",
                  "Europe",
                  "Asia-Pacific",
                  "South America",
                  "Middle East",
                ].map((region) => ({
                  value: region,
                  label: region,
                }))}
                nothingFoundMessage="No options"
                searchable
                clearable
              />
            </Group>
            <Stack>
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
                    {saleReports.salesReps.map((salesRep, index) => {
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
            </Stack>
          </Paper>

          <Card withBorder shadow="sm" radius="md">
            <CardSection withBorder inheritPadding py="xs">
              Sales Overview
            </CardSection>
            <Stack></Stack>
          </Card>

          <Card withBorder shadow="sm" radius="md">
            <CardSection withBorder inheritPadding py="xs">
              Region Most Deals
            </CardSection>
            <Stack></Stack>
          </Card>

          <Card withBorder shadow="sm" radius="md">
            <CardSection withBorder inheritPadding py="xs">
              Client Most Deals
            </CardSection>
            <Stack></Stack>
          </Card>
        </Stack>
      </GridCol>
    </Grid>
  );
}

type TableRowProps = {
  item: SalesReportData;
  index: number;
};
const TableRow = ({ item, index }: TableRowProps) => {
  const [currentShow, setCurrentShow] = useState<
    "deals" | "clients" | undefined
  >();
  const { id, name, role, region, skills, deals, clients } = item;

  const handleShowExtra = (type: "deals" | "clients") => {
    if (currentShow === type) {
      setCurrentShow(undefined);
    } else {
      setCurrentShow(type);
    }
  };

  return (
    <>
      <TableTr key={id}>
        <TableTd>{index + 1}</TableTd>
        <TableTd>{name}</TableTd>
        <TableTd>{role}</TableTd>
        <TableTd>{region}</TableTd>
        <TableTd>{skills.join(", ")}</TableTd>
        <TableTd>
          <ActionIcon
            variant={currentShow === "deals" ? "filled" : "light"}
            onClick={() => handleShowExtra("deals")}
          >
            {deals.length}
          </ActionIcon>
        </TableTd>
        <TableTd>
          <ActionIcon
            variant={currentShow === "clients" ? "filled" : "light"}
            onClick={() => handleShowExtra("clients")}
          >
            {clients.length}
          </ActionIcon>
        </TableTd>
      </TableTr>
      {currentShow === "deals" && (
        <>
          <TableTr className="bg-green-400! text-white!">
            <TableTh colSpan={3}>CLIENT</TableTh>
            <TableTh colSpan={2}>VALUE</TableTh>
            <TableTh colSpan={2}>STATUS</TableTh>
          </TableTr>
          {deals.map((deal) => (
            <TableTr key={deal.client}>
              <TableTd colSpan={3}>{deal.client}</TableTd>
              <TableTd colSpan={2}>{deal.value}</TableTd>
              <TableTd colSpan={2}>
                <Badge color="green">{deal.status}</Badge>
              </TableTd>
            </TableTr>
          ))}
        </>
      )}

      {currentShow === "clients" && (
        <>
          <TableTr className="bg-blue-400! text-white!">
            <TableTh colSpan={3}>CLIENT</TableTh>
            <TableTh colSpan={2}>INDUSTRY</TableTh>
            <TableTh colSpan={2}>CONTACT</TableTh>
          </TableTr>
          {clients.map((client) => (
            <TableTr key={client.name}>
              <TableTd colSpan={3}>{client.name}</TableTd>
              <TableTd colSpan={2}>{client.industry}</TableTd>
              <TableTd colSpan={2}>{client.contact}</TableTd>
            </TableTr>
          ))}
        </>
      )}
    </>
  );
};
