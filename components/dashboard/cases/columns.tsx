"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import {
  StatusBadge,
} from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

export type Case = {
  id: string;
  title: string;
  description: string;
  status: string;
  risk_score: number;
  progress: number;
  created_at: string;
  username: string;
  investigator: string;
};

export const columns: ColumnDef<Case>[] = [
  {
    accessorKey: "id",
    header: "Case ID",
    id: "id",
    cell: ({ row }) => {
      const id = row.original.id;
      return <div>CLM-{id.slice(0, 5).toUpperCase()}</div>;
    },
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
    accessorKey: "risk_score",
    header: "Risk Level",
    cell: ({ row }) => {
      const risk = row.original.risk_score;
      return risk > 80 ? <StatusBadge status="red" content="High"/> :
        risk < 20 ? <StatusBadge status="green" content="Low"/> :
          <StatusBadge status="yellow" content="Medium"/>;
    }
  },
  {
    accessorKey: "investigator",
    header: "Investigator",
    cell: ({ row }) => {
      const investigator = row.original.username;
      return <span>{investigator}</span>
    }
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const progress = row.original.progress == 0 ? 5 : row.original.progress;
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
