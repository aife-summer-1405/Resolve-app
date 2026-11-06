"use client";

import { useTranslations } from "next-intl";
import { PanelsTopLeft, UserRound, Play } from "lucide-react";
import DashboardStatCard from "./DashboardStatCard";

const DashboardOverviewSection = () => {
  const t = useTranslations("DashboardOverviewSection");

  const cards = [1, 2, 3, 4];
  const profilePercentage = 40;

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap justify-center gap-5">
        {cards.map((card) => (
          <DashboardStatCard key={card} />
        ))}
      </div>

      <div className="flex justify-center w-full flex-wrap gap-5">
        <div className="flex h-[247px] w-[547px] shrink-0 flex-col overflow-hidden rounded-xl bg-surface">
          <div className="flex h-[46px] shrink-0 items-center justify-between border-b border-dashed border-border px-5">
            <div className="flex items-center gap-3">
              <PanelsTopLeft size={19} className="text-foreground" />
              <span className="text-sm font-medium text-foreground">
                {t("incomeTitle")}
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between px-[22px] pb-[50px] pt-[28px]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#8CFF45]" />
                <span className="whitespace-nowrap text-sm font-medium text-foreground">
                  {t("currentMonthIncome")}
                </span>
              </div>
              <div className="flex h-[40px] w-[210px] shrink-0 items-center justify-center gap-3 rounded-xl bg-[#8CFF45] px-3 text-sm text-black">
                <span>115,000,000</span>
                <span>{t("currency")}</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#EAEAEA]" />

                <span className="whitespace-nowrap text-sm font-medium text-foreground">
                  {t("totalIncome")}
                </span>
              </div>

              <div className="flex h-[40px] w-[210px] shrink-0 items-center justify-center gap-3 rounded-xl bg-background px-3 text-sm text-foreground">
                <span>195,000,000</span>
                <span>{t("currency")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[247px] w-[547px] shrink-0 flex-col overflow-hidden rounded-xl bg-surface">
          <div className="flex h-[46px] shrink-0 items-center justify-between border-b border-dashed border-border px-5">
            <div className="flex items-center gap-3">
              <UserRound
                size={19}
                fill="currentColor"
                className="text-foreground"
              />

              <span className="text-sm font-medium text-foreground">
                {t("profileStatus")}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-muted">{t("edit")}</span>
              <div className="flex items-center gap-2">
                <Play
                  size={13}
                  fill="currentColor"
                  className="rotate-180 text-muted"
                />
                <Play
                  size={10}
                  fill="currentColor"
                  className="rotate-180 text-muted opacity-60"
                />
                <Play
                  size={8}
                  fill="currentColor"
                  className="rotate-180 text-muted opacity-40"
                />
              </div>
            </div>
          </div>

          <div
            dir="ltr"
            className="flex flex-1 items-center justify-between gap-5 px-[22px] py-5"
          >
            <div
              className="flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#8CFF45 0% ${profilePercentage}%, #D9D9D9 ${profilePercentage}% 100%)`,
              }}
            >
              <div className="h-[72px] w-[72px] rounded-full bg-surface" />
            </div>

            <div className="flex h-full min-w-0 flex-1 flex-col items-end justify-between">
              <span className="text-[27px] font-bold leading-none text-foreground">
                {profilePercentage.toLocaleString("fa-IR")}٪
              </span>

              <p className="w-full text-right text-xs leading-6 text-foreground">
                {t("profileDescription")}
              </p>

              <span className="text-[10px] text-muted">{t("lastUpdate")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardOverviewSection;
