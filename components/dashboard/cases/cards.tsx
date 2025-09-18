"use client";

import { TrendingDown, TrendingUp } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartLineDefault } from "@/components/dashboard/panel/line-chart";
import { ChartPieSimple } from "@/components/dashboard/panel/pie-chart";
import { ChartRadialSimple } from "@/components/dashboard/panel/radial-chart";
import { ChartBarInteractive } from "@/components/dashboard/panel/bar-char-interactive";

export function Cards() {
  return (
    <div className="flex flex-col gap-4">
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Queueing</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              524
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Up 12.5% this week <TrendingUp className="size-4 text-green-700" />
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Processing</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              134
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Down 0.1% this week <TrendingDown className="size-4 text-red-700" />
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>High Risk</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              38
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Up 12.5% this week <TrendingUp className="size-4 text-green-700" />
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Mean Triage</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              42 min
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Up 0.1% this week <TrendingUp className="size-4 text-green-700" />
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="*:data-[slot=card]:from-primary/5
      *:data-[slot=card]:to-card
      *:data-[slot=card]:shadow-xs
      lg:px-6
      grid grid-cols-1 gap-4 px-4
      @xl/main:grid-cols-2
      @5xl/main:grid-cols-4"
      >
        <div className="col-span-2" data-slot="card">
          <ChartBarInteractive />
        </div>
        <div data-slot="card">
          <ChartRadialSimple />
        </div>
        <div data-slot="card">
          <ChartPieSimple />
        </div>
        <div data-slot="card">
          <ChartRadialSimple />
        </div>
        <div className="col-span-2" data-slot="card">
          <ChartLineDefault />
        </div>
      </div>

    </div>

  );
}
