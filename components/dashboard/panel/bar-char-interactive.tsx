"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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
import { ClaimStats } from "@/components/dashboard/panel/cards";


const chartData1 = [
  { date: "2024-04-01", all: 222, highRisk: 50 },
  { date: "2024-04-02", all: 97, highRisk: 80 },
  { date: "2024-04-03", all: 167, highRisk: 20 }
]

type ChartData = {
  date: string; // YYYY-MM-DD
  all: number;
  highRisk: number;
};

function getChartData(cases: Case[]): ChartData[] {
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);

  // Step 1: filter last 3 months
  const recentClaims = cases.filter((c) => {
    const created = new Date(c.created_at);
    return created >= threeMonthsAgo && created <= now;
  });

  // Step 2: group by date
  const grouped: Record<string, { all: number; highRisk: number }> = {};

  for (const claim of recentClaims) {
    const date = claim.created_at.slice(0, 10); // YYYY-MM-DD
    if (!grouped[date]) {
      grouped[date] = { all: 0, highRisk: 0 };
    }
    grouped[date].all++;
    if (claim.risk_score > 80) {
      grouped[date].highRisk++;
    }
  }

  // Step 3: convert to chartData sorted by date
  return Object.entries(grouped)
  .map(([date, { all, highRisk }]) => ({
    date,
    all,
    highRisk,
  }))
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}


const chartConfig = {
  views: {
    label: "Case Count",
  },
  all: {
    label: "All",
    color: "var(--chart-2)",
  },
  highRisk: {
    label: "High Risk",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarInteractive({
  cases,
}: {
  cases: Case[]
}) {
  console.log(cases)
  const chartData = getChartData(cases)
  console.log(chartData)

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("all")

  const total = React.useMemo(
    () => ({
      all: chartData.reduce((acc, curr) => acc + curr.all, 0),
      highRisk: chartData.reduce((acc, curr) => acc + curr.highRisk, 0),
    }),
    []
  )

  return (
    <Card className="col-span-2 py-0 min-h-[427px] max-h-[427px]">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Everyday Cases</CardTitle>
          <CardDescription>
            For the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["all", "highRisk"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
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
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
