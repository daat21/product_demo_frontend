"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

/**
 * Upload a single image for a claim.
 * Matches Postman format: form-data with keys `claim_id` (text) and `file` (file)
 */
export async function uploadImage(
  claimId: string,
  fileOrFiles: File | Blob | (File | Blob)[]
): Promise<{ success: boolean; image_ids?: string[]; error?: string }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  if (!accessToken) return { success: false, error: "Unauthorized" };

  const formData = new FormData();
  formData.append("claim_id", claimId);
  const filesArray = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
  for (const f of filesArray) {
    formData.append("files", f);
  }

  const res = await fetch(
    (process.env.NEXT_PUBLIC_SERVER_URL as string) + "/claims/upload-images",
    {
      method: "POST",
      headers: {
        // Don't set Content-Type; browser will add multipart boundary
        Authorization: `Bearer ${accessToken.value}`,
      },
      body: formData,
    }
  );

  let image_ids: string[] | undefined;
  let error: string | undefined;
  try {
    const body = (await res.json()) as {
      image_id?: string;
      image_ids?: string[];
      message?: string;
    };
    image_ids =
      body?.image_ids ?? (body?.image_id ? [body.image_id] : undefined);
    error = body?.message;
  } catch {
    // ignore body parse failures
  }

  if (!res.ok && !error) error = res.statusText || "Upload failed";

  if (res.ok) {
    // Ensure the claim detail page fetches fresh images immediately
    revalidatePath(`/gallery/${claimId}`);
  }

  return { success: res.ok, image_ids, error };
}
