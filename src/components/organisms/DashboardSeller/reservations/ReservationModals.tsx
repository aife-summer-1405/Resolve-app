"use client";

import {
  X,
  CalendarDays,
  MapPin,
  BedDouble,
  Bath,
  CarFront,
  Trees,
  Star,
  AlertTriangle,
  Send,
} from "lucide-react";

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

interface ReservationModalsProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (value: boolean) => void;
  reservationFilter: string;
  setReservationFilter: (value: string) => void;
  setCurrentPage: (value: number) => void;
  isDetailsOpen: boolean;
  setIsDetailsOpen: (value: boolean) => void;
  selectedReservation: Reservation | null;
  setSelectedReservation: (value: Reservation | null) => void;
  activeDetailSection: DetailSection;
  setActiveDetailSection: (value: DetailSection) => void;
  confirmAction: ConfirmAction;
  setConfirmAction: (value: ConfirmAction) => void;
  handleConfirmAction: () => void;
}
const passengers = [
  { id: 1, name: "امیر محمد ملیانی", gender: "مرد", phone: "۰۹۳۳۱۲۳۳۹۶۳" },
  { id: 2, name: "امیر محمد ملیانی", gender: "مرد", phone: "۰۹۳۳۱۲۳۳۹۶۳" },
  { id: 3, name: "امیر محمد ملیانی", gender: "مرد", phone: "۰۹۳۳۱۲۳۳۹۶۳" },
];

const payments = [
  {
    id: 1,
    date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳",
    tracking: "۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶",
    amount: "۱۲۵۰۰۰۰",
  },
  {
    id: 2,
    date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳",
    tracking: "۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶",
    amount: "۱۲۵۰۰۰۰",
  },
  {
    id: 3,
    date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳",
    tracking: "۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶",
    amount: "۱۲۵۰۰۰۰",
  },
  {
    id: 4,
    date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳",
    tracking: "۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶",
    amount: "۱۲۵۰۰۰۰",
  },
];

