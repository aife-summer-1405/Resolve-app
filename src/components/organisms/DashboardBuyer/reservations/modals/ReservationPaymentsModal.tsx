"use client";

import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { IGetPaymentsResponse, IPayment } from "@/src/types/dashboard/payment";

type ReservationPaymentsModalProps = {
  isOpen: boolean;
  onClose: () => void;
payments: IPayment[];
};

const ReservationPaymentsModal = ({
  isOpen,
  onClose,
  payments
}: ReservationPaymentsModalProps) => {
  const t = useTranslations("BookingManagementSection");

  if (!isOpen) return null;

  const paymentsList = payments || [];
  
  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="my-auto w-full max-w-[550px] overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
        <div dir="ltr" className="flex items-center justify-between border-b border-dashed border-border px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 rounded-full border border-red-400 px-3 py-1.5 text-xs text-red-500 transition hover:bg-red-50"
          >
            {t("close")}
            <X size={15} />
          </button>

          <h2 className="text-sm font-medium text-foreground sm:text-base">
            {t("paymentsListTitle")}
          </h2>
        </div>

        <div className="p-3 sm:p-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] border-separate border-spacing-y-2 text-center">
              <thead>
                <tr className="bg-[#D9D9D9] text-xs text-[#202020]">
                  <th className="rounded-r-lg px-3 py-2.5 font-medium">
                    {t("paymentDate")}
                  </th>

                  <th className="px-3 py-2.5 font-medium">
                    {t("trackingNumber")}
                  </th>

                  <th className=" px-3 py-2.5 font-medium">
                    {t("paymentAmount")}
                  </th>
                  <th className="rounded-l-lg px-3 py-2.5 font-medium">
                    عملیات
                  </th>
                </tr>
              </thead>

              <tbody>
                {paymentsList.map((payment, index) => (
                  <tr
                    key={payment.id}
                    className={`text-[10px] text-foreground w-full${
                      index % 2 === 1
                        ? "bg-background"
                        : "bg-transparent"
                    }`}
                  >
                    <td className="whitespace-nowrap rounded-r-lg px-3 py-3">
                      {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : "N/A" }
                    </td>

                    <td className="whitespace-nowrap px-3 py-3">
                      {payment.id}
                    </td>

                    <td className="whitespace-nowrap rounded-l-lg px-3 py-3">
                     
                        <span>{payment.amount}</span>
</td>
<td>
                        <button
                          type="button"
                          className="whitespace-nowrap text-[10px] text-foreground transition hover:text-primary"
                        >
                          {t("viewReceipt")}
                        </button>
                 
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPaymentsModal;