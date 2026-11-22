import { IBookingResponse } from "../HousereservesType/BookingType";
import { IHouseDetails } from "../HousereservesType/HouseDetailType";

export interface IGetCustomerBookingsParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  houseId?: number;
  status?: string;
}

export interface ITravelerDetails {
  firstName: string;
  lastName: string;
  nationalId: string;
  birthDate: string;
  gender: "female" | "male";
}

export interface IBookingHouse {
  title: string;
  price: string;
}

export interface ICustomerBooking {
  id: number;
  user_id: number;
  houseId: string;
  reservedDates: string[];
  traveler_details: ITravelerDetails[];
  status: "pending" | "confirmed" | "canceled";
  sharedEmail: string;
  sharedMobile: string;
  createdAt: string;
  updatedAt: string;
  created_at: string;
  updated_at: string;
  house: IBookingHouse;
}

export interface ICustomerBookingsApiResponse {
  bookings: ICustomerBooking[];
  totalCount: number;
}

export interface ICancelBookingResponse {
  message: string;
  booking: unknown;
}
