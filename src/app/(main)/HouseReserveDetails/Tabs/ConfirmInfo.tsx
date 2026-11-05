"use client";

import { useState } from "react";
import {
    Users,
    Pencil,
    Wallet,
    Phone,
    Mail,
    TicketPercent,
    ChevronDown,
    Info,
    ArrowRight,
    CreditCard,
} from "lucide-react";
import type { IHouseDetails } from "@/src/types/HousereservesType/HouseDetailType";
import type { IReservation } from "@/src/types/HousereservesType/BookingType";

interface IConfirmInfoProps {
    result: IHouseDetails;
    reservationDetail: IReservation;
    onBack: () => void;
    onEdit: () => void;
    onPay: () => void;
    isSubmitting: boolean;
}

type TravelerRecord = Record<string, unknown>;

// نام فیلدهای مسافر را از IBookingData چک کن؛ اینجا چند نام رایج را امتحان می‌کند
const pick = (traveler: TravelerRecord, keys: string[], fallback = "-") => {
    for (const key of keys) {
        const value = traveler[key];
        if (value !== undefined && value !== null && value !== "") {
            return String(value);
        }
    }
    return fallback;
};

const genderLabel = (value: string) => {
    const v = value.toLowerCase();
    if (v === "male" || v === "m" || value === "مرد") return "مرد";
    if (v === "female" || v === "f" || value === "زن") return "زن";
    return value;
};

const formatPrice = (value: number) =>
    `${Math.round(value).toLocaleString("fa-IR")} ت`;

const cardClass =
    "rounded-2xl border border-border bg-card";

