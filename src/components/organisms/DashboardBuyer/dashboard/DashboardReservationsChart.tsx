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
import { IBookingResponse, IBookingsApiResponse } from "@/src/types/HousereservesType/BookingType";

interface IDashboardReservationsChartProps {
  reservations: IBookingResponse[];
}

const DashboardReservationsChart = ({
  reservations,
}: IDashboardReservationsChartProps) => {
  const now = new Date();

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - (5 - index),
      1
    );

    return {
      month: date.toLocaleDateString("fa-IR", {
        month: "long",
      }),
      year: date.getFullYear(),
      monthIndex: date.getMonth(),
    };
  });

  const chartData = months.map((item) => {
    const count = reservations.filter((reservation) => {
      const date = new Date(reservation.createdAt);

      return (
        date.getMonth() === item.monthIndex &&
        date.getFullYear() === item.year
      );
    }).length;

    return {
      month: item.month,
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