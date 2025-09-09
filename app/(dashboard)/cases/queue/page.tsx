"use client"


import { Case, columns } from "@/components/dashboard/cases/columns";
import { ClaimsTable } from "@/components/dashboard/cases/claims-table";
import { useEffect, useState } from "react";
import { getAllCasesList } from "@/lib/cases/getAllCases";

export default function Page() {
  // TODO reuse the data
  const [data, setData] = useState<Case[]>([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const res = await getAllCasesList();
      if (isMounted) {
        setData(res ?? []);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return <>
    <div className="hidden h-full flex-1 flex-col gap-8 px-8 md:flex">
      <h1 className="mb-4 text-xl font-semibold tracking-tight">
        Cases Queue
      </h1>
      <ClaimsTable columns={columns} data={data} enableToolbar={true} enableActions={true}/>
    </div>
  </>
}
