"use client";

import { useQuery } from "@tanstack/react-query";
import { getPaymentsAction } from "@/src/actions/paymentActions";
import { IGetPaymentsParams } from "@/src/types/dashboard/payment";

export const useGetPayments = (params: IGetPaymentsParams) => {
  return useQuery({
    queryKey: ["payments", params],
    queryFn: () => getPaymentsAction(params),
    staleTime: 60 * 1000,
  });
};