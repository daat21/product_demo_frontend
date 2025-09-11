"use server";

import { revalidatePath } from "next/cache";

export const getClaimScoreById = async (id: string) => {
  const form = new FormData();
  form.append("claim_id", id);

  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/inference/files",
    {
      method: "POST",
      body: form,
    }
  );
  const data = await res.json();

  revalidatePath("/gallery");
  return data;
};
