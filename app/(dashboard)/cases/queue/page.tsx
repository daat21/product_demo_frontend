
import { Case, columns } from "@/components/dashboard/cases/columns";
import { ClaimsTable } from "@/components/dashboard/cases/claims-table";
import { getAllCasesList } from "@/lib/cases/getAllCases";

export default async function Page() {
  // TODO reuse the data
  const cases: Case[] = (await getAllCasesList()) ?? [];

  return <>
    <div className="hidden h-full flex-1 flex-col gap-8 px-8 md:flex">
      <h1 className="mb-4 text-xl font-semibold tracking-tight">
        Cases Queue
      </h1>
      <ClaimsTable columns={columns} data={cases} enableToolbar={true} enableActions={true}/>
    </div>
  </>
}
