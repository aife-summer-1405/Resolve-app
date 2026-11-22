export interface IAdminPayment {
  id: string;
  userId: string;
  bookingId: number | null;
  amount: string;
  description: string;
  status: string;
  paymentUrl: string;
  transactionId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface IAdminPaymentsResponse {
  data: IAdminPayment[];
  totalCount: number;
}
