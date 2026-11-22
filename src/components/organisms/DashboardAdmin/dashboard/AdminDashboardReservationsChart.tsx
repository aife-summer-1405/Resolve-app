"use client";

import { TrendingUp } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { IAdminBooking } from "@/src/types/Admin_Dashboard/AdminBookings";

interface IAdminDashboardReservationsChartProps {
  reservations: IAdminBooking[];
}

const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const persianDateFormatter = new Intl.DateTimeFormat("en-US-u-ca-persian", {
  year: "numeric",
  month: "numeric",
});

const AdminDashboardReservationsChart = ({
  reservations,
}: IAdminDashboardReservationsChartProps) => {
  const currentPersianYear = persianDateFormatter
    .formatToParts(new Date())
    .find((part) => part.type === "year")?.value;

  const chartData = months.map((month, index) => {
    const count = reservations.filter((reservation) => {
      const date = new Date(reservation.createdAt);

      const dateParts = persianDateFormatter.formatToParts(date);

      const reservationYear = dateParts.find(
        (part) => part.type === "year",
      )?.value;

      const reservationMonth = Number(
        dateParts.find((part) => part.type === "month")?.value,
      );

      return (
        reservationYear === currentPersianYear && reservationMonth === index + 1
      );
    }).length;

    return {
      month,
      bookings: count,
    };
  });

  return (
    <div className="flex min-w-0 flex-col gap-4 rounded-xl bg-surface p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground sm:text-base">
            آمار رزروها
          </h3>

          <p className="mt-1 text-xs text-muted">
            تعداد رزروهای ثبت‌شده در ماه‌های سال
          </p>
        </div>

        <div className="flex size-10 items-center justify-center rounded-lg bg-background">
          <TrendingUp size={20} className="text-[#91FF45]" />
        </div>
      </div>

      <div className="h-[260px] w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-border)"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-muted)", fontSize: 10 }}
              interval={0}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-muted)", fontSize: 11 }}
              allowDecimals={false}
            />

            <Tooltip
              cursor={{ fill: "var(--color-background)" }}
              contentStyle={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "10px",
                color: "var(--color-foreground)",
                fontSize: "12px",
              }}
              formatter={(value) => [value, "تعداد رزرو"]}
            />

            <Bar
              dataKey="bookings"
              fill="#91FF45"
              radius={[5, 5, 0, 0]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboardReservationsChart;
