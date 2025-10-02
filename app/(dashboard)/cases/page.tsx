"use client"

import { ClaimsHistoryTable } from "@/components/dashboard/cases/data-table";
import Link from "next/link";
import { ClaimsTable } from "@/components/dashboard/cases/claims-table";
import { Claim, columns } from "@/components/dashboard/cases/columns";
import { NextStepTable } from "@/components/dashboard/cases/nextsteps/next-steps";
import { useEffect, useState } from "react";
import { getAllClaimsList } from "@/lib/cases/getAllClaims";

export default function CasesPage() {

  const [cases, setCases] = useState<Claim[]>([])

  useEffect(() => {
    getAllClaimsList().then((res) => setCases(res ?? []))
  }, [])

  return (
    <div className="hidden h-full flex-1 flex-col gap-8 px-8 md:flex">
      <div className="flex gap-4 w-full">
        <div className="flex-1">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">
            <Link href="/cases/queue">
              Queuing Cases
            </Link>
          </h2>
          <ClaimsTable
            columns={columns}
            data={cases}
            pageSize={11}
            filterUnassigned={true}
            enableInvestigator={false}
            height={590}
          />
        </div>
        <div className="flex-2 flex flex-col">
          <div>
            <h2 className="mb-4 text-xl font-semibold tracking-tight">
              <Link href="/cases/nextsteps">
                Next Suggested Steps
              </Link>
            </h2>
            <NextStepTable
              enableDetails={false}
              setCases={setCases}
            />
          </div>
          <div>
            <h2 className="mb-4 text-xl font-semibold tracking-tight">
              Processing Cases
            </h2>
            {/*Claims processing table*/}
            <ClaimsTable
              columns={columns}
              data={cases}
              enableInvestigator={true}
              enableProgress={true}
              filterAssigned={true}
              pageSize={3}
              height={190}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full gap-4">
        <div className="flex-1">
          <ClaimsHistoryTable/>
        </div>
      </div>
    </div>
  );
}
