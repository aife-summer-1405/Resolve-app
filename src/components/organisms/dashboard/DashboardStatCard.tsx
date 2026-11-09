"use client";

import { useTranslations } from "next-intl";
import { Pin, Play } from "lucide-react";

const DashboardStatCard = ({ title }: { title: string }) => {
  const t = useTranslations("DashboardStatCard");

  return (
    <div className="relative flex aspect-[2.05/1] w-full shrink-0 flex-col overflow-hidden rounded-[12px] bg-surface">
      <div className="absolute right-[22px] top-0 flex h-1/2 w-2/10 items-center justify-center rounded-b-[13px] bg-background">
        <Pin
          size={27}
          fill="currentColor"
          strokeWidth={2.5}
          className="rotate-45 text-foreground"
        />
      </div>

      <div className="absolute right-[100px] top-[28px] flex items-end gap-[10px]">
        <span className="text-[12px] font-medium leading-none text-foreground">
          ۵
        </span>

        <span className="whitespace-nowrap text-[14px] font-medium leading-none text-foreground">
          رلترنالنا
        </span>
      </div>

      <div className="absolute left-[23px] right-[23px] top-[89px] border-t border-dashed border-border" />

      <div
        dir="ltr"
        className="absolute bottom-0 flex h-4/10 w-full items-center justify-between px-[25px]"
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

        <span className="text-[14px] font-normal text-muted">{t("view")}</span>
      </div>
    </div>
  );
};

export default DashboardStatCard;
