"use server";

import { cookies } from "next/headers";

export const addNewClaim = async (
  title: string,
  description: string,
  files: (File | Blob)[]
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) return null;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  for (const file of files) {
    formData.append("files", file);
  }

  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/claims/create",
    {
      method: "POST",
      headers: {
        // Let fetch set the correct multipart boundary; do not set Content-Type manually
        Authorization: `Bearer ${accessToken.value}`,
      },
      body: formData,
    }
  );
  const data = await res.json();

  return data;
};
