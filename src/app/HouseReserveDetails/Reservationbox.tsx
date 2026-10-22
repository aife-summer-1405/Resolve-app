"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
    BadgeDollarSign,
    CalendarDays,
    ChevronLeft,
    HousesIcon,
    Minus,
    Plus,
    Users,
} from "lucide-react";
import type { IHouseDetails } from "@/src/types/HouseDetailType";

export interface ReservationData {
    checkIn: string;
    checkOut: string;
    checkInDate: Date;
    checkOutDate: Date;
    nights: number;
    guests: number;
    total: number;
}

interface IReservationBoxProps {
    result: IHouseDetails;
    onReserve?: (data: ReservationData) => void;
}

interface IFieldProps {
    legend: string;
    children: ReactNode;
}

const toman = (value: number) =>
    `${value.toLocaleString("fa-IR")} تومان`;

const DAY_MS = 86_400_000;

function diffInDays(
    from: DateObject | null,
    to: DateObject | null,
): number {
    if (!from || !to) return 0;

    const difference =
        to.toDate().getTime() - from.toDate().getTime();

    return Math.max(0, Math.round(difference / DAY_MS));
}

function Field({ legend, children }: IFieldProps) {
    return (
        <fieldset className="rounded-xl border border-neutral-600 px-3 pb-1.5 pt-0 transition-colors focus-within:border-primary">
            <legend className="px-1.5 text-[0.65rem] text-muted">
                {legend}
            </legend>
            {children}
        </fieldset>
    );
}

const dateInputCls =
    "w-full bg-transparent py-1 text-xs text-white focus:outline-none";

const sectionTitleCls =
    "m-auto flex w-2/3 flex-row-reverse items-center justify-center gap-1 rounded-b-full bg-[#646464] px-4 py-2 text-xs font-bold text-white";

const stepperBtnCls =
    "grid size-6 place-items-center rounded-md bg-primary text-neutral-900 transition-opacity hover:opacity-90 disabled:opacity-40";

