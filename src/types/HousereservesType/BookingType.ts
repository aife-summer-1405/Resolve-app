export interface ITravelerDetails {
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string;
    nationalId: string;
}

export interface IBookingData {
    houseId: number;
    reservedDates: string[];
    traveler_details: ITravelerDetails[];
    sharedEmail: string;
    sharedMobile: string;
}

export interface IBookingResult {
    success: boolean;
    data?: unknown;
    message?: string;
}
export interface IReservation extends IBookingData {
    guests: number;
    nights: number;
    total: number;
    checkIn: string;
    checkOut: string;
}
export interface IBookingHouse {
  title: string;
  price: string;
}
export interface IBookingResponse {
   id: number;
  user_id: number;
  houseId: string;
  reservedDates: [string, string];
  traveler_details: ITravelerDetails[];
  status: string;
  sharedEmail: string;
  sharedMobile: string;
  createdAt: string;
  updatedAt: string;
  created_at: string;
  updated_at: string;
  house: IBookingHouse;
}
export interface IBookingsApiResponse {
  data: IBookingResponse[];
  totalCount: number;
}

export interface ITravelerDetails {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  nationalId: string;
}



