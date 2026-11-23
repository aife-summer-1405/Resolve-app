export interface ISellerFinanceDashboard {
  totalAmount: number;
  totalBookings: number;
  totalPayments: number;
  totalPerviousMonthAmount: number;
  totalCurrentMonthAmount: number;
}

export interface ISellerFinanceTransaction {
  id: string;
  userId: string;
  bookingId: number;
  amount: string;
  description: string;
  status: string;
  paymentUrl: string;
  transactionId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ISellerFinanceTransactionsResponse {
  data: ISellerFinanceTransaction[];
  totalCount: number;
}

export interface IGetSellerFinanceParams {
  page: number;
  limit: number;
  paymentStatus?: string;
  transactionType?: string;
}
