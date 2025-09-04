import { TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/dashboard/status-badge";

export function Cards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Queueing</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            524
          </CardTitle>
          <CardAction>
            <StatusBadge status="green" content={
              <div className="flex gap-1">
                <TrendingUp className="h-4 w-4 text-green-700" />
                <p>+12.5%</p>
              </div>
            } />
          </CardAction>
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
          <CardAction>
            <StatusBadge status="red" content={
              <div className="flex gap-1">
                <TrendingDown className="h-4 w-4 text-red-700" />
                <p>-1.1%</p>
              </div>
            } />
          </CardAction>
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
          <CardAction>
            <StatusBadge status="green" content={
              <div className="flex gap-1">
                <TrendingUp className="h-4 w-4 text-green-700" />
                <p>+13.3%</p>
              </div>
            } />
          </CardAction>
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
          <CardAction>
            <StatusBadge status="green" content={
              <div className="flex gap-1">
                <TrendingUp className="h-4 w-4 text-green-700" />
                <p>+0.1%</p>
              </div>
            } />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Up 0.1% this week <TrendingUp className="size-4 text-green-700" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
