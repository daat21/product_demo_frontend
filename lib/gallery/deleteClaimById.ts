"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const deleteClaimById = async (
  id: string
): Promise<{ success: boolean; error?: string }> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) return { success: false, error: "Unauthorized" };

  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/claims", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.value}`,
    },
    body: JSON.stringify({ claim_id: id }),
  });
  // Best-effort body read when failed (may be empty)
  let error: string | undefined;
  if (!res.ok) {
    try {
      const body = (await res.json()) as { message?: string } | null;
      error = body?.message || res.statusText || "Delete failed";
    } catch {
      error = res.statusText || "Delete failed";
    }
  }

  revalidatePath("/gallery");
  return { success: res.ok, error };
};
