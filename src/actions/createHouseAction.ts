"use server";

import apiServer from "@/lib/server";
import type { IAddProperty, IProperty } from "@/src/schemas/properties/propertySchema";

interface ICreateHouseResponse {
  id: number;
}

export const createHouseAction = async (
  data: IAddProperty
): Promise<ICreateHouseResponse> => {
  const response = await apiServer.post<ICreateHouseResponse>(
    "/api/houses",
    data
  );

  return response.data;
};