
"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { X } from "lucide-react";
import { IBookingResponse } from "@/src/types/HousereservesType/BookingType";
import { ICustomerBooking } from "@/src/types/Seller_Dashboard/customer-booking";

type ReservationListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedAccommodation: IBookingResponse| ICustomerBooking | null;
};

const ReservationListModal = ({
  isOpen,
  onClose,
  selectedAccommodation,
}: ReservationListModalProps) => {
  const t = useTranslations("BookingManagementSection");
  const locale = useLocale();

  const [isPassengersOpen, setIsPassengersOpen] = useState(false);

  if (!isOpen || !selectedAccommodation) return null;

  const reservation = selectedAccommodation;
  const travelers = reservation.traveler_details ?? [];

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(
      locale === "fa" ? "fa-IR" : "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

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

            <div className="space-y-3 p-[11px]">
              <div className="flex h-[29px] items-center rounded-lg bg-background px-3 text-xs font-medium text-foreground">
                {t("reservationPeriod")}
              </div>

              <div className="flex h-[29px] items-center justify-between rounded-lg px-3 text-[9px] text-foreground">
                <span>
                  {reservation.reservedDates?.length === 2
                    ? `${formatDate(reservation.reservedDates[0])} - ${formatDate(reservation.reservedDates[1])}`
                    : "-"}
                </span>

                <button
                  type="button"
                  onClick={() => setIsPassengersOpen(true)}
                  className="whitespace-nowrap transition hover:text-primary"
                >
                  {t("passengerInformation")}
                </button>
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
                  {travelers.length > 0 ? (
                    travelers.map((passenger, index) => (
                      <tr
                        key={`${passenger.nationalId}-${index}`}
                        className={`h-[29px] text-[10px] text-foreground ${
                          index % 2 === 1
                            ? "bg-background"
                            : "bg-surface"
                        }`}
                      >
                        <td className="rounded-r-lg px-2 whitespace-nowrap">
                          {passenger.firstName} {passenger.lastName}
                        </td>

                        <td className="px-2 whitespace-nowrap">
                          {passenger.nationalId}
                        </td>

                        <td className="px-2 whitespace-nowrap">
                          {passenger.gender}
                        </td>

                        <td className="rounded-l-lg px-2 whitespace-nowrap">
                          {formatDate(passenger.birthDate)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-6 text-xs text-muted"
                      >
                        {t("empty")}
                      </td>
                    </tr>
                  )}
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
