"use server";

import { Status } from "@/components/dashboard/status-badge";
import { cookies } from "next/headers";
import {
  extractViewScoresFromImageRisk,
  buildManipulationScores,
  computeOverallAndConsistency,
} from "@/lib/gallery/score";

export const getClaimDetailById = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) return null;

  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/claims/single",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.value}`,
      },
      body: JSON.stringify({ claim_id: id }),
    }
  );
  const data = await res.json();

  const normalizeStatus = (raw: string | undefined): Status => {
    const s = (raw || "").toLowerCase();
    if (s === "done") return "done";
    if (s === "in progress" || s === "in_progress") return "in progress";
    if (s === "todo" || s === "to-do" || s === "to_do" || s === "to do")
      return "todo";
    return "in progress";
  };

  const galleryDateTimeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const viewScores = extractViewScoresFromImageRisk(
    (data as { image_risk?: unknown })?.image_risk
  );
  const manipulation_scores = buildManipulationScores(viewScores);

  const { overall: overall_manipulation_score, consistency } =
    computeOverallAndConsistency(viewScores);

  return {
    ...data,
    status: normalizeStatus(data.status),
    date: galleryDateTimeFormatter.format(new Date(data.created_at)),
    manipulation_scores,
    overall_manipulation_score,
    consistency,
  };
};
