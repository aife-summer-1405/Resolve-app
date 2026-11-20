import apiServer from "@/lib/server";
import {
  IGetSellerFinanceParams,
  ISellerFinanceTransactionsResponse,
} from "../types/Seller_Dashboard/SelletDashboardfinance";

export const getSellerFinanceTransactions = async (
  params: IGetSellerFinanceParams,
): Promise<ISellerFinanceTransactionsResponse> => {
  const { data } = await apiServer.get<ISellerFinanceTransactionsResponse>(
    "/api/seller/finance",
    {
      params,
    },
  );

  return data;
};
