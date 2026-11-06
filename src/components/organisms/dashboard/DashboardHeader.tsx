"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Moon, Sun, Play } from "lucide-react";

const DashboardHeader = () => {
  const locale = useLocale();
  const t = useTranslations("DashboardHeader");
  const pathname = usePathname();
  const router = useRouter();

  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const handleThemeChange = (theme: boolean) => {
    document.documentElement.classList.toggle("dark", theme);
    document.documentElement.style.colorScheme = theme ? "dark" : "light";
    setIsDark(theme);
  };

  const handleLanguageChange = () => {
    const nextLocale = locale === "fa" ? "en" : "fa";

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    startTransition(() => {
      router.refresh();
    });
  };

  const pageTitles: Record<string, string> = {
    "/dashboard": t("dashboard"),
    "/dashboard/profile": t("profile"),
    "/dashboard/properties": t("properties"),
    "/dashboard/reservations": t("reservations"),
    "/dashboard/finance": t("finance"),
    "/dashboard/ads": t("ads"),
    "/dashboard/notifications": t("notifications"),
    "/dashboard/comments": t("comments"),
  };

  const title = pageTitles[pathname] || t("dashboard");

  return (
    <header
      dir="ltr"
      className="flex h-[53px] w-full items-center justify-between rounded-xl bg-surface px-3 text-foreground"
    >
      <div className="flex shrink-0 items-center gap-3">
        <div className="flex items-center gap-2" dir="rtl">
          <div className="flex flex-col items-start gap-0.5">
            <span className="whitespace-nowrap text-[11px] font-medium">
              {t("userName")}
            </span>

            <span className="text-[9px] text-muted">{t("role")}</span>
          </div>

          <div className="h-[30px] w-[30px] shrink-0 rounded-md bg-[#D9D9D9]" />
        </div>

        <button
          type="button"
          aria-label={t("notificationLabel")}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition hover:bg-background"
        >
          <Bell size={17} />
        </button>

        <span className="h-7 w-px shrink-0 bg-border" />

        <div className="flex h-[27px] shrink-0 items-center gap-1 rounded-full bg-background p-1">
          <button
            type="button"
            onClick={() => handleThemeChange(false)}
            disabled={!mounted}
            aria-label={t("lightMode")}
            className={`flex h-[21px] w-[21px] items-center justify-center rounded-full transition ${
              !isDark ? "bg-[#91FF45] text-black" : "text-foreground"
            }`}
          >
            <Sun size={15} />
          </button>

          <button
            type="button"
            onClick={() => handleThemeChange(true)}
            disabled={!mounted}
            aria-label={t("darkMode")}
            className={`flex h-[21px] w-[21px] items-center justify-center rounded-full transition ${
              isDark ? "bg-[#91FF45] text-black" : "text-foreground"
            }`}
          >
            <Moon size={14} fill="currentColor" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleLanguageChange}
          disabled={isPending}
          className="flex h-7 min-w-8 shrink-0 items-center justify-center rounded-md bg-background px-2 text-[10px] font-semibold transition hover:bg-border disabled:opacity-50"
        >
          {locale === "fa" ? "EN" : "FA"}
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-3" dir="rtl">
        <h1 className="whitespace-nowrap text-sm font-bold">{title}</h1>

        <div className="flex items-center gap-1">
          <Play size={8} fill="currentColor" />
          <Play size={8} fill="currentColor" />
          <Play size={8} fill="currentColor" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
