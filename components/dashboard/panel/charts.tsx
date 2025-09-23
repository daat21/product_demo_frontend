import { ChartBarInteractive } from "@/components/dashboard/panel/bar-char-interactive";
import { ChartRadialSimple } from "@/components/dashboard/panel/radial-chart";
import { ChartPieLabel } from "@/components/dashboard/panel/pie-chart";
import { ChartLineMultiple } from "@/components/dashboard/panel/line-chart";
import { Case } from "@/components/dashboard/cases/columns";
import { ClaimStats } from "@/components/dashboard/panel/cards";
import { ChartPieLegend } from "@/components/dashboard/panel/pie-chart-2";
import { ChartPieDonut } from "@/components/dashboard/panel/pie-chart-donut";


export default function Charts({
  cases,
  stats,
}: {
  cases: Case[]
  stats: ClaimStats
}) {
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
    <ChartBarInteractive cases={cases}/>
    <ChartRadialSimple cases={cases} stats={stats}/>
    <ChartPieDonut cases={cases}/>
    <ChartLineMultiple cases={cases}/>
    <ChartPieLegend />
    <ChartPieLabel/>
  </div>
}