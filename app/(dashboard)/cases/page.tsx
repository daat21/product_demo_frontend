import { ClaimsHistoryTable } from "@/components/dashboard/cases/data-table";
import { Cards } from "@/components/dashboard/cases/cards";
import Link from "next/link";
import { ClaimsTable } from "@/components/dashboard/cases/claims-table";
import { Case, columns } from "@/components/dashboard/cases/columns";
import { NextStepTable } from "@/components/dashboard/cases/nextsteps/next-steps";
import { getAllCasesList } from "@/lib/cases/getAllCases";

export default async function Page() {

  const cases: Case[] = (await getAllCasesList()) ?? [];

  return (
    // can merge??
    <div>
      <div className="hidden h-full flex-1 flex-col gap-8 px-8 md:flex">
        {/*below two can merge??*/}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome back!
            </h2>
            <p className="text-muted-foreground">
              This is all of the cases.
            </p>
          </div>
        </div>
        <Cards/>

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
              <NextStepTable enableDetails={false}/>
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
    </div>
  );
}
