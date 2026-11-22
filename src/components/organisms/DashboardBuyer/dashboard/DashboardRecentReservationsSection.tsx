"use client";

import { useTranslations } from "next-intl";
import {
  Bookmark,
  Play,
  MoreHorizontal,
  CircleCheck,
  CircleX,
  Check,
  Clock3,
  X,
} from "lucide-react";
import { useUserData } from "@/src/providers/UserDataContextProvider";
import { useBookings } from "@/src/hooks/dashboard/useBookings";
import { useGetCustomerBookings } from "@/src/hooks/Seller_dashboard/useGetCustomerBookings";
import { IHouseFilters } from "@/src/types/HousereservesType/HouseFilterType";
import { useSearchParams } from "next/navigation";
import { ICustomerBooking } from "@/src/types/Seller_Dashboard/customer-booking";
import { IBookingResponse } from "@/src/types/HousereservesType/BookingType";

const LIMIT = 5;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const DashboardRecentReservationsSection = () => {
  const { userData } = useUserData();
  const t = useTranslations("DashboardRecentReservationsSection");

  const role = userData?.user.role;
  const userId = userData?.user.id
    ? Number(userData.user.id)
    : undefined;
  const searchParams = useSearchParams();
  const requestedView = searchParams?.get("view");
  const dashboardView =
    role === "admin"
      ? requestedView === "buyer"
        ? "buyer"
        : requestedView === "seller"
          ? "seller"
          : "admin"
      : role === "buyer"
        ? "buyer"
        : role === "seller"
          ? requestedView === "buyer"
            ? "buyer"
            : "seller"
          : null;


  const getStatus = (status: ICustomerBooking["status"] | IBookingResponse["status"]) => {
    switch (status) {
      case "confirmed":
        return {
          label: t("approved"),
          className: "bg-primary text-black",
          icon: <Check size={12} strokeWidth={3} />,
        };

      case "pending":
        return {
          label: t("pending"),
          className: "bg-[#FFBF00] text-[#202020]",
          icon: <Clock3 size={12} strokeWidth={2.5} />,
        };

      default:
        return {
          label: t("cancelled"),
          className: "bg-[#FF858C] text-[#202020]",
          icon: <X size={12} strokeWidth={3} />,
        };
    }
  };
  const isBuyer = dashboardView === "buyer";
  const isSeller = dashboardView === "admin" || dashboardView === "seller";

  const defaultFilter: IHouseFilters = {
    sort: "updated_at",
    order: "DESC",
    page: 1,
    limit: LIMIT,
  };

  const buyerBookings = useBookings(defaultFilter, isBuyer);

  const sellerBookings = useGetCustomerBookings(
    userId,
    {
      sort: "created_at",
      order: "DESC",
      page: 1,
      limit: LIMIT,
    },
    isSeller
  );
  console.log("sellerBookings", sellerBookings.data);
  const reservations = isBuyer
    ? buyerBookings.data?.data
    : isSeller
      ? sellerBookings.data?.bookings
      : undefined;
  console.log("reservations", reservations)
  const isLoading = isBuyer
    ? buyerBookings.isLoading
    : isSeller
      ? sellerBookings.isLoading
      : false;

  const isError = isBuyer
    ? buyerBookings.isError
    : isSeller
      ? sellerBookings.isError
      : false;

  return (
    <section className="flex w-full flex-col overflow-hidden rounded-xl bg-surface">
      <div className="flex h-[42px] shrink-0 items-center justify-between border-b border-dashed border-border px-4">
        <div className="flex items-center gap-2">
          <Bookmark
            size={17}
            fill="currentColor"
            className="text-foreground"
          />
          <span className="text-xs font-medium text-foreground">
            {t("title")}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] text-muted">
            {t("viewAll")}
          </span>

          <div className="flex items-center gap-1">
            <Play
              size={11}
              fill="currentColor"
              strokeWidth={0}
              className="rotate-180 text-muted"
            />
            <Play
              size={9}
              fill="currentColor"
              strokeWidth={0}
              className="rotate-180 text-muted opacity-50"
            />
            <Play
              size={7}
              fill="currentColor"
              strokeWidth={0}
              className="rotate-180 text-muted opacity-30"
            />
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto p-3">
        <div className="min-w-[620px]">
          <div
            dir="ltr"
            className="grid grid-cols-5 items-center gap-2 rounded-lg bg-background px-3 py-2 text-[11px] font-medium text-foreground"
          >
            <span />
            <span className="text-center">{t("status")}</span>
            <span className="text-center">{t("price")}</span>
            <span className="text-center">{t("date")}</span>
            <span className="text-right">{t("accommodation")}</span>
          </div>

          <div className="mt-2 flex min-h-[160px] flex-col">
            {isLoading ? (
              <div className="h-40 animate-pulse rounded-lg bg-card" />
            ) : isError ? (
              <p className="py-8 text-center text-xs text-muted">
                {t("error")}
              </p>
            ) : reservations && reservations.length > 0 ? (
              reservations.slice(0, LIMIT).map((item) => {
                const status = getStatus(item.status);

                return (
                  <div
                    key={item.id}
                    dir="ltr"
                    className="grid grid-cols-5 items-center gap-2 rounded-lg px-3 py-2 odd:bg-surface even:bg-background/40"
                  >
                    <div className="flex items-center justify-start">
                      <MoreHorizontal size={17} className="text-foreground" />
                    </div>

                    <div className="flex justify-center">
                      <span
                        className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] ${status.className}`}
                      >
                        {status.label}
                        {status.icon}
                      </span>
                    </div>

                    <span className="whitespace-nowrap text-center text-[10px] text-foreground">
                      {Number(item.house.price).toLocaleString("fa-IR")}{" "}
                      {t("currency")}
                    </span>

                    <span className="whitespace-nowrap text-center text-[10px] text-foreground">
                      {formatDate(item.reservedDates[0])} -{" "}
                      {formatDate(item.reservedDates[1])}
                    </span>

                    <div
                      dir="rtl"
                      className="flex min-w-0 items-center justify-start gap-2"
                    >
                      <div className="h-[45px] w-[65px] shrink-0 rounded-lg bg-[#D9D9D9]" />

                      <span className="truncate text-[10px] text-foreground">
                        {item.house.title}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="py-8 text-center text-xs text-muted">
                {t("empty")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardRecentReservationsSection;