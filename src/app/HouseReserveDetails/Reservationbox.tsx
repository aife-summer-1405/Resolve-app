"use client";

import { useEffect, useMemo, useState } from "react";
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

export interface PriceRow {
    nights: number;
    pricePerNight: number;
}

export type ReservationData = {
    checkIn: string; 
    checkOut: string; 
    checkInDate: Date; 
    checkOutDate: Date; 
    nights: number;
    guests: number;
    total: number;
};

interface ReservationBoxProps {
    priceRows?: PriceRow[];
    discountPercent?: number;
    maxGuests?: number;
    onReserve?: (data: ReservationData) => void;
}

interface FieldProps {
    legend: string;
    children: ReactNode;
}

const defaultRows: PriceRow[] = [
    { nights: 5, pricePerNight: 3_600_000 },
    { nights: 1, pricePerNight: 3_600_000 },
    { nights: 3, pricePerNight: 3_600_000 },
];

const toman = (n: number) => `${n.toLocaleString("fa-IR")} ت`;

const DAY_MS = 86_400_000;

function diffInDays(from: DateObject | null, to: DateObject | null): number {
    if (!from || !to) return 0;
    const ms = to.toDate().getTime() - from.toDate().getTime();
    return Math.max(0, Math.round(ms / DAY_MS));
}

function Field({ legend, children }: FieldProps) {
    return (
        <fieldset className="rounded-xl border border-neutral-600 px-3 pb-1.5 pt-0 transition-colors focus-within:border-[#a6ff2e]">
            <legend className="px-1.5 text-[0.65rem] text-neutral-400">{legend}</legend>
            {children}
        </fieldset>
    );
}

const dateInputCls =
    "w-full bg-transparent py-1 text-xs text-white focus:outline-none";

const sectionTitleCls =
    "m-auto flex w-2/3 flex-row-reverse items-center justify-center gap-1 rounded-b-full bg-[#646464] px-4 py-2 text-xs font-bold text-white";

const stepperBtnCls =
    "grid size-6 place-items-center rounded-md bg-[#a6ff2e] text-neutral-900 transition-opacity hover:opacity-90 disabled:opacity-40";

export default function ReservationBox({
    priceRows = defaultRows,
    discountPercent = 15,
    maxGuests = 10,
    onReserve,
}: ReservationBoxProps) {
    const [checkIn, setCheckIn] = useState<DateObject | null>(null);
    const [checkOut, setCheckOut] = useState<DateObject | null>(null);
    const [guests, setGuests] = useState(2);
    const [minDate, setMinDate] = useState<DateObject | undefined>(undefined);
useEffect(() => {
    setMinDate(new DateObject({ calendar: persian }));
}, []);
    const nights = diffInDays(checkIn, checkOut);

    const { oldTotal, finalTotal } = useMemo(() => {
        const old = priceRows.reduce((sum, r) => sum + r.nights * r.pricePerNight, 0);
        return {
            oldTotal: old,
            finalTotal: Math.round(old * (1 - discountPercent / 100)),
        };
    }, [priceRows, discountPercent]);

    function handleCheckIn(value: DateObject | DateObject[] | null) {
        const date = Array.isArray(value) ? value[0] ?? null : value;
        setCheckIn(date);

        // اگر برگشت قبل یا هم‌روز با ورود جدید بود، پاک شود
        if (date && checkOut && checkOut.toDate() <= date.toDate()) {
            setCheckOut(null);
        }
    }

    function handleCheckOut(value: DateObject | DateObject[] | null) {
        setCheckOut(Array.isArray(value) ? value[0] ?? null : value);
    }

    function handleReserve() {
        if (!checkIn || !checkOut) return;

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
            className="relative w-full space-y-4 rounded-3xl border border-neutral-700 bg-[#393939] px-4 pb-4 text-white"
        >
            <div className={sectionTitleCls}>
                <HousesIcon size={15} />
                <span>رزرو خونه برای</span>
            </div>

            <div className="relative space-y-3">
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
                            aria-hidden
                        />
                    </div>
                </Field>

                <Field legend="تاریخ برگشت">
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
                            minDate={minCheckOut}
                            disabled={!checkIn}
                            className="bg-dark"
                            editable={false}
                        />
                        <CalendarDays
                            size={14}
                            className="shrink-0 text-neutral-400"
                            aria-hidden
                        />
                    </div>
                </Field>

                {nights > 0 && (
                    <span
                        aria-live="polite"
                        className="absolute left-6 top-1/2 -translate-y-1/2 rounded-lg bg-[#7c4dff] px-2.5 py-0.5 text-[0.7rem] font-bold shadow-lg"
                    >
                        {nights.toLocaleString("fa-IR")} شب
                    </span>
                )}
            </div>

            <Field legend="تعداد مسافرات">
                <div className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            aria-label="افزودن مسافر"
                            disabled={guests >= maxGuests}
                            onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))}
                            className={stepperBtnCls}
                        >
                            <Plus size={14} aria-hidden />
                        </button>
                        <span
                            aria-live="polite"
                            className="min-w-4 text-center text-sm font-bold"
                        >
                            {guests.toLocaleString("fa-IR")}
                        </span>
                        <button
                            type="button"
                            aria-label="کم کردن مسافر"
                            disabled={guests <= 1}
                            onClick={() => setGuests((g) => Math.max(1, g - 1))}
                            className={stepperBtnCls}
                        >
                            <Minus size={14} aria-hidden />
                        </button>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-neutral-400">
                        <Users size={14} aria-hidden />
                        نفر
                    </span>
                </div>
            </Field>

            <div className="">
                <hr className="border-[#646464]" />
                <div className={sectionTitleCls}>
                    <BadgeDollarSign size={15} />
                    <span>قیمت رزرو</span>
                </div>
            </div>

            <ul className="space-y-2.5 text-[0.7rem] text-neutral-300">
                {priceRows.map(({ nights: n, pricePerNight }, i) => (
                    <li key={i} className="flex items-center justify-between gap-2">
                        <span>
                            {n.toLocaleString("fa-IR")} شب × {toman(pricePerNight)}
                        </span>
                        <span className="font-bold text-white">
                            {toman(n * pricePerNight)}
                        </span>
                    </li>
                ))}
            </ul>

            <hr className="border-neutral-700" />

            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <span className="rounded-md bg-red-500 px-1.5 py-0.5 text-[0.65rem] font-bold">
                        %{discountPercent.toLocaleString("fa-IR")}
                    </span>
                    <span className="text-[0.7rem] text-neutral-400 line-through">
                        {toman(oldTotal)}
                    </span>
                </div>
                <p className="text-lg font-extrabold text-[#a6ff2e]">
                    {toman(finalTotal)}
                </p>
            </div>

            <button
                type="button"
                onClick={handleReserve}
                disabled={nights < 1}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#a6ff2e] py-2.5 text-xs font-extrabold text-neutral-900 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a6ff2e] disabled:cursor-not-allowed disabled:opacity-50"
            >
                <ChevronLeft size={14} aria-hidden />
                همین الان رزرو کن
            </button>
        </aside>
    );
}