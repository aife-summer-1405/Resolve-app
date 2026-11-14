"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Moon,
  Sun,
  PlusCircle,
  X,
  ArrowRightCircle,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import { useUser } from "@/src/hooks/useUser";

const DashboardHeader = () => {
  const locale = useLocale();
  const t = useTranslations("DashboardHeader");
  const pathname = usePathname();
  const router = useRouter();
  const { data: user } = useUser();

  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const [notifications, setNotifications] = useState([true, false, true, true]);

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

  const handleNotificationChange = (index: number) => {
    setNotifications((prev) =>
      prev.map((item, i) => (i === index ? !item : item)),
    );
  };

  const pageTitles: Record<string, string> = {
    "/dashboard": t("dashboard"),
    "/dashboard/profile": t("profile"),
    "/dashboard/reservations": t("reservations"),
    "/dashboard/favorites": t("favorites"),
    "/dashboard/payments": t("payments"),
    "/dashboard/notifications": t("notifications"),
  };

  const title = pageTitles[pathname ?? ""] || t("dashboard");

  const notificationItems = [
    t("reservationNotifications"),
    t("paymentNotifications"),
    t("discountNotifications"),
    t("systemNotifications"),
  ];

  return (
    <>
      <header
        dir="ltr"
        className="relative z-30 flex h-auto w-full flex-col-reverse items-stretch gap-3 rounded-xl bg-surface px-3 py-3 text-foreground sm:h-[53px] sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:py-0"
      >
        <div className="flex w-full shrink-0 items-center justify-between gap-2 sm:w-auto sm:justify-start sm:gap-3">
          <div className="relative">
            <button
              type="button"
              dir="rtl"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center gap-1.5 rounded-lg sm:gap-2"
            >
              <div className="flex max-w-[95px] flex-col items-start gap-0.5 sm:max-w-none">
                <span className="w-full truncate whitespace-nowrap text-[10px] font-medium sm:text-[11px]">
                  {user?.user.firstName} {user?.user.lastName}
                </span>
                <span className="text-[9px] text-muted">{user?.user.role}</span>
              </div>

              <div className="h-[30px] w-[30px] shrink-0 rounded-md bg-[#D9D9D9]" />

              <ChevronDown
                size={12}
                className={`shrink-0 transition ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileOpen && (
              <div
                dir="rtl"
                className="absolute left-0 top-full z-50 mt-3 w-[270px] max-w-[calc(100vw-24px)] overflow-hidden rounded-xl bg-surface text-foreground shadow-xl"
              >
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <div className="flex h-[30px] w-[30px] shrink-0 rounded-md bg-[#D9D9D9]" />

                  <div className="flex min-w-0 flex-col">
                    <span className="text-[11px] font-medium">
                      {t("userName")}
                    </span>
                    <span className="text-[9px] text-muted">+989123456789</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex w-full items-center justify-between border-b border-border px-4 py-2.5 text-[11px] transition hover:bg-background"
                >
                  <PlusCircle size={16} />
                  <span>{t("wallet")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsNotificationsOpen(true);
                  }}
                  className="flex w-full items-center justify-between border-b border-border px-4 py-2.5 text-[11px] transition hover:bg-background"
                >
                  <ArrowRightCircle size={16} />
                  <span>{t("notificationSettings")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsLogoutOpen(true);
                  }}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-[11px] transition hover:bg-background"
                >
                  <ArrowRightCircle size={16} />
                  <span>{t("logout")}</span>
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label={t("notificationLabel")}
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition hover:bg-background"
            >
              <Bell size={17} />
            </button>

            {isNotificationsOpen && (
              <div
                dir="rtl"
                className="fixed left-3 right-3 top-20 z-50 rounded-xl bg-surface p-4 text-foreground shadow-xl sm:absolute sm:left-0 sm:right-auto sm:top-full sm:mt-3 sm:w-[370px] sm:max-w-[calc(100vw-24px)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold">
                    {t("notificationSettings")}
                  </h3>

                  <button
                    type="button"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#FF4D4F] text-[#FF4D4F] transition hover:bg-[#FF4D4F]/10"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {notificationItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="text-[11px]">{item}</span>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={notifications[index]}
                        onClick={() => handleNotificationChange(index)}
                        className="relative h-[29px] w-[58px] shrink-0 rounded-full bg-[#D9D9D9] transition"
                      >
                        <span
                          className={`absolute top-[3px] h-[23px] w-[23px] rounded-full transition-all ${
                            notifications[index]
                              ? "left-[3px] bg-[#91FF45]"
                              : "left-[32px] bg-white"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

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

        <div
          className="flex w-full shrink-0 items-center justify-start sm:w-auto sm:justify-start"
          dir="rtl"
        >
          <h1 className="whitespace-nowrap text-sm font-bold">{title}</h1>
        </div>
      </header>

      {isLogoutOpen && (
        <div
          dir="rtl"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsLogoutOpen(false)}
        >
          <div
            className="flex w-full max-w-[390px] flex-col items-center rounded-[22px] bg-surface px-5 py-6 text-foreground shadow-2xl sm:px-6 sm:py-7"
            onClick={(e) => e.stopPropagation()}
          >
            <AlertTriangle
              size={62}
              strokeWidth={1.8}
              className="mb-7 fill-[#FFB800] text-black sm:mb-9"
            />

            <h3 className="mb-7 text-center text-sm font-bold sm:mb-8 sm:text-base">
              {t("logoutConfirmation")}
            </h3>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsLogoutOpen(false)}
                className="rounded-lg bg-[#FF9500] px-5 py-2 text-[11px] text-black transition hover:bg-[#E98500]"
              >
                {t("logout")}
              </button>

              <button
                type="button"
                onClick={() => setIsLogoutOpen(false)}
                className="text-[11px] text-foreground transition hover:opacity-70"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHeader;
