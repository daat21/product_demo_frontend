"use server";

import { cookies } from "next/headers";

export const getClaimImagesById = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) return null;

  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/claims/images",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // The images endpoint expects raw token (curl example), not "Bearer <token>"
        Authorization: accessToken.value ?? "",
      },
      body: JSON.stringify({ claim_id: id }),
    }
  );
  const data = await res.json();

  return data;
};
