import { ChartBarInteractive } from "@/components/dashboard/panel/bar-char-interactive";
import { ChartRadialSimple } from "@/components/dashboard/panel/radial-chart";
import { ChartPieLabel } from "@/components/dashboard/panel/pie-chart";
import { ChartLineMultiple } from "@/components/dashboard/panel/line-chart";


export default function Charts() {
  return <div className="
      px-4
      lg:px-6
      gap-4
      grid
      grid-cols-1
      @xl/main:grid-cols-2
      @5xl/main:grid-cols-4
      "
  >
    <ChartBarInteractive/>

    <ChartRadialSimple/>
    <ChartPieLabel/>
    <ChartLineMultiple/>
  </div>
}