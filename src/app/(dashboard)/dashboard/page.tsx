import DashboardOverviewSection from "@/src/components/organisms/DashboardBuyer/dashboard/DashboardOverviewSection";
import DashboardRecentReservationsSection from "@/src/components/organisms/DashboardBuyer/dashboard/DashboardRecentReservationsSection";
import { getBookings } from "@/src/hooks/dashboard/getBookings";
import { IHouseFilters } from "@/src/types/HousereservesType/HouseFilterType";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
export const defultFilter: IHouseFilters = {
  sort: "updated_at",
  order: "DESC",
}
const Page = async () => {      
  const queryClient = new QueryClient();

  const bookings = await queryClient.fetchQuery({
    queryKey: ["bookings", "all", defultFilter],
    queryFn: () => getBookings(defultFilter),
  });
  console.log("bookings", bookings);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mt-5 flex flex-col gap-5">
        <DashboardOverviewSection reservation={bookings} />
        <DashboardRecentReservationsSection reservation={bookings} />
      </div>
    </HydrationBoundary>
  );
};

export default Page;
