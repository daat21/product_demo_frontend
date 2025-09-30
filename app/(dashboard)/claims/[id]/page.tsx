import { ClaimsDetailHeader } from "@/components/dashboard/gallery/claims-detail/header";
import { ClaimsDetailAnalysisResult } from "@/components/dashboard/gallery/claims-detail/analysis-result";
import { ClaimsDetailDocuments } from "@/components/dashboard/gallery/claims-detail/documents";
import { ClaimsDetailChatbot } from "@/components/dashboard/gallery/claims-detail/chatbot";
import { ClaimsDetailNarrative } from "@/components/dashboard/gallery/claims-detail/narrative";
import { getClaimImagesById } from "@/lib/gallery/getClaimImagesById";
import { getClaimDetailById } from "@/lib/gallery/getClaimDetailById";
import { ClaimsToolTips } from "@/components/dashboard/gallery/claims-detail/claims-tooltips";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const claimImages = await getClaimImagesById(id);
  const claimDetails = await getClaimDetailById(id);
  const documents = Array.isArray(claimImages)
    ? claimImages.map((img: { previewUrl: string }) => img.previewUrl)
    : [];

  return (
    <div className="flex flex-col gap-8 px-8 lg:px-8">
      <ClaimsDetailHeader
        title={claimDetails.title}
        status={claimDetails.status}
        date={claimDetails.date}
        actions={
          <ClaimsToolTips
            claimId={id}
            title={claimDetails.title}
            imageRisk={
              (claimDetails as { image_risk?: unknown | null })?.image_risk ??
              null
            }
          />
        }
      />
      <ClaimsDetailAnalysisResult
        ai_score={claimDetails.overall_manipulation_score}
        manipulation_scores={claimDetails.manipulation_scores}
        consistency={claimDetails.consistency}
        overall_manipulation_score={claimDetails.overall_manipulation_score}
        image_risk={
          (claimDetails as { image_risk?: unknown | null })?.image_risk ?? null
        }
        claimId={id}
        title={claimDetails.title}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto w-full">
        <ClaimsDetailDocuments documents={documents} />
        <ClaimsDetailNarrative narrative={claimDetails.description} />
        <ClaimsDetailChatbot />
      </div>
    </div>
  );
}
