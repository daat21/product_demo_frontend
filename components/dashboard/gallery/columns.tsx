"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Claim = {
  id: string;
  title: string;
  status: "todo" | "in progress" | "done";
  ai_score: number | null;
};

const STATUS_LABELS: Record<Claim["status"], string> = {
  todo: "To-do",
  "in progress": "In Progress",
  done: "Done",
};

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const STATUS_STYLES: Record<
  Claim["status"],
  { variant: BadgeVariant; className?: string }
> = {
  todo: { variant: "secondary" },
  "in progress": {
    variant: "outline",
    className:
      "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-400/20 dark:text-yellow-300 dark:border-yellow-400/30",
  },
  done: {
    variant: "outline",
    className:
      "bg-green-100 text-green-800 border-green-200 dark:bg-green-400/20 dark:text-green-300 dark:border-green-400/30",
  },
};

export const columns: ColumnDef<Claim>[] = [
  {
    accessorKey: "id",
    header: "ID",
    // cell: ({ row }) => <div className="w-[40px]">{row.getValue("id")}</div>,
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
      const style = STATUS_STYLES[status];
      return (
        <Badge variant={style.variant} className={style.className}>
          {STATUS_LABELS[status]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "ai_score",
    header: "AI Score",
    // TODO: Add circle style
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
              Copy claim ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View claim</DropdownMenuItem>
            <DropdownMenuItem>Generate report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
