
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IBookingResponse } from "@/src/types/HousereservesType/BookingType";

interface IDashboardReservationsChartProps {
  reservations: IBookingResponse[];
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

const persianDateFormatter = new Intl.DateTimeFormat(
  "en-US-u-ca-persian",
  {
    year: "numeric",
    month: "numeric",
  }
);

const DashboardReservationsChart = ({
  reservations,
}: IDashboardReservationsChartProps) => {
  const currentPersianYear = persianDateFormatter.formatToParts(new Date())
    .find((part) => part.type === "year")?.value;

  const chartData = months.map((month, index) => {
    const count = reservations.filter((reservation) => {
      const date = new Date(reservation.createdAt);

      const dateParts = persianDateFormatter.formatToParts(date);

      const reservationYear = dateParts.find(
        (part) => part.type === "year"
      )?.value;

      const reservationMonth = Number(
        dateParts.find((part) => part.type === "month")?.value
      );

      return (
        reservationYear === currentPersianYear &&
        reservationMonth === index + 1
      );
    }).length;

    return {
      month,
      count,
    };
  });

  return (
    <div className="h-full w-full" dir="ltr">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            stroke="#ffffff15"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tick={{ fill: "#ffffff80", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fill: "#ffffff80", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "#ffffff08" }}
            contentStyle={{
              backgroundColor: "#303030",
              border: "1px solid #ffffff20",
              borderRadius: "10px",
              color: "#fff",
            }}
            formatter={(value) => [value, "تعداد رزرو"]}
          />

          <Bar
            dataKey="count"
            fill="#91ff45"
            radius={[5, 5, 0, 0]}
            maxBarSize={35}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardReservationsChart;
