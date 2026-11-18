"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Check,
  X,
  Clock3,
  Eye,
} from "lucide-react";

import Pagination from "@/src/components/common/Pagination";
import FormInput from "@/src/components/molecules/FormInput/FormInput";
import ReservationModals from "./ReservationModals";

interface Reservation {
  id: number;
  houseName: string;
  travelerName: string;
  date: string;
  amount: string;
  reservationStatus: "تایید شده" | "در انتظار" | "لغو شده";
  paymentStatus: "موفق شده" | "لغو شده";
}

type ConfirmAction = "approve" | "cancel" | "delete" | null;
type DetailSection = "passengers" | "payments" | "history" | null;

const initialReservations: Reservation[] = [
  {
    id: 1,
    houseName: "هتل همایون فر کیش ایران",
    travelerName: "سبحان عرب خزعلی",
    date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳",
    amount: "۸۰,۰۰۰,۰۰۰",
    reservationStatus: "تایید شده",
    paymentStatus: "لغو شده",
  },
  {
    id: 2,
    houseName: "هتل همایون فر کیش ایران",
    travelerName: "سبحان عرب خزعلی",
    date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳",
    amount: "۸۰,۰۰۰,۰۰۰",
    reservationStatus: "تایید شده",
    paymentStatus: "لغو شده",
  },
  {
    id: 3,
    houseName: "هتل همایون فر کیش ایران",
    travelerName: "سبحان عرب خزعلی",
    date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳",
    amount: "۸۰,۰۰۰,۰۰۰",
    reservationStatus: "تایید شده",
    paymentStatus: "لغو شده",
  },
  {
    id: 4,
    houseName: "هتل همایون فر کیش ایران",
    travelerName: "سبحان عرب خزعلی",
    date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳",
    amount: "۸۰,۰۰۰,۰۰۰",
    reservationStatus: "در انتظار",
    paymentStatus: "لغو شده",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const t = useTranslations("Reservations");

  const isSuccess = status === "تایید شده" || status === "موفق شده";
  const isWaiting = status === "در انتظار";

  const statusText =
    status === "تایید شده"
      ? t("approved")
      : status === "در انتظار"
        ? t("pending")
        : status === "موفق شده"
          ? t("successful")
          : t("cancelled");

  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] ${
        isSuccess
          ? "bg-[#91FF45] text-black"
          : isWaiting
            ? "bg-[#FFD45C] text-black"
            : "bg-[#FF999D] text-black"
      }`}
    >
      {statusText}
      {isSuccess ? (
        <Check size={12} />
      ) : isWaiting ? (
        <Clock3 size={12} />
      ) : (
        <X size={12} />
      )}
    </span>
  );
};

const Reservations = () => {
  const t = useTranslations("Reservations");
  const locale = useLocale();
  const direction = locale === "fa" ? "rtl" : "ltr";

  const [reservations, setReservations] = useState(initialReservations);
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [reservationFilter, setReservationFilter] = useState("همه");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeDetailSection, setActiveDetailSection] =
    useState<DetailSection>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const isModalOpen =
    isFilterOpen ||
    isDetailsOpen ||
    activeDetailSection !== null ||
    confirmAction !== null;

  useEffect(() => {
    if (!isModalOpen) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;

      setActiveDetailSection(null);
      setConfirmAction(null);
      setIsDetailsOpen(false);
      setIsFilterOpen(false);
      setSelectedReservation(null);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.travelerName.includes(search) ||
      reservation.houseName.includes(search);

    const matchesStatus =
      reservationFilter === "همه" ||
      reservation.reservationStatus === reservationFilter;

    return matchesSearch && matchesStatus;
  });

  const handleConfirmAction = () => {
    if (!selectedReservation) return;

    if (confirmAction === "delete") {
      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== selectedReservation.id),
      );
    }

    if (confirmAction === "approve" || confirmAction === "cancel") {
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === selectedReservation.id
            ? {
                ...reservation,
                reservationStatus:
                  confirmAction === "approve" ? "تایید شده" : "لغو شده",
              }
            : reservation,
        ),
      );
    }

    setConfirmAction(null);
    setSelectedReservation(null);
  };

  return (
    <div className="w-full space-y-4" dir={direction}>
      <div className="rounded-xl bg-surface p-3 text-foreground">
        <div className="flex flex-col gap-3 border-b border-dashed border-border pb-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-sm font-semibold">{t("title")}</h2>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <FormInput
                name="search"
                label={t("search")}
                value={search}
                placeholder={t("searchPlaceholder")}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />

              <Search
                size={15}
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted ${
                  direction === "rtl" ? "left-3" : "left-3"
                }`}
              />
            </div>

            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#91FF45] px-4 py-2.5 text-xs text-black transition hover:bg-[#7eea32]"
            >
              <SlidersHorizontal size={14} />
              {t("filters")}
            </button>
          </div>
        </div>

        <div className="mt-3 overflow-x-auto overflow-y-hidden">
          <table className="w-full min-w-[800px] border-separate border-spacing-y-1.5 text-xs">
            <thead>
              <tr className="bg-background text-foreground">
                <th
                  className={`px-3 py-2.5 font-medium ${direction === "rtl" ? "rounded-r-lg text-right" : "rounded-l-lg text-left"}`}
                >
                  {t("propertyName")}
                </th>
                <th className="px-3 py-2.5 text-center font-medium">
                  {t("passengerInfo")}
                </th>
                <th className="px-3 py-2.5 text-center font-medium">
                  {t("reservationDate")}
                </th>
                <th className="px-3 py-2.5 text-center font-medium">
                  {t("amount")}
                </th>
                <th className="px-3 py-2.5 text-center font-medium">
                  {t("reservationStatus")}
                </th>
                <th className="px-3 py-2.5 text-center font-medium">
                  {t("paymentStatus")}
                </th>
                <th
                  className={`px-3 py-2.5 text-center font-medium ${direction === "rtl" ? "rounded-l-lg" : "rounded-r-lg"}`}
                >
                  {t("operations")}
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredReservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="transition hover:bg-background"
                >
                  <td
                    className={`px-3 py-2.5 ${direction === "rtl" ? "rounded-r-lg text-right" : "rounded-l-lg text-left"}`}
                  >
                    {reservation.houseName}
                  </td>

                  <td className="px-3 py-2.5 text-center">
                    {reservation.travelerName}
                  </td>

                  <td className="whitespace-nowrap px-3 py-2.5 text-center">
                    {reservation.date}
                  </td>

                  <td className="whitespace-nowrap px-3 py-2.5 text-center">
                    {reservation.amount} {t("currency")}
                  </td>

                  <td className="px-3 py-2.5 text-center">
                    <StatusBadge status={reservation.reservationStatus} />
                  </td>

                  <td className="px-3 py-2.5 text-center">
                    <StatusBadge status={reservation.paymentStatus} />
                  </td>

                  <td
                    className={`relative px-3 py-2.5 text-center ${direction === "rtl" ? "rounded-l-lg" : "rounded-r-lg"}`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === reservation.id ? null : reservation.id,
                        )
                      }
                      className="rounded-md p-1 transition hover:bg-surface"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {activeMenu === reservation.id && (
                      <div
                        className={`absolute top-9 z-20 w-32 rounded-lg border border-border bg-surface p-1.5 text-foreground shadow-xl ${direction === "rtl" ? "left-7 text-right" : "right-7 text-left"}`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedReservation(reservation);
                            setConfirmAction("approve");
                            setActiveMenu(null);
                          }}
                          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[11px] hover:bg-background"
                        >
                          {t("approveReservation")}
                          <Check size={13} />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedReservation(reservation);
                            setConfirmAction("cancel");
                            setActiveMenu(null);
                          }}
                          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[11px] hover:bg-background"
                        >
                          {t("cancelReservation")}
                          <X size={13} />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedReservation(reservation);
                            setIsDetailsOpen(true);
                            setActiveMenu(null);
                          }}
                          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[11px] hover:bg-background"
                        >
                          {t("details")}
                          <Eye size={13} />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedReservation(reservation);
                            setConfirmAction("delete");
                            setActiveMenu(null);
                          }}
                          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[11px] text-red-500 hover:bg-background"
                        >
                          {t("delete")}
                          <X size={13} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {filteredReservations.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted">
                    {t("noReservations")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-muted">
            {t("page")} {currentPage}
          </span>

          <Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <ReservationModals
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        reservationFilter={reservationFilter}
        setReservationFilter={setReservationFilter}
        setCurrentPage={setCurrentPage}
        isDetailsOpen={isDetailsOpen}
        setIsDetailsOpen={setIsDetailsOpen}
        selectedReservation={selectedReservation}
        setSelectedReservation={setSelectedReservation}
        activeDetailSection={activeDetailSection}
        setActiveDetailSection={setActiveDetailSection}
        confirmAction={confirmAction}
        setConfirmAction={setConfirmAction}
        handleConfirmAction={handleConfirmAction}
      />
    </div>
  );
};

export default Reservations;
