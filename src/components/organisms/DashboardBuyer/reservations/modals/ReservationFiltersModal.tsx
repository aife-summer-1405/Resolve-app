
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, X } from "lucide-react";
import { IGetBookingsParams } from "@/src/types/dashboard/booking";

export type ReservationFilters = Pick<IGetBookingsParams, "status">;

type ReservationFiltersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: ReservationFilters) => void;
};

const initialFilters: ReservationFilters = {
  status: "",
};

const ReservationFiltersModal = ({
  isOpen,
  onClose,
  onApply,
}: ReservationFiltersModalProps) => {
  const t = useTranslations("BookingManagementSection");

  const [filters, setFilters] =
    useState<ReservationFilters>(initialFilters);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  const selectClass =
    "h-11 w-full appearance-none rounded-xl border border-border bg-transparent px-3 text-xs text-foreground outline-none focus:border-primary";

  const labelClass =
    "absolute -top-2 right-3 z-10 bg-surface px-1 text-[10px] text-muted";

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[416px] rounded-xl border border-border bg-surface p-3 shadow-xl sm:p-4">
        <div className="flex items-center justify-between border-b border-dashed border-border pb-3">
          <h2 className="text-sm font-semibold text-foreground">
            {t("filters")}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 items-center gap-1 rounded-full border border-red-400 px-3 text-xs text-red-500 transition-colors hover:bg-red-500/10"
          >
            {t("close")}
            <X size={14} />
          </button>
        </div>

        <div className="py-5">
          <div className="relative">
            <label className={labelClass}>
              {t("reservationStatus")}
            </label>

            <div className="relative">
              <select
                value={filters.status ?? ""}
                onChange={(event) =>
                  setFilters({ status: event.target.value })
                }
                className={selectClass}
              >
                <option value="">{t("allStatuses")}</option>
                <option value="pending">{t("pending")}</option>
                <option value="confirmed">{t("confirmed")}</option>
                <option value="canceled">{t("cancelled")}</option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pb-1">
          <button
            type="button"
            onClick={handleReset}
            className="h-9 rounded-xl border border-border px-5 text-xs font-medium text-foreground transition-colors hover:bg-card"
          >
            {t("resetFilters")}
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="h-9 rounded-xl bg-primary px-5 text-xs font-medium text-black transition-opacity hover:opacity-90"
          >
            {t("applyFilters")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationFiltersModal;
