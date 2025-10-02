import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Claim } from "@/components/dashboard/cases/columns";

export type ClaimStats = {
  New: number;
  "In Progress": number;
  Done: number;
};

export function Cards({
  claims,
  stats,
}: {
  claims: Claim[]
  stats: ClaimStats
}) {
  const highRiskCount = claims.filter((c) => c.risk_score > 80).length;

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
          <CardDescription>Total Open Cases</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.New + stats["In Progress"]}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>High Risk Cases</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {highRiskCount}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Avg. Case Age</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            14 hours
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Avg. Risk Score</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            65 / 100
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
