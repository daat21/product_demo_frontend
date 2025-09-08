import { NextStepTable } from "@/components/dashboard/cases/nextsteps/next-steps";

export default function Page() {
  return <>
    <div className="hidden h-full flex-1 flex-col gap-2 px-8 md:flex">
      <h1 className="mb-4 text-xl font-semibold tracking-tight">
        Next Suggested Steps
      </h1>
      <NextStepTable enableDetails={true}/>
    </div>
  </>
}
