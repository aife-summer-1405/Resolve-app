"use client";

import { useLocale, useTranslations } from "next-intl";
import { X } from "lucide-react";


type ReservationHistoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  updates: string;
  isLoading?: boolean;
};

const ReservationHistoryModal = ({
  isOpen,
  onClose,
  updates,
  isLoading = false,
}: ReservationHistoryModalProps) => {
  const t = useTranslations("BookingManagementSection");
  const locale = useLocale();
  const isPersian = locale === "fa";

  if (!isOpen) return null;

  const formatDateTime = (date: string) =>
    new Date(date).toLocaleString(isPersian ? "fa-IR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div
      dir={isPersian ? "rtl" : "ltr"}
      className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="my-auto w-full max-w-[550px] overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-dashed border-border px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 rounded-full border border-red-400 px-3 py-1.5 text-xs text-red-500 transition hover:bg-red-50"
          >
            {t("close")}
            <X size={15} />
          </button>

          <h2 className="text-sm font-medium text-foreground sm:text-base">
            {isPersian ? "تاریخچه تغییرات" : "Update History"}
          </h2>
        </div>

        <div className="p-3 sm:p-4">
          <table className="w-full border-separate border-spacing-y-2 text-center">
            <thead>
              <tr className="bg-[#D9D9D9] text-xs text-[#202020]">
                <th className="rounded-lg px-3 py-2.5 font-medium">
                  {isPersian ? "تاریخ و زمان آخرین تغییر" : "Last Update"}
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td className="px-3 py-2">
                    <div className="h-8 animate-pulse rounded-lg bg-card" />
                  </td>
                </tr>
              ) : updates ? (
                <tr className="text-xs text-foreground">
                  <td className="rounded-lg bg-background px-3 py-3">
                    {formatDateTime(updates)}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className="py-10 text-xs text-muted">
                    {isPersian
                      ? "تاریخچه تغییری ثبت نشده است."
                      : "No updates have been recorded."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReservationHistoryModal;