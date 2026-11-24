"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  UserRound,
  CirclePlus,
  Heart,
  CreditCard,
  Bell,
  LogOut,
  Wallet,
  Building2,
  Landmark,
  MessageSquare,
} from "lucide-react";
import { useUser } from "@/src/hooks/useUser";

const DashboardSidebar = () => {
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();
  const t = useTranslations("DashboardSidebar");

  const { data: user } = useUser();
  const role = user?.user.role;

  const requestedView = searchParams?.get("view");

  const dashboardView =
    role === "buyer"
      ? "buyer"
      : role === "seller"
        ? requestedView === "buyer"
          ? "buyer"
          : "seller"
        : role === "admin"
          ? requestedView === "seller"
            ? "seller"
            : "buyer"
          : null;

  const getDashboardHref = (href: string) => {
    if (role === "seller" || role === "admin") {
      return `${href}?view=${dashboardView}`;
    }

    return href;
  };

  const reservationsHref =
    dashboardView === "seller"
      ? "/dashboard/seller-reservations"
      : "/dashboard/reservations";

  const menuItems = [
    {
      title: t("dashboard"),
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: t("profile"),
      href: "/dashboard/profile",
      icon: UserRound,
    },
    ...(dashboardView === "seller"
      ? [
          {
            title: t("properties"),
            href: "/dashboard/properties",
            icon: Building2,
          },
        ]
      : []),
    {
      title: t("reservations"),
      href: reservationsHref,
      icon: CirclePlus,
    },
    ...(dashboardView === "buyer"
      ? [
          {
            title: t("favorites"),
            href: "/dashboard/favorites",
            icon: Heart,
          },
          {
            title: t("payments"),
            href: "/dashboard/payments",
            icon: CreditCard,
          },
        ]
      : []),
    ...(dashboardView === "seller"
      ? [
          {
            title: t("financialManagement"),
            href: "/dashboard/financial-management",
            icon: Landmark,
          },
        ]
      : []),
    {
      title: t("notifications"),
      href: "/dashboard/notifications",
      icon: Bell,
    },
  ];

  return (
    <aside className="m-2 flex w-auto shrink-0 flex-col rounded-[12px] bg-surface px-3 py-3 sm:m-4 sm:px-3 sm:py-4 lg:m-5 lg:h-[775px] lg:w-2/10 lg:px-4 lg:py-5">
      <div className="mb-4 flex items-center justify-between px-1 sm:mb-6 lg:mb-8">
        <span className="text-xl font-bold text-foreground lg:text-[25px]">
          {t("brandName")}
        </span>

        <Link
          href="/"
          aria-label={t("homeLabel")}
          className="flex items-center justify-center rounded-lg p-1 text-foreground transition-colors hover:bg-background"
        >
          <LogOut size={20} />
        </Link>
      </div>

      <nav className="flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = Boolean(
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(`${item.href}/`)),
          );

          return (
            <Link
              key={item.href}
              href={getDashboardHref(item.href)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors sm:gap-3 sm:text-sm lg:px-3 ${
                isActive
                  ? "bg-background font-semibold text-foreground"
                  : "text-foreground hover:bg-background"
              }`}
            >
              <Icon
                size={19}
                className="shrink-0"
                fill={item.icon === Heart ? "currentColor" : "none"}
              />

              <span className="whitespace-nowrap">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {dashboardView === "seller" && (
        <div className="mt-3 pt-3 lg:mt-auto lg:pt-8">
          <div className="flex w-full items-center gap-3 rounded-xl border border-dashed border-border px-3 py-2 sm:px-4 sm:py-3">
            <MessageSquare size={19} className="shrink-0 text-foreground" />
            {t("newReviews")}
            <span className="text-xs font-medium text-foreground sm:text-sm">
              5
            </span>
          </div>
        </div>
      )}

      {dashboardView === "buyer" && (
        <div className="mt-3 border-t border-border pt-3 lg:mt-auto lg:border-0 lg:pt-8">
          <div className="flex w-full items-center justify-between rounded-xl border border-dashed border-border px-3 py-2 sm:px-4 sm:py-3">
            <div className="flex items-center gap-3">
              <Wallet size={19} className="shrink-0 text-foreground" />

              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-foreground sm:text-sm">
                  {t("wallet")}
                </span>

                <span className="text-[10px] text-muted">{t("noBalance")}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default DashboardSidebar;
