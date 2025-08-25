import { DataTable } from "@/components/dashboard/gallery/data-table";
import { columns, Claim } from "@/components/dashboard/gallery/columns";

const data: Claim[] = [
  {
    id: "CLM-00001",
    title: "Test Claim 1",
    status: "in progress",
    ai_score: null,
  },
  {
    id: "CLM-00002",
    title: "Test Claim 2",
    status: "done",
    ai_score: 0.9,
  },
  {
    id: "CLM-00003",
    title: "Test Claim 3",
    status: "done",
    ai_score: 0.8,
  },
  {
    id: "CLM-00004",
    title: "Test Claim 4",
    status: "done",
    ai_score: 0.7,
  },

  {
    id: "CLM-00005",
    title: "Test Claim 5",
    status: "done",
    ai_score: 0.6,
  },
  {
    id: "CLM-00006",
    title: "Test Claim 6",
    status: "done",
    ai_score: 0.5,
  },
  {
    id: "CLM-00007",
    title: "Test Claim 7",
    status: "done",
    ai_score: 0.4,
  },
  {
    id: "CLM-00008",
    title: "Test Claim 8",
    status: "done",
    ai_score: 0.3,
  },
  {
    id: "CLM-00009",
    title: "Test Claim 9",
    status: "done",
    ai_score: 0.2,
  },
  {
    id: "CLM-00010",
    title: "Test Claim 10",
    status: "done",
    ai_score: 0.1,
  },
  {
    id: "CLM-00011",
    title: "Test Claim 11",
    status: "done",
    ai_score: 0.1,
  },

  {
    id: "CLM-00012",
    title: "Test Claim 12",
    status: "done",
    ai_score: 0.1,
  },
];

export default function Page() {
  return (
    <>
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
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
