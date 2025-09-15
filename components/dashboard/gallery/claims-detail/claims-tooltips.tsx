"use client";

import * as React from "react";
import { Loader2, Upload, Trash2 } from "lucide-react";
import GradientSparklesIcon from "@/components/ui/gradient-sparkles";
import { Button } from "@/components/ui/button";
import { getClaimScoreById } from "@/lib/gallery/getClaimScoreById";
import { deleteClaimById } from "@/lib/gallery/deleteClaimById";
import { toast } from "sonner";
import GalleryImageUploader from "@/components/dashboard/gallery/image-uploader";

type ClaimsToolTipsProps = {
  claimId: string;
  title: string;
  imageRisk: unknown | null;
  onRefresh?: () => void;
};

export function ClaimsToolTips({
  claimId,
  title,
  imageRisk,
  onRefresh,
}: ClaimsToolTipsProps) {
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [isUploadingOpen, setIsUploadingOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function handleAnalyze() {
    try {
      setIsAnalyzing(true);
      await getClaimScoreById(claimId);
      toast.success(`Claim ${title} analysis complete`);
      onRefresh?.();
    } catch {
      toast.error(`Analyze failed for claim ${title}`);
    } finally {
      setIsAnalyzing(false);
    }
  }

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const { success, error } = await deleteClaimById(claimId);
      if (success) {
        toast.success("Claim deleted");
        onRefresh?.();
      } else {
        toast.error(error || "Delete failed");
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleAnalyze}
        disabled={isAnalyzing}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing
          </>
        ) : (
          <>
            <GradientSparklesIcon className="h-4 w-4" />
            {imageRisk != null ? "Re-analyze" : "Analyze"}
          </>
        )}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsUploadingOpen((v) => !v)}
      >
        <Upload className="h-4 w-4" />
        Upload Image
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-destructive hover:text-destructive/80"
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>

      {isUploadingOpen && (
        <div className="absolute right-8 top-16 z-40 w-[560px] max-w-[90vw]">
          <GalleryImageUploader />
        </div>
      )}
    </div>
  );
}

export default ClaimsToolTips;
