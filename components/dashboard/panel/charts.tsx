import { ChartBarInteractive } from "@/components/dashboard/panel/bar-char-interactive";
import { ChartRadialSimple } from "@/components/dashboard/panel/radial-chart";
import { ChartPieLabel } from "@/components/dashboard/panel/pie-chart";
import { ChartLineMultiple } from "@/components/dashboard/panel/line-chart";


export default function Charts() {
  return <div className="*:data-[slot=card]:from-primary/5
      *:data-[slot=card]:to-card
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
      <ChartPieLabel />
    </div>
    <div className="col-span-2" data-slot="card">
      <ChartLineMultiple />
    </div>
  </div>
}