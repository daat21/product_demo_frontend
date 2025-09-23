"use client"

import { LabelList, RadialBar, RadialBarChart } from "recharts"

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
} satisfies ChartConfig

export function ChartRadialSimple({
  cases,
  stats,
}: {
  cases: Case[]
  stats: ClaimStats
}) {
  const chartData = [
    { status: "total", data: cases.length, fill: "var(--color-total)" },
    { status: "queueing", data: stats.New, fill: "var(--color-queueing)" },
    { status: "inProgress", data: stats.Done, fill: "var(--color-inProgress)" },
    { status: "done", data: stats["In Progress"], fill: "var(--color-done)" },
  ]
  return (
    <Card className="flex flex-col min-h-[427px] max-h-[427px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status Overview</CardTitle>
        <CardDescription>For the last 3 months</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="status"/>}
            />
            <RadialBar dataKey="data" background>
              <LabelList
                position="insideStart"
                dataKey="status"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Overview of cases by status
        </div>
      </CardFooter>
    </Card>
  )
}
