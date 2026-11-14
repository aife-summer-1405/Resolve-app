"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Check,
  Clock3,
  X,
  CreditCard,
  Info,
  Trash2,
} from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import ReservationFiltersModal, {
  type ReservationFilters,
} from "./modals/ReservationFiltersModal";
import ReservationDetailsModal from "./modals/ReservationDetailsModal";
import ReservationPaymentsModal from "./modals/ReservationPaymentsModal";
import ReservationListModal from "./modals/ReservationListModal";

import { getBookingsAction } from "@/src/actions/bookingActions";
import { IGetBookingsParams } from "@/src/types/dashboard/booking";
import {
  IBookingResponse,
  IBookingsApiResponse,
} from "@/src/types/HousereservesType/BookingType";

const LIMIT = 10;

const formatDate = (date: string, locale: string) =>
  new Date(date).toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const BookingManagementSection = () => {
  const t = useTranslations("BookingManagementSection");
  const locale = useLocale();

  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] =
    useState<Partial<ReservationFilters>>({});

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [isReservationsOpen, setIsReservationsOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState("");

const queryParams = useMemo<IGetBookingsParams>(
  () => ({
    page: currentPage,
    limit: LIMIT,
    sort: appliedFilters.sort ?? "updated_at",
    order: appliedFilters.order ?? "DESC",
    ...(appliedFilters.status && {
      status: appliedFilters.status,
    }),
    ...(appliedFilters.house_id !== undefined && {
      house_id: appliedFilters.house_id,
    }),
  }),
  [currentPage, appliedFilters],
);
  const {
    data: reservation,
    isLoading,
    isError,
  } = useQuery<IBookingsApiResponse>({
    queryKey: ["bookings", queryParams],
    queryFn: () => getBookingsAction(queryParams),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const reservations = useMemo(() => {
    const data = reservation?.data ?? [];

    if (!search.trim()) return data;

    return data.filter((item) =>
      item.house.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [reservation, search]);

  const totalPages = Math.ceil((reservation?.totalCount ?? 0) / LIMIT);

  const visiblePages = useMemo(() => {
    const start = Math.max(
      1,
      Math.min(currentPage - 2, totalPages - 4),
    );

    return Array.from(
      { length: Math.min(5, totalPages) },
      (_, index) => start + index,
    );
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (activeMenu === null) return;

    const handleClickOutside = (event: PointerEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest(`[data-reservation-menu="${activeMenu}"]`)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [activeMenu]);

  const getStatus = (status: string) => {
    switch (status) {
      case "confirmed":
        return {
          label: t("confirmed"),
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

  const handleOpenDetails = (item: IBookingResponse) => {
    setSelectedAccommodation(item.house.title);
    setIsDetailsOpen(true);
    setActiveMenu(null);
  };

  const handleOpenPayments = () => {
    setIsDetailsOpen(false);
    setIsPaymentsOpen(true);
    setActiveMenu(null);
  };

  const handleOpenReservations = () => {
    setIsDetailsOpen(false);
    setIsReservationsOpen(true);
  };

  const handleApplyFilters = (filters: ReservationFilters) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    setIsFiltersOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <section
      dir="rtl"
      className="w-full rounded-xl bg-surface p-4 sm:p-5"
    >
      <div className="flex flex-col gap-5 border-b border-dashed border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          {t("listTitle")}
        </h2>

        <div className="flex items-center gap-3">
          <div className="relative min-w-0 flex-1 sm:w-[330px] sm:flex-none">
            <span className="absolute -top-2 right-3 z-10 bg-surface px-1 text-[10px] text-muted">
              {t("searchLabel")}
            </span>

            <Search
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder={t("searchPlaceholder")}
              className="h-10 w-full rounded-xl border border-border bg-transparent py-2 pr-9 pl-3 text-xs text-foreground outline-none placeholder:text-muted focus:border-primary"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsFiltersOpen(true)}
            className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-medium text-black transition-opacity hover:opacity-90"
          >
            {t("filters")}
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="mt-4 w-full overflow-x-auto">
        <table className="w-full min-w-[850px] border-separate border-spacing-y-3 text-right">
          <thead>
            <tr className="bg-background text-xs text-foreground">
              <th className="rounded-r-xl px-4 py-3 font-medium">
                {t("accommodation")}
              </th>

              <th className="px-3 py-3 font-medium">
                {t("reservationDate")}
              </th>

              <th className="px-3 py-3 font-medium">
                {t("totalPrice")}
              </th>

              <th className="px-3 py-3 font-medium">
                {t("guestCount")}
              </th>

              <th className="px-3 py-3 font-medium">
                {t("reservationStatus")}
              </th>

              <th className="rounded-l-xl px-4 py-3 text-center font-medium">
                {t("actions")}
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  {Array.from({ length: 6 }).map((_, cellIndex) => (
                    <td key={cellIndex} className="px-3 py-4">
                      <div className="h-8 animate-pulse rounded-lg bg-card" />
                    </td>
                  ))}
                </tr>
              ))
            ) : isError ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-xs text-red-400"
                >
                  {t("error")}
                </td>
              </tr>
            ) : reservations.length > 0 ? (
              reservations.map((item) => {
                const status = getStatus(item.status);

                return (
                  <tr
                    key={item.id}
                    className="text-xs text-foreground"
                  >
                    <td className="px-2 py-1">
                      <div className="flex items-center gap-3">
                        <div className="h-[60px] w-[88px] shrink-0 rounded-xl bg-card" />

                        <span className="whitespace-nowrap font-medium">
                          {item.house.title}
                        </span>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-center">
                      {formatDate(item.reservedDates[0], locale)} -{" "}
                      {formatDate(item.reservedDates[1], locale)}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-center">
                      {Number(item.house.price).toLocaleString(
                        locale === "fa" ? "fa-IR" : "en-US",
                      )}{" "}
                      {t("toman")}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-center">
                      {item.traveler_details.length} {t("guestUnit")}
                    </td>

                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] ${status.className}`}
                      >
                        {status.label}
                        {status.icon}
                      </span>
                    </td>

                    <td
                      data-reservation-menu={item.id}
                      className="relative px-3 py-3 text-center"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === item.id ? null : item.id,
                          )
                        }
                        aria-label={t("actions")}
                        className="rounded-md p-1 text-foreground transition-colors hover:bg-background"
                      >
                        <MoreHorizontal size={19} />
                      </button>

                      {activeMenu === item.id && (
                        <div className="absolute left-8 top-1/2 z-30 w-32 -translate-y-1/2 rounded-xl border border-border bg-surface p-1.5 shadow-lg">
                          <button
                            type="button"
                            onClick={handleOpenPayments}
                            className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-[11px] text-foreground hover:bg-background"
                          >
                            {t("paymentAction")}
                            <CreditCard size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenDetails(item)}
                            className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-[11px] text-foreground hover:bg-background"
                          >
                            {t("detailsAction")}
                            <Info size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveMenu(null)}
                            className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-[11px] text-red-500 hover:bg-background"
                          >
                            {t("deleteAction")}
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-xs text-muted"
                >
                  {t("empty")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted">
          {t("page")} {currentPage} / {totalPages || 1}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1 || isLoading}
            onClick={() =>
              setCurrentPage((page) => Math.max(1, page - 1))
            }
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background disabled:opacity-40"
          >
            <ChevronRight size={15} />
          </button>

          {visiblePages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-xs transition-colors ${
                currentPage === page
                  ? "bg-primary text-black"
                  : "text-foreground hover:bg-background"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={
              currentPage >= totalPages || isLoading || totalPages === 0
            }
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background disabled:opacity-40"
          >
            <ChevronLeft size={15} />
          </button>
        </div>
      </div>

      <ReservationFiltersModal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApply={handleApplyFilters}
      />

      <ReservationDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        accommodationName={selectedAccommodation}
        onPayments={handleOpenPayments}
        onReservations={handleOpenReservations}
      />

      <ReservationPaymentsModal
        isOpen={isPaymentsOpen}
        onClose={() => setIsPaymentsOpen(false)}
      />

      <ReservationListModal
        isOpen={isReservationsOpen}
        onClose={() => setIsReservationsOpen(false)}
      />
    </section>
  );
};

export default BookingManagementSection;