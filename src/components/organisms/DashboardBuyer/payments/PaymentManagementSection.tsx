"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, CheckCircle2, XCircle } from "lucide-react";

import Pagination from "@/src/components/common/Pagination";

type Transaction = {
  id: number;
  date: string;
  trackingNumber: string;
  amount: string;
  status: "successful" | "failed";
  type: "reservationPayment" | "walletCharge";
};

const PaymentManagementSection = () => {
  const t = useTranslations("PaymentManagementSection");

  const [currentPage, setCurrentPage] = useState(1);

  const transactions: Transaction[] = [
    {
      id: 1,
      date: "۱۲ مرداد - ۱۴۰۱ / ۱۳:۳۳",
      trackingNumber: "۱۳۳۴۵۶۷۸۹۱۲۳۴۵۶",
      amount: "۱,۲۵۰,۰۰۰",
      status: "successful",
      type: "walletCharge",
    },
    {
      id: 2,
      date: "۱۲ مرداد - ۱۴۰۱ / ۱۳:۳۳",
      trackingNumber: "۱۳۳۴۵۶۷۸۹۱۲۳۴۵۶",
      amount: "۱,۲۵۰,۰۰۰",
      status: "successful",
      type: "walletCharge",
    },
    {
      id: 3,
      date: "۱۲ مرداد - ۱۴۰۱ / ۱۳:۳۳",
      trackingNumber: "۱۳۳۴۵۶۷۸۹۱۲۳۴۵۶",
      amount: "۱,۲۵۰,۰۰۰",
      status: "failed",
      type: "reservationPayment",
    },
    {
      id: 4,
      date: "۱۲ مرداد - ۱۴۰۱ / ۱۳:۳۳",
      trackingNumber: "۱۳۳۴۵۶۷۸۹۱۲۳۴۵۶",
      amount: "۱,۲۵۰,۰۰۰",
      status: "successful",
      type: "walletCharge",
    },
    {
      id: 5,
      date: "۱۲ مرداد - ۱۴۰۱ / ۱۳:۳۳",
      trackingNumber: "۱۳۳۴۵۶۷۸۹۱۲۳۴۵۶",
      amount: "۱,۲۵۰,۰۰۰",
      status: "failed",
      type: "reservationPayment",
    },
    {
      id: 6,
      date: "۱۲ مرداد - ۱۴۰۱ / ۱۳:۳۳",
      trackingNumber: "۱۳۳۴۵۶۷۸۹۱۲۳۴۵۶",
      amount: "۱,۲۵۰,۰۰۰",
      status: "successful",
      type: "walletCharge",
    },
    {
      id: 7,
      date: "۱۲ مرداد - ۱۴۰۱ / ۱۳:۳۳",
      trackingNumber: "۱۳۳۴۵۶۷۸۹۱۲۳۴۵۶",
      amount: "۱,۲۵۰,۰۰۰",
      status: "failed",
      type: "reservationPayment",
    },
    {
      id: 8,
      date: "۱۲ مرداد - ۱۴۰۱ / ۱۳:۳۳",
      trackingNumber: "۱۳۳۴۵۶۷۸۹۱۲۳۴۵۶",
      amount: "۱,۲۵۰,۰۰۰",
      status: "failed",
      type: "reservationPayment",
    },
  ];

  const getStatus = (status: Transaction["status"]) => {
    if (status === "successful") {
      return {
        label: t("successful"),
        className: "bg-[#91FF45] text-[#202020]",
        icon: <CheckCircle2 size={12} strokeWidth={3} />,
      };
    }

    return {
      label: t("failed"),
      className: "bg-[#FF858C] text-[#202020]",
      icon: <XCircle size={12} strokeWidth={3} />,
    };
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
          <div className="relative flex h-[34px] w-[114px] items-center justify-between rounded-[11px] border border-border px-2.5">
            <span className="absolute -top-1.5 right-3 bg-surface px-1 text-[9px] text-muted">
              {t("paymentStatus")}
            </span>

            <span className="text-[10px] text-muted">
              {t("successful")}
            </span>

            <ChevronDown size={13} className="text-muted" />
          </div>

          <div className="relative flex h-[34px] w-[114px] items-center justify-between rounded-[11px] border border-border px-2.5">
            <span className="absolute -top-1.5 right-3 bg-surface px-1 text-[9px] text-muted">
              {t("transactionType")}
            </span>

            <span className="text-[10px] text-muted">
              {t("reservationPayment")}
            </span>

            <ChevronDown size={13} className="text-muted" />
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
                {t("transactionType")}
              </th>

              <th className="rounded-l-xl px-4 py-2.5 text-center font-medium">
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => {
              const status = getStatus(transaction.status);

              return (
                <tr
                  key={transaction.id}
                  className="text-[10px] text-foreground"
                >
                  <td className="whitespace-nowrap rounded-r-lg px-4 py-2.5">
                    {transaction.date}
                  </td>

                  <td className="whitespace-nowrap px-3 py-2.5 text-center">
                    {transaction.trackingNumber}
                  </td>

                  <td className="whitespace-nowrap px-3 py-2.5 text-center">
                    {transaction.amount}
                  </td>

                  <td className="px-3 py-2.5 text-center">
                    <span
                      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] ${status.className}`}
                    >
                      {status.label}
                      {status.icon}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-3 py-2.5 text-center">
                    {t(transaction.type)}
                  </td>

                  <td className="whitespace-nowrap rounded-l-lg px-4 py-2.5 text-center">
                    <button
                      type="button"
                      className="text-[10px] text-foreground transition-colors hover:text-primary"
                    >
                      {t("viewReceipt")}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-[10px] text-muted">
          {t("page")} {currentPage}
        </span>

        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default PaymentManagementSection;