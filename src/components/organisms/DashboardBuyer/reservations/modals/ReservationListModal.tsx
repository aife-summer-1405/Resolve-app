"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { X } from "lucide-react";

type ReservationListModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ReservationListModal = ({
  isOpen,
  onClose,
}: ReservationListModalProps) => {
  const t = useTranslations("BookingManagementSection");
  const locale = useLocale();

  const [isPassengersOpen, setIsPassengersOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);



const reservations = [
  {
    id: 1,
    date: "۱۲ مرداد - ۱۴۰۱ تا ۱۶ مرداد - ۱۴۰۱",
    passengers: [
      {
        id: 1,
        name: "امیر محمد مالیی",
        nationalCode: "۱۲۳۴۵۶۷۸۹",
        gender: "مرد",
        birthDate: "۱۲ مرداد - ۱۴۰۱",
      },
      {
        id: 2,
        name: "سارا محمدی",
        nationalCode: "۹۸۷۶۵۴۳۲۱",
        gender: "زن",
        birthDate: "۱۵ مهر - ۱۳۷۸",
      },
    ],
  },
  {
    id: 2,
    date: "۱۲ مرداد - ۱۴۰۱ تا ۱۶ مرداد - ۱۴۰۱",
    passengers: [
      {
        id: 1,
        name: "محمد احمدی",
        nationalCode: "۱۲۳۴۵۶۷۸۹",
        gender: "مرد",
        birthDate: "۲۰ آبان - ۱۳۷۵",
      },
    ],
  },
  {
    id: 3,
    date: "۱۲ مرداد - ۱۴۰۱ تا ۱۶ مرداد - ۱۴۰۱",
    passengers: [
      {
        id: 1,
        name: "نگار اکبری",
        nationalCode: "۹۸۷۶۵۴۳۲۱",
        gender: "زن",
        birthDate: "۱۰ خرداد - ۱۳۸۰",
      },
    ],
  },
  {
    id: 4,
    date: "۱۲ مرداد - ۱۴۰۱ تا ۱۶ مرداد - ۱۴۰۱",
    passengers: [
      {
        id: 1,
        name: "رضا حسینی",
        nationalCode: "۱۲۳۴۵۶۷۸۹",
        gender: "مرد",
        birthDate: "۵ تیر - ۱۳۷۰",
      },
    ],
  },
];

  if (!isOpen) return null;

  const closeAll = () => {
    setIsPassengersOpen(false);
    onClose();
  };

  const closePassengers = () => {
    setIsPassengersOpen(false);
  };

  const modalOverlay =
    "fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-3";

  const modalHeader =
    "flex h-[50px] items-center justify-between border-b border-dashed border-border px-3";

  const closeButton =
    "flex h-[29px] items-center gap-1 rounded-full border border-red-400 px-3 text-[10px] text-red-500 transition hover:bg-background";

  const modalTitle = "text-xs font-medium text-foreground";

  return (
    <>
      {!isPassengersOpen && (
        <div
          dir="rtl"
          className={modalOverlay}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeAll();
          }}
        >
          <div className="w-full max-w-[366px] overflow-hidden rounded-lg border border-border bg-surface shadow-2xl">
            <div className={modalHeader}>
              <h2 className={modalTitle}>
                {t("reservationsListTitle")}
              </h2>

              <button
                type="button"
                onClick={closeAll}
                className={closeButton}
              >
                {t("close")}
                <X size={13} />
              </button>
            </div>

            <div className="p-[11px]">
              <div className="flex h-[29px] items-center rounded-lg bg-background px-3 text-xs font-medium text-foreground">
                {t("reservationPeriod")}
              </div>

              <div className="mt-1 space-y-1">
                {reservations.map((reservation, index) => (
                  <div
                    key={reservation.id}
                    className={`flex h-[29px] items-center justify-between rounded-lg px-3 ${
                      index % 2 === 1
                        ? "bg-background"
                        : "bg-surface"
                    }`}
                  >
                    <span className="whitespace-nowrap text-[9px] text-foreground">
                      {reservation.date}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedReservationId(reservation.id);
                        setIsPassengersOpen(true);
                      }}
                      className="whitespace-nowrap text-[9px] text-foreground transition hover:text-primary"
                    >
                      {t("passengerInformation")}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isPassengersOpen && (
        <div
          dir="rtl"
          className={modalOverlay}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePassengers();
          }}
        >
          <div className="w-full max-w-[458px] overflow-hidden rounded-lg border border-border bg-surface shadow-2xl">
            <div className={modalHeader}>
              <h2 className={modalTitle}>
                {t("passengerInformation")}
              </h2>

              <button
                type="button"
                onClick={closePassengers}
                className={closeButton}
              >
                {t("close")}
                <X size={13} />
              </button>
            </div>

            <div className="overflow-x-auto p-[11px]">
              <table className="w-full min-w-[420px] border-separate border-spacing-y-1 text-center">
                <thead>
                  <tr className="h-[29px] bg-surface text-[11px] text-foreground">
                    <th className="rounded-r-lg px-2 font-medium">
                      {locale === "fa" ? "نام" : "Name"}
                    </th>

                    <th className="px-2 font-medium">
                      {locale === "fa" ? "کد ملی" : "National Code"}
                    </th>

                    <th className="px-2 font-medium">
                      {locale === "fa" ? "جنسیت" : "Gender"}
                    </th>

                    <th className="rounded-l-lg px-2 font-medium">
                      {locale === "fa" ? "تاریخ تولد" : "Birth Date"}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {reservations
                    .find((reservation) => reservation.id === selectedReservationId)
                    ?.passengers.map((passenger, index) => (
                    <tr
                      key={passenger.id}
                      className={`h-[29px] text-[10px] text-foreground ${
                        index % 2 === 1
                          ? "bg-background"
                          : "bg-surface"
                      }`}
                    >
                      <td className="rounded-r-lg px-2 whitespace-nowrap">
                        {passenger.name}
                      </td>

                      <td className="px-2 whitespace-nowrap">
                        {passenger.nationalCode}
                      </td>

                      <td className="px-2 whitespace-nowrap">
                        {passenger.gender}
                      </td>

                      <td className="rounded-l-lg px-2 whitespace-nowrap">
                        {passenger.birthDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationListModal;