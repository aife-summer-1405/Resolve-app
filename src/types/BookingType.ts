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