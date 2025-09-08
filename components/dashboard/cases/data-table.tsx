"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { clsx } from "clsx";
import { Status, StatusBadge } from "@/components/dashboard/status-badge";
import { casesData } from "@/components/dashboard/cases/mock-data";


const claimsQueue = [
  {
    claimId: "CLM-10234",
    status: "new",
    risk: 91,
  },
  {
    claimId: "CLM-10235",
    status: "new",
    risk: 87,
  },
  {
    claimId: "CLM-10236",
    status: "new",
    risk: 41,
  },
  {
    claimId: "CLM-10237",
    status: "new",
    risk: 34,
  },
  {
    claimId: "CLM-10238",
    status: "new",
    risk: 1,
  },
  {
    claimId: "CLM-10239",
    status: "new",
    risk: 2,
  },
  {
    claimId: "CLM-10240",
    status: "new",
    risk: 81,
  },
  {
    claimId: "CLM-10334",
    status: "new",
    risk: 91,
  },
  {
    claimId: "CLM-10335",
    status: "new",
    risk: 87,
  },
  {
    claimId: "CLM-10336",
    status: "new",
    risk: 45,
  },
  {
    claimId: "CLM-10337",
    status: "new",
    risk: 84,
  },
  {
    claimId: "CLM-10338",
    status: "new",
    risk: 1,
  },
  {
    claimId: "CLM-10339",
    status: "new",
    risk: 2,
  },
  {
    claimId: "CLM-10340",
    status: "new",
    risk: 34,
  },
  {
    claimId: "CLM-10234",
    status: "new",
    risk: 91,
  },
  {
    claimId: "CLM-10235",
    status: "new",
    risk: 87,
  },
  {
    claimId: "CLM-10236",
    status: "new",
    risk: 4,
  },
  {
    claimId: "CLM-10237",
    status: "new",
    risk: 84,
  },
  {
    claimId: "CLM-10238",
    status: "new",
    risk: 1,
  },
  {
    claimId: "CLM-10239",
    status: "new",
    risk: 2,
  },
  {
    claimId: "CLM-10240",
    status: "new",
    risk: 81,
  },
  {
    claimId: "CLM-10334",
    status: "new",
    risk: 91,
  },
  {
    claimId: "CLM-10335",
    status: "new",
    risk: 87,
  },
  {
    claimId: "CLM-10336",
    status: "new",
    risk: 4,
  },
  {
    claimId: "CLM-10337",
    status: "new",
    risk: 84,
  },
  {
    claimId: "CLM-10338",
    status: "new",
    risk: 1,
  },
  {
    claimId: "CLM-10339",
    status: "new",
    risk: 2,
  },
  {
    claimId: "CLM-10340",
    status: "new",
    risk: 81,
  },
];


const claimsHistory = [
  {
    claimId: "CLM-10234",
    Investigator: "Xiao",
    status: "finalized",
  },
  {
    claimId: "CLM-10235",
    Investigator: "Angus",
    status: "finalized",
  },
  {
    claimId: "CLM-10236",
    Investigator: "Daming",
    status: "finalized",
  },
];

export function ClaimsQueueTable() {
  const PAGE_SIZE = 12; // rows per page
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(claimsQueue.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const currentData = claimsQueue.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div>
      <div className="overflow-hidden rounded-lg border min-h-155">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead className="text-center">Case ID</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Risk Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((invoice) => (
              <TableRow key={invoice.claimId}>
                <TableCell className="h-12 text-center">
                  {invoice.claimId}
                </TableCell>
                <TableCell className="h-12 text-center">
                  <StatusBadge status={invoice.status as Status}/>
                </TableCell>
                <TableCell className="h-12 items-center text-center">
                  {invoice.risk > 60
                    ? <StatusBadge status="high"/>
                    : invoice.risk < 20
                      ? <StatusBadge status="low"/>
                      : <StatusBadge status="medium"/>}
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
  );
}

export function ClaimsProcessingTable() {
  const PAGE_SIZE = 5;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(casesData.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const currentData = casesData.slice(startIndex, startIndex + PAGE_SIZE);

  return <div>
    <div className="overflow-hidden rounded-lg border min-h-72">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="text-center">Case ID</TableHead>
            <TableHead className="text-center">Investigator</TableHead>
            <TableHead className="text-center">Risk</TableHead>
            <TableHead className="text-center">Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((invoice) => (
            <TableRow key={invoice.claimId}>
              <TableCell className="h-12 text-center">
                {invoice.claimId}
              </TableCell>
              <TableCell className="h-12 text-center">
                {invoice.investigator}
              </TableCell>
              <TableCell className="h-12 items-center text-center">
                {invoice.risk > 60
                  ? <StatusBadge status="high"/>
                  : invoice.risk < 20
                    ? <StatusBadge status="low"/>
                    : <StatusBadge status="medium"/>}
              </TableCell>
              <TableCell className="h-12 text-center">
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-sm font-medium">{invoice.progress}%</span>
                  <Progress value={invoice.progress} className={"w-1/2"}/>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Pagination */}
    <div className="flex justify-center mt-4 gap-2">
      {/* Previous button */}
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        className="rounded-full"
      >
        ←
      </Button>

      {/* Page numbers */}
      {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
        <Button key={p} variant="outline" size="sm" onClick={() => setPage(p)}
                className={clsx("w-8 h-8 rounded-md",
                  page === p && "bg-blue-600 text-white hover:bg-blue-600"
                )}>
          {p}
        </Button>
      ))}

      {/* Next button */}
      <Button variant="outline" size="sm" disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="rounded-full">
        →
      </Button>
    </div>
  </div>
}

export function ClaimsHistoryTable() {
  return <div>
    <h2 className="mb-4 text-xl font-semibold tracking-tight">
      History Cases
    </h2>
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="text-center">Case ID</TableHead>
            <TableHead className="text-center">Investigator</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {claimsHistory.map((item) => (
            <TableRow key={item.claimId}>
              <TableCell className="h-12 text-center">
                {item.claimId}
              </TableCell>
              <TableCell className="h-12 text-center">
                {item.Investigator}
              </TableCell>
              <TableCell className="h-12 text-center">
                <StatusBadge status={item.status as Status}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
}
