import { ClaimsHistoryTable, ClaimsProcessingTable, ClaimsQueueTable } from "@/components/dashboard/cases/data-table";
import { Cards } from "@/components/dashboard/cases/cards";
import { NextSteps } from "@/components/dashboard/cases/next-steps";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div className="hidden h-full flex-1 flex-col gap-8 px-8 md:flex">
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
            <ClaimsQueueTable/>
          </div>
          <div className="flex-2 flex flex-col gap-6">
            <div>
              <h2 className="mb-4 text-xl font-semibold tracking-tight">
                Next Suggested Steps
              </h2>
              <NextSteps/>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-semibold tracking-tight">
                Processing Cases
              </h2>
              <ClaimsProcessingTable/>
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
