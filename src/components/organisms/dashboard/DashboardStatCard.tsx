"use client";

import { useTranslations } from "next-intl";
import { Pin, Play } from "lucide-react";

const DashboardStatCard = () => {
  const t = useTranslations("DashboardStatCard");

  return (
    <div className="relative flex h-[130px] w-[264px] shrink-0 flex-col overflow-hidden rounded-[12px] bg-surface">
      <div className="absolute right-[18px] top-0 flex h-[57px] w-[50px] items-center justify-center rounded-b-[13px] bg-background">
        <Pin
          size={27}
          fill="currentColor"
          strokeWidth={2.5}
          className="rotate-45 text-foreground"
        />
      </div>
      <div className="absolute right-[78px] top-[30px] flex  items-end gap-[9px]">
        <span className="text-[12px] font-medium leading-none text-foreground">
          ۵
        </span>
        <span className="whitespace-nowrap text-[14px] font-medium leading-none text-foreground">
          {t("activeReservations")}
        </span>
      </div>
      <div className="absolute left-[19px] right-[19px] top-[76px] border-t border-dashed border-border" />

      <div
        dir="ltr"
        className="absolute bottom-0 flex h-[53px] w-full items-center justify-between px-[21px]"
      >
        <div className="flex items-center gap-[12px]">
          <Play
            size={16}
            fill="currentColor"
            strokeWidth={0}
            className="rotate-180 text-muted"
          />

          <Play
            size={12}
            fill="currentColor"
            strokeWidth={0}
            className="rotate-180 text-muted opacity-50"
          />

          <Play
            size={9}
            fill="currentColor"
            strokeWidth={0}
            className="rotate-180 text-muted opacity-30"
          />
        </div>

        <span className="text-[12px] font-normal text-muted">{t("view")}</span>
      </div>
    </div>
  );
};

export default DashboardStatCard;
