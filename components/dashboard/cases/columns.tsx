"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Loader2, MoreHorizontal } from "lucide-react";

import {
  StatusBadge,
  type Status,
} from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Case } from "@/components/dashboard/cases/mock-data";

export const columns: ColumnDef<Case>[] = [
  {
    accessorKey: "claimId",
    header: "Case ID",
    id: "claimId",
  },
  {
    accessorKey: "status",
    header: "Status",
    id: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <StatusBadge status="blue" content={status}/>;
    },
  },
  {
    accessorKey: "risk",
    header: "Risk Level",
    cell: ({ row }) => {
      const risk = row.original.risk;
      return risk > 80 ? <StatusBadge status="red" content="High"/> :
        risk < 20 ? <StatusBadge status="green" content="Low"/> :
          <StatusBadge status="yellow" content="Medium"/>;
    }
  },
  {
    accessorKey: "investigator",
    header: "Investigator",
    cell: ({ row }) => {
      const investigator = row.original.investigator;
      return <span>{investigator}</span>
    }
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const progress = row.original.progress;
      return progress && <div className="flex flex-col items-center justify-center gap-1">
        <span>{progress}%</span>
        <Progress value={progress}/>
      </div>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const claim = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-6 w-1 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Assign To</DropdownMenuItem>
            <DropdownMenuItem>Suspend</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
