export interface IAdminBooking {
  id: number;
  user_id: number;
  houseId: string;
  reservedDates: string[];
  status: string;
  createdAt: string;
}

export interface IAdminBookingsResponse {
  data: IAdminBooking[];
  totalCount: number;
}

export interface IGetAdminBookingsParams {
  status?: string;
  user_id?: number;
  house_id?: number;
  order?: "ASC" | "DESC";
  sort?: string;
  limit?: number;
  page?: number;
}

export interface IAdminBookingTraveler {
  firstName: string;
  lastName: string;
  nationalId: string;
  birthDate: string;
  gender: string;
}

export interface IAdminBookingDetails extends IAdminBooking {
  traveler_details: IAdminBookingTraveler[];
  sharedEmail: string;
  sharedMobile: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IUpdateAdminBookingPayload {
  houseId: number;
  reservedDates: string[];
  traveler_details: IAdminBookingTraveler[];
  status: "pending" | "confirmed" | "canceled";
  sharedEmail: string;
  sharedMobile: string;
}
