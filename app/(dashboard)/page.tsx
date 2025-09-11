import { SectionCards } from "@/components/dashboard/section-cards";
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
// import { DataTable } from "@/components/dashboard/data-table";

import { DataTable } from "@/components/dashboard/gallery/data-table";
import { columns, Claim } from "@/components/dashboard/gallery/columns";
import { getClaimsList } from "@/lib/gallery/getClaimsList";

export default async function Page() {
  const claims: Claim[] = (await getClaimsList()) ?? [];

  return (
    <>
      <SectionCards />
      <div className="hidden h-full flex-1 flex-col gap-8 px-8 py-8 md:flex">
        <DataTable columns={columns} data={claims} />
      </div>
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </>
  );
}
