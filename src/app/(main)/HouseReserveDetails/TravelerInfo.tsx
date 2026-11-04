"use client";

import { useEffect, useState } from "react";
import {
    ArrowRight,
    CalendarDays,
    ChevronLeft,
    MapPin,
    UserRound,
    Users,
} from "lucide-react";

import type { IHouseDetails } from "@/src/types/HousereservesType/HouseDetailType";
import type {
    IReservation,
    ITravelerDetails,
} from "@/src/types/HousereservesType/BookingType";

interface IBookingPageProps {
    result: IHouseDetails;
    reservationDetail: IReservation;
    onBack: () => void;
    onContinue: (data: {
        traveler_details: ITravelerDetails[];
        sharedEmail: string;
        sharedMobile: string;
    }) => void;
    isSubmitting: boolean;
}

const inputClass =
    "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary disabled:cursor-not-allowed disabled:opacity-60";

const labelClass = "mb-2 block text-xs text-muted";

const createEmptyTraveler = (): ITravelerDetails => ({
    firstName: "",
    lastName: "",
    nationalId: "",
    birthDate: "",
    gender: "",
});

const TravelerInfo = ({
    result,
    reservationDetail,
    onBack,
    onContinue,
    isSubmitting,
}: IBookingPageProps) => {
    const [travelerDetails, setTravelerDetails] = useState<
        ITravelerDetails[]
    >(() =>
        Array.from(
            { length: reservationDetail.guests },
            (_, index) =>
                reservationDetail.traveler_details?.[index] ??
                createEmptyTraveler(),
        ),
    );

    const [sharedEmail, setSharedEmail] = useState(
        reservationDetail.sharedEmail ?? "",
    );

    const [sharedMobile, setSharedMobile] = useState(
        reservationDetail.sharedMobile ?? "",
    );

    useEffect(() => {
        setTravelerDetails((previous) =>
            Array.from(
                { length: reservationDetail.guests },
                (_, index) =>
                    previous[index] ??
                    reservationDetail.traveler_details?.[index] ??
                    createEmptyTraveler(),
            ),
        );
    }, [reservationDetail.guests]);

    const updateTraveler = (
        index: number,
        field: keyof ITravelerDetails,
        value: string,
    ) => {
        setTravelerDetails((previous) =>
            previous.map((traveler, i) =>
                i === index
                    ? { ...traveler, [field]: value }
                    : traveler,
            ),
        );
    };

    const handleContinue = () => {
        if (isSubmitting) return;

        onContinue({
            traveler_details: travelerDetails,
            sharedEmail,
            sharedMobile,
        });
    };

    return (
        <div dir="rtl" className="mx-auto w-full space-y-5 pb-10">
            <div className="grid grid-cols-1 gap-4 rounded-2xl bg-card p-5 md:grid-cols-[1.2fr_1fr_1fr]">
                <div className="flex items-center gap-3">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-card-2">
                        <MapPin className="text-primary" />
                    </div>

                    <div className="min-w-0">
                        <span className="mb-1 block text-xs text-muted">
                            اقامتگاه انتخاب‌شده
                        </span>

                        <h3 className="font-bold text-foreground">
                            {result.title}
                        </h3>

                        <p className="mt-1 text-xs text-muted">
                            {result.address}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-3 border-y border-border py-4 md:border-y-0 md:border-x md:px-5 md:py-0">
                    <div className="flex items-center gap-2 text-xs">
                        <CalendarDays size={15} className="text-primary" />
                        <span className="text-muted">تاریخ ورود:</span>
                        <span className="text-foreground">
                            {reservationDetail.checkIn}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                        <CalendarDays size={15} className="text-primary" />
                        <span className="text-muted">تاریخ خروج:</span>
                        <span className="text-foreground">
                            {reservationDetail.checkOut}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center">
                    <span className="text-xs text-muted">
                        مبلغ قابل پرداخت
                    </span>

                    <span className="text-lg font-bold text-primary">
                        {reservationDetail.total.toLocaleString("fa-IR")} تومان
                    </span>
                </div>
            </div>

            <section className="rounded-2xl bg-card p-5">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <Users size={18} className="text-primary" />

                        <h2 className="font-bold text-foreground">
                            مشخصات مسافران
                        </h2>
                    </div>

                    <span className="text-xs text-muted">
                        {reservationDetail.guests.toLocaleString("fa-IR")} مسافر
                    </span>
                </div>

                <div className="space-y-5">
                    {travelerDetails.map((traveler, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-border p-4"
                        >
                            <div className="mb-4 flex items-center gap-2">
                                <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
                                    <UserRound size={15} />
                                </span>

                                <h3 className="text-sm font-bold text-foreground">
                                    مسافر {index + 1}
                                </h3>

                                {index === 0 && (
                                    <span className="rounded-md bg-primary/10 px-2 py-1 text-[10px] text-primary">
                                        سرپرست مسافران
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                <div>
                                    <label className={labelClass}>نام</label>

                                    <input
                                        className={inputClass}
                                        placeholder="نام مسافر"
                                        value={traveler.firstName}
                                        disabled={isSubmitting}
                                        onChange={(e) =>
                                            updateTraveler(
                                                index,
                                                "firstName",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        نام خانوادگی
                                    </label>

                                    <input
                                        className={inputClass}
                                        placeholder="نام خانوادگی"
                                        value={traveler.lastName}
                                        disabled={isSubmitting}
                                        onChange={(e) =>
                                            updateTraveler(
                                                index,
                                                "lastName",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        کد ملی
                                    </label>

                                    <input
                                        className={inputClass}
                                        placeholder="کد ملی"
                                        inputMode="numeric"
                                        maxLength={10}
                                        value={traveler.nationalId}
                                        disabled={isSubmitting}
                                        onChange={(e) =>
                                            updateTraveler(
                                                index,
                                                "nationalId",
                                                e.target.value.replace(
                                                    /\D/g,
                                                    "",
                                                ),
                                            )
                                        }
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        تاریخ تولد
                                    </label>

                                    <input
                                        type="date"
                                        className={inputClass}
                                        value={traveler.birthDate}
                                        disabled={isSubmitting}
                                        onChange={(e) =>
                                            updateTraveler(
                                                index,
                                                "birthDate",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>جنسیت</label>

                                    <select
                                        className={inputClass}
                                        value={traveler.gender}
                                        disabled={isSubmitting}
                                        onChange={(e) =>
                                            updateTraveler(
                                                index,
                                                "gender",
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value="">انتخاب کنید</option>
                                        <option value="male">مرد</option>
                                        <option value="female">زن</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-2xl bg-card p-5">
                <div className="mb-5 flex items-center gap-2">
                    <UserRound size={18} className="text-primary" />

                    <h2 className="font-bold text-foreground">
                        اطلاعات تماس
                    </h2>
                </div>

                <p className="mb-5 text-xs text-muted">
                    اطلاعات رزرو و پیگیری از طریق این شماره و ایمیل ارسال می‌شود.
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className={labelClass}>شماره موبایل</label>

                        <input
                            type="tel"
                            inputMode="numeric"
                            className={inputClass}
                            placeholder="09xxxxxxxxx"
                            value={sharedMobile}
                            disabled={isSubmitting}
                            onChange={(e) =>
                                setSharedMobile(
                                    e.target.value.replace(/\D/g, ""),
                                )
                            }
                        />
                    </div>

                    <div>
                        <label className={labelClass}>ایمیل</label>

                        <input
                            type="email"
                            className={inputClass}
                            placeholder="example@email.com"
                            value={sharedEmail}
                            disabled={isSubmitting}
                            onChange={(e) => setSharedEmail(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <div className="flex flex-col gap-4 rounded-2xl border-2 border-dashed border-border p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <span className="text-sm text-muted">
                        قیمت نهایی رزرو:
                    </span>

                    <span className="mr-2 text-lg font-bold text-primary">
                        {reservationDetail.total.toLocaleString("fa-IR")} تومان
                    </span>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm text-foreground transition-colors hover:bg-card-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ArrowRight size={16} />
                        بازگشت
                    </button>

                    <button
                        type="button"
                        onClick={handleContinue}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-neutral-900 transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting
                            ? "در حال ثبت رزرو..."
                            : "تایید و ادامه"}

                        {!isSubmitting && <ChevronLeft size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TravelerInfo;