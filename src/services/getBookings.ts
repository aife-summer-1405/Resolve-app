import apiServer from "@/lib/server";
import { IGetBookingsParams } from "@/src/types/dashboard/booking";
import { IBookingResponse, IBookingsApiResponse } from "@/src/types/HousereservesType/BookingType";


export async function getBookings({
  page = 1,
  limit = 1000,
  sort,
  order,
  house_id,
  status,
  created_at,
}: IGetBookingsParams = {}): Promise<IBookingsApiResponse> {
  const response = await apiServer.get<IBookingsApiResponse>(
    "/api/bookings",
    {
      params: {
        page,
        limit,
        ...(sort && { sort }),
        ...(created_at && { created_at }),
        ...(order && { order }),
        ...(house_id !== undefined && { house_id }),
        ...(status && { status }),
      },
    },
  );

  return response.data;
}