const ConfirmInfo = ({
    result,
    reservationDetail,
    onBack,
    onEdit,
    onPay,
    isSubmitting,
}: IConfirmInfoProps) => {
    const [discountOpen, setDiscountOpen] = useState(true);
    const [discountCode, setDiscountCode] = useState("");

    const travelers = (reservationDetail.traveler_details ??
        []) as unknown as TravelerRecord[];

    const pricePerTraveler =
        travelers.length > 0
            ? reservationDetail.total / travelers.length
            : reservationDetail.total;

    return (
        <div dir="rtl" className="mt-4 flex flex-col gap-4">
            {/* مشخصات مسافران */}
            <section className={`${cardClass} p-4`}>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Users size={17} />
                        مشخصات مسافران
                    </h2>

                    <button
                        type="button"
                        onClick={onEdit}
                        className="flex items-center gap-1.5 rounded-lg border border-primary px-3 py-1.5 text-xs text-primary transition hover:bg-primary hover:text-black"
                    >
                        <Pencil size={13} />
                        ویرایش مسافران
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-center text-xs">
                        <thead>
                            <tr className="border-b border-border text-muted">
                                <th className="pb-3 font-normal">بازه سنی</th>
                                <th className="pb-3 font-normal">
                                    نام و نام خانوادگی
                                </th>
                                <th className="pb-3 font-normal">جنسیت</th>
                                <th className="pb-3 font-normal">
                                    کدملی / شماره پاسپورت
                                </th>
                                <th className="pb-3 font-normal">تاریخ تولد</th>
                                <th className="pb-3 font-normal">خدمات</th>
                                <th className="pb-3 font-normal">مبلغ خدمات</th>
                                <th className="pb-3 font-normal">قیمت</th>
                            </tr>
                        </thead>

                        <tbody>
                            {travelers.map((traveler, index) => {
                                const fullName =
                                    pick(traveler, ["fullName", "full_name", "name"], "") ||
                                    "";
                                const first = pick(
                                    traveler,
                                    ["firstName", "first_name"],
                                    "",
                                );
                                const last = pick(
                                    traveler,
                                    ["lastName", "last_name"],
                                    "",
                                );
                                const displayName =
                                    fullName || `${first} ${last}`.trim() || "-";

                                return (
                                    <tr
                                        key={index}
                                        className="border-b border-border/50 text-foreground last:border-0"
                                    >
                                        <td className="py-3 text-primary">
                                            {pick(
                                                traveler,
                                                ["ageGroup", "age_group", "type"],
                                                "بزرگسال",
                                            )}
                                        </td>
                                        <td className="py-3">{displayName}</td>
                                        <td className="py-3">
                                            {genderLabel(
                                                pick(traveler, ["gender", "sex"]),
                                            )}
                                        </td>
                                        <td className="py-3 text-primary" dir="ltr">
                                            {pick(traveler, [
                                                "nationalId",
                                                "national_id",
                                                "national_code",
                                                "passport",
                                                "passportNumber",
                                            ])}
                                        </td>
                                        <td className="py-3" dir="ltr">
                                            {pick(traveler, [
                                                "birthDate",
                                                "birth_date",
                                                "dateOfBirth",
                                            ])}
                                        </td>
                                        <td className="py-3">0</td>
                                        <td className="py-3">-</td>
                                        <td className="py-3 text-primary">
                                            {formatPrice(pricePerTraveler)}
                                        </td>
                                    </tr>
                                );
                            })}

                            {travelers.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-6 text-muted">
                                        مسافری ثبت نشده است.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* توضیحات / هزینه جانبی */}
            <section className={`${cardClass} p-4`}>
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Info size={17} />
                    هزینه جانبی
                </h2>
                <p className="text-xs leading-7 text-muted">
                    هزینه‌ی رزرو {result.title} برای {reservationDetail.nights.toLocaleString("fa-IR")} شب
                    و {reservationDetail.guests.toLocaleString("fa-IR")} مهمان محاسبه شده است.
                    پس از پرداخت موفق، اطلاعات رزرو برای شما نمایش داده می‌شود.
                </p>
            </section>

            {/* اطلاعات تماس */}
            <section className={`${cardClass} p-4`}>
                <h2 className="mb-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Phone size={17} />
                    اطلاع‌رسانی مسافر
                </h2>
                <p className="mb-4 text-xs text-primary">
                    اطلاعات بلیط و اطلاع‌رسانی بعدی به این آدرس ارسال می‌شود.
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground">
                    <span className="flex items-center gap-2">
                        <Phone size={14} className="text-muted" />
                        شماره تماس:
                        <span className="text-primary" dir="ltr">
                            {reservationDetail.sharedMobile || "-"}
                        </span>
                    </span>

                    <span className="flex items-center gap-2">
                        <Mail size={14} className="text-muted" />
                        ایمیل:
                        <span className="text-primary" dir="ltr">
                            {reservationDetail.sharedEmail || "-"}
                        </span>
                    </span>
                </div>
            </section>

            {/* کد تخفیف */}
            <section className={`${cardClass} p-4`}>
                <button
                    type="button"
                    onClick={() => setDiscountOpen((open) => !open)}
                    className="flex w-full items-center justify-between"
                >
                    <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <TicketPercent size={17} />
                        کد تخفیف
                    </span>
                    <ChevronDown
                        size={18}
                        className={`text-muted transition ${discountOpen ? "rotate-180" : ""}`}
                    />
                </button>

                {discountOpen && (
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="relative flex-1">
                            <label
                                htmlFor="discount-code"
                                className="absolute -top-2 right-3 bg-card px-1 text-[10px] text-muted"
                            >
                                کد تخفیف:
                            </label>
                            <input
                                id="discount-code"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                placeholder="وارد کنید..."
                                className="h-11 w-full rounded-xl border border-border bg-transparent px-3 text-sm text-foreground outline-none focus:border-primary"
                            />
                        </div>

                        <button
                            type="button"
                            disabled={!discountCode.trim()}
                            // TODO: وصل به API کد تخفیف
                            className="h-11 rounded-xl border border-primary px-4 text-xs text-primary transition hover:bg-primary hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            اعمال کد تخفیف
                        </button>
                    </div>
                )}
            </section>

            {/* قیمت و دکمه‌ها */}
            <section className="flex flex-col gap-4 rounded-2xl border-2 border-dashed border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm text-foreground">
                    <Wallet size={18} />
                    قیمت هتل:
                    <span className="text-lg font-bold text-primary">
                        {formatPrice(reservationDetail.total)}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-xs text-foreground transition hover:bg-surface disabled:opacity-50"
                    >
                        <ArrowRight size={15} />
                        مرحله قبل
                    </button>

                    <button
                        type="button"
                        onClick={onPay}
                        disabled={isSubmitting || travelers.length === 0}
                        className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-black transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <CreditCard size={15} />
                        {isSubmitting ? "در حال انتقال..." : "پرداخت آنلاین"}
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ConfirmInfo;