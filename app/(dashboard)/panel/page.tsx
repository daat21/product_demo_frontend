"use client"

import { Cards } from "@/components/dashboard/panel/cards";
import Charts from "@/components/dashboard/panel/charts";
import { Case } from "@/components/dashboard/cases/columns";
import { useEffect, useState } from "react";
import { getAllCasesList } from "@/lib/cases/getAllCases";
import HighRiskClaimsCard from "@/components/dashboard/panel/high-risk-claims-card";

export default function Page() {

  const [cases, setCases] = useState<Case[]>([])

  useEffect(() => {
    getAllCasesList().then((res) => setCases(res ?? []))
  }, [])

  return <>
    <div className="flex flex-col gap-4">
      <Cards/>
      <HighRiskClaimsCard cases={cases}/>
      <Charts/>
    </div>
  </>
}
