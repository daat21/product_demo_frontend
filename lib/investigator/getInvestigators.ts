"use server";

import { cookies } from "next/headers";

export const getInvestigatorsList = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) return null;
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/users/staff", {
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
      Name: item.name,
      Title: item.designation,
      Status: item.status,
      InProgressCases: item.in_progress_claims,
      NewCases: item.new_claims,
      DoneCases: item.done_claims,
    };
  });
};
