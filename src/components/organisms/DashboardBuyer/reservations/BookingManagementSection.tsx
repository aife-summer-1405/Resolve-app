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

import ReservationFiltersModal, {
  type ReservationFilters,
} from "./modals/ReservationFiltersModal";

import ReservationDetailsModal from "./modals/ReservationDetailsModal";
import ReservationPaymentsModal from "./modals/ReservationPaymentsModal";
import ReservationListModal from "./modals/ReservationListModal";
import Pagination from "@/src/components/common/Pagination";

type Reservation = {
  id: number;
  accommodation: string;
  date: string;
  price: string;
  guests: number;
  reservationStatus: "confirmed" | "pending" | "cancelled";
  paymentStatus: "paid" | "pending" | "cancelled";
};

const BookingManagementSection = () => {
  const t = useTranslations("BookingManagementSection");
  const locale = useLocale();

  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
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

  const [currentPage, setCurrentPage] = useState(1);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] =
    useState<ReservationFilters | null>(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState("");
  const [isReservationsOpen, setIsReservationsOpen] = useState(false);

  const reservations: Reservation[] = [
    {
      id: 1,
      accommodation:
        locale === "fa" ? "هتل سرایوان رشت" : "Saravan Hotel Rasht",
      date: "۱۲ مرداد ۱۴۰۱ - ۱۳:۳۳",
      price: "۱۰,۸۰۰,۰۰۰",
      guests: 2,
      reservationStatus: "confirmed",
      paymentStatus: "cancelled",
    },
    {
      id: 2,
      accommodation:
        locale === "fa" ? "هتل سرایوان رشت" : "Saravan Hotel Rasht",
      date: "۱۲ مرداد ۱۴۰۱ - ۱۳:۳۳",
      price: "۱۰,۸۰۰,۰۰۰",
      guests: 2,
      reservationStatus: "pending",
      paymentStatus: "paid",
    },
    {
      id: 3,
      accommodation:
        locale === "fa" ? "هتل سرایوان رشت" : "Saravan Hotel Rasht",
      date: "۱۲ مرداد ۱۴۰۱ - ۱۳:۳۳",
      price: "۱۰,۸۰۰,۰۰۰",
      guests: 2,
      reservationStatus: "confirmed",
      paymentStatus: "paid",
    },
    {
      id: 4,
      accommodation:
        locale === "fa" ? "هتل سرایوان رشت" : "Saravan Hotel Rasht",
      date: "۱۲ مرداد ۱۴۰۱ - ۱۳:۳۳",
      price: "۱۰,۸۰۰,۰۰۰",
      guests: 2,
      reservationStatus: "confirmed",
      paymentStatus: "paid",
    },
    {
      id: 5,
      accommodation:
        locale === "fa" ? "هتل سرایوان رشت" : "Saravan Hotel Rasht",
      date: "۱۲ مرداد ۱۴۰۱ - ۱۳:۳۳",
      price: "۱۰,۸۰۰,۰۰۰",
      guests: 2,
      reservationStatus: "confirmed",
      paymentStatus: "paid",
    },
  ];

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const matchesSearch = reservation.accommodation
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        !appliedFilters?.reservationStatus ||
        reservation.reservationStatus ===
          appliedFilters.reservationStatus;

      return matchesSearch && matchesStatus;
    });
  }, [reservations, search, appliedFilters]);

  const getStatus = (status: string) => {
    switch (status) {
      case "confirmed":
      case "paid":
        return {
          label: status === "confirmed" ? t("confirmed") : t("paid"),
          className: "bg-[#91FF45] text-[#202020]",
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

  const handleOpenDetails = (reservation: Reservation) => {
    setSelectedAccommodation(reservation.accommodation);
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
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
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
        <table className="w-full min-w-[950px] border-separate border-spacing-y-3 text-right">
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

              <th className="px-3 py-3 font-medium">
                {t("paymentStatus")}
              </th>

              <th className="rounded-l-xl px-4 py-3 text-center font-medium">
                {t("actions")}
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredReservations.map((reservation) => {
              const reservationStatus = getStatus(
                reservation.reservationStatus,
              );

              const paymentStatus = getStatus(
                reservation.paymentStatus,
              );

              return (
                <tr
                  key={reservation.id}
                  className="text-xs text-foreground"
                >
                  <td className="px-2 py-1">
                    <div className="flex items-center gap-3">
                      <div className="h-[60px] w-[88px] shrink-0 rounded-xl bg-[#D9D9D9]" />

                      <span className="whitespace-nowrap font-medium">
                        {reservation.accommodation}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    {reservation.date}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    <span>{reservation.price}</span>{" "}
                    <span>{t("toman")}</span>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    {reservation.guests} {t("guestUnit")}
                  </td>

                  <td className="px-3 py-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] ${reservationStatus.className}`}
                    >
                      {reservationStatus.label}
                      {reservationStatus.icon}
                    </span>
                  </td>

                  <td className="px-3 py-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] ${paymentStatus.className}`}
                    >
                      {paymentStatus.label}
                      {paymentStatus.icon}
                    </span>
                  </td>

                  <td
                    data-reservation-menu={reservation.id}
                    className="relative px-3 py-3 text-center"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === reservation.id
                            ? null
                            : reservation.id,
                        )
                      }
                      aria-label={t("actions")}
                      className="rounded-md p-1 text-foreground transition-colors hover:bg-background"
                    >
                      <MoreHorizontal size={19} />
                    </button>

                    {activeMenu === reservation.id && (
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
                          onClick={() => handleOpenDetails(reservation)}
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
            })}

            {filteredReservations.length === 0 && (
              <tr>
                <td
                  colSpan={7}
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
          {t("page")} {currentPage}
        </span>

        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
      </div>

      <ReservationFiltersModal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApply={(filters) => {
          setAppliedFilters(filters);
          setCurrentPage(1);
        }}
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