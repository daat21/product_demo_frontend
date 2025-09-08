"use server";

import { cookies } from "next/headers";
import type { Status } from "@/components/dashboard/status-badge";

type ApiClaim = {
  id: string;
  title: string;
  status: string;
  risk_score: number | null;
  created_at: string;
  [key: string]: unknown;
};

export const getClaimsList = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) return null;

  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/claims/list", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
  });
  const data = await res.json();

  if (!Array.isArray(data)) return [];

  const normalizeStatus = (raw: string | undefined): Status => {
    const s = (raw || "").toLowerCase();
    if (s === "done") return "done";
    if (s === "in progress" || s === "in_progress") return "in progress";
    if (s === "todo" || s === "to-do" || s === "to_do") return "todo";
    return "in progress";
  };

  return (data as ApiClaim[]).map((item) => {
    const riskRaw =
      typeof item.risk_score === "number" ? item.risk_score : null;
    const riskNormalized =
      riskRaw == null ? null : riskRaw > 1 ? riskRaw / 100 : riskRaw; // 0..1

    return {
      id: item.id,
      title: item.title,
      status: normalizeStatus(item.status),
      risk_score: riskNormalized,
      created_at: item.created_at,
      date: item.created_at,
    };
  });
};
