"use server";

import apiServer from "@/lib/server";
import type { IHouseDetails } from "@/src/types/HousereservesType/HouseDetailType";

export const getHouseByIdAction = async (
  id: string,
): Promise<IHouseDetails> => {
  const { data } = await apiServer.get(`/api/houses/${id}`);

  return data;
};