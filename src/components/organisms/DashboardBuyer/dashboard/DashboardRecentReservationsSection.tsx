"use client";

import { useTranslations } from "next-intl";
import {
  Bookmark,
  Play,
  MoreHorizontal,
  CircleCheck,
  CircleX,
} from "lucide-react";
import { IBookingsApiResponse } from "@/src/types/HousereservesType/BookingType";

interface IDashboardRecentReservationsSectionProps {
  reservation: IBookingsApiResponse;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const DashboardRecentReservationsSection = ({
  reservation,
}: IDashboardRecentReservationsSectionProps) => {
  const t = useTranslations("DashboardRecentReservationsSection");

  const reservations = reservation.data.slice(0, 5);

  return (
    <section className="flex w-full flex-col overflow-hidden rounded-xl bg-surface">
      <div className="flex h-[42px] shrink-0 items-center justify-between border-b border-dashed border-border px-4">
        <div className="flex items-center gap-2">
          <Bookmark
            size={17}
            fill="currentColor"
            className="text-foreground"
          />
          <span className="text-xs font-medium text-foreground">
            {t("title")}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] text-muted">{t("viewAll")}</span>
          <div className="flex items-center gap-1">
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

      <div className="w-full overflow-x-auto p-3">
        <div className="min-w-[620px]">
          <div
            dir="ltr"
            className="grid grid-cols-[50px_100px_130px_155px_minmax(150px,1fr)] items-center gap-2 rounded-lg bg-background px-3 py-2 text-[11px] font-medium text-foreground"
          >
            <span />
            <span className="text-center">{t("status")}</span>
            <span className="text-center">{t("price")}</span>
            <span className="text-center">{t("date")}</span>
            <span className="text-center">{t("accommodation")}</span>
          </div>

          <div className="mt-2 flex flex-col">
            {reservations.length > 0 ? (
              reservations.map((item) => (
                <div
                  key={item.id}
                  dir="ltr"
                  className="grid grid-cols-[50px_100px_130px_155px_minmax(150px,1fr)] items-center gap-2 rounded-lg px-3 py-2 odd:bg-surface even:bg-background/40"
                >
                  <div className="flex items-center justify-start">
                    <MoreHorizontal
                      size={17}
                      className="text-foreground"
                    />
                  </div>

                  <div className="flex justify-center">
                    <span
                      className={`flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-[9px] ${
                        item.status === "pending"
                          ? "bg-[#FF4D4F] text-white"
                          : "bg-[#8CFF45] text-black"
                      }`}
                    >
                      {item.status === "pending"
                        ? t("unconfirmed")
                        : t("confirmed")}

                      {item.status === "pending" ? (
                        <CircleX size={11} />
                      ) : (
                        <CircleCheck
                          size={11}
                          fill="currentColor"
                          className="text-black"
                        />
                      )}
                    </span>
                  </div>

                  <span className="whitespace-nowrap text-center text-[10px] text-foreground">
                    {Number(item.house.price).toLocaleString("fa-IR")}{" "}
                    {t("currency")}
                  </span>

                  <span className="whitespace-nowrap text-center text-[10px] text-foreground">
                    {formatDate(item.reservedDates[0])} -{" "}
                    {formatDate(item.reservedDates[1])}
                  </span>

                  <div
                    dir="rtl"
                    className="flex min-w-0 items-center justify-start gap-2"
                  >
                    <div className="h-[45px] w-[65px] shrink-0 rounded-lg bg-[#D9D9D9]" />
                    <span className="truncate text-[10px] text-foreground">
                      {item.house.title}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-xs text-muted">
                {t("empty")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardRecentReservationsSection;
