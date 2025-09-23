"use client";

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DataTableToolbar } from "@/components/dashboard/gallery/data-table-toolbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";


// Data contains claimId and status: string for sure
interface DataTableProps<TData extends { id: string, name: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  height?: number;
}

// Where the table forms, and pagination is added.
export function ClaimantsTable<TData extends { id: string, name: string }, TValue>({
  columns,
  data,
  pageSize = 10,
  height = 500,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: false,
    autoResetPageIndex: false,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden rounded-md border">
        <div style={{ height: `${height}px` }} className="overflow-y-auto">
          <Table>
            <TableHeader>
              {
                table.getHeaderGroups().map((headerGroup) =>
                  (<TableRow key={headerGroup.id}>
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
                    // outside jsx (JavaScript XML)
                    className="cursor-pointer hover:bg-muted/50"
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {/*rendering cells*/}
                    {/*inside jsx*/}
                    {row.getVisibleCells().map((cell) => {
                      return <TableCell className="h-12.5" key={cell.id}>
                        {
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                      </TableCell>
                    })}
                  </TableRow>
                ))
              ) : (
                // outside jsx
                // if there is no roles, show "No results"
                <TableRow>
                  {/*inside jsx*/}
                  <TableCell
                    // here is considered tsx code
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {/*inside jsx*/}
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
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
  );
}
