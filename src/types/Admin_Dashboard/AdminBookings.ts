export interface IAdminBooking {
  id: number;
  createdAt: string;
}

export interface IAdminBookingsResponse {
  data: IAdminBooking[];
  totalCount: number;
}
