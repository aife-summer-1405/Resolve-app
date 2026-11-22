
"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ChevronDown,
  Copy,
  Share2,
  X,
  Check,
} from "lucide-react";

import Pagination from "@/src/components/common/Pagination";
import { useGetPayments } from "@/src/hooks/dashboard/useGetPayments";
import type {
  IPayment,
  IGetPaymentsParams,
} from "@/src/types/dashboard/payment";

const LIMIT = 10;

const PaymentManagementSection = () => {
  const t = useTranslations("PaymentManagementSection");
  const locale = useLocale();
  const isPersian = locale === "fa";

  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<IPayment | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const params = useMemo<IGetPaymentsParams>(
    () => ({
      page: currentPage,
      limit: LIMIT,
      sort: "createdAt",
      order: "ASC",
      ...(status ? { status } : {}),
    }),
    [currentPage, status]
  );

  const { data, isLoading, isError } = useGetPayments(params);
  console.log(data);

  const payments = data?.payments ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / LIMIT);

  const formatDate = (date: string | null) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleString(isPersian ? "fa-IR" : "en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount: string) => {
    return Number(amount).toLocaleString(
      isPersian ? "fa-IR" : "en-US",
      {
        maximumFractionDigits: 2,
      }
    );
  };

  const getStatus = (paymentStatus: string) => {
    const statuses: Record<
      string,
      { label: string; className: string }
    > = {
      pending: {
        label: isPersian ? "تایید نشده" : "Pending",
        className: "bg-yellow-400 text-black",
      },
      successful: {
        label: isPersian ? "موفق" : "Successful",
        className: "bg-primary text-black",
      },
      completed: {
        label: isPersian ? "موفق" : "Completed",
        className: "bg-primary text-black",
      },
      failed: {
        label: isPersian ? "ناموفق" : "Failed",
        className: "bg-[#FF858C] text-black",
      },
      cancelled: {
        label: isPersian ? "لغو شده" : "Cancelled",
        className: "bg-card text-foreground",
      },
    };

    return (
      statuses[paymentStatus] ?? {
        label: paymentStatus,
        className: "bg-card text-foreground",
      }
    );
  };

  const getReceiptText = (payment: IPayment) => {
    return [
      isPersian ? "رسید پرداخت" : "Payment Receipt",
      `${isPersian ? "شناسه پرداخت" : "Payment ID"}: ${payment.id}`,
      `${isPersian ? "شماره پیگیری" : "Tracking Number"}: ${payment.id ?? "—"}`,
      `${isPersian ? "مبلغ" : "Amount"}: ${formatAmount(payment.amount)}`,
      `${isPersian ? "وضعیت" : "Status"}: ${getStatus(payment.status).label}`,
      `${isPersian ? "تاریخ" : "Date"}: ${formatDate(payment.createdAt??"N/A")}`,
      `${isPersian ? "شناسه رزرو" : "Booking ID"}: ${payment.bookingId ?? "—"}`,
      `${isPersian ? "توضیحات" : "Description"}: ${payment.description}`,
    ].join("\n");
  };

  const handleCopyReceipt = async () => {
    if (!selectedPayment) return;

    try {
      await navigator.clipboard.writeText(
        getReceiptText(selectedPayment)
      );
      setIsCopied(true);
    } catch (error) {
      console.error("Copy receipt failed:", error);
    }
  };

  const handleShareReceipt = async () => {
    if (!selectedPayment) return;

    const receiptText = getReceiptText(selectedPayment);

    if (navigator.share) {
      try {
        await navigator.share({
          title: isPersian ? "رسید پرداخت" : "Payment Receipt",
          text: receiptText,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Share receipt failed:", error);
        }
      }
    } else {
      await handleCopyReceipt();
    }
  };

  const closeReceipt = () => {
    setSelectedPayment(null);
    setIsCopied(false);
  };

  return (
    <section
      dir="rtl"
      className="w-full rounded-xl bg-surface p-4 text-foreground sm:p-5"
    >
      <div className="flex flex-col gap-5 border-b border-dashed border-border pb-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xs font-medium text-foreground">
          {t("listTitle")}
        </h2>

        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute -top-1.5 right-3 z-10 bg-surface px-1 text-[9px] text-muted">
              {t("paymentStatus")}
            </span>

            <div className="relative">
              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setCurrentPage(1);
                }}
                className="h-[34px] w-[130px] appearance-none rounded-[11px] border border-border bg-transparent px-2.5 pl-7 text-[10px] text-muted outline-none"
              >
                <option value="" className="bg-surface">
                  {isPersian ? "همه وضعیت‌ها" : "All statuses"}
                </option>

                <option value="pending" className="bg-surface">
                  {isPersian ? "تایید نشده" : "Pending"}
                </option>

                <option value="successful" className="bg-surface">
                  {isPersian ? "موفق" : "Successful"}
                </option>

                <option value="failed" className="bg-surface">
                  {isPersian ? "ناموفق" : "Failed"}
                </option>

                <option value="cancelled" className="bg-surface">
                  {isPersian ? "لغو شده" : "Cancelled"}
                </option>
              </select>

              <ChevronDown
                size={13}
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 w-full overflow-x-auto">
        <table className="w-full min-w-[850px] border-separate border-spacing-y-2 text-right">
          <thead>
            <tr className="bg-background text-xs text-foreground">
              <th className="rounded-r-xl px-4 py-2.5 font-medium">
                {t("date")}
              </th>

              <th className="px-3 py-2.5 text-center font-medium">
                {t("trackingNumber")}
              </th>

              <th className="px-3 py-2.5 text-center font-medium">
                {t("amount")}
              </th>

              <th className="px-3 py-2.5 text-center font-medium">
                {t("paymentStatus")}
              </th>

              <th className="px-3 py-2.5 text-center font-medium">
                {isPersian ? "توضیحات پرداخت" : "Description"}
              </th>

              <th className="rounded-l-xl px-4 py-2.5 text-center font-medium">
                {isPersian ? "عملیات" : "Action"}
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-xs text-muted"
                >
                  {isPersian ? "در حال دریافت اطلاعات..." : "Loading..."}
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-xs text-red-500"
                >
                  {isPersian
                    ? "خطا در دریافت اطلاعات پرداخت‌ها"
                    : "Failed to load payments"}
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-xs text-muted"
                >
                  {isPersian ? "پرداختی یافت نشد" : "No payments found"}
                </td>
              </tr>
            ) : (
              payments.map((payment) => {
                const paymentStatus = getStatus(payment.status);

                return (
                  <tr
                    key={payment.id}
                    className="text-[10px] text-foreground"
                  >
                    <td className="whitespace-nowrap rounded-r-lg px-4 py-2.5">
                      {(payment?.createdAt) ? formatDate(payment.createdAt) : "N/A"}
                    </td>

                    <td className="whitespace-nowrap px-3 py-2.5 text-center">
                      {payment.id ?? "—"}
                    </td>

                    <td className="whitespace-nowrap px-3 py-2.5 text-center">
                      {formatAmount(payment.amount)}
                    </td>

                    <td className="px-3 py-2.5 text-center">
                      <span
                        className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] ${paymentStatus.className}`}
                      >
                        {paymentStatus.label}
                      </span>
                    </td>

                    <td className="max-w-[220px] px-3 py-2.5 text-center">
                      <span className="line-clamp-2">
                        {payment.description}
                      </span>
                    </td>

                    <td className="whitespace-nowrap rounded-l-lg px-4 py-2.5 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPayment(payment);
                          setIsCopied(false);
                        }}
                        className="text-[10px] text-foreground transition-colors hover:text-primary"
                      >
                        {isPersian ? "مشاهده رسید" : "View Receipt"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-[10px] text-muted">
          {t("page")} {currentPage}
        </span>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {selectedPayment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={closeReceipt}
        >
          <div
            dir="rtl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="receipt-title"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-border bg-surface p-5 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between border-b border-dashed border-border pb-4">
              <div>
                <h3
                  id="receipt-title"
                  className="text-sm font-semibold text-foreground"
                >
                  {isPersian ? "رسید پرداخت" : "Payment Receipt"}
                </h3>

                <p className="mt-1 text-[10px] text-muted">
                  {isPersian
                    ? `شناسه پرداخت: ${selectedPayment.id}`
                    : `Payment ID: ${selectedPayment.id}`}
                </p>
              </div>

              <button
                type="button"
                onClick={closeReceipt}
                aria-label="Close"
                className="rounded-lg p-2 text-muted transition-colors hover:bg-card hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-5 rounded-xl bg-background p-4 text-center">
              <p className="text-[10px] text-muted">
                {t("amount")}
              </p>

              <p className="mt-2 text-xl font-bold text-primary">
                {formatAmount(selectedPayment.amount)}
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  label: isPersian ? "شناسه پرداخت" : "Payment ID",
                  value: selectedPayment.id,
                },
                {
                  label: t("trackingNumber"),
                  value: selectedPayment.transactionId ?? "—",
                },
                {
                  label: t("paymentStatus"),
                  value: getStatus(selectedPayment.status).label,
                },
                {
                  label: isPersian ? "تاریخ پرداخت" : "Payment Date",
                  value: formatDate(selectedPayment.createdAt),
                },
                {
                  label: isPersian ? "شناسه رزرو" : "Booking ID",
                  value: selectedPayment.bookingId ?? "—",
                },
                {
                  label: isPersian ? "توضیحات" : "Description",
                  value: selectedPayment.description,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between gap-4 text-[11px]"
                >
                  <span className="shrink-0 text-muted">
                    {item.label}
                  </span>

                  <span className="text-left font-medium text-foreground">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleCopyReceipt}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-card text-xs text-foreground transition-colors hover:bg-background"
              >
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                {isCopied
                  ? isPersian
                    ? "کپی شد"
                    : "Copied"
                  : isPersian
                    ? "کپی رسید"
                    : "Copy Receipt"}
              </button>

              <button
                type="button"
                onClick={handleShareReceipt}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-primary text-xs font-semibold text-black transition-colors hover:bg-primary-hover"
              >
                <Share2 size={14} />
                {isPersian ? "ارسال رسید" : "Share Receipt"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PaymentManagementSection;
