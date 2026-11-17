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

export interface ICustomerBookingHouse extends Pick<
  IHouseDetails,
  | "title"
  | "address"
  | "rate"
  | "price"
  | "tags"
  | "capacity"
  | "location"
  | "categories"
  | "bathrooms"
  | "parking"
  | "rooms"
  | "yard_type"
  | "caption"
> {
  transaction_type:
    | "rental"
    | "mortgage"
    | "reservation"
    | "direct_purchase";
}

export interface ICustomerBookingResponse
  extends Omit<IBookingResponse, "house"> {
  house: ICustomerBookingHouse;
}

export interface ICustomerBookingsApiResponse {
  bookings: ICustomerBookingResponse[];
  totalCount: number;
}