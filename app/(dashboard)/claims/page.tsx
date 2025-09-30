import { DataTable } from "@/components/dashboard/gallery/data-table";
import { columns, Claim } from "@/components/dashboard/gallery/columns";
import { getClaimsList } from "@/lib/gallery/getClaimsList";

export default async function Page() {
  const claims: Claim[] = (await getClaimsList()) ?? [];

  return (
    <div className="hidden h-full flex-1 flex-col gap-8 px-8 md:flex">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome back!
          </h2>
          <p className="text-muted-foreground">Consistently screen all claims within seconds.</p>
          <p className="text-muted-foreground">Pay out trustworthy claims faster, improve referrals, catch fraud.</p>
          <p className="text-muted-foreground">Reduce your loss ratio and improve service to your sincere customers.</p>
        </div>
      </div>
      <DataTable columns={columns} data={claims} />
    </div>
  );
}
