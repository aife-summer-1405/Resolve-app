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

export interface IBookingResponse {
    id: number;
    houseId: string;
    reservedDates: string[];
    traveler_details: ITravelerDetails[];
    sharedEmail: string;
    sharedMobile: string;
    user_id: number;
    status: string;
    created_at: string;
    updated_at: string;
}