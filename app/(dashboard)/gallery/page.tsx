import { DataTable } from "@/components/dashboard/gallery/data-table";

const data = [
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
        <DataTable />
      </div>
    </>
  );
}
