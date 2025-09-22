import { Cards } from "@/components/dashboard/panel/cards";
import Charts from "@/components/dashboard/panel/charts";
import HighRiskClaimsWrapper from "@/components/dashboard/panel/high-risk-claims-wrapper";
import { getAllCasesList } from "@/lib/cases/getAllCases";
import { Case } from "@/components/dashboard/cases/columns";
import { getStatistics } from "@/lib/cases/getStatistics";

export default async function Page() {

  const cases: Case[] = (await getAllCasesList()) ?? [];
  const stats = await getStatistics();

  return <>
    <div className="
      flex
      flex-col
      gap-4
      [&_[data-slot=card]]:from-primary/1
      [&_[data-slot=card]]:bg-gradient-to-t
      [&_[data-slot=card]]:shadow-xs
    ">
      <Cards stats={stats} cases={cases}/>
      <HighRiskClaimsWrapper cases={cases}/>
      <Charts stats={stats} cases={cases}/>
    </div>
  </>
}
