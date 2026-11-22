"use server";

import { getSellerFinanceTransactions } from "../services/getSellerFinanceTransactions";
import type {
  IGetSellerFinanceParams,
  ISellerFinanceTransactionsResponse,
} from "../types/Seller_Dashboard/SelletDashboardfinance";

export async function getSellerFinanceTransactionsAction(
  params: IGetSellerFinanceParams,
): Promise<ISellerFinanceTransactionsResponse> {
  return await getSellerFinanceTransactions(params);
}