"use server";

import { cookies } from "next/headers";

export const assignCase = async (claim_id: string | null | undefined, user_id: string | null | undefined) => {

  if (!claim_id || !user_id) return null;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) return null;

  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/claims/assign",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken.value ?? "",
      },
      body: JSON.stringify({ claim_id: claim_id, user_id: user_id }),
    }
  );
  const data = await res.json();

  return data;
};
