"use client";

import { useTranslations } from "next-intl";
import { Bookmark, Play } from "lucide-react";
import ProfilePercentagePage from "../../DashboardBuyer/dashboard/profilePercentagepage";

const SellerDashboardIncomeSection = () => {
  const t = useTranslations("SellerDashboardIncomeSection");

  return (
    <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
      <div className="flex aspect-[2.14/1] w-full min-h-0 flex-col overflow-hidden rounded-xl bg-surface">
        <div className="flex h-1/5 shrink-0 items-center justify-between border-b border-dashed border-border px-5">
          <div className="flex items-center gap-3">
            <Bookmark
              size={17}
              fill="currentColor"
              className="text-foreground"
            />
            <span className="text-xs font-medium text-foreground">
              {t("incomeStats")}
            </span>
          </div>

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

        <div className="flex flex-1 flex-col justify-evenly px-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#8CFF45]" />
              <span className="text-xs font-medium text-foreground">
                {t("currentMonthIncome")}
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-[#8CFF45] px-4 py-2 text-xs text-black">
              <span>115,000,000</span>
              <span>{t("currency")}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-muted" />
              <span className="text-xs font-medium text-foreground">
                {t("totalIncome")}
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-2 text-xs text-foreground">
              <span>195,000,000</span>
              <span>{t("currency")}</span>
            </div>
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

        <ProfilePercentagePage />
      </div>
    </div>
  );
};

export default SellerDashboardIncomeSection;
