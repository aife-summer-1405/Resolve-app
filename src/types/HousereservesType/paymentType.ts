export interface ICreatePaymentData {
    amount: number;
    description: string;
    callbackUrl: string;
    bookingId: number;
}
export interface ICreatePaymentResponse {
    paymentUrl: string;
    transactionId: string;
    paymentId: number;
    amount: number;
    status: string;
}