"use client";

import { useLocale, useTranslations } from "next-intl";
import { Bookmark, Play } from "lucide-react";
import DashboardStatCard from "./DashboardStatCard";

const DashboardOverviewSection = () => {
  const t = useTranslations("DashboardOverviewSection");
  const locale = useLocale();

  const cards = [
    "allReservations",
    "activeReservations",
    "unpaidReservations",
    "favorites",
  ] as const;

  const profilePercentage = 40;

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <DashboardStatCard key={card} title={t(card)} />
        ))}
      </div>

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex aspect-[2.14/1] w-full flex-col overflow-hidden rounded-xl bg-surface">
          <div className="flex h-1/5 shrink-0 items-center justify-between border-b border-dashed border-border px-5">
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
          <div
            dir="ltr"
            className="flex flex-1 items-center justify-between gap-5 px-[22px] py-5"
          >
            <div
              className="flex aspect-square w-1/4 shrink-0 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#8CFF45 0% ${profilePercentage}%, #D9D9D9 ${profilePercentage}% 100%)`,
              }}
            >
              <div className="aspect-square w-3/5 rounded-full bg-surface" />
            </div>
            <div className="flex h-full min-w-0 flex-1 flex-col items-end justify-between">
              <span className="text-xl font-bold leading-none text-foreground">
                {profilePercentage.toLocaleString(
                  locale === "fa" ? "fa-IR" : "en-US",
                )}
                {locale === "fa" ? "٪" : "%"}
              </span>

              <p className="w-full text-right text-[10px] leading-[1.8] text-foreground">
                {t("profileDescription")}
              </p>

              <span className="text-[9px] text-muted">{t("lastUpdate")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardOverviewSection;
