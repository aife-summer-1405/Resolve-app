"use client";

import { useTranslations } from "next-intl";

import type { IAdminDashboardSummary } from "@/src/types/Admin_Dashboard/AdminDashboardSummary";
import type { IAdminUser } from "@/src/types/Admin_Dashboard/AdminUsers";
import type { IAdminBooking } from "@/src/types/Admin_Dashboard/AdminBookings";
import type { IAdminPayment } from "@/src/types/Admin_Dashboard/AdminPayments";
import type { IAdminHouse } from "@/src/types/Admin_Dashboard/AdminHouses";
import DashboardStatCard from "../../DashboardBuyer/dashboard/DashboardStatCard";
import AdminDashboardReservationsChart from "./AdminDashboardReservationsChart";
import {
  MailCheck,
  Phone,
  UserRound,
  Building2,
  CreditCard,
  ReceiptText,
} from "lucide-react";
import HouseImage from "@/src/components/molecules/HouseImage";
import Image from "next/image";

interface AdminDashboardOverviewSectionClientProps {
  summary: IAdminDashboardSummary;
  users: IAdminUser[];
  totalUsers: number;
  reservations: IAdminBooking[];
  payments: IAdminPayment[];
  totalPayments: number;
  houses: IAdminHouse[];
}

const AdminDashboardOverviewSectionClient = ({
  summary,
  users,
  totalUsers,
  reservations,
  payments,
  totalPayments,
  houses,
}: AdminDashboardOverviewSectionClientProps) => {
  const t = useTranslations("AdminDashboardOverviewSection");

  const dashboardStats = [
    { title: t("totalUsers"), summary: totalUsers },
    { title: t("totalHouses"), summary: summary.totalHouses },
    { title: t("totalBookings"), summary: summary.totalBookings },
    { title: t("averageRating"), summary: summary.averageRating },
  ];

  const userStatuses = [
    {
      title: t("verifiedEmail"),
      count: users.filter((user) => user.emailVerified).length,
      total: users.length,
      icon: MailCheck,
    },
    {
      title: t("registeredPhone"),
      count: users.filter((user) => user.phoneNumber).length,
      total: users.length,
      icon: Phone,
    },
    {
      title: t("profilePicture"),
      count: users.filter((user) => user.profilePicture).length,
      total: users.length,
      icon: UserRound,
    },
  ];

  const recentUsers = users.slice(0, 4).map((user) => ({
    id: user.id,
    name: user.fullName,
    role: user.role,
    date: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString("fa-IR")
      : "-",
    profilePicture: user.profilePicture,
  }));

  const recentHouses = houses.slice(0, 3);

  return (
    <section className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((card) => (
          <DashboardStatCard key={card.title} card={card} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            {t("userStatus")}
          </h2>

          <p className="mt-1 text-xs text-muted sm:text-sm">
            {t("userStatusDescription")}
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
          {t("userStatusNote", { count: users.length })}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            {t("financialReport")}
          </h2>

          <p className="mt-1 text-xs text-muted sm:text-sm">
            {t("financialReportDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between gap-3 rounded-xl bg-surface p-4 sm:p-5">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted">{t("totalPayments")}</span>

              <span className="text-2xl font-semibold text-foreground">
                {totalPayments}
              </span>

              <span className="text-[11px] text-muted">
                {t("totalPaymentsDescription")}
              </span>
            </div>

            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-background">
              <CreditCard size={22} className="text-[#91FF45]" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl bg-surface p-4 sm:p-5">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted">
                {t("receivedPayments")}
              </span>

              <span className="text-2xl font-semibold text-foreground">
                {payments.length}
              </span>

              <span className="text-[11px] text-muted">
                {t("receivedPaymentsDescription")}
              </span>
            </div>

            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-background">
              <ReceiptText size={22} className="text-[#91FF45]" />
            </div>
          </div>
        </div>
      </div>

      <AdminDashboardReservationsChart reservations={reservations} />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-xl bg-surface p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-semibold text-foreground">
                {t("recentUsers")}
              </h2>
              <p className="text-xs text-muted">
                {t("recentUsersDescription")}
              </p>
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
                  <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-background">
                    {user.profilePicture ? (
                      <Image
                        src={user.profilePicture}
                        alt={user.name || "User"}
                        width={36}
                        height={36}
                        className="size-full object-cover"
                      />
                    ) : (
                      <UserRound size={17} className="text-muted" />
                    )}
                  </div>

                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-sm font-medium text-foreground">
                      {user.name || t("noName")}
                    </span>

                    <span className="text-xs text-muted">
                      {t("userId", { id: user.id })}
                    </span>
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
                {t("noUsers")}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-surface p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-semibold text-foreground">
                {t("recentHouses")}
              </h2>

              <p className="text-xs text-muted">
                {t("recentHousesDescription")}
              </p>
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
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-background">
                    <HouseImage
                      src={house.photos?.[0]}
                      alt={house.title}
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-sm font-medium text-foreground">
                      {house.title}
                    </span>

                    <span className="truncate text-xs text-muted">
                      {house.address}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="text-xs font-medium text-foreground">
                    {Number(house.price).toLocaleString("fa-IR")}
                  </span>

                  <span className="text-[11px] text-muted">
                    {house.last_updated
                      ? new Date(house.last_updated).toLocaleDateString(
                          "fa-IR",
                          {
                            timeZone: "Asia/Tehran",
                          },
                        )
                      : "-"}
                  </span>
                </div>
              </div>
            ))}

            {recentHouses.length === 0 && (
              <p className="py-6 text-center text-sm text-muted">
                {t("noHouses")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardOverviewSectionClient;
