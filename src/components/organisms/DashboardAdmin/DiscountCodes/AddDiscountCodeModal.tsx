"use client";

import { useState } from "react";
import { X, CalendarDays, Building2, ChevronDown } from "lucide-react";

import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { useGetAdminHouses } from "@/src/hooks/dashboard_Admin/useGetAdminHouses";
import type { IDiscountCodePayload } from "@/src/types/Admin_Dashboard/DiscountCodes";

interface IAddDiscountCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IDiscountCodePayload) => Promise<void>;
  isPending: boolean;
}

const AddDiscountCodeModal = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
}: IAddDiscountCodeModalProps) => {
  const [formData, setFormData] = useState({
    code: "",
    house_id: "",
    discount_percentage: "",
  });

  const [validUntil, setValidUntil] = useState<DateObject | null>(null);
  const [error, setError] = useState("");
  const [isHouseOpen, setIsHouseOpen] = useState(false);

  const { data: housesData, isPending: housesPending } = useGetAdminHouses();

  const houses = housesData?.data ?? [];

  const resetForm = () => {
    setFormData({
      code: "",
      house_id: "",
      discount_percentage: "",
    });
    setValidUntil(null);
    setError("");
    setIsHouseOpen(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      !formData.code.trim() ||
      !formData.house_id ||
      !formData.discount_percentage ||
      !validUntil
    ) {
      setError("لطفاً تمام فیلدها را تکمیل کنید.");
      return;
    }

    const percentage = Number(formData.discount_percentage);
    const houseId = Number(formData.house_id);

    if (percentage <= 0 || percentage > 100) {
      setError("درصد تخفیف باید بین ۱ تا ۱۰۰ باشد.");
      return;
    }

    try {
      await onSubmit({
        code: formData.code.trim(),
        house_id: houseId,
        discount_percentage: percentage,
        valid_until: validUntil.toDate().toISOString(),
      });

      resetForm();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "ثبت کد تخفیف با خطا مواجه شد.",
      );
    }
  };

  const selectedHouse = houses.find(
    (house) => String(house.id) === formData.house_id,
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-surface p-5 shadow-2xl sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-base font-bold text-foreground">
                افزودن کد تخفیف
              </h2>
              <p className="mt-1 text-xs text-muted">
                اطلاعات کد تخفیف جدید را وارد کنید.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-muted transition hover:bg-background hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">کد تخفیف</label>

            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="مثلاً DELTA10"
              className="w-full rounded-lg bg-background px-3 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-[#91FF45]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <Building2 size={16} />
              انتخاب ملک
            </label>

            <div
              className="relative"
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  setIsHouseOpen(false);
                }
              }}
            >
              <button
                type="button"
                disabled={housesPending}
                onClick={() => setIsHouseOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-lg bg-background px-3 py-3 text-sm text-foreground outline-none transition disabled:opacity-50"
              >
                <span className="text-right">
                  {housesPending
                    ? "در حال دریافت املاک..."
                    : selectedHouse
                      ? `${selectedHouse.title} - ${selectedHouse.address}`
                      : "انتخاب ملک"}
                </span>

                <ChevronDown
                  size={16}
                  className={`shrink-0 text-muted transition-transform ${
                    isHouseOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isHouseOpen && !housesPending && (
                <div className="absolute left-0 right-0 top-full z-[60] mt-1 max-h-60 overflow-y-auto rounded-lg border border-white/10 bg-[#1a1a1a] shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {houses.length > 0 ? (
                    houses.map((house) => (
                      <button
                        key={house.id}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            house_id: String(house.id),
                          }));
                          setIsHouseOpen(false);
                        }}
                        className={`w-full px-3 py-3 text-right text-sm text-foreground transition hover:bg-white/10 ${
                          formData.house_id === String(house.id)
                            ? "bg-[#91FF45]/10 text-[#91FF45]"
                            : ""
                        }`}
                      >
                        {house.title} - {house.address}
                      </button>
                    ))
                  ) : (
                    <p className="px-3 py-4 text-center text-sm text-muted">
                      ملکی یافت نشد.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">درصد تخفیف</label>

            <div className="relative">
              <select
                name="discount_percentage"
                value={formData.discount_percentage}
                onChange={handleChange}
                className="w-full appearance-none rounded-lg bg-background px-3 py-3 pl-10 text-sm text-foreground outline-none transition focus:border-[#91FF45]"
              >
                <option value="">انتخاب درصد تخفیف</option>
                <option value="5">۵ درصد</option>
                <option value="10">۱۰ درصد</option>
                <option value="12">۱۲ درصد</option>
                <option value="15">۱۵ درصد</option>
                <option value="18">۱۸ درصد</option>
                <option value="20">۲۰ درصد</option>
                <option value="25">۲۵ درصد</option>
                <option value="30">۳۰ درصد</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <CalendarDays size={16} />
              تاریخ اعتبار
            </label>

            <DatePicker
              value={validUntil}
              onChange={(date) => setValidUntil(date)}
              calendar={persian}
              locale={persian_fa}
              minDate={
                new DateObject({ calendar: persian, locale: persian_fa })
              }
              format="YYYY/MM/DD"
              calendarPosition="bottom-right"
              portal
              inputClass="w-full rounded-lg bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-[#91FF45]"
              placeholder="انتخاب تاریخ اعتبار"
              containerClassName="w-full"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </p>
          )}

          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="flex-1 rounded-lg px-4 py-3 text-sm text-foreground transition hover:bg-background disabled:opacity-50"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={isPending || housesPending}
              className="flex-1 rounded-lg bg-[#91FF45] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#7ee832] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "در حال ثبت..." : "ثبت کد تخفیف"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDiscountCodeModal;
