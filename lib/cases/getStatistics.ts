import { cookies } from "next/headers";

export const getStatistics = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) return null;
  console.log("start getting statistics");
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/claims/statistics", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
  });
  const data = await res.json();
  console.log(data);
  // {
  //     "New": 48,
  //     "In Progress": 1,
  //     "Done": 3
  // }
  return data;
};
