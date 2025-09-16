export type Step = {
  id: string
  todo: string
  status: "pending" | "processing" | "success" | "failed"
  explanation: string
  // for demo purpose
  claim_id?: string
  user_id?: string
}

export const nextSteps: Step[] = [
  {
    id: "1casf",
    todo: "Assign case CLM-6EAE6 to John.",
    status: "processing",
    explanation: "CLM-6EAE6 is a high risk claim, assign it to Senior Investigator John!",
    claim_id: "6eae6286-cfcc-46e3-86b3-aa507ed23e18",
    user_id: "2e9731d8-cfa8-40f6-877b-bfb270df93b6",
  },
  {
    id: "qwed2",
    todo: "Assign case CLM-C90CC to Eugene.",
    status: "processing" ,
    explanation: "CLM-C90CC is a medium risk claim, assign it to Junior Investigator Eugene!",
    claim_id: "c90cc2b1-67a5-47d2-ba5a-e12780c600ca",
    user_id: "f96a628f-724b-441a-a145-e2302b1b6010",
  },
  {
    id: "vb4ffn",
    todo: "Annual performance review for the team.",
    status: "processing",
    explanation: "Annual performance review is due on 1th October 2025.",
  },
  {
    id: "dvrt3",
    todo: "Review Cathy's leave request.",
    status: "processing",
    explanation: "Cathy has applied for leave, please review it.",
  },
  {
    id: "vbrt3",
    todo: "View recent customer complaints.",
    status: "processing",
    explanation: "There are 3 customer complaints to be reviewed.",
  },
  {
    id: "dsaac3",
    todo: "Review recent high-risk claims flagged in the system.",
    status: "processing",
    explanation: "There are 2 high-risk claims flagged in the system.",
  },
  {
    id: "4agsdf",
    todo: "Cross-check claim history with similar cases.",
    status: "processing",
    explanation: "There are 2 similar cases in the system.",
  },
  {
    id: "5areq2",
    todo: "Reach out to the claimant for additional details if necessary.",
    status: "processing",
    explanation: "The claimant has not responded to our request for additional details.",
  },
]
