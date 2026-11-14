import DashboardOverviewSection from "@/src/components/organisms/DashboardBuyer/dashboard/DashboardOverviewSection";
import DashboardRecentReservationsSection from "@/src/components/organisms/DashboardBuyer/dashboard/DashboardRecentReservationsSection";
import { getBookings } from "@/src/hooks/dashboard/getBookings";
import { IHouseFilters } from "@/src/types/HousereservesType/HouseFilterType";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

const Page =  () => {      




  return (

      <div className="mt-5 flex flex-col gap-5">
        <DashboardOverviewSection/>
        <DashboardRecentReservationsSection />
      </div>
  );
};

export default Page;
