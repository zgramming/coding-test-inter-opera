"use client";

import { SalesReportData } from "@/interfaces/sales-report.interface";
import { TableTr, TableTd, ActionIcon, TableTh, Badge } from "@mantine/core";
import { useState } from "react";

type TableRowProps = {
  item: SalesReportData;
  index: number;
};
export const TableRow = ({ item, index }: TableRowProps) => {
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
