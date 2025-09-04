"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { useState } from "react";
import { Status, StatusBadge } from "@/components/dashboard/status-badge";


const investigators = [
  {
    Name: "Dickens Ford",
    Title: "Junior Investigator",
    status: "Available",
    ProcessingCases: 12,
    PendingCases: 2,
    CompletedCases: 33,
  },
  {
    Name: "Moose Boson",
    Title: "Senior Investigator",
    status: "Terminated",
    ProcessingCases: 12,
    PendingCases: 2,
    CompletedCases: 3,
  },
  {
    Name: "Nurse Dickson",
    Title: "Staff Investigator",
    status: "Sick Leave",
    ProcessingCases: 12,
    PendingCases: 2,
    CompletedCases: 23,
  },
  {
    Name: "Kim Dickson",
    Title: "Intern",
    status: "Available",
    ProcessingCases: 12,
    PendingCases: 2,
    CompletedCases: 13,
  },
  {
    Name: "Dick Kimson",
    Title: "Intern",
    status: "Available",
    ProcessingCases: 12,
    PendingCases: 2,
    CompletedCases: 32,
  },
];


export function InvestigatorsTable() {
  return <div>
    <h2 className="mb-4 text-xl font-semibold tracking-tight">
      All Investigators
    </h2>
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investigators.map((item) => (
            <TableRow key={item.Name}>
              <TableCell className="h-12 text-center">
                {item.Name}
              </TableCell>
              <TableCell className="h-12 text-center">
                {item.Title}
              </TableCell>
              <TableCell className="h-12 text-center">
                <div className="flex flex-col items-center justify-center gap-1">
                  <StatusBadge status={item.status.toLowerCase() === "available" ? "green" as Status:
                    item.status.toLowerCase() === "terminated" ? "red" as Status:
                      item.status.toLowerCase() === "sick leave" ? "yellow" as Status: "todo" as Status}
                               content={item.status}/>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
}


export function InvestigatorsProgressTable() {
  const PAGE_SIZE = 5;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(investigators.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const currentData = investigators.slice(startIndex, startIndex + PAGE_SIZE);

  return <div>
    <h2 className="mb-4 text-xl font-semibold tracking-tight">
      Progress
    </h2>
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Processing</TableHead>
            <TableHead className="text-center">Pending</TableHead>
            <TableHead className="text-center">Total</TableHead>
            <TableHead className="text-center">Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((item) => (
            <TableRow key={item.Name}>
              <TableCell className="h-12 text-center">
                {item.Name}
              </TableCell>
              <TableCell className="h-12 text-center">
                {item.ProcessingCases}
              </TableCell>
              <TableCell className="h-12 text-center">
                {item.PendingCases}
              </TableCell>
              <TableCell className="h-12 text-center">
                {item.ProcessingCases + item.PendingCases + item.CompletedCases}
              </TableCell>
              <TableCell className="h-12 text-center">
                {((item.CompletedCases /
                  (item.ProcessingCases + item.PendingCases + item.CompletedCases)) * 100).toFixed(0)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    <div className="flex justify-center mt-4 gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        className="rounded-full"
      >
        ←
      </Button>

      {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
        <Button
          key={p}
          variant="outline"
          size="sm"
          onClick={() => setPage(p)}
          className={clsx(
            "w-8 h-8 rounded-md",
            page === p && "bg-blue-600 text-white hover:bg-blue-600"
          )}
        >
          {p}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        className="rounded-full"
      >
        →
      </Button>
    </div>
  </div>
}

