"use server";

import { cookies } from "next/headers";

// get claims list including subordinates
export const getAllClaimsList = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) return null;
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/claims/all", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
  });
  const data = await res.json();
  if (!Array.isArray(data)) return [];

  return (data).map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      status: item.status,
      risk_score: item.risk_score,
      progress: item.progress,
      created_at: item.created_at,
      username: item.username,
      investigator: item.investigator,
    };
  });
};
