
"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
    BadgeDollarSign,
    CalendarDays,
    ChevronLeft,
    HousesIcon,
    Minus,
    Plus,
    User,
    Users,
} from "lucide-react";

import type { IHouseDetails } from "@/src/types/HousereservesType/HouseDetailType";
import type { IBookingData } from "@/src/types/HousereservesType/BookingType";
import { useCreateBooking } from "@/src/hooks/useCreateBooking";
import { useUserStore } from "@/src/store/userStore";
import Field from "@/src/components/Ui/Field";
import Link from "next/link";
import LoginRequiredModal from "@/src/components/organisms/auth/LoginRequiredModal";

interface IReservationBoxProps {
    result: IHouseDetails;
    onReserve?: (
        data: IBookingData & {
            guests: number;
            nights: number;
            total: number;
        },
    ) => void;
}

interface IFieldProps {
    legend: string;
    children: ReactNode;
}

const DAY_MS = 86_400_000;

const toman = (value: number) =>
    `${value.toLocaleString("fa-IR")} تومان`;

const formatApiDate = (date: DateObject | null): string => {
    if (!date) return "";

    const convertedDate = date.convert(gregorian);
    const year = convertedDate.year;
    const month = String(convertedDate.month).padStart(2, "0");
    const day = String(convertedDate.day).padStart(2, "0");

    return new Date(
        `${year}-${month}-${day}T00:00:00.000Z`,
    ).toISOString();
};

function diffInDays(
    from: DateObject | null,
    to: DateObject | null,
): number {
    if (!from || !to) return 0;

    const fromDate = from.convert(gregorian).toDate();
    const toDate = to.convert(gregorian).toDate();

    const fromUtc = Date.UTC(
        fromDate.getFullYear(),
        fromDate.getMonth(),
        fromDate.getDate(),
    );

    const toUtc = Date.UTC(
        toDate.getFullYear(),
        toDate.getMonth(),
        toDate.getDate(),
    );

    return Math.max(
        0,
        Math.round((toUtc - fromUtc) / DAY_MS),
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
    const user = useUserStore((state) => state.user);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [minDate, setMinDate] = useState<DateObject>();
    const [checkIn, setCheckIn] = useState<DateObject | null>(null);
    const [checkOut, setCheckOut] = useState<DateObject | null>(null);

    const [bookingData, setBookingData] = useState<IBookingData>({
        houseId: Number(result.id),
        reservedDates: [],
        traveler_details: [
            {
                firstName: user?.firstName || "کاربر",
                lastName: user?.lastName || "کاربر",
                gender: "female",
                birthDate: "1996-01-01",
                nationalId: "0000000000",
            },
        ],
        sharedEmail: user?.email ?? "",
        sharedMobile: user?.phoneNumber ?? "",
    });

    const {
        mutate: createBooking,
        isPending,
    } = useCreateBooking();

    const guests = bookingData.traveler_details.length;

    useEffect(() => {
        setMinDate(
            new DateObject({ calendar: persian }).add(1, "day"),
        );
    }, []);

    useEffect(() => {
        if (!user) return;

        setBookingData((prev) => ({
            ...prev,
            sharedEmail: user.email ?? "",
            sharedMobile: user.phoneNumber ?? "",
            traveler_details: prev.traveler_details.map(
                (traveler, index) =>
                    index === 0
                        ? {
                            ...traveler,
                            firstName: user.firstName ?? "",
                            lastName: user.lastName ?? "",
                        }
                        : traveler,
            ),
        }));
    }, [user]);

    const nights = diffInDays(checkIn, checkOut);

    const originalPrice = Math.max(
        0,
        Number(result.price) || 0,
    );

    const discountedPrice =
        result.discounted_price != null
            ? Math.max(
                0,
                Number(result.discounted_price) || 0,
            )
            : originalPrice;

    const pricePerNight = discountedPrice;

    const discountPercent =
        originalPrice > 0 && discountedPrice < originalPrice
            ? Math.round(
                ((originalPrice - discountedPrice) /
                    originalPrice) *
                100,
            )
            : 0;

    const maxGuests = Math.max(
        1,
        Number(result.capacity) || 1,
    );

    const oldTotal = nights * originalPrice;
    const finalTotal = nights * pricePerNight;

    function updateReservedDates(
        nextCheckIn: DateObject | null,
        nextCheckOut: DateObject | null,
    ) {
        setBookingData((prev) => ({
            ...prev,
            reservedDates: [
                formatApiDate(nextCheckIn),
                formatApiDate(nextCheckOut),
            ].filter(Boolean),
        }));
    }

    function handleCheckIn(
        value: DateObject | DateObject[] | null,
    ) {
        const date = Array.isArray(value)
            ? (value[0] ?? null)
            : value;

        setCheckIn(date);

        if (
            date &&
            checkOut &&
            date.convert(gregorian).toDate().getTime() >=
            checkOut.convert(gregorian).toDate().getTime()
        ) {
            setCheckOut(null);
            updateReservedDates(date, null);
            return;
        }

        updateReservedDates(date, checkOut);
    }

    function handleCheckOut(
        value: DateObject | DateObject[] | null,
    ) {
        const date = Array.isArray(value)
            ? (value[0] ?? null)
            : value;

        setCheckOut(date);
        updateReservedDates(checkIn, date);
    }

    function updateGuestCount(nextCount: number) {
        const count = Math.max(
            1,
            Math.min(maxGuests, nextCount),
        );

        setBookingData((prev) => {
            const travelers = [...prev.traveler_details];

            while (travelers.length < count) {
                travelers.push({
                    firstName: "",
                    lastName: "",
                    gender: "",
                    birthDate: "",
                    nationalId: "",
                });
            }

            return {
                ...prev,
                traveler_details: travelers.slice(0, count),
            };
        });
    }
    function handleReserve() {
        if (!user) {
            setShowLoginModal(true);
            return;
        }

        if (!checkIn || !checkOut || nights < 1) {
            toast.error("لطفاً تاریخ ورود و خروج را انتخاب کنید.");
            return;
        }

        if (isPending) return;

        const reservationPayload = {
            ...bookingData,
            houseId: Number(result.id),
            reservedDates: [
                formatApiDate(checkIn),
                formatApiDate(checkOut),
            ],
        };

        onReserve?.({
            ...reservationPayload,
            guests,
            nights,
            total: finalTotal,
        });

        createBooking(reservationPayload, {
            onSuccess: () => {
                toast.success("درخواست رزرو با موفقیت ثبت شد");
            },
            onError: () => {
                toast.error("ثبت رزرو ناموفق بود");
            },
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
                <span className="line-clamp-1">
                    {result.title}
                </span>
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
                                updateGuestCount(guests + 1)
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
                                updateGuestCount(guests - 1)
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
                    ظرفیت اقامتگاه:{" "}
                    {maxGuests.toLocaleString("fa-IR")} نفر
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
                disabled={
                    isPending ||
                    nights < 1 ||
                    guests > maxGuests
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-extrabold text-neutral-900 transition-opacity hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
                <ChevronLeft size={14} />
                {isPending
                    ? "در حال ثبت رزرو..."
                    : "همین الان رزرو کن"}
            </button>
            <LoginRequiredModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </aside>
    );
}
