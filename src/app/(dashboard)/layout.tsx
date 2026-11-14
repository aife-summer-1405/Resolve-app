import type { FC, ReactNode } from "react";
import DashboardHeader from "@/src/components/organisms/DashboardBuyer/dashboard/DashboardHeader";
import DashboardSidebar from "@/src/components/organisms/DashboardBuyer/dashboard/DashboardSidebar";
import { getBookings } from "@/src/hooks/dashboard/getBookings";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { IHouseFilters } from "@/src/types/HousereservesType/HouseFilterType";

interface IDashboardLayoutProps {
  children: ReactNode;
}

export const defultFilter: IHouseFilters = {
  page: 1,
  sort: "updated_at",
  order: "DESC",
};

const DashboardLayout: FC<IDashboardLayoutProps> = async ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["bookings", "all", defultFilter],
    queryFn: () => getBookings(defultFilter),
  });

  return (
    <div className="flex min-h-screen w-full bg-background" dir="rtl">
      <DashboardSidebar />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <main className="min-w-0 flex-1 p-6">
          <DashboardHeader />
          {children}
        </main>
      </HydrationBoundary>
    </div>
  );
};

export default DashboardLayout;