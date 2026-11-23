"use server";

import apiServer from "@/lib/server";
import type { IAddProperty } from "@/src/schemas/properties/propertySchema";
export interface IUpdateHousePayload
  extends Omit<IAddProperty, "sellerId" | "sellerName" | "photos"> {
  photos: string[];
}
export const updateHouseAction = async (
  id: number,
  payload: IUpdateHousePayload
) => {
  const { data } = await apiServer.put(
    `/api/houses/${id}`,
    payload
  );

  return data;
};