import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClaimsTable } from "@/components/dashboard/cases/claims-table";
import { Case, columns } from "@/components/dashboard/cases/columns";


export default function HighRiskClaimsWrapper({
  cases
}: {
  cases: Case[]
}) {
  return <div className="
      px-4
      lg:px-6
      grid
      grid-cols-1
      @xl/main:grid-cols-2
      @5xl/main:grid-cols-4
      "
  >

    <Card className="col-span-4 gap-2 border shadow-xs">
      <CardHeader className="items-center pb-0">
        <CardTitle>High-Risk Claims</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="hidden h-full flex-1 flex-col md:flex">
          <ClaimsTable
            columns={columns}
            data={cases}
            pageSize={6}
            filterHighRisk={true}
            enableInvestigator={true}
            height={343}
          />
        </div>
      </CardContent>
    </Card>
  </div>
}