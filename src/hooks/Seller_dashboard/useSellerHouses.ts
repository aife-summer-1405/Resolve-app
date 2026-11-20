"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSellerHousesAction } from "@/src/actions/getSellerHousesAction";
import { SellerHousesParams } from "@/src/types/Seller_Dashboard/SellerHousesType";

export const useSellerHouses = (params: SellerHousesParams) =>
  useQuery({
    queryKey: ["houses", "seller", params],
    queryFn: () => getSellerHousesAction(params),
    placeholderData: keepPreviousData, 
  });