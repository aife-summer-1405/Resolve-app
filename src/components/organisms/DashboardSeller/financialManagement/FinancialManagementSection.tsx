
"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ChevronDown,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import Pagination from "@/src/components/common/Pagination";
import DashboardStatCard from "../../DashboardBuyer/dashboard/DashboardStatCard";
import { useGetSellerFinanceTransactions } from "@/src/hooks/Seller_dashboard/useGetSellerFinanceTransactions";

const FinancialManagementSection = () => {
  const t = useTranslations("sellerFinancialManagement");
  const locale = useLocale();

  const [currentPage, setCurrentPage] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [transactionType, setTransactionType] = useState("all");

  const isPersian = locale === "fa";

  const limit = 10;

  const {
    data: financeData,
    isLoading,
    isError,
  } = useGetSellerFinanceTransactions({
    page: currentPage,
    limit,
  });

  const formatNumber = (value: number) =>
    new Intl.NumberFormat(isPersian ? "fa-IR" : "en-US").format(value);

  const stats = [
    { title: t("currentMonthIncome"), amount: 115000000 },
    { title: t("previousMonthIncome"), amount: 115000000 },
    { title: t("totalIncome"), amount: 115000000 },
    { title: t("withdrawableBalance"), amount: 115000000 },
  ];

  const transactions = financeData?.data ?? [];

  const totalPages = Math.ceil(
    (financeData?.totalCount ?? 0) / limit,
  );

  return (
    <section className="mt-5 flex w-full flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <DashboardStatCard
            key={index}
            card={{
              title: stat.title,
              summary: formatNumber(stat.amount),
            }}
          />
        ))}
      </div>

      <div className="overflow-hidden rounded-xl bg-surface">
        <div className="flex flex-col gap-4 border-b border-dashed border-border p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-1">
            <h2 className="text-sm font-medium text-foreground">
              {t("transactionsTitle")}
            </h2>

            <span className="text-sm text-muted">
              ({formatNumber(financeData?.totalCount ?? 0)})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="h-10 min-w-[130px] appearance-none rounded-xl border border-border bg-surface px-3 pe-9 text-xs text-foreground outline-none focus:border-primary"
              >
                <option value="all">{t("all")}</option>
                <option value="approved">{t("approved")}</option>
                <option value="notApproved">{t("notApproved")}</option>
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <span className="absolute -top-2 start-3 bg-surface px-1 text-[10px] text-muted">
                {t("paymentStatus")}
              </span>
            </div>

            <div className="relative">
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                className="h-10 min-w-[130px] appearance-none rounded-xl border border-border bg-surface px-3 pe-9 text-xs text-foreground outline-none focus:border-primary"
              >
                <option value="all">{t("all")}</option>
                <option value="reservation">{t("reservation")}</option>
                <option value="walletCharge">{t("walletCharge")}</option>
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <span className="absolute -top-2 start-3 bg-surface px-1 text-[10px] text-muted">
                {t("transactionType")}
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 text-center text-xs">
            <thead>
              <tr className="h-11 bg-background text-foreground">
                <th className="rounded-s-lg px-3 font-medium">
                  {t("date")}
                </th>

                <th className="px-3 font-medium">
                  {t("trackingNumber")}
                </th>

                <th className="px-3 font-medium">
                  {t("amount")}
                </th>

                <th className="px-3 font-medium">
                  {t("paymentStatus")}
                </th>

                <th className="px-3 font-medium">
                  {t("transactionType")}
                </th>

                <th className="rounded-e-lg px-3 font-medium">
                  {t("receiptView")}
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="h-28 text-center text-sm text-muted"
                  >
                    در حال دریافت اطلاعات...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={6}
                    className="h-28 text-center text-sm text-red-500"
                  >
                    خطا در دریافت اطلاعات تراکنش‌ها
                  </td>
                </tr>
              ) : transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="h-[60px] bg-surface text-foreground transition-colors duration-200 hover:bg-background"
                  >
                    <td className="whitespace-nowrap px-3">
                      {transaction.createdAt
                        ? new Date(transaction.createdAt).toLocaleString(
                            isPersian ? "fa-IR" : "en-US",
                          )
                        : "-"}
                    </td>

                    <td className="whitespace-nowrap px-3">
                      {transaction.transactionId ?? "-"}
                    </td>

                    <td className="whitespace-nowrap px-3">
                      {formatNumber(Number(transaction.amount) || 0)}
                    </td>

                    <td className="px-3">
                      {transaction.status === "approved" ? (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#91FF45] px-2.5 py-1 text-[10px] text-black">
                          {t("approved")}
                          <CheckCircle2 size={13} />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#FF8585] px-2.5 py-1 text-[10px] text-black">
                          {t("notApproved")}
                          <XCircle size={13} />
                        </span>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-3">
                      {transaction.description || "-"}
                    </td>

                    <td className="whitespace-nowrap px-3">
                      <button
                        type="button"
                        className="text-foreground transition-colors hover:text-primary"
                      >
                        {t("receiptView")}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="h-28 text-center text-sm text-muted"
                  >
                    {t("noTransactions")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-end px-4 pb-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default FinancialManagementSection;
