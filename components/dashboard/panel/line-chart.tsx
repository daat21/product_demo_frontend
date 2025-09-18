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

export const description = "A multiple line chart"

const chartData = [
  { date: "13 Sep", new: 186, inProgress: 80 },
  { date: "14 Sep", new: 305, inProgress: 200 },
  { date: "15 Sep", new: 237, inProgress: 120 },
  { date: "16 Sep", new: 73, inProgress: 190 },
  { date: "17 Sep", new: 209, inProgress: 130 },
  { date: "18 Sep", new: 214, inProgress: 140 },
]

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

export function ChartLineMultiple() {
  return (
    <Card>
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