const historyItems = [
  { id: 1, date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳", title: "تایید رزرو" },
  { id: 2, date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳", title: "اسامی مسافران" },
  { id: 3, date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳", title: "تایید رزرو" },
  { id: 4, date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳", title: "تایید رزرو" },
];

const ModalCloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex shrink-0 items-center gap-1 rounded-full border border-red-400 px-3 py-1.5 text-xs text-red-500 transition hover:bg-red-500/10"
  >
    بستن
    <X size={14} />
  </button>
);

const ReservationModals = ({
  isFilterOpen,
  setIsFilterOpen,
  reservationFilter,
  setReservationFilter,
  setCurrentPage,
  isDetailsOpen,
  setIsDetailsOpen,
  selectedReservation,
  setSelectedReservation,
  activeDetailSection,
  setActiveDetailSection,
  confirmAction,
  setConfirmAction,
  handleConfirmAction,
}: ReservationModalsProps) => {
  const closeDetails = () => {
    setIsDetailsOpen(false);
    setActiveDetailSection(null);
    setSelectedReservation(null);
  };

  const openDetailSection = (section: DetailSection) => {
    setIsDetailsOpen(false);
    setActiveDetailSection(section);
  };

  const closeConfirm = () => {
    setConfirmAction(null);
    setSelectedReservation(null);
  };

  return (
    <>
      {isDetailsOpen && selectedReservation && (
        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 p-3 sm:p-5"
          onClick={closeDetails}
        >
          <div className="flex min-h-full items-center justify-center">
            <div
              dir="rtl"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[calc(100dvh-24px)] w-full max-w-[920px] overflow-y-auto rounded-xl bg-surface p-3 text-foreground shadow-2xl sm:p-4"
            >
              <div className="flex items-center justify-between border-b border-dashed border-border pb-3">
                <h3 className="text-base font-bold sm:text-xl">
                  {selectedReservation.houseName}
                </h3>
                <ModalCloseButton onClick={closeDetails} />
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="relative flex h-48 items-start justify-end rounded-xl bg-background p-3 sm:h-56">
                  <span className="flex items-center gap-1 rounded-lg bg-[#7964FF] px-3 py-1.5 text-[10px] text-white shadow">
                    <Star size={12} fill="currentColor" />۵ ستاره
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-3">
                  <p className="text-justify text-[10px] leading-6 text-muted sm:text-[11px]">
                    آپارتمانی دنج و آرام در شهر، جایی که زندگی شهری و آرامش را
                    در کنار هم تجربه خواهید کرد. فضای داخلی با امکانات مناسب و
                    طراحی زیبا، انتخابی مناسب برای لحظه‌های خوش و آرامش است.
                  </p>

                  <div className="flex items-center justify-end gap-1 text-[10px] text-muted">
                    <CalendarDays size={13} />
                    {selectedReservation.date}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-muted sm:col-span-2">
                  <span>آدرس:</span>
                  <MapPin size={13} />
                  گیلان، رشت، میدان آزادی، جنب چهار راه...
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:col-span-2">
                  <span className="text-[10px] text-muted">برچسب‌ها:</span>
                  {["آپارتمان", "مسکونی", "بالکن", "آپارتمان", "آپارتمان"].map(
                    (tag, index) => (
                      <span
                        key={index}
                        className="rounded-lg border border-[#91FF45] px-4 py-1.5 text-[10px]"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted sm:col-span-2">
                  <span className="flex items-center gap-1">
                    <BedDouble size={13} />۴ خوابه
                  </span>
                  <span className="flex items-center gap-1">
                    <CarFront size={13} />۱ پارکینگ
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={13} />۲ حمام
                  </span>
                  <span className="flex items-center gap-1">
                    <Trees size={13} />
                    حیاط
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-background  px-3 py-2 text-xs sm:col-span-2">
                  <span className="text-muted">قیمت خرید:</span>
                  <span className="font-semibold">
                    {selectedReservation.amount} تومان
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => openDetailSection("passengers")}
                  className="rounded-lg bg-[#91FF45] px-4 py-2.5 text-[11px] text-black transition hover:opacity-80"
                >
                  مسافرها
                </button>

                <button
                  type="button"
                  onClick={() => openDetailSection("payments")}
                  className="rounded-lg bg-[#91FF45] px-4 py-2.5 text-[11px] text-black transition hover:opacity-80"
                >
                  پرداخت‌ها
                </button>

                <button
                  type="button"
                  onClick={() => openDetailSection("history")}
                  className="rounded-lg bg-[#91FF45] px-4 py-2.5 text-[11px] text-black transition hover:opacity-80"
                >
                  تاریخچه تغییرات
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeDetailSection === "passengers" && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-black/70 p-3 sm:p-5"
          onClick={() => setActiveDetailSection(null)}
        >
          <div
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
            className="my-auto max-h-[calc(100dvh-24px)] w-full max-w-[550px] overflow-y-auto rounded-xl border border-border bg-surface p-3 text-foreground shadow-2xl sm:p-4"
          >
            <div className="flex items-center justify-between border-b border-dashed border-border pb-3">
              <h3 className="text-sm font-semibold">جزئیات مسافرها</h3>
              <ModalCloseButton onClick={() => setActiveDetailSection(null)} />
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[450px] border-separate border-spacing-y-1.5 text-xs">
                <thead>
                  <tr className="bg-background">
                    <th className="rounded-r-lg px-3 py-2.5 text-right font-medium">
                      نام
                    </th>
                    <th className="px-3 py-2.5 text-center font-medium">
                      جنسیت
                    </th>
                    <th className="px-3 py-2.5 text-center font-medium">
                      شماره تماس
                    </th>
                    <th className="rounded-l-lg px-3 py-2.5 text-center font-medium">
                      ارسال پیام
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {passengers.map((passenger) => (
                    <tr
                      key={passenger.id}
                      className="text-foreground even:bg-background"
                    >
                      <td className="rounded-r-lg px-3 py-3 text-right">
                        {passenger.name}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {passenger.gender}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {passenger.phone}
                      </td>
                      <td className="rounded-l-lg px-3 py-3 text-center">
                        <Send size={16} className="mx-auto text-[#91FF45]" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeDetailSection === "payments" && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-black/70 p-3 sm:p-5"
          onClick={() => setActiveDetailSection(null)}
        >
          <div
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
            className="my-auto max-h-[calc(100dvh-24px)] w-full max-w-[550px] overflow-y-auto rounded-xl border border-border bg-surface p-3 text-foreground shadow-2xl sm:p-4"
          >
            <div className="flex items-center justify-between border-b border-dashed border-border pb-3">
              <h3 className="text-sm font-semibold">لیست پرداختی‌ها</h3>
              <ModalCloseButton onClick={() => setActiveDetailSection(null)} />
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[480px] border-separate border-spacing-y-1.5 text-xs">
                <thead>
                  <tr className="bg-background">
                    <th className="rounded-r-lg px-3 py-2.5 text-right font-medium">
                      تاریخ
                    </th>
                    <th className="px-3 py-2.5 text-center font-medium">
                      شماره پیگیری
                    </th>
                    <th className="px-3 py-2.5 text-center font-medium">
                      مبلغ
                    </th>
                    <th className="rounded-l-lg px-3 py-2.5 text-center font-medium">
                      رسید
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="text-foreground even:bg-background"
                    >
                      <td className="whitespace-nowrap rounded-r-lg px-3 py-3 text-right">
                        {payment.date}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {payment.tracking}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {payment.amount}
                      </td>
                      <td className="rounded-l-lg px-3 py-3 text-center">
                        <button className="whitespace-nowrap text-[10px] text-foreground transition hover:text-[#91FF45]">
                          مشاهده رسید
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeDetailSection === "history" && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-black/70 p-3 sm:p-5"
          onClick={() => setActiveDetailSection(null)}
        >
          <div
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
            className="my-auto max-h-[calc(100dvh-24px)] w-full max-w-[550px] overflow-y-auto rounded-xl border border-border bg-surface p-3 text-foreground shadow-2xl sm:p-4"
          >
            <div className="flex items-center justify-between border-b border-dashed border-border pb-3">
              <h3 className="text-sm font-semibold">تاریخچه تغییرات</h3>
              <ModalCloseButton onClick={() => setActiveDetailSection(null)} />
            </div>

            <div className="mt-3">
              <div className="grid grid-cols-2 rounded-lg bg-background px-3 py-2.5 text-xs font-medium">
                <span>تاریخ و زمان</span>
                <span className="text-center">نوع تغییر</span>
              </div>

              <div className="mt-2 flex flex-col gap-1.5">
                {historyItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-2 items-center rounded-lg px-3 py-3 text-xs odd:bg-surface even:bg-background"
                  >
                    <span>{item.date}</span>
                    <span className="text-center font-semibold">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmAction && selectedReservation && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={closeConfirm}
        >
          <div
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
            className="my-auto flex w-full max-w-[420px] flex-col items-center rounded-2xl border border-border bg-surface px-5 py-6 text-foreground shadow-2xl sm:px-8"
          >
            <AlertTriangle
              size={60}
              strokeWidth={1.8}
              className="mb-5 fill-[#FFB800] text-black"
            />

            <h3 className="text-center text-sm font-bold sm:text-base">
              {confirmAction === "approve"
                ? "آیا از تایید این رزرو اطمینان دارید؟"
                : confirmAction === "cancel"
                  ? "آیا از لغو این رزرو اطمینان دارید؟"
                  : "آیا از حذف این رزرو اطمینان دارید؟"}
            </h3>

            <p className="mt-3 text-center text-xs text-muted">
              {selectedReservation.houseName}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                onClick={handleConfirmAction}
                className={`rounded-xl px-6 py-2.5 text-xs text-black transition hover:opacity-80 ${
                  confirmAction === "delete" || confirmAction === "cancel"
                    ? "bg-[#FF999D]"
                    : "bg-[#91FF45]"
                }`}
              >
                {confirmAction === "approve"
                  ? "بله، تایید کن"
                  : confirmAction === "cancel"
                    ? "بله، لغو کن"
                    : "بله، حذف کن"}
              </button>

              <button
                type="button"
                onClick={closeConfirm}
                className="text-xs text-foreground transition hover:opacity-60"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

      {isFilterOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            dir="rtl"
            className="my-auto w-full max-w-lg rounded-xl border border-border bg-surface p-4 text-foreground shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-dashed border-border pb-3">
              <h3 className="text-base font-semibold">فیلترها</h3>
              <ModalCloseButton onClick={() => setIsFilterOpen(false)} />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-xs text-muted">
                وضعیت رزرو
              </label>
              <select
                value={reservationFilter}
                onChange={(e) => {
                  setReservationFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-xs text-foreground outline-none focus:border-[#91FF45]"
              >
                <option value="همه">همه وضعیت‌ها</option>
                <option value="تایید شده">تایید شده</option>
                <option value="در انتظار">در انتظار</option>
                <option value="لغو شده">لغو شده</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setIsFilterOpen(false)}
              className="mx-auto mt-6 block rounded-lg bg-[#91FF45] px-6 py-2.5 text-xs text-black transition hover:bg-[#7eea32]"
            >
              اعمال فیلتر
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationModals;
