import type { IHouseDetails } from "../types/HousereservesType/HouseDetailType";

export const getHouseById = async (id: string): Promise<IHouseDetails> => {
  const response = await fetch(`${process.env.API_URL}/api/houses/${id}`);

  if (!response.ok) {
    throw new Error("دریافت جزئیات خانه ناموفق بود");
  }

  return response.json();
};
