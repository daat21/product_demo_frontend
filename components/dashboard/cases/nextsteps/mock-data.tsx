export type Step = {
  id: string
  todo: string
  status: "pending" | "processing" | "success" | "failed"
  explanation: string
}

export const nextSteps: Step[] = [
  {
    id: "1casf",
    todo: "Assign case CLM-10234 to investigator Xiao",
    status: "processing",
    explanation: "Xiao is an intern while CLM-6EAE6 is a low risk case.",
  },
  {
    id: "qwed2",
    todo: "Assign case CLM-10236 to investigator Daming",
    status: "processing" ,
    explanation: "Daming is a senior researcher while CLM-6EAE6 is a low risk case.",
  },
  {
    id: "dsac3",
    todo: "Review recent high-risk claims flagged in the system",
    status: "processing",
    explanation: "There are 2 high-risk claims flagged in the system.",
  },
  {
    id: "4asdf",
    todo: "Cross-check claim history with similar cases.",
    status: "processing",
    explanation: "There are 2 similar cases in the system.",
  },
  {
    id: "5aeq2",
    todo: "Reach out to the claimant for additional details if necessary.",
    status: "processing",
    explanation: "The claimant has not responded to our request for additional details.",
  },
]
