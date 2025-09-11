"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Status, StatusBadge } from "@/components/dashboard/status-badge";

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
