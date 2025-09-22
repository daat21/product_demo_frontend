import { Cards } from "@/components/dashboard/panel/cards";
import Charts from "@/components/dashboard/panel/charts";
import HighRiskClaimsWrapper from "@/components/dashboard/panel/high-risk-claims-wrapper";

export default function Page() {

  return <>
    <div className="
      flex
      flex-col
      gap-4
      [&_[data-slot=card]]:from-primary/1
      [&_[data-slot=card]]:bg-gradient-to-t
      [&_[data-slot=card]]:shadow-xs
    ">
      <Cards/>
      <HighRiskClaimsWrapper/>
      <Charts/>
    </div>
  </>
}
