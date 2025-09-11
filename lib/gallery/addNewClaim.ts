"use server";

import { cookies } from "next/headers";

export const addNewClaim = async (title: string, description: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) return null;

  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/claims", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
    body: JSON.stringify({
      title: title,
      description: description,
    }),
  });
  const data = await res.json();

  return data;
};
