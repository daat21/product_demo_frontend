import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleHelp, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { Step } from "@/components/dashboard/cases/nextsteps/mock-data";
import { useState } from "react";


export function TodoCell(
  {
    text
  }: {
    text: string;
  }) {
  const [showBox, setShowBox] = useState(false);

  return (
    <div className="flex gap-2 capitalize">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowBox((prev) => !prev)}
          className="text-muted-foreground hover:text-foreground"
        >
          <CircleHelp className="w-4 h-4"/>
        </button>
      </div>
      {showBox && (
        <div className="w-full rounded-md border bg-white p-2 shadow-md text-sm">
          {text}
        </div>
      )}
    </div>
  );
}

export const columns: ColumnDef<Step>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "todo",
    header: "Todo",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 capitalize">
        {row.getValue("todo")}
        <TodoCell text={row.original.explanation} />
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const nextStep = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
            >
              Accept
            </DropdownMenuItem>
            <DropdownMenuItem
            >
              Stash
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
