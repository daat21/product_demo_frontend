import { Cards } from "@/components/dashboard/panel/cards";
import Charts from "@/components/dashboard/panel/charts";
import HighRiskClaimsWrapper from "@/components/dashboard/panel/high-risk-claims-wrapper";
import { Claim } from "@/components/dashboard/cases/columns";
import { getStatistics } from "@/lib/cases/getStatistics";
import { getAllClaimants } from "@/lib/cases/getAllClaimants";
import { Claimant } from "@/components/dashboard/panel/claimant-columns";
import { getAllClaimsList } from "@/lib/cases/getAllClaims";

export default async function Page() {

  const claims: Claim[] = (await getAllClaimsList()) ?? [];
  const claimants: Claimant[] = await getAllClaimants();
  const stats = await getStatistics();

  return <>
    <div className="
      flex
      flex-col
      gap-4
      [&_[data-slot=card]]:from-primary/2
      [&_[data-slot=card]]:bg-gradient-to-t
      [&_[data-slot=card]]:shadow-xs
    ">
      <Cards stats={stats} claims={claims}/>
      <HighRiskClaimsWrapper claims={claims} claimants={claimants}/>
      <Charts stats={stats} claims={claims}/>
    </div>
  </>
}
