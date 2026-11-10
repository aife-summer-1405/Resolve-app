"use client";

import { useLocale, useTranslations } from "next-intl";
import { useUser } from "@/src/hooks/useUser";

const ProfilePercentagePage = () => {
  const t = useTranslations("DashboardOverviewSection");
  const locale = useLocale();

  const { data: user } = useUser();
  

  const profilePercentage = user?.additionalPercentage ?? 0;

  return (
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
  );
};

export default ProfilePercentagePage;