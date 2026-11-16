import { cookies } from "next/headers";
import { IHouseDetails } from "../types/HousereservesType/HouseDetailType";

export const getHouseById = async (
  id: string
): Promise<IHouseDetails> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(
    `${process.env.API_URL}/api/houses/${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("دریافت جزئیات خانه ناموفق بود");
  }

  return response.json();
};