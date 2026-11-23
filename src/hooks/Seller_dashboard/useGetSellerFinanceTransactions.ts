import { getSellerFinanceTransactionsAction } from "@/src/actions/sellerFinanceActions";
import { IGetSellerFinanceParams } from "@/src/types/Seller_Dashboard/SelletDashboardfinance";
import { useQuery } from "@tanstack/react-query";
export const useGetSellerFinanceTransactions = (
  params: IGetSellerFinanceParams,
) => {
  return useQuery({
    queryKey: ["sellerFinanceTransactions", params],
    queryFn: () => getSellerFinanceTransactionsAction(params),
  });
};