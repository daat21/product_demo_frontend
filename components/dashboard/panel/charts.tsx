import { ChartBarInteractive } from "@/components/dashboard/panel/bar-char-interactive";
import { ChartRadialSimple } from "@/components/dashboard/panel/radial-chart";
import { Claim } from "@/components/dashboard/cases/columns";
import { ClaimStats } from "@/components/dashboard/panel/cards";
import { ChartPieDonut } from "@/components/dashboard/panel/pie-chart-donut";


export default function Charts({
  claims,
  stats,
}: {
  claims: Claim[]
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
    <ChartBarInteractive claims={claims}/>
    <ChartRadialSimple claims={claims} stats={stats}/>
    <ChartPieDonut claims={claims}/>
  </div>
}