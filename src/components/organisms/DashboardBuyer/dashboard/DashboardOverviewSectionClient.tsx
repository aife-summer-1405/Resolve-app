"use client";

import { Bookmark, Play } from "lucide-react";
import ProfilePercentagePage from "./profilePercentagepage";
import DashboardReservationsChart from "./DashboardReservationsChart";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAction } from "@/src/actions/bookingActions";
import { IBookingResponse, IBookingsApiResponse } from "@/src/types/HousereservesType/BookingType";
import { IHouseFilters } from "@/src/types/HousereservesType/HouseFilterType";

interface IDashboardOverviewSectionClientProps {
  additionalPercentage: number;
  reservationsChartTitle: string;
  profileStatusTitle: string;
  editTitle: string;
}

const DashboardOverviewSectionClient = ({
  reservationsChartTitle,
  profileStatusTitle,
  editTitle,
}: IDashboardOverviewSectionClientProps) => {
   const defultFilter: IHouseFilters = {
  sort: "updated_at",
  order: "DESC",
};
  const { data: reservation, isLoading, isError } = useQuery({
    queryKey: ["bookings", "all", defultFilter],
    queryFn: () => getBookingsAction(defultFilter),
  });

  return (
    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
      <div className="flex aspect-[2.14/1] w-full min-h-0 flex-col overflow-hidden rounded-xl bg-surface">
        <div className="flex h-[52px] shrink-0 items-center border-b border-dashed border-border px-5">
          <div className="flex items-center gap-3">
            <Bookmark
              size={17}
              fill="currentColor"
              className="text-foreground"
            />
            <span className="text-xs font-medium text-foreground">
              {reservationsChartTitle}
            </span>
          </div>
        </div>

        <div className="min-h-0 flex-1 p-4">
          {isLoading ? (
            <div className="h-full w-full animate-pulse rounded-lg bg-card" />
          ) : isError ? (
            <p className="text-sm text-muted">خطا در دریافت اطلاعات رزروها</p>
          ) : (
            <DashboardReservationsChart reservations={reservation?.data || []} />
          )}
        </div>
      </div>

      <div className="flex aspect-[2.14/1] w-full flex-col overflow-hidden rounded-xl bg-surface">
        <div className="flex h-1/5 shrink-0 items-center justify-between border-b border-dashed border-border px-5">
          <div className="flex items-center gap-3">
            <Bookmark
              size={17}
              fill="currentColor"
              className="text-foreground"
            />
            <span className="text-xs font-medium text-foreground">
              {profileStatusTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted">{editTitle}</span>

            <div className="flex items-center gap-2">
              <Play
                size={11}
                fill="currentColor"
                strokeWidth={0}
                className="rotate-180 text-muted"
              />
              <Play
                size={9}
                fill="currentColor"
                strokeWidth={0}
                className="rotate-180 text-muted opacity-50"
              />
              <Play
                size={7}
                fill="currentColor"
                strokeWidth={0}
                className="rotate-180 text-muted opacity-30"
              />
            </div>
          </div>
        </div>

        <ProfilePercentagePage />
      </div>
    </div>
  );
};

export default DashboardOverviewSectionClient;