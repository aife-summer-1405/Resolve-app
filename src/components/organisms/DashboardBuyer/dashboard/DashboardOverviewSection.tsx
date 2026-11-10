import { getLocale, getTranslations } from "next-intl/server";
import { Bookmark, Play } from "lucide-react";
import DashboardStatCard from "./DashboardStatCard";
import ProfilePercentagePage from "./profilePercentagepage";
import { IBookingResponse, IBookingsApiResponse } from "@/src/types/HousereservesType/BookingType";
import DashboardReservationsChart from "./DashboardReservationsChart";
interface IDashboardOverviewSectionProps {
  additionalPercentage?: number;
  reservation: IBookingsApiResponse;

}
const DashboardOverviewSection = async ({
  additionalPercentage = 0,
  reservation
}: IDashboardOverviewSectionProps) => {
  const t = await getTranslations("DashboardOverviewSection");
  const locale = await getLocale();

  const cards = [
    "allReservations",
    "activeReservations",
    "unpaidReservations",
    "favorites",
  ] as const;


  return (
    <section className="flex w-full flex-col gap-4">
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <DashboardStatCard key={card} title={t(card)} />
        ))}
      </div>

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
        {t("reservationsChart")}
      </span>
    </div>
  </div>

  <div className="min-h-0 flex-1 p-4">
    <DashboardReservationsChart reservations={reservation} />
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
                {t("profileStatus")}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] text-muted">{t("edit")}</span>

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
    </section>
  );
};

export default DashboardOverviewSection;  