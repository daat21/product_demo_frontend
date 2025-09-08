export type Step = {
  id: string
  todo: string
  status: "pending" | "processing" | "success" | "failed"
}

export const nextSteps: Step[] = [
  {
    id: "1casf",
    todo: "Assign case CLM-10234 to investigator Xiao",
    status: "processing"
  },
  { id: "qwed2", todo: "Assign case CLM-10236 to investigator Daming", status: "processing" },
  { id: "dsac3", todo: "Review recent high-risk claims flagged in the system", status: "processing" },
  { id: "4asdf", todo: "Cross-check claim history with similar cases.", status: "processing" },
  { id: "5aeq2", todo: "Reach out to the claimant for additional details if necessary.", status: "processing" },
]
