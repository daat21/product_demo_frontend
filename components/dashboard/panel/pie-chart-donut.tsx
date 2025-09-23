"use client"

import { Label, Pie, PieChart } from "recharts"

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
  ChartContainer, ChartLegend, ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Case } from "@/components/dashboard/cases/columns";


const chartData1 = [
  { riskLevel: "low", num: 275, fill: "var(--color-low)" },
  { riskLevel: "medium", num: 200, fill: "var(--color-medium)" },
  { riskLevel: "high", num: 187, fill: "var(--color-high)" },
]

const chartConfig = {
  num: {
    label: "num",
  },
  low: {
    label: "Low",
    color: "var(--chart-1)",
  },
  medium: {
    label: "Medium",
    color: "var(--chart-2)",
  },
  high: {
    label: "High",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function ChartPieDonut({
  cases,
}: {
  cases: Case[]
}) {
  const lowCount = cases.filter((c) => {
    return c.risk_score < 20;
  }).length;
  const mediumCount = cases.filter((c) => {
    return c.risk_score > 20 && c.risk_score < 80;
  }).length;
  const highCount = cases.filter((c) => {
    return c.risk_score > 80;
  }).length;

  const chartData = [
    { riskLevel: "low", num: lowCount, fill: "var(--color-low)" },
    { riskLevel: "medium", num: mediumCount, fill: "var(--color-medium)" },
    { riskLevel: "high", num: highCount, fill: "var(--color-high)" },
  ]
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Risk Overview</CardTitle>
        <CardDescription>For the last 3 months</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="num"
              nameKey="riskLevel"
              innerRadius={60}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {cases.length}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Cases
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="riskLevel" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Overview of cases by risk level
        </div>
      </CardFooter>
    </Card>
  )
}
