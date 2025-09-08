"use client";

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DataTableToolbar } from "@/components/dashboard/gallery/data-table-toolbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


// Data contains claimId: string for sure
interface DataTableProps<TData extends { claimId: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enableActions?: boolean;
  enableToolbar?: boolean;
  enableInvestigator?: boolean;
  enableProgress?: boolean;
}

// Where the table forms, and pagination is added.
export function QueuingClaimsTable<TData extends { claimId: string }, TValue>({
  columns,
  data,
  enableActions = false,
  enableToolbar = false,
  enableInvestigator = false,
  enableProgress = false,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnVisibility: {
        investigator: enableInvestigator,   // child column
        progress: enableProgress,           // child column
        actions: enableActions,             // actions column
      },
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {enableToolbar && <DataTableToolbar/>}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {
              table.getHeaderGroups().map((headerGroup) => {
                return <TableRow key={headerGroup.id}>
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
              })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  // outside jsx (JavaScript XML)
                  className="cursor-pointer hover:bg-muted/50"
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
                    router.push(`/gallery/${row.original.claimId}`);
                  }}
                >
                  {/*rendering cells*/}
                  {/*inside jsx*/}
                  {row.getVisibleCells().map((cell) => {
                    return <TableCell key={cell.id}>
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
