"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

const DashboardSidebar = () => {
  const pathname = usePathname() ?? "";
  const t = useTranslations("DashboardSidebar");

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
    {
      title: t("reservations"),
      href: "/dashboard/reservations",
      icon: CirclePlus,
    },
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
    {
      title: t("notifications"),
      href: "/dashboard/notifications",
      icon: Bell,
    },
  ];

  return (
    <aside className="m-5 flex h-[775px] w-2/10 shrink-0 flex-col rounded-[12px] bg-surface px-4 py-5">
      <div className="mb-8 flex items-center justify-between px-1">
        <span className="text-[25px] font-bold text-foreground">
          {t("brandName")}
        </span>
        <Link
          href="/"
          aria-label={t("homeLabel")}
          className="flex items-center justify-center rounded-lg text-foreground transition-colors hover:bg-background"
        >
          <LogOut size={20} />
        </Link>
      </div>
      <nav className="flex flex-col gap-1">
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
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-background font-semibold text-foreground"
                  : "text-foreground hover:bg-background"
              }`}
            >
              <Icon
                size={19}
                fill={item.icon === Heart ? "currentColor" : "none"}
              />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-8">
        <Link
          href="/dashboard/wallet"
          className="flex w-full items-center justify-between rounded-xl border border-dashed border-border px-4 py-3 transition-colors hover:bg-background"
        >
          <div className="flex items-center gap-3">
            <Wallet size={19} className="text-foreground" />

            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-foreground">
                {t("wallet")}
              </span>

              <span className="text-[10px] text-muted">{t("noBalance")}</span>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
