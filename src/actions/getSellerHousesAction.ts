"use server";

import apiServer from "@/lib/server";
import type {
  ISellerHousesResponse,
  SellerHousesParams,
} from "../types/Seller_Dashboard/SellerHousesType";

const cleanParams = (params: SellerHousesParams) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "$undefined" &&
        !(typeof value === "number" && Number.isNaN(value))
    )
  );
  console.log("cleanParams",cleanParams)
export const getSellerHousesAction = async (



  params: SellerHousesParams
): Promise<ISellerHousesResponse> => {

  const { data } = await apiServer.get<ISellerHousesResponse>(
    "/api/houses/seller/user",
    { params: cleanParams(params) }
  );

  return data;
};