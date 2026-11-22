"use client";

import { useState, type FormEvent } from "react";
import { X, Save, Plus, Trash2, ChevronDown } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

import { useGetAdminBookingById } from "@/src/hooks/dashboard_Admin/useGetAdminBookingById";
import { useUpdateAdminBooking } from "@/src/hooks/dashboard_Admin/useUpdateAdminBooking";

import type {
  IAdminBookingDetails,
  IAdminBookingTraveler,
  IUpdateAdminBookingPayload,
} from "@/src/types/Admin_Dashboard/AdminBookings";

interface AdminBookingEditModalProps {
  bookingId: number;
  onClose: () => void;
  onSuccess: () => void;
}

interface AdminBookingEditFormProps {
  bookingId: number;
  data: IAdminBookingDetails;
  onClose: () => void;
  onSuccess: () => void;
}

const getPickerDate = (date: string) => {
  if (!date) return null;

  const parsedDate = new DateObject({
    date,
    format: "YYYY-MM-DD",
    calendar: gregorian,
    locale: gregorian_en,
  });

  if (!parsedDate.isValid) return null;

  return parsedDate.convert(persian, persian_fa);
};

const AdminBookingEditModal = ({
  bookingId,
  onClose,
  onSuccess,
}: AdminBookingEditModalProps) => {
  const { data, isPending, isError } = useGetAdminBookingById(bookingId);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl  bg-surface p-5 shadow-2xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-bold text-foreground">ویرایش رزرو</h2>
            <p className="text-xs text-muted">
              ویرایش اطلاعات رزرو شماره #{bookingId}
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
            دریافت اطلاعات رزرو با خطا مواجه شد.
          </div>
        ) : (
          <AdminBookingEditForm
            key={bookingId}
            bookingId={bookingId}
            data={data}
            onClose={onClose}
            onSuccess={onSuccess}
          />
        )}
      </div>
    </div>
  );
};

