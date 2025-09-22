"use client"

import { Cards } from "@/components/dashboard/panel/cards";
import Charts from "@/components/dashboard/panel/charts";
import { Case } from "@/components/dashboard/cases/columns";
import { useEffect, useState } from "react";
import { getAllCasesList } from "@/lib/cases/getAllCases";
import HighRiskClaimsWrapper from "@/components/dashboard/panel/high-risk-claims-wrapper";

export default function Page() {

  const [cases, setCases] = useState<Case[]>([])

  useEffect(() => {
    getAllCasesList().then((res) => setCases(res ?? []))
  }, [])

  return <>
    <div className="
      flex
      flex-col
      gap-4
      [&_[data-slot=card]]:from-primary/2
      [&_[data-slot=card]]:bg-gradient-to-t
      [&_[data-slot=card]]:shadow-xs
    ">
      <Cards/>
      <HighRiskClaimsWrapper cases={cases}/>
      <Charts/>
    </div>
  </>
}