export default function ReservationBox({
    result,
    onReserve,
}: IReservationBoxProps) {
    const [checkIn, setCheckIn] = useState<DateObject | null>(null);
    const [checkOut, setCheckOut] = useState<DateObject | null>(null);
    const [guests, setGuests] = useState(1);
    const [minDate, setMinDate] = useState<DateObject | undefined>();

    useEffect(() => {
        setMinDate(new DateObject({ calendar: persian }));
    }, []);

    const nights = diffInDays(checkIn, checkOut);
    const originalPrice = Math.max(0, Number(result.price) || 0);
    const discountedPrice =
        result.discounted_price != null
            ? Math.max(0, Number(result.discounted_price) || 0)
            : originalPrice;

    const pricePerNight = discountedPrice;
    const discountPercent =
        originalPrice > 0 && discountedPrice < originalPrice
            ? Math.round(
                ((originalPrice - discountedPrice) / originalPrice) *
                100,
            )
            : 0;

    const maxGuests = Math.max(1, Number(result.capacity) || 1);
    const oldTotal = nights * originalPrice;
    const finalTotal = nights * pricePerNight;

    function handleCheckIn(value: DateObject | DateObject[] | null) {
        const date = Array.isArray(value) ? value[0] ?? null : value;

        setCheckIn(date);

        if (date && checkOut && checkOut.toDate() <= date.toDate()) {
            setCheckOut(null);
        }
    }

    function handleCheckOut(value: DateObject | DateObject[] | null) {
        setCheckOut(Array.isArray(value) ? value[0] ?? null : value);
    }

    function handleReserve() {
        if (!checkIn || !checkOut || nights < 1) return;

        onReserve?.({
            checkIn: checkIn.format("YYYY/MM/DD"),
            checkOut: checkOut.format("YYYY/MM/DD"),
            checkInDate: checkIn.toDate(),
            checkOutDate: checkOut.toDate(),
            nights,
            guests,
            total: finalTotal,
        });
    }

    const minCheckOut = checkIn
        ? new DateObject(checkIn).add(1, "day")
        : undefined;

    return (
        <aside
            aria-label="رزرو خانه"
            className="relative w-full space-y-4 rounded-3xl border border-neutral-700 bg-card px-4 pb-4 text-white"
            dir="rtl"
        >
            <div className={sectionTitleCls}>
                <span className="line-clamp-1">{result.title}</span>
                <HousesIcon size={15} />

            </div>

            <div className="space-y-3">
                <Field legend="تاریخ ورود">
                    <div className="flex items-center gap-2">
                        <DatePicker
                            value={checkIn}
                            onChange={handleCheckIn}
                            calendar={persian}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            inputClass={dateInputCls}
                            containerClassName="w-full"
                            placeholder="انتخاب تاریخ"
                            minDate={minDate}
                            className="bg-dark"
                            editable={false}
                        />
                        <CalendarDays
                            size={14}
                            className="shrink-0 text-neutral-400"
                        />
                    </div>
                </Field>

                <Field legend="تاریخ خروج">
                    <div className="flex items-center gap-2">
                        <DatePicker
                            value={checkOut}
                            onChange={handleCheckOut}
                            calendar={persian}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            inputClass={dateInputCls}
                            containerClassName="w-full"
                            placeholder="انتخاب تاریخ"
                            minDate={minCheckOut ?? minDate}
                            disabled={!checkIn}
                            className="bg-dark"
                            editable={false}
                        />
                        <CalendarDays
                            size={14}
                            className="shrink-0 text-neutral-400"
                        />
                    </div>
                </Field>

                {nights > 0 && (
                    <span className="block text-left text-xs text-white">
                        {nights.toLocaleString("fa-IR")} شب اقامت
                    </span>
                )}
            </div>

            <Field legend="تعداد مسافران">
                <div className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            aria-label="افزودن مسافر"
                            disabled={guests >= maxGuests}
                            onClick={() =>
                                setGuests((current) =>
                                    Math.min(maxGuests, current + 1),
                                )
                            }
                            className={stepperBtnCls}
                        >
                            <Plus size={14} />
                        </button>

                        <span className="min-w-4 text-center text-sm font-bold">
                            {guests.toLocaleString("fa-IR")}
                        </span>

                        <button
                            type="button"
                            aria-label="کم کردن مسافر"
                            disabled={guests <= 1}
                            onClick={() =>
                                setGuests((current) =>
                                    Math.max(1, current - 1),
                                )
                            }
                            className={stepperBtnCls}
                        >
                            <Minus size={14} />
                        </button>
                    </div>

                    <span className="flex items-center gap-1 text-xs text-muted">
                        <Users size={14} />
                        نفر
                    </span>
                </div>

                <p className="pb-1 text-[0.65rem] text-muted">
                    ظرفیت اقامتگاه: {maxGuests.toLocaleString("fa-IR")} نفر
                </p>
            </Field>

            <div>
                <hr className="border-[#646464]" />
                <div className={sectionTitleCls}>

                    <span>قیمت رزرو</span>
                    <BadgeDollarSign size={15} />
                </div>
            </div>

            <ul className="space-y-2.5 text-[0.7rem] text-neutral-300">
                <li className="flex items-center justify-between gap-2">
                    <span>قیمت هر شب</span>
                    <span className="font-bold text-white">
                        {toman(pricePerNight)}
                    </span>
                </li>

                {nights > 0 && (
                    <li className="flex items-center justify-between gap-2">
                        <span>
                            {nights.toLocaleString("fa-IR")} شب × قیمت هر شب
                        </span>
                        <span className="font-bold text-white">
                            {toman(finalTotal)}
                        </span>
                    </li>
                )}
            </ul>

            <hr className="border-neutral-700" />

            <div className="space-y-1">
                {discountPercent > 0 && (
                    <div className="flex items-center justify-between">
                        <span className="rounded-md bg-red-500 px-1.5 py-0.5 text-[0.65rem] font-bold">
                            {discountPercent.toLocaleString("fa-IR")}٪ تخفیف
                        </span>
                        {nights > 0 && (
                            <span className="text-[0.7rem] text-muted line-through">
                                {toman(oldTotal)}
                            </span>
                        )}
                    </div>
                )}

                <p className="text-lg font-extrabold text-primary">
                    {nights > 0
                        ? toman(finalTotal)
                        : `${toman(pricePerNight)} / شب`}
                </p>
            </div>

            <button
                type="button"
                onClick={handleReserve}
                disabled={nights < 1 || guests > maxGuests}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-extrabold text-neutral-900 transition-opacity hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
                <ChevronLeft size={14} />
                همین الان رزرو کن
            </button>
        </aside>
    );
}