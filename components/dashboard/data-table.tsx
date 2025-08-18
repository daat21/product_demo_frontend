import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const invoices = [
  {
    claimId: "CLM-10234",
    holder: "John Doe",
    risk: 91,
    amount: "$8,200",
    sla: "2h 24m",
  },
  {
    claimId: "CLM-10235",
    holder: "Liam Smith",
    risk: 87,
    amount: "$12,000",
    sla: "3h 14m",
  },
  {
    claimId: "CLM-10236",
    holder: "Olivia Johnson",
    risk: 86,
    amount: "$18,000",
    sla: "5h 13m",
  },
  {
    claimId: "CLM-10237",
    holder: "Emma Williams",
    risk: 84,
    amount: "$12,000",
    sla: "5h 30m",
  },
  {
    claimId: "CLM-10238",
    holder: "Noah Brown",
    risk: 83,
    amount: "$18,000",
    sla: "5h 45m",
  },
  {
    claimId: "CLM-10239",
    holder: "Ava Davis",
    risk: 82,
    amount: "$12,000",
    sla: "5h 50m",
  },
  {
    claimId: "CLM-10240",
    holder: "William Miller",
    risk: 81,
    amount: "$18,000",
    sla: "5h 55m",
  },
];

export function DataTable() {
  return (
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead className="text-center">Claim ID</TableHead>
              <TableHead className="text-center">Holder</TableHead>
              <TableHead className="text-center">Risk</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-center">SLA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.claimId}>
                <TableCell className="h-14 text-center">
                  {invoice.claimId}
                </TableCell>
                <TableCell className="h-14 text-center">
                  {invoice.holder}
                </TableCell>
                <TableCell className="h-14 text-center">
                  <span className="flex items-center gap-2">
                    <Progress value={invoice.risk} /> {invoice.risk}%
                  </span>
                </TableCell>
                <TableCell className="h-14 text-center">
                  {invoice.amount}
                </TableCell>
                <TableCell className="h-14 text-center">
                  {invoice.sla}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
