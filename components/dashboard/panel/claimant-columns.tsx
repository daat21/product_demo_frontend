"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Claimant = {
  id: string;
  name: string;
  highRiskNum: number;
  totalNum: number;
}

export const claimantColumns: ColumnDef<Claimant>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div>{row.original.name}</div>;
    },
  },
  {
    accessorKey: "highRiskNum",
    header: "High Risk Cases",
    cell: ({ row }) => {
      return <div>{row.original.highRiskNum}</div>;
    },
  },
];
