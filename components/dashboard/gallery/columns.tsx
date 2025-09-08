"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Loader2, MoreHorizontal } from "lucide-react";

import { StatusBadge, type Status } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

export type Claim = {
  id: string;
  title: string;
  status: Status; // TODO
  risk_score: number | null;
  created_at: string;
  date?: string;
};

export const columns: ColumnDef<Claim>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.original.id;
      return <div>{id.slice(0, 8).toUpperCase()}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const iso = row.original.created_at || (row.getValue("date") as string);
      const date = new Date(iso);
      if (Number.isNaN(date.getTime())) return "-";
      return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: "ai_score",
    header: "AI Score",
    // TODO: Use a better bar component for the score
    cell: ({ row }) => {
      const score = row.original.risk_score;
      return (
        <div className="flex items-center gap-2">
          {score ? (
            <Progress value={score * 100} />
          ) : (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-muted-foreground">Pending</span>
            </>
          )}
          {score && `${score * 100}%`}
        </div>
      );
    },
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
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(claim.id)}
            >
              Copy Claim ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Claim</DropdownMenuItem>
            <DropdownMenuItem>Generate Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
