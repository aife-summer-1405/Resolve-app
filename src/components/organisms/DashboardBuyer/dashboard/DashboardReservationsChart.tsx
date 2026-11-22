"use client";

import { useEffect, useState } from "react";
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

interface IChartData {
  month: string;
  count: number;
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
    timeZone: "Asia/Tehran",
  }
);

const getChartData = (reservations: IBookingResponse[]): IChartData[] => {
  const currentPersianYear = persianDateFormatter
    .formatToParts(new Date())
    .find((part) => part.type === "year")?.value;

  return months.map((month, index) => {
    const count = reservations.filter((reservation) => {
      const dateParts = persianDateFormatter.formatToParts(
        new Date(reservation.createdAt)
      );

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

    return { month, count };
  });
};

const DashboardReservationsChart = ({
  reservations,
}: IDashboardReservationsChartProps) => {
  const [chartData, setChartData] = useState<IChartData[]>([]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setChartData(getChartData(reservations));
    setIsMounted(true);
  }, [reservations]);

  if (!isMounted) {
    return (
      <div className="h-full w-full animate-pulse rounded-lg bg-card" />
    );
  }

  return (
    <div className="h-full w-full" dir="ltr">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
        >
          <CartesianGrid stroke="#ffffff15" vertical={false} />

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