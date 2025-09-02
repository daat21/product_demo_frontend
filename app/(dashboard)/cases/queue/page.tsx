import { ClaimsQueueTable } from "@/components/dashboard/cases/data-table";
import { Input } from "@/components/ui/input";

export default function Page() {
  return <>
    <div className="hidden h-full flex-1 flex-col gap-8 px-8 md:flex">
      <h1 className="mb-4 text-xl font-semibold tracking-tight">
        Cases Queue
      </h1>
      <Input placeholder="Search..." className="h-8 w-[150px] lg:w-[250px]" />
      <ClaimsQueueTable/>
    </div>
  </>
}
