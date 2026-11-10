import DashboardOverviewSection from "@/src/components/organisms/dashboard/DashboardOverviewSection";
import DashboardRecentReservationsSection from "@/src/components/organisms/dashboard/DashboardRecentReservationsSection";
import { getBookings } from "@/src/hooks/dashboard/getBookings";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Page = async () => {
  const queryClient = new QueryClient();

  const bookings = await queryClient.fetchQuery({
    queryKey: ["bookings", "all"],
    queryFn: () => getBookings(),
  });

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