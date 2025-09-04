import { ClaimsHistoryTable } from "@/components/dashboard/cases/data-table";
import { InvestigatorsProgressTable, InvestigatorsTable } from "@/components/dashboard/investigators/data-table";

export default function Page() {
  return (
    <>
      <div className="hidden flex-col gap-8 px-8 md:flex">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome back!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s investigators page.
            </p>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex-1">
            <InvestigatorsTable/>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex-1">
            <InvestigatorsProgressTable/>
          </div>
        </div>

      </div>

    </>
  );
}
