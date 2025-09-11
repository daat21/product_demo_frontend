"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RowActionsContext } from "./row-actions-context";
import { useRef, useState, useCallback } from "react";

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [deletingRowIds, setDeletingRowIds] = useState<Set<string>>(new Set());
  const deletingRowIdsRef = useRef(deletingRowIds);
  deletingRowIdsRef.current = deletingRowIds;

  const startDeleteAnimation = useCallback(async (id: string) => {
    setDeletingRowIds((prev) => new Set(prev).add(id));
    // Wait for CSS animation to play
    await new Promise((resolve) => setTimeout(resolve, 500));
  }, []);

  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <RowActionsContext.Provider value={{ startDeleteAnimation, refresh }}>
      <div className="flex flex-col gap-4">
        <DataTableToolbar />
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={
                      "cursor-pointer hover:bg-muted/50 h-[53px] transition-all duration-500 " +
                      (deletingRowIds.has(row.original.id)
                        ? "animate-row-delete pointer-events-none opacity-0 -translate-y-1"
                        : "")
                    }
                    data-state={row.getIsSelected() && "selected"}
                    onClick={(event) => {
                      const target = event.target as HTMLElement;
                      if (
                        target.closest(
                          'button, a, input, textarea, [role="menuitem"], [data-no-row-click]'
                        )
                      ) {
                        return;
                      }
                      const id = row.original.id;
                      router.push(`/gallery/${id}`);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </RowActionsContext.Provider>
  );
}
