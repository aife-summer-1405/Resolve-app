"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserRound,
  Settings,
  CirclePlus,
  Wallet,
  Megaphone,
  Bell,
  LogOut,
  MessageSquare,
} from "lucide-react";

const menuItems = [
  {
    title: "داشبورد",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "اطلاعات کاربری",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    title: "مدیریت املاک",
    href: "/dashboard/properties",
    icon: Settings,
  },
  {
    title: "مدیریت رزرو ها",
    href: "/dashboard/reservations",
    icon: CirclePlus,
  },
  {
    title: "مدیریت مالی",
    href: "/dashboard/finance",
    icon: Wallet,
  },
  {
    title: "مدیریت نظرات",
    href: "/dashboard/ads",
    icon: Megaphone,
  },
  {
    title: "اعلان‌ها",
    href: "/dashboard/notifications",
    icon: Bell,
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-[775px] w-[270px] shrink-0 flex-col  rounded-[12px] bg-surface px-3 py-5 m-[20px]">
      <div className="mb-8 flex items-center justify-between px-2">
        <Image
          src="/images/dashboard-logo.png"
          alt="Delta Logo"
          width={46}
          height={32}
          className="h-auto w-[46px] object-contain"
        />

        <Link
          href="/"
          aria-label="بازگشت به صفحه اصلی"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-background"
        >
          <LogOut size={20} />
        </Link>
      </div>

      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-background font-semibold text-foreground"
                  : "text-foreground hover:bg-background"
              }`}
            >
              <Icon size={19} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8">
        <Link
          href="/dashboard/comments"
          className="flex items-center justify-between rounded-xl border border-dashed border-border px-3 py-3 transition-colors hover:bg-background"
        >
          <div className="flex items-center gap-3">
            <MessageSquare size={19} />

            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-foreground">
                نظرات جدید
              </span>

              <span className="text-xs text-muted">۵ نظر</span>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
