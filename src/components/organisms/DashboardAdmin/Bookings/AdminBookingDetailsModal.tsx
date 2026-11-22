"use client";

import { X, UserRound, Phone, Mail, CalendarDays } from "lucide-react";
import { useGetAdminBookingById } from "@/src/hooks/dashboard_Admin/useGetAdminBookingById";

interface AdminBookingDetailsModalProps {
  bookingId: number;
  onClose: () => void;
}

const AdminBookingDetailsModal = ({
  bookingId,
  onClose,
}: AdminBookingDetailsModalProps) => {
  const { data, isPending, isError } = useGetAdminBookingById(bookingId);

  const formatDate = (date: string) => {
    if (!date) return "---";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "---";

    return parsedDate.toLocaleDateString("fa-IR");
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "در انتظار تأیید";
      case "confirmed":
        return "تأیید شده";
      case "canceled":
        return "لغو شده";
      default:
        return status || "---";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "confirmed":
        return "bg-green-500/10 text-green-500";
      case "canceled":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-card text-muted";
    }
  };

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case "female":
        return "زن";
      case "male":
        return "مرد";
      default:
        return gender || "---";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-surface p-5 shadow-2xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-bold text-foreground">جزئیات رزرو</h2>

            <p className="text-xs text-muted">
              اطلاعات تکمیلی رزرو شماره #{bookingId}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted transition hover:bg-card hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {isPending ? (
          <div className="py-12 text-center text-sm text-muted">
            در حال دریافت اطلاعات رزرو...
          </div>
        ) : isError || !data ? (
          <div className="py-12 text-center text-sm text-red-500">
            دریافت جزئیات رزرو با خطا مواجه شد.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <UserRound size={18} className="text-[#91FF45]" />
                اطلاعات مسافر
              </h3>

              {data.traveler_details?.length ? (
                data.traveler_details.map((traveler, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 rounded-xl bg-background p-4"
                  >
                    {data.traveler_details.length > 1 && (
                      <span className="text-xs font-semibold text-[#91FF45]">
                        مسافر {index + 1}
                      </span>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-muted">
                          نام و نام خانوادگی
                        </span>
                        <span className="text-sm text-foreground">
                          {traveler.firstName} {traveler.lastName}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-muted">کد ملی</span>
                        <span className="text-sm text-foreground" dir="ltr">
                          {traveler.nationalId || "---"}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-muted">تاریخ تولد</span>
                        <span className="text-sm text-foreground">
                          {formatDate(traveler.birthDate)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-muted">جنسیت</span>
                        <span className="text-sm text-foreground">
                          {getGenderLabel(traveler.gender)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl bg-background p-4 text-sm text-muted">
                  اطلاعات مسافر ثبت نشده است.
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Phone size={18} className="text-[#91FF45]" />
                اطلاعات تماس
              </h3>

              <div className="flex flex-col gap-4 rounded-xl bg-background p-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-muted">شماره موبایل</span>
                  <span className="text-sm text-foreground" dir="ltr">
                    {data.sharedMobile || "---"}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs text-muted">ایمیل</span>

                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-muted" />
                    <span className="text-sm text-foreground" dir="ltr">
                      {data.sharedEmail || "---"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <CalendarDays size={18} className="text-[#91FF45]" />
                وضعیت رزرو
              </h3>

              <div className="rounded-xl bg-background p-4">
                <span
                  className={`inline-flex rounded-lg px-3 py-2 text-xs ${getStatusStyle(data.status)}`}
                >
                  {getStatusLabel(data.status)}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#91FF45] px-6 py-2.5 text-sm font-semibold text-black transition hover:opacity-90"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingDetailsModal;
