"use client"

import { TrendingUp } from "lucide-react"
import { RadialBar, RadialBarChart } from "recharts"

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
import { ClaimStats } from "@/components/dashboard/panel/cards";


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  total: {
    label: "Total",
    color: "var(--chart-1)",
  },
  queueing: {
    label: "Queueing",
    color: "var(--chart-2)",
  },
  inProgress: {
    label: "In Progress",
    color: "var(--chart-3)",
  },
  done: {
    label: "Done",
    color: "var(--chart-4)",
  },
  highRisk: {
    label: "High Risk",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartRadialSimple({
  cases,
  stats,
}: {
  cases: Case[]
  stats: ClaimStats
}) {
  const highRiskCount = cases.filter((c) => c.risk_score > 80).length;

  const chartData = [
    { status: "total", data: cases.length, fill: "var(--color-total)" },
    { status: "queueing", data: stats.New, fill: "var(--color-queueing)" },
    { status: "inProgress", data: stats.Done, fill: "var(--color-inProgress)" },
    { status: "done", data: stats["In Progress"], fill: "var(--color-done)" },
    { status: "highRisk", data: highRiskCount, fill: "var(--color-highRisk)" },
  ]
  return (
    <Card className="flex flex-col min-h-[427px] max-h-[427px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Case Overview</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="status"/>}
            />
            <RadialBar dataKey="data" background/>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4"/>
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
