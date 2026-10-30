import { IHouseCommentsResponse } from "../types/HouseCommentsType";

export async function getAllComments(): Promise<IHouseCommentsResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/comments`,
  );

  if (!response.ok) {
    throw new Error("دریافت کامنت‌ها ناموفق بود");
  }

  return response.json();
}
