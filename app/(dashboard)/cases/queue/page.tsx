import { columns } from "@/components/dashboard/cases/columns";
import { ClaimsTable } from "@/components/dashboard/cases/claims-table";
import { casesData } from "@/components/dashboard/cases/mock-data";

export default function Page() {
  return <>
    <div className="hidden h-full flex-1 flex-col gap-8 px-8 md:flex">
      <h1 className="mb-4 text-xl font-semibold tracking-tight">
        Cases Queue
      </h1>
      <ClaimsTable columns={columns} data={casesData} enableToolbar={true} enableActions={true}/>
    </div>
  </>
}
