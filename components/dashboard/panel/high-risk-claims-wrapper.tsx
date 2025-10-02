import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClaimsTable } from "@/components/dashboard/cases/claims-table";
import { Claim, columns } from "@/components/dashboard/cases/columns";
import { Claimant, claimantColumns } from "@/components/dashboard/panel/claimant-columns";
import { ClaimantsTable } from "@/components/dashboard/panel/high-risk-claimants-table";


export default function HighRiskClaimsWrapper(
  {
    claims,
    claimants,
  }:{
    claims: Claim[]
    claimants: Claimant[]
  }
) {
  return <div className="
      px-4
      lg:px-6
      gap-4
      grid
      grid-cols-1
      @xl/main:grid-cols-6
      @5xl/main:grid-cols-8
      "
  >

    <Card className="col-span-5 gap-2 border shadow-xs">
      <CardHeader className="items-center pb-0">
        <CardTitle>High-Risk Claims</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="hidden h-full flex-1 flex-col md:flex">
          <ClaimsTable
            columns={columns}
            data={claims}
            pageSize={6}
            filterHighRisk={true}
            enableInvestigator={true}
            height={343}
          />
        </div>
      </CardContent>
    </Card>

    <Card className="col-span-3 gap-2 border shadow-xs">
      <CardHeader className="items-center pb-0">
        <CardTitle>Usual Suspects</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="hidden h-full flex-1 flex-col md:flex">
          <ClaimantsTable
            columns={claimantColumns}
            data={claimants}
            pageSize={6}
            height={343}
          />
        </div>
      </CardContent>
    </Card>
  </div>
}