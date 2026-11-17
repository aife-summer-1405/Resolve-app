import apiServer from "@/lib/server";
import { ISellerFinanceDashboard } from "../types/Seller_Dashboard/SelletDashboardfinance";
export const getSelletDashboardfinance = async (): Promise<ISellerFinanceDashboard> => {
  console.log(343343);
  
  const { data } = await apiServer.get<ISellerFinanceDashboard>(
    "/api/seller/finance/dashboard"
  );

  return data;
};