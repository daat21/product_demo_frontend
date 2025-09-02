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
import { Badge } from "@/components/ui/badge";


const claimsQueue = [
  {
    claimId: "CLM-10234",
    status: "New",
    risk: 91,
  },
  {
    claimId: "CLM-10235",
    status: "New",
    risk: 87,
  },
  {
    claimId: "CLM-10236",
    status: "New",
    risk: 41,
  },
  {
    claimId: "CLM-10237",
    status: "New",
    risk: 34,
  },
  {
    claimId: "CLM-10238",
    status: "New",
    risk: 1,
  },
  {
    claimId: "CLM-10239",
    status: "New",
    risk: 2,
  },
  {
    claimId: "CLM-10240",
    status: "New",
    risk: 81,
  },
  {
    claimId: "CLM-10334",
    status: "New",
    risk: 91,
  },
  {
    claimId: "CLM-10335",
    status: "New",
    risk: 87,
  },
  {
    claimId: "CLM-10336",
    status: "New",
    risk: 45,
  },
  {
    claimId: "CLM-10337",
    status: "New",
    risk: 84,
  },
  {
    claimId: "CLM-10338",
    status: "New",
    risk: 1,
  },
  {
    claimId: "CLM-10339",
    status: "New",
    risk: 2,
  },
  {
    claimId: "CLM-10340",
    status: "New",
    risk: 34,
  },
  {
    claimId: "CLM-10234",
    status: "New",
    risk: 91,
  },
  {
    claimId: "CLM-10235",
    status: "New",
    risk: 87,
  },
  {
    claimId: "CLM-10236",
    status: "New",
    risk: 4,
  },
  {
    claimId: "CLM-10237",
    status: "New",
    risk: 84,
  },
  {
    claimId: "CLM-10238",
    status: "New",
    risk: 1,
  },
  {
    claimId: "CLM-10239",
    status: "New",
    risk: 2,
  },
  {
    claimId: "CLM-10240",
    status: "New",
    risk: 81,
  },
  {
    claimId: "CLM-10334",
    status: "New",
    risk: 91,
  },
  {
    claimId: "CLM-10335",
    status: "New",
    risk: 87,
  },
  {
    claimId: "CLM-10336",
    status: "New",
    risk: 4,
  },
  {
    claimId: "CLM-10337",
    status: "New",
    risk: 84,
  },
  {
    claimId: "CLM-10338",
    status: "New",
    risk: 1,
  },
  {
    claimId: "CLM-10339",
    status: "New",
    risk: 2,
  },
  {
    claimId: "CLM-10340",
    status: "New",
    risk: 81,
  },
];

const claimsProcessing = [
  {
    claimId: "CLM-10234",
    Investigator: "Domma",
    risk: 81,
    progress: 91,
  },
  {
    claimId: "CLM-10235",
    Investigator: "Bill",
    risk: 23,
    progress: 87,
  },
  {
    claimId: "CLM-10236",
    Investigator: "Dickens",
    risk: 45,
    progress: 86,
  },
  {
    claimId: "CLM-10237",
    Investigator: "Billy",
    risk: 12,
    progress: 91,
  },
  {
    claimId: "CLM-10d35",
    Investigator: "Shiva",
    risk: 81,
    progress: 87,
  },
  {
    claimId: "CLM-102f6",
    Investigator: "Daming",
    risk: 99,
    progress: 86,
  },
  {
    claimId: "CLM-1g234",
    Investigator: "Xiao",
    risk: 98,
    progress: 91,
  },
  {
    claimId: "CLM-102h5",
    Investigator: "Angus",
    risk: 99,
    progress: 87,
  },
  {
    claimId: "CLM-10t36",
    Investigator: "Daming",
    risk: 98,
    progress: 86,
  },
];

const claimsHistory = [
  {
    claimId: "CLM-10234",
    Investigator: "Xiao",
    status: "Finalized",
  },
  {
    claimId: "CLM-10235",
    Investigator: "Angus",
    status: "Finalized",
  },
  {
    claimId: "CLM-10236",
    Investigator: "Daming",
    status: "Finalized",
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
                  <Badge className="bg-blue-100 text-blue-700">{invoice.status}</Badge>
                </TableCell>
                <TableCell className="h-12 items-center text-center">
                  {invoice.risk > 60
                    ? <Badge className="bg-red-100 text-red-700">High</Badge>
                    : invoice.risk < 20
                      ? <Badge className="bg-green-100 text-green-700">Low</Badge>
                      : <Badge className="bg-yellow-100 text-yellow-700">Medium</Badge>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
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
    // </div>
  );
}

export function ClaimsProcessingTable() {
  const PAGE_SIZE = 5;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(claimsProcessing.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const currentData = claimsProcessing.slice(startIndex, startIndex + PAGE_SIZE);

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
                {invoice.Investigator}
              </TableCell>
              <TableCell className="h-12 items-center text-center">
                {invoice.risk > 60
                  ? <Badge className="bg-red-100 text-red-700">High</Badge>
                  : invoice.risk < 20
                    ? <Badge className="bg-green-100 text-green-700">Low</Badge>
                    : <Badge className="bg-yellow-100 text-yellow-700">Medium</Badge>}
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
                <div className="flex flex-col items-center justify-center gap-1">
                  <Badge className="bg-green-500 text-white">{item.status}</Badge>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
}
