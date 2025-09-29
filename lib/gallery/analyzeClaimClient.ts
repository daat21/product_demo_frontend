"use client";

import { toast } from "sonner";
import { getClaimScoreById } from "@/lib/gallery/getClaimScoreById";

const DEFAULT_TOAST_DURATION_MS = 1800;

export const analyzeClaimAndToast = async (
  claimId: string,
  title?: string
): Promise<{
  success: boolean;
  message?: string;
  reason?: "NO_IMAGES" | "ERROR";
  duration?: number;
}> => {
  try {
    const result = (await getClaimScoreById(claimId)) as
      | { success: true; data: unknown }
      | { success: false; message?: string; data?: { detail?: string } };
    if (result && typeof result === "object" && "success" in result) {
      if (!result.success) {
        const message =
          result.message ||
          (title ? `Analyze failed for claim ${title}` : "Analyze failed");
        const isNoImages =
          Boolean(result?.data?.detail === "No images") ||
          /No images/i.test(message);
        toast.error(message, { duration: DEFAULT_TOAST_DURATION_MS });
        return {
          success: false,
          message,
          reason: isNoImages ? "NO_IMAGES" : "ERROR",
          duration: DEFAULT_TOAST_DURATION_MS,
        };
      }
    }
    toast.success(`Claim ${title ?? ""} analysis complete`.trim(), {
      duration: DEFAULT_TOAST_DURATION_MS,
    });
    return { success: true, duration: DEFAULT_TOAST_DURATION_MS };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "string"
        ? err
        : title
        ? `Analyze failed for claim ${title}`
        : "Analyze failed";
    const isNoImages = /No images/i.test(message);
    toast.error(message, { duration: DEFAULT_TOAST_DURATION_MS });
    return {
      success: false,
      message,
      reason: isNoImages ? "NO_IMAGES" : "ERROR",
      duration: DEFAULT_TOAST_DURATION_MS,
    };
  }
};
