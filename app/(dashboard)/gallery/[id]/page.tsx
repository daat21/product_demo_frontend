import { type ClaimStatus } from "@/components/dashboard/status-badge";
import { ClaimsDetailHeader } from "@/components/dashboard/gallery/claims-detail/header";
import { ClaimsDetailAnalysisResult } from "@/components/dashboard/gallery/claims-detail/analysis-result";
import { ClaimsDetailDocuments } from "@/components/dashboard/gallery/claims-detail/documents";
import { ClaimsDetailChatbot } from "@/components/dashboard/gallery/claims-detail/chatbot";

const claims: {
  id: string;
  date: string;
  title: string;
  status: ClaimStatus;
  ai_score: number;
  manipulation_scores: {
    view_1: number;
    view_2: number;
    view_3: number;
  };
  documents: string[];
} = {
  id: "CLM-00011",
  date: "2025-01-11",
  title: "Test Claim 11",
  status: "done",
  ai_score: 0.1,
  manipulation_scores: {
    view_1: 0.1,
    view_2: 0.2,
    view_3: 0.3,
  },
  documents: [
    "im_1_1_fake.png",
    "im_1_2_fake.png",
    "im_1_3_fake.png",
    "im_1_4_fake.png",
  ],
};

export default function Page() {
  return (
    <div className="flex flex-col gap-8 px-8 lg:px-8">
      <ClaimsDetailHeader
        title={claims.title}
        status={claims.status}
        date={claims.date}
      />
      <ClaimsDetailAnalysisResult
        ai_score={claims.ai_score}
        manipulation_scores={claims.manipulation_scores}
      />
      <div className="flex gap-2 mx-auto w-full">
        <ClaimsDetailDocuments documents={claims.documents} />
        <ClaimsDetailChatbot />
      </div>
    </div>
  );
}
