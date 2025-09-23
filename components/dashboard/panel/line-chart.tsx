"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Case } from "@/components/dashboard/cases/columns";

export const description = "A multiple line chart"

const chartData1 = [
  { date: "13 Sep", new: 186, inProgress: 80 },
  { date: "14 Sep", new: 305, inProgress: 200 },
  { date: "15 Sep", new: 237, inProgress: 120 },
  { date: "16 Sep", new: 73, inProgress: 190 },
  { date: "17 Sep", new: 209, inProgress: 130 },
  { date: "18 Sep", new: 214, inProgress: 140 },
]

type ChartData = {
  date: string; // e.g., "13 Sep"
  new: number;
  inProgress: number;
  done: number;
};

function getLastWeekData(cases: Case[]): ChartData[] {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  // Step 1: filter last 7 days
  const recentClaims = cases.filter((c) => {
    const created = new Date(c.created_at);
    return created >= sevenDaysAgo && created <= now;
  });

  // Step 2: group by date
  const grouped: Record<string, { new: number; inProgress: number; done: number }> = {};

  for (const claim of recentClaims) {
    const d = new Date(claim.created_at);
    const dateKey = d.toLocaleDateString("en-US", { day: "2-digit", month: "short" }); // e.g. "13 Sep"

    if (!grouped[dateKey]) {
      grouped[dateKey] = { new: 0, inProgress: 0, done: 0 };
    }

    if (claim.status === "New") grouped[dateKey].new++;
    else if (claim.status === "In Progress") grouped[dateKey].inProgress++;
    else if (claim.status === "Done") grouped[dateKey].done++;
  }

  // Step 3: convert to chartData sorted by date
  return Object.entries(grouped)
  .map(([date, { new: n, inProgress, done }]) => ({
    date,
    new: n,
    inProgress,
    done,
  }))
  .sort((a, b) => {
    const da = new Date(`${a.date} ${now.getFullYear()}`);
    const db = new Date(`${b.date} ${now.getFullYear()}`);
    return da.getTime() - db.getTime();
  });
}

const chartConfig = {
  new: {
    label: "New",
    color: "var(--chart-1)",
  },
  inProgress: {
    label: "In Progress",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartLineMultiple({
  cases,
}: {
  cases: Case[]
}) {
  const chartData = getLastWeekData(cases)
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Cases</CardTitle>
        <CardDescription>Cases in recent days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="new"
              type="monotone"
              stroke="var(--color-new)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="inProgress"
              type="monotone"
              stroke="var(--color-inProgress)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
