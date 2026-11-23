"use client";

import { useQuery } from "@tanstack/react-query";
import { getDiscountCodesAction } from "@/src/actions/DiscountAction";
import type { IGetDiscountCodesParams } from "@/src/types/Admin_Dashboard/DiscountCodes";

export const useGetDiscountCodes = (params: IGetDiscountCodesParams) => {
  return useQuery({
    queryKey: ["discount-codes", params],
    queryFn: () => getDiscountCodesAction(params),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
