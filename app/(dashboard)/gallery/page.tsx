import { DataTable } from "@/components/dashboard/gallery/data-table";
import { columns, Claim } from "@/components/dashboard/gallery/columns";
import { getClaimsList } from "@/lib/gallery/getClaimsList";

const data: Claim[] = [
  {
    id: "CLM-00001",
    created_at: "2025-01-01",
    title: "Test Claim 1",
    status: "in progress",
    risk_score: null,
  },
  {
    id: "CLM-00002",
    created_at: "2025-01-02",
    title: "Test Claim 2",
    status: "done",
    risk_score: 0.9,
  },
  {
    id: "CLM-00003",
    created_at: "2025-01-03",
    title: "Test Claim 3",
    status: "done",
    risk_score: 0.8,
  },
  {
    id: "CLM-00004",
    created_at: "2025-01-04",
    title: "Test Claim 4",
    status: "done",
    risk_score: 0.7,
  },

  {
    id: "CLM-00005",
    created_at: "2025-01-05",
    title: "Test Claim 5",
    status: "done",
    risk_score: 0.6,
  },
  {
    id: "CLM-00006",
    created_at: "2025-01-06",
    title: "Test Claim 6",
    status: "done",
    risk_score: 0.5,
  },
  {
    id: "CLM-00007",
    created_at: "2025-01-07",
    title: "Test Claim 7",
    status: "done",
    risk_score: 0.4,
  },
  {
    id: "CLM-00008",
    created_at: "2025-01-08",
    title: "Test Claim 8",
    status: "done",
    risk_score: 0.3,
  },
  {
    id: "CLM-00009",
    created_at: "2025-01-09",
    title: "Test Claim 9",
    status: "done",
    risk_score: 0.2,
  },
  {
    id: "CLM-00010",
    created_at: "2025-01-10",
    title: "Test Claim 10",
    status: "done",
    risk_score: 0.1,
  },
  {
    id: "CLM-00011",
    created_at: "2025-01-11",
    title: "Test Claim 11",
    status: "done",
    risk_score: 0.1,
  },
  {
    id: "CLM-00012",
    created_at: "2025-01-12",
    title: "Test Claim 12",
    status: "done",
    risk_score: 0.1,
  },
];

export default async function Page() {
  const claims: Claim[] = (await getClaimsList()) ?? [];

  return (
    <div className="hidden h-full flex-1 flex-col gap-8 px-8 md:flex">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome back!
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your gallery.
          </p>
        </div>
      </div>
      <DataTable columns={columns} data={claims} />
    </div>
  );
}
