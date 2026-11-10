"use client";

import { useTranslations } from "next-intl";
import {
  Bookmark,
  Play,
  MoreHorizontal,
  CircleCheck,
  CircleX,
} from "lucide-react";

const DashboardRecentReservationsSection = () => {
  const t = useTranslations("DashboardRecentReservationsSection");

  const reservations = [
    { id: 1, status: "confirmed" },
    { id: 2, status: "unconfirmed" },
    { id: 3, status: "confirmed" },
    { id: 4, status: "confirmed" },
    { id: 5, status: "unconfirmed" },
  ];

  return (
    <section className="flex w-full flex-col overflow-hidden rounded-xl bg-surface">
      <div className="flex h-[42px] shrink-0 items-center justify-between border-b border-dashed border-border px-4">
        <div className="flex items-center gap-2">
          <Bookmark size={17} fill="currentColor" className="text-foreground" />

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
            <span></span>
            <span className="text-center">{t("status")}</span>
            <span className="text-center">{t("price")}</span>
            <span className="text-center">{t("date")}</span>
            <span className="text-center">{t("accommodation")}</span>
          </div>

          <div className="mt-2 flex flex-col">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                dir="ltr"
                className="grid grid-cols-[50px_100px_130px_155px_minmax(150px,1fr)] items-center gap-2 rounded-lg px-3 py-2 odd:bg-surface even:bg-background/40"
              >
                <div className="flex items-center justify-start">
                  <MoreHorizontal size={17} className="text-foreground" />
                </div>

                <div className="flex justify-center">
                  <span
                    className={`flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-[9px] ${
                      reservation.status === "unconfirmed"
                        ? "bg-[#FF4D4F] text-white"
                        : "bg-[#8CFF45] text-black"
                    }`}
                  >
                    {reservation.status === "unconfirmed"
                      ? t("unconfirmed")
                      : t("confirmed")}

                    {reservation.status === "unconfirmed" ? (
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
                  ۸,۰۰۰,۰۰۰ {t("currency")}
                </span>

                <span className="whitespace-nowrap text-center text-[10px] text-foreground">
                  ۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳
                </span>

                <div
                  dir="rtl"
                  className="flex min-w-0 items-center justify-start gap-2"
                >
                  <div className="h-[45px] w-[65px] shrink-0 rounded-lg bg-[#D9D9D9]" />

                  <span className="truncate text-[10px] text-foreground">
                    هتل سوران زانین رشت
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardRecentReservationsSection;
