"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CalendarDays, ChevronDown, X } from "lucide-react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";

export type ReservationFilters = {
  startDate: string;
  endDate: string;
  propertyType: string;
  reservationStatus: string;
};

type ReservationFiltersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: ReservationFilters) => void;
};

const initialFilters: ReservationFilters = {
  startDate: "",
  endDate: "",
  propertyType: "",
  reservationStatus: "",
};

const ReservationFiltersModal = ({
  isOpen,
  onClose,
  onApply,
}: ReservationFiltersModalProps) => {
  const t = useTranslations("BookingManagementSection");

  const [filters, setFilters] =
    useState<ReservationFilters>(initialFilters);

  const [startDateValue, setStartDateValue] =
    useState<DateObject | null>(null);

  const [endDateValue, setEndDateValue] =
    useState<DateObject | null>(null);

  if (!isOpen) return null;

  const updateFilter = (
    key: keyof ReservationFilters,
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleStartDateChange = (date: DateObject | null) => {
    setStartDateValue(date);

    const formattedDate = date
      ? date.convert(gregorian).format("YYYY-MM-DD")
      : "";

    updateFilter("startDate", formattedDate);

    if (
      date &&
      endDateValue &&
      date.toDate().getTime() >= endDateValue.toDate().getTime()
    ) {
      setEndDateValue(null);
      updateFilter("endDate", "");
    }
  };

  const handleEndDateChange = (date: DateObject | null) => {
    setEndDateValue(date);

    const formattedDate = date
      ? date.convert(gregorian).format("YYYY-MM-DD")
      : "";

    updateFilter("endDate", formattedDate);
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const dateInputClass =
    "h-11 w-full rounded-xl border border-border bg-transparent px-3 pl-9 text-xs text-foreground outline-none focus:border-primary";

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="w-full max-w-[416px] rounded-xl border border-border bg-surface p-3 shadow-xl sm:p-4">
        <div className="flex items-center justify-between border-b border-dashed border-border pb-3">
          <h2 className="text-sm font-semibold text-foreground">
            {t("filters")}
          </h2>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 items-center gap-1 rounded-full border border-red-400 px-3 text-xs text-red-500 transition-colors hover:bg-red-500/10"
          >
            {t("close")}
            <X size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 py-5 sm:grid-cols-2">
          <div className="relative">
            <label className="absolute -top-2 right-3 z-10 bg-surface px-1 text-[10px] text-muted">
              {t("startDate")}
            </label>

            <div className="relative">
              <DatePicker
                value={startDateValue}
                onChange={handleStartDateChange}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                placeholder="انتخاب تاریخ"
                inputClass={dateInputClass}
                containerClassName="w-full"
                editable={false}
                className="bg-surface"
              />

              <CalendarDays
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>

          <div className="relative">
            <label className="absolute -top-2 right-3 z-10 bg-surface px-1 text-[10px] text-muted">
              {t("endDate")}
            </label>

            <div className="relative">
              <DatePicker
                value={endDateValue}
                onChange={handleEndDateChange}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                minDate={
                  startDateValue
                    ? new DateObject(startDateValue).add(1, "day")
                    : undefined
                }
                placeholder="انتخاب تاریخ"
                inputClass={dateInputClass}
                containerClassName="w-full"
                editable={false}
                disabled={!startDateValue}
                className="bg-surface"
              />

              <CalendarDays
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>

          <div className="relative">
            <label className="absolute -top-2 right-3 z-10 bg-surface px-1 text-[10px] text-muted">
              {t("propertyType")}
            </label>

            <div className="relative">
              <select
                value={filters.propertyType}
                onChange={(event) =>
                  updateFilter("propertyType", event.target.value)
                }
                className="h-11 w-full appearance-none rounded-xl border border-border bg-transparent px-3 text-xs text-foreground outline-none focus:border-primary"
              >
                <option value="">{t("allPropertyTypes")}</option>
                <option value="apartment">{t("apartment")}</option>
                <option value="villa">{t("villa")}</option>
                <option value="hotel">{t("hotel")}</option>
                <option value="cottage">{t("cottage")}</option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>

          <div className="relative">
            <label className="absolute -top-2 right-3 z-10 bg-surface px-1 text-[10px] text-muted">
              {t("reservationStatus")}
            </label>

            <div className="relative">
              <select
                value={filters.reservationStatus}
                onChange={(event) =>
                  updateFilter(
                    "reservationStatus",
                    event.target.value,
                  )
                }
                className="h-11 w-full appearance-none rounded-xl border border-border bg-transparent px-3 text-xs text-foreground outline-none focus:border-primary"
              >
                <option value="">{t("allStatuses")}</option>
                <option value="confirmed">{t("confirmed")}</option>
                <option value="pending">{t("pending")}</option>
                <option value="cancelled">{t("cancelled")}</option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-1">
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