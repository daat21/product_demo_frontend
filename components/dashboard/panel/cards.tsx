import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Case } from "@/components/dashboard/cases/columns";

export type ClaimStats = {
  New: number;
  "In Progress": number;
  Done: number;
};

export function Cards({
  cases,
  stats,
}: {
  cases: Case[]
  stats: ClaimStats
}) {
  const highRiskCount = cases.filter((c) => c.risk_score > 80).length;

  return (
    <div
      className="
      *:data-[slot=card]:from-primary/20
      *:data-[slot=card]:bg-gradient-to-t
      *:data-[slot=card]:shadow-xs
      grid
      grid-cols-1
      @xl/main:grid-cols-2
      @5xl/main:grid-cols-4
      gap-4
      px-4
      lg:px-6
      "
    >
      <Card className="@container/card" data-slot="card">
        <CardHeader>
          <CardDescription>Queueing</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.New}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Processing</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats["In Progress"]}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Done</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.Done}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>High Risk</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {highRiskCount}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
