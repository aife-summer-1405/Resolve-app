"use client";

import type { IAdminDashboardSummary } from "@/src/types/Admin_Dashboard/AdminDashboardSummary";
import type { IAdminUser } from "@/src/types/Admin_Dashboard/AdminUsers";
import type { IAdminBooking } from "@/src/types/Admin_Dashboard/AdminBookings";

import DashboardStatCard from "../../DashboardBuyer/dashboard/DashboardStatCard";
import AdminDashboardReservationsChart from "./AdminDashboardReservationsChart";

import {
  MailCheck,
  Phone,
  UserRound,
  Building2,
  Wallet,
  CheckCircle2,
  Clock3,
} from "lucide-react";

interface AdminDashboardOverviewSectionClientProps {
  summary: IAdminDashboardSummary;
  users: IAdminUser[];
  totalUsers: number;
  reservations: IAdminBooking[];
}

const AdminDashboardOverviewSectionClient = ({
  summary,
  users,
  totalUsers,
  reservations,
}: AdminDashboardOverviewSectionClientProps) => {
  const dashboardStats = [
    { title: "کل کاربران", summary: totalUsers },
    { title: "کل املاک", summary: summary.totalHouses },
    { title: "کل رزروها", summary: summary.totalBookings },
    { title: "میانگین امتیاز", summary: summary.averageRating },
  ];

  const userStatuses = [
    {
      title: "ایمیل تأییدشده",
      count: users.filter((user) => user.emailVerified).length,
      total: users.length,
      icon: MailCheck,
    },
    {
      title: "شماره موبایل ثبت‌شده",
      count: users.filter((user) => user.phoneNumber).length,
      total: users.length,
      icon: Phone,
    },
    {
      title: "تصویر پروفایل",
      count: users.filter((user) => user.profilePicture).length,
      total: users.length,
      icon: UserRound,
    },
  ];

  const paymentStats = [
    {
      title: "درآمد کل",
      value: "۱۲۵ میلیون",
      description: "مجموع درآمد پرداخت‌شده",
      icon: Wallet,
    },
    {
      title: "پرداخت‌های موفق",
      value: "۴۲",
      description: "تعداد تراکنش‌های موفق",
      icon: CheckCircle2,
    },
    {
      title: "پرداخت‌های در انتظار",
      value: "۸",
      description: "نیازمند بررسی",
      icon: Clock3,
    },
  ];

  const recentUsers = users.slice(0, 4).map((user) => ({
    id: user.id,
    name: user.fullName,
    role: user.role,
    date: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString("fa-IR")
      : "-",
  }));

  const recentHouses = [
    {
      id: 34,
      title: "آپارتمان دو خوابه",
      location: "تهران، سعادت‌آباد",
      price: "۸ میلیارد تومان",
      date: "۱۴۰۵/۰۸/۲۶",
    },
    {
      id: 33,
      title: "ویلای مدرن",
      location: "مازندران، نوشهر",
      price: "۱۲ میلیارد تومان",
      date: "۱۴۰۵/۰۸/۲۵",
    },
    {
      id: 32,
      title: "آپارتمان نوساز",
      location: "تهران، پونک",
      price: "۵ میلیارد تومان",
      date: "۱۴۰۵/۰۸/۲۴",
    },
  ];

  return (
    <section className="flex flex-col gap-6">
      {/* آمار کلی */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((card) => (
          <DashboardStatCard key={card.title} card={card} />
        ))}
      </div>

      {/* وضعیت کاربران */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            وضعیت کاربران
          </h2>

          <p className="mt-1 text-xs text-muted sm:text-sm">
            بررسی وضعیت اطلاعات و تأیید حساب کاربران
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {userStatuses.map((item) => {
            const Icon = item.icon;

            const percentage =
              item.total > 0 ? (item.count / item.total) * 100 : 0;

            return (
              <div
                key={item.title}
                className="flex flex-col gap-4 rounded-xl bg-surface p-4 sm:p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {item.title}
                  </span>

                  <div className="flex size-10 items-center justify-center rounded-lg bg-background">
                    <Icon size={20} className="text-muted" />
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <span className="text-2xl font-semibold text-foreground">
                    {item.count}
                    <span className="text-sm font-normal text-muted">
                      {" "}
                      / {item.total}
                    </span>
                  </span>

                  <span className="text-sm font-medium text-foreground">
                    {percentage.toFixed(0)}%
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-background">
                  <div
                    className="h-full rounded-full bg-[#91FF45]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-muted">
          آمار وضعیت بر اساس {users.length} کاربر دریافت‌شده از API محاسبه شده
          است.
        </p>
      </div>

      {/* گزارش مالی و پرداخت‌ها */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            گزارش مالی و پرداخت‌ها
          </h2>

          <p className="mt-1 text-xs text-muted sm:text-sm">
            بررسی درآمد و وضعیت تراکنش‌های سامانه
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {paymentStats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center justify-between gap-3 rounded-xl bg-surface p-4 sm:p-5"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-muted sm:text-sm">
                    {item.title}
                  </span>

                  <span className="text-xl font-semibold text-foreground sm:text-2xl">
                    {item.value}
                  </span>

                  <span className="text-[11px] text-muted">
                    {item.description}
                  </span>
                </div>

                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background">
                  <Icon size={21} className="text-[#91FF45]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* نمودار رزروها */}
      <AdminDashboardReservationsChart reservations={reservations} />

      {/* آخرین کاربران و املاک */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* آخرین کاربران */}
        <div className="flex flex-col gap-4 rounded-xl bg-surface p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-semibold text-foreground">
                آخرین کاربران
              </h2>

              <p className="text-xs text-muted">کاربران تازه ثبت‌نام‌شده</p>
            </div>

            <div className="flex size-10 items-center justify-center rounded-lg bg-background">
              <UserRound size={19} className="text-muted" />
            </div>
          </div>

          <div className="flex flex-col">
            {recentUsers.map((user, index) => (
              <div
                key={user.id}
                className={`flex items-center justify-between gap-3 py-3 ${
                  index !== recentUsers.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background">
                    <UserRound size={17} className="text-muted" />
                  </div>

                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-sm font-medium text-foreground">
                      {user.name || "بدون نام"}
                    </span>

                    <span className="text-xs text-muted">شناسه: {user.id}</span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="text-xs text-foreground">{user.role}</span>

                  <span className="text-[11px] text-muted">{user.date}</span>
                </div>
              </div>
            ))}

            {recentUsers.length === 0 && (
              <p className="py-6 text-center text-sm text-muted">
                کاربری برای نمایش وجود ندارد.
              </p>
            )}
          </div>
        </div>

        {/* آخرین املاک */}
        <div className="flex flex-col gap-4 rounded-xl bg-surface p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-semibold text-foreground">
                آخرین املاک
              </h2>

              <p className="text-xs text-muted">املاک تازه ثبت‌شده در دلتا</p>
            </div>

            <div className="flex size-10 items-center justify-center rounded-lg bg-background">
              <Building2 size={19} className="text-muted" />
            </div>
          </div>

          <div className="flex flex-col">
            {recentHouses.map((house, index) => (
              <div
                key={house.id}
                className={`flex items-center justify-between gap-3 py-3 ${
                  index !== recentHouses.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background">
                    <Building2 size={17} className="text-muted" />
                  </div>

                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-sm font-medium text-foreground">
                      {house.title}
                    </span>

                    <span className="truncate text-xs text-muted">
                      {house.location}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="text-xs font-medium text-foreground">
                    {house.price}
                  </span>

                  <span className="text-[11px] text-muted">{house.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardOverviewSectionClient;
