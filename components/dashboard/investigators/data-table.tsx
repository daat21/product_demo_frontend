"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { useState, useEffect } from "react";
import { Status, StatusBadge } from "@/components/dashboard/status-badge";
import { getInvestigatorsList } from "@/lib/investigator/getInvestigators";
import { Progress } from "@/components/ui/progress";

export type Investigator = {
  Name: string;
  Title: string;
  Status: string;
  NewCases: number;
  InProgressCases: number;
  DoneCases: number;
};

export function InvestigatorsTable() {
  const [data, setData] = useState<Investigator[]>([]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const res = await getInvestigatorsList();
      if (isMounted) {
        setData(res ?? []);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
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
            {data.map((item) => (
              <TableRow key={item.Name}>
                <TableCell className="h-12 text-center">
                  {item.Name}
                </TableCell>
                <TableCell className="h-12 text-center">
                  {item.Title}
                </TableCell>
                <TableCell className="h-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <StatusBadge
                      status={
                        item.Status.toLowerCase() === "available" ? ("green" as Status) :
                          item.Status.toLowerCase() === "terminated" ? ("red" as Status) :
                            item.Status.toLowerCase() ===
                            "sick leave"
                            || "vacation"
                            || "parental leave"
                              ? ("yellow" as Status) :
                              ("todo" as Status)
                      }
                      content={item.Status}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function InvestigatorsProgressTable() {
  const [data, setData] = useState<Investigator[]>([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const res = await getInvestigatorsList();
      if (isMounted) {
        setData(res ?? []);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const currentData = data.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold tracking-tight">
        Progress
      </h2>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">New</TableHead>
              <TableHead className="text-center">In Progress</TableHead>
              <TableHead className="text-center">Done</TableHead>
              <TableHead className="text-center">Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item) => {
              const total = item.InProgressCases + item.NewCases + item.DoneCases;
              const progress = (item.DoneCases / (total || 1)) * 100;
              return <TableRow key={item.Name}>
                <TableCell className="h-12 text-center">{item.Name}</TableCell>
                <TableCell className="h-12 text-center">{item.NewCases}</TableCell>
                <TableCell className="h-12 text-center">{item.InProgressCases}</TableCell>
                <TableCell className="h-12 text-center">{item.DoneCases}</TableCell>
                {/*'flex justify-center' puts inside components into horizontally center*/}
                <TableCell className="h-12 text-center flex justify-center">
                  <div className="w-1/2 flex flex-col gap-1">
                    <span>{progress.toFixed(0)}%</span>
                    <Progress value={progress} />
                  </div>
                </TableCell>
              </TableRow>
          })}
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

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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
