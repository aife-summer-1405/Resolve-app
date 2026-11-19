
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
  XCircle,
} from "lucide-react";


import { useGetCustomerBookings } from "@/src/hooks/Seller_dashboard/DashboardPage/useGetCustomerBookings";
import { useUserData } from "@/src/providers/UserDataContextProvider";

import {
  ICustomerBooking,
  IGetCustomerBookingsParams,
} from "@/src/types/Seller_Dashboard/customer-booking";
import ReservationFiltersModal, { ReservationFilters } from "../../DashboardBuyer/reservations/modals/ReservationFiltersModal";
import ReservationListModal from "../../DashboardBuyer/reservations/modals/ReservationListModal";
import ReservationPaymentsModal from "../../DashboardBuyer/reservations/modals/ReservationPaymentsModal";
import ReservationDetailsModal from "../../DashboardBuyer/reservations/modals/ReservationDetailsModal";
import ReservationHistoryModal from "../../DashboardBuyer/reservations/modals/ReservationHistoryModal";
import { useCancelBooking } from "@/src/hooks/Seller_dashboard/DashboardPage/useCancelBooking";
import { useDeleteBooking } from "@/src/hooks/dashboard/useDeleteBooking";
import { toast } from "sonner";

const LIMIT = 10;

const formatDate = (date: string, locale: string) =>
  new Date(date).toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const formatPrice = (price: string, locale: string) =>
  Number(price).toLocaleString(locale === "fa" ? "fa-IR" : "en-US");

