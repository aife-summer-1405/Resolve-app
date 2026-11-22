export interface IPayment {
  id: string;
  userId: string;
  bookingId: string | null;
  amount: string;
  description: string;
  status: string;
  paymentUrl: string;
  transactionId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface IGetPaymentsParams {
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
}

export interface IGetPaymentsResponse {
  payments: IPayment[];
  totalCount: number;
}