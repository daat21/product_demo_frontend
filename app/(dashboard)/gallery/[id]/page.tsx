import { type Status } from "@/components/dashboard/status-badge";
import { ClaimsDetailHeader } from "@/components/dashboard/gallery/claims-detail/header";
import { ClaimsDetailAnalysisResult } from "@/components/dashboard/gallery/claims-detail/analysis-result";
import { ClaimsDetailDocuments } from "@/components/dashboard/gallery/claims-detail/documents";
import { ClaimsDetailChatbot } from "@/components/dashboard/gallery/claims-detail/chatbot";
import { ClaimsDetailNarrative } from "@/components/dashboard/gallery/claims-detail/narrative";
import { getClaimImagesById } from "@/lib/gallery/getClaimImagesById";

const claims: {
  id: string;
  date: string;
  title: string;
  status: Status;
  ai_score: number;
  consistency: number;
  overall_manipulation_score: number;
  manipulation_scores: {
    view_1: number;
    view_2: number;
    view_3: number;
  };
  documents: string[];
  narrative: string;
} = {
  id: "CLM-00011",
  date: "2025-01-11",
  title: "Test Claim 11",
  status: "done",
  ai_score: 0.1,
  consistency: 0.1,
  overall_manipulation_score: 0.1,
  manipulation_scores: {
    view_1: 0.1,
    view_2: 0.5,
    view_3: 0.9,
  },
  documents: [
    "im_1_1_fake.png",
    "im_1_2_fake.png",
    "im_1_3_fake.png",
    "im_1_4_fake.png",
  ],
  narrative:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const claimImages = await getClaimImagesById(id);
  const documents = Array.isArray(claimImages)
    ? claimImages.map((img: { previewUrl: string }) => img.previewUrl)
    : [];

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
        consistency={claims.consistency}
        overall_manipulation_score={claims.overall_manipulation_score}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto w-full">
        <ClaimsDetailDocuments documents={documents} />
        <ClaimsDetailNarrative narrative={claims.narrative} />
        <ClaimsDetailChatbot />
      </div>
    </div>
  );
}