const Reservations = () => {
  const t = useTranslations("Reservations");
  const locale = useLocale();

  const { userData } = useUserData();

  const userId = userData?.user?.id
    ? Number(userData.user.id)
    : undefined;

  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const [queryParams, setQueryParams] =
    useState<IGetCustomerBookingsParams>({
      page: 1,
      limit: LIMIT,
      sort: "created_at",
      order: "DESC",
    });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [isReservationsOpen, setIsReservationsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<ICustomerBooking | null>(null);

  const {
    data: reservation,
    isLoading,
    isError,
  } = useGetCustomerBookings(userId, queryParams);

  const reservations = useMemo(() => {
    const data = reservation?.bookings ?? [];
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) return data;

    return data.filter((item) => {
      const houseName = item.house?.title?.toLowerCase() ?? "";

      const travelerName = item.traveler_details?.[0]
        ? `${item.traveler_details[0].firstName} ${item.traveler_details[0].lastName}`.toLowerCase()
        : "";

      return (
        houseName.includes(searchValue) ||
        travelerName.includes(searchValue)
      );
    });
  }, [reservation?.bookings, search]);

  const totalPages = Math.ceil((reservation?.totalCount ?? 0) / LIMIT);

  const visiblePages = useMemo(() => {
    const currentPage = queryParams.page ?? 1;

    const start = Math.max(
      1,
      Math.min(currentPage - 2, totalPages - 4),
    );

    return Array.from(
      { length: Math.min(5, totalPages) },
      (_, index) => start + index,
    );
  }, [queryParams.page, totalPages]);

  useEffect(() => {
    if (activeMenu === null) return;

    const handleClickOutside = (event: PointerEvent) => {
      const target = event.target;

      if (
        target instanceof Element &&
        !target.closest(`[data-reservation-menu="${activeMenu}"]`)
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [activeMenu]);

  const getStatus = (status: ICustomerBooking["status"]) => {
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

  const handleOpenDetails = (item: ICustomerBooking) => {
    setSelectedReservation(item);
    console.log(" Selected Reservation:", item);

    setIsDetailsOpen(true);
    setActiveMenu(null);
  };

  const handleOpenPayments = (item?: ICustomerBooking) => {
    if (item) setSelectedReservation(item);

    setIsDetailsOpen(false);
    setIsPaymentsOpen(true);
    setActiveMenu(null);
  };

  const handleOpenReservations = () => {
    setIsDetailsOpen(false);
    setIsReservationsOpen(true);
    setActiveMenu(null);
  };
  const handleOpenHistory = () => {
    setIsDetailsOpen(false);
    setIsHistoryOpen(true);
    setActiveMenu(null);
  };
  const handleApplyFilters = (filters: ReservationFilters) => {
    setQueryParams((prev) => {
      const { status, ...params } = prev;

      return {
        ...params,
        page: 1,
        ...(filters.status ? { status: filters.status } : {}),
      };
    });

    setIsFiltersOpen(false);
  };

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page,
    }));
  };

  const { mutate: cancelBooking, isPending: isCanceling } =
    useCancelBooking();

  const handleCancelBooking = (bookingId: number) => {
    cancelBooking(bookingId, {
      onSuccess: () => {
        setActiveMenu(null);
      },
    });
  };
  const {
    mutate: deleteBooking,
    isPending: isDeleting,
  } = useDeleteBooking();


  const handleDelete = (id: number) => {
    deleteBooking(id, {
      onSuccess: () => {
        toast.success("حذف رزرو با موفقیت انجام شد");
        setActiveMenu(null);
      },
      onError: () => {
        toast.error("حذف رزرو با خطا مواجه شد");
      },
    });
  };
  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  const handleCloseReservations = () => {
    setIsReservationsOpen(false);
  };

  return (
    <section
      dir={locale === "fa" ? "rtl" : "ltr"}
      className="w-full rounded-xl bg-surface p-3 text-foreground sm:p-4"
    >
      <div className="flex flex-col gap-3 border-b border-dashed border-border pb-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-sm font-semibold">
          {t("title")}
        </h2>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1 sm:w-64 sm:flex-none">
            <Search
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("searchPlaceholder")}
              className="h-10 w-full rounded-xl border border-border bg-transparent py-2 pr-9 pl-3 text-xs text-foreground outline-none placeholder:text-muted focus:border-primary"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsFiltersOpen(true)}
            className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs font-medium text-black transition-opacity hover:opacity-90"
          >
            {t("filters")}
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="mt-4 h-[calc(100vh-400px)] min-h-[300px] max-h-[600px] w-full overflow-auto">
        <table className="w-full min-w-[850px] border-separate border-spacing-y-1.5 text-xs">
          <thead>
            <tr className="bg-background text-foreground">
              <th className="sticky top-0 z-10 rounded-r-lg bg-background px-4 py-3 text-right font-medium">
                {t("propertyName")}
              </th>

              <th className="sticky top-0 z-10 bg-background px-3 py-3 text-center font-medium">
                {t("passengerInfo")}
              </th>

              <th className="sticky top-0 z-10 bg-background px-3 py-3 text-center font-medium">
                {t("reservationDate")}
              </th>

              <th className="sticky top-0 z-10 bg-background px-3 py-3 text-center font-medium">
                {t("amount")}
              </th>

              <th className="sticky top-0 z-10 bg-background px-3 py-3 text-center font-medium">
                {t("reservationStatus")}
              </th>

              <th className="sticky top-0 z-10 bg-background px-3 py-3 text-center font-medium">
                {t("paymentStatus")}
              </th>

              <th className="sticky top-0 z-10 rounded-l-lg bg-background px-4 py-3 text-center font-medium">
                {t("operations")}
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  {Array.from({ length: 7 }).map((_, cellIndex) => (
                    <td key={cellIndex} className="px-3 py-3">
                      <div className="h-8 animate-pulse rounded-lg bg-card" />
                    </td>
                  ))}
                </tr>
              ))
            ) : isError ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-xs text-red-400"
                >
                  {t("error")}
                </td>
              </tr>
            ) : reservations.length > 0 ? (
              reservations.map((item) => {
                const status = getStatus(item.status);

                const traveler = item.traveler_details?.[0];

                const travelerName = traveler
                  ? `${traveler.firstName} ${traveler.lastName}`
                  : "—";

                const dates = item.reservedDates?.length
                  ? item.reservedDates
                    .map((date) => formatDate(date, locale))
                    .join(" - ")
                  : "—";

                return (
                  <tr
                    key={item.id}
                    className="text-xs text-foreground transition-colors hover:bg-background"
                  >
                    <td className="px-3 py-3 text-right">
                      <span className="whitespace-nowrap font-medium">
                        {item.house?.title ?? "—"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-center">
                      {travelerName}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-center">
                      {dates}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-center">
                      {item.house?.price
                        ? formatPrice(item.house.price, locale)
                        : "—"}{" "}
                      {t("currency")}
                    </td>

                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] ${status.className}`}
                      >
                        {status.label}
                        {status.icon}
                      </span>
                    </td>

                    <td className="px-3 py-3 text-center">
                      <span className="rounded-full bg-card px-3 py-1.5 text-[10px] text-muted">
                        —
                      </span>
                    </td>

                    <td
                      data-reservation-menu={item.id}
                      className="relative px-3 py-3 text-center"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenu((prev) =>
                            prev === item.id ? null : item.id,
                          )
                        }
                        aria-label={t("operations")}
                        aria-expanded={activeMenu === item.id}
                        className="rounded-md p-1 text-foreground transition-colors hover:bg-background"
                      >
                        <MoreHorizontal size={19} />
                      </button>

                      {activeMenu === item.id && (
                        <div className="absolute left-8 top-1/2 z-30 w-40 -translate-y-1/2 rounded-xl border border-border bg-surface p-1.5 text-right shadow-lg">


                          <button
                            type="button"
                            onClick={() => handleOpenDetails(item)}
                            className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-[11px] text-foreground hover:bg-background"
                          >
                            {t("details")}
                            <Info size={14} />
                          </button>

                          {item.status === "pending" && (
                            <>
                              <button
                                type="button"
                                // onClick={() => handleApproveBooking(item)}
                                className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-[11px] text-green-500 hover:bg-background"
                              >
                                تأیید رزرو
                                <Check size={14} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleCancelBooking(item.id)}
                                className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-[11px] text-red-500 hover:bg-background"
                              >
                                {isCanceling ? "در حال لغو..." : "لغو رزرو"}                                <XCircle size={14} />
                              </button>
                            </>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-[11px] text-red-500 hover:bg-background"
                          >
                            حذف رزرو
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
                  colSpan={7}
                  className="py-12 text-center text-xs text-muted"
                >
                  {t("noReservations")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted">
          {t("page")} {queryParams.page ?? 1} / {totalPages || 1}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={(queryParams.page ?? 1) === 1 || isLoading}
            onClick={() =>
              handlePageChange(Math.max(1, (queryParams.page ?? 1) - 1))
            }
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background disabled:opacity-40"
          >
            <ChevronRight size={15} />
          </button>

          {visiblePages.map((page) => (
            <button
              key={page}
              type="button"
              disabled={isLoading}
              onClick={() => handlePageChange(page)}
              className={`flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-xs transition-colors ${queryParams.page === page
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
              (queryParams.page ?? 1) >= totalPages ||
              isLoading ||
              totalPages === 0
            }
            onClick={() =>
              handlePageChange(
                Math.min(totalPages, (queryParams.page ?? 1) + 1),
              )
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

      {selectedReservation && (
        <ReservationDetailsModal
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
          accommodationId={Number(selectedReservation.houseId)}
          onPayments={() => handleOpenPayments()}
          onReservations={handleOpenReservations}
          onHistory={handleOpenHistory}
        />
      )}
      {selectedReservation && (
        <ReservationPaymentsModal
          isOpen={isPaymentsOpen}
          onClose={() => setIsPaymentsOpen(false)}
        />
      )}

      {selectedReservation && (
        <ReservationListModal
          isOpen={isReservationsOpen}
          onClose={handleCloseReservations}
          selectedAccommodation={selectedReservation}
        />
      )}


      {selectedReservation && (
        <ReservationHistoryModal
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          updates={selectedReservation.updated_at}
        />
      )}
    </section>
  );
};

export default Reservations;
