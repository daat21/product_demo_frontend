"use client";

import { toast } from "sonner";
import { getClaimScoreById } from "@/lib/gallery/getClaimScoreById";

export const analyzeClaimAndToast = async (
  claimId: string,
  title?: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const result = await getClaimScoreById(claimId);
    if (result && typeof result === "object" && "success" in result) {
      if (!result.success) {
        const message =
          (result as { message?: string }).message ||
          (title ? `Analyze failed for claim ${title}` : "Analyze failed");
        toast.error(message);
        return { success: false, message };
      }
    }
    toast.success(`Claim ${title ?? ""} analysis complete`.trim());
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "string"
        ? err
        : title
        ? `Analyze failed for claim ${title}`
        : "Analyze failed";
    toast.error(message);
    return { success: false, message };
  }
};