const AdminBookingEditForm = ({
  bookingId,
  data,
  onClose,
  onSuccess,
}: AdminBookingEditFormProps) => {
  const updateBooking = useUpdateAdminBooking();

  const [reservedDates, setReservedDates] = useState<string[]>(
    data.reservedDates?.map((date) => date.split("T")[0]) ?? [],
  );

  const [travelers, setTravelers] = useState<IAdminBookingTraveler[]>(
    data.traveler_details?.map((traveler) => ({ ...traveler })) ?? [],
  );

  const [sharedMobile, setSharedMobile] = useState(data.sharedMobile ?? "");
  const [sharedEmail, setSharedEmail] = useState(data.sharedEmail ?? "");

  const [status, setStatus] = useState<"pending" | "confirmed" | "canceled">(
    data.status === "confirmed" || data.status === "canceled"
      ? data.status
      : "pending",
  );

  const [travelerError, setTravelerError] = useState(false);

  const handleDateChange = (index: number, value: string) => {
    setReservedDates((prev) =>
      prev.map((date, dateIndex) => (dateIndex === index ? value : date)),
    );
  };

  const handleTravelerChange = (
    index: number,
    field: keyof IAdminBookingTraveler,
    value: string,
  ) => {
    setTravelers((prev) =>
      prev.map((traveler, travelerIndex) =>
        travelerIndex === index ? { ...traveler, [field]: value } : traveler,
      ),
    );

    setTravelerError(false);
  };

  const handleAddTraveler = () => {
    setTravelers((prev) => [
      ...prev,
      {
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        nationalId: "",
      },
    ]);

    setTravelerError(false);
  };

  const handleRemoveTraveler = (index: number) => {
    setTravelers((prev) =>
      prev.filter((_, travelerIndex) => travelerIndex !== index),
    );

    setTravelerError(false);
  };

  const handleAddDate = () => {
    setReservedDates((prev) => [...prev, ""]);
  };

  const handleRemoveDate = (index: number) => {
    setReservedDates((prev) =>
      prev.filter((_, dateIndex) => dateIndex !== index),
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasEmptyTraveler = travelers.some(
      (traveler) =>
        !traveler.firstName.trim() ||
        !traveler.lastName.trim() ||
        !traveler.nationalId.trim() ||
        !traveler.birthDate ||
        !traveler.gender,
    );

    if (hasEmptyTraveler) {
      setTravelerError(true);
      return;
    }

    setTravelerError(false);

    const payload: IUpdateAdminBookingPayload = {
      houseId: Number(data.houseId),
      reservedDates: reservedDates.filter(Boolean),
      traveler_details: travelers,
      status,
      sharedEmail,
      sharedMobile,
    };

    updateBooking.mutate(
      {
        id: bookingId,
        payload,
      },
      {
        onSuccess: () => {
          onSuccess();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            تاریخ‌های رزرو
          </h3>

          <button
            type="button"
            onClick={handleAddDate}
            className="flex items-center gap-1 text-xs text-[#91FF45] transition hover:opacity-70"
          >
            <Plus size={15} />
            افزودن تاریخ
          </button>
        </div>

        {reservedDates.map((date, index) => (
          <div key={index} className="flex w-full items-center gap-2">
            <div className="min-w-0 flex-1">
              <DatePicker
                value={getPickerDate(date)}
                onChange={(value) =>
                  handleDateChange(
                    index,
                    value && !Array.isArray(value)
                      ? value
                          .convert(gregorian, gregorian_en)
                          .format("YYYY-MM-DD")
                      : "",
                  )
                }
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                format="YYYY/MM/DD"
                containerClassName="w-full"
                inputClass="w-full rounded-xl bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-[#91FF45]"
                placeholder="انتخاب تاریخ رزرو"
              />
            </div>

            <button
              type="button"
              onClick={() => handleRemoveDate(index)}
              className="shrink-0 rounded-lg p-2 text-red-500 transition hover:bg-red-500/10"
              aria-label="حذف تاریخ"
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}

        {reservedDates.length === 0 && (
          <p className="text-xs text-muted">
            هنوز تاریخی برای این رزرو ثبت نشده است.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            اطلاعات مسافران
          </h3>

          <button
            type="button"
            onClick={handleAddTraveler}
            className="flex items-center gap-1 text-xs text-[#91FF45] transition hover:opacity-70"
          >
            <Plus size={15} />
            افزودن مسافر
          </button>
        </div>

        {travelers.map((traveler, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 rounded-xl bg-background p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#91FF45]">
                مسافر {index + 1}
              </span>

              <button
                type="button"
                onClick={() => handleRemoveTraveler(index)}
                className="flex items-center gap-1 text-xs text-red-500 transition hover:opacity-70"
              >
                <Trash2 size={15} />
                حذف مسافر
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={traveler.firstName}
                onChange={(e) =>
                  handleTravelerChange(index, "firstName", e.target.value)
                }
                placeholder="نام"
                required
                className="rounded-xl bg-surface px-3 py-3 text-sm text-foreground outline-none focus:border-[#91FF45]"
              />

              <input
                type="text"
                value={traveler.lastName}
                onChange={(e) =>
                  handleTravelerChange(index, "lastName", e.target.value)
                }
                placeholder="نام خانوادگی"
                required
                className="rounded-xl  bg-surface px-3 py-3 text-sm text-foreground outline-none focus:border-[#91FF45]"
              />

              <input
                type="text"
                value={traveler.nationalId}
                onChange={(e) =>
                  handleTravelerChange(index, "nationalId", e.target.value)
                }
                placeholder="کد ملی"
                dir="ltr"
                required
                className="rounded-xl  bg-surface px-3 py-3 text-sm text-foreground outline-none focus:border-[#91FF45]"
              />

              <div className="w-full min-w-0">
                <DatePicker
                  value={getPickerDate(traveler.birthDate?.split("T")[0] ?? "")}
                  onChange={(value) =>
                    handleTravelerChange(
                      index,
                      "birthDate",
                      value && !Array.isArray(value)
                        ? value
                            .convert(gregorian, gregorian_en)
                            .format("YYYY-MM-DD")
                        : "",
                    )
                  }
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  format="YYYY/MM/DD"
                  containerClassName="w-full"
                  inputClass="w-full rounded-xl  bg-surface px-3 py-3 text-sm text-foreground outline-none focus:border-[#91FF45]"
                  placeholder="تاریخ تولد"
                />
              </div>

              <div className="relative">
                <select
                  value={traveler.gender}
                  onChange={(e) =>
                    handleTravelerChange(index, "gender", e.target.value)
                  }
                  required
                  className="w-full appearance-none rounded-xl bg-surface px-4 py-3 pl-10 text-sm text-foreground outline-none focus:border-[#91FF45]"
                >
                  <option value="">انتخاب جنسیت</option>
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>
            </div>
          </div>
        ))}

        {travelers.length === 0 && (
          <p className="text-xs text-muted">
            اطلاعات مسافری برای این رزرو ثبت نشده است.
          </p>
        )}

        {travelerError && (
          <p className="text-xs text-red-500">
            لطفاً تمام فیلدهای اطلاعات مسافران را تکمیل کنید.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">اطلاعات تماس</h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="tel"
            value={sharedMobile}
            onChange={(e) => setSharedMobile(e.target.value)}
            placeholder="شماره موبایل"
            dir="ltr"
            className="rounded-xl  bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-[#91FF45]"
          />

          <input
            type="email"
            value={sharedEmail}
            onChange={(e) => setSharedEmail(e.target.value)}
            placeholder="ایمیل"
            dir="ltr"
            className="rounded-xl  bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-[#91FF45]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-foreground">وضعیت رزرو</h3>

        <div className="relative">
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "pending" | "confirmed" | "canceled")
            }
            className="w-full appearance-none rounded-xl  bg-background px-4 py-3 pl-10 text-sm text-foreground outline-none focus:border-[#91FF45]"
          >
            <option value="pending">در انتظار تأیید</option>
            <option value="confirmed">تأیید شده</option>
            <option value="canceled">لغو شده</option>
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
        </div>
      </div>

      {updateBooking.isError && (
        <p className="text-xs text-red-500">ویرایش رزرو با خطا مواجه شد.</p>
      )}

      <div className="flex items-center justify-end gap-3  pt-4">
        <button
          type="button"
          onClick={onClose}
          disabled={updateBooking.isPending}
          className="rounded-xl px-5 py-2.5 text-sm text-foreground transition hover:bg-card disabled:opacity-50"
        >
          انصراف
        </button>

        <button
          type="submit"
          disabled={updateBooking.isPending}
          className="flex items-center gap-2 rounded-xl bg-[#91FF45] px-5 py-2.5 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={16} />
          {updateBooking.isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </div>
    </form>
  );
};

export default AdminBookingEditModal;
