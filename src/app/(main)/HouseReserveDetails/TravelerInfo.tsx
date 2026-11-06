
"use client";

import { useEffect, useMemo } from "react";
import {
    Controller,
    useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";

import {
    ArrowRight,
    CalendarDays,
    ChevronLeft,
    MapPin,
    UserRound,
    Users,
} from "lucide-react";

import { toast } from "sonner";

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

const travelerSchema = z.object({
    firstName: z.string().trim().min(1, "نام الزامی است"),
    lastName: z.string().trim().min(1, "نام خانوادگی الزامی است"),
    nationalId: z
        .string()
        .regex(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد"),
    birthDate: z.string().min(1, "تاریخ تولد الزامی است"),
    gender: z
        .string()
        .min(1, "انتخاب جنسیت الزامی است")
        .pipe(z.enum(["male", "female"])),
});

const bookingSchema = z.object({
    traveler_details: z
        .array(travelerSchema)
        .min(1, "حداقل یک مسافر باید ثبت شود"),
    sharedEmail: z
        .string()
        .trim()
        .email("لطفاً یک ایمیل معتبر وارد کنید"),
    sharedMobile: z
        .string()
        .regex(
            /^09\d{9}$/,
            "شماره موبایل باید ۱۱ رقم و با 09 شروع شود",
        ),
});

type IBookingFormInput = z.input<typeof bookingSchema>;
type IBookingFormOutput = z.output<typeof bookingSchema>;

type ITravelerFormValues =
    IBookingFormInput["traveler_details"][number];

const inputClass =
    "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary disabled:cursor-not-allowed disabled:opacity-60";

const labelClass = "mb-2 block text-xs text-muted";

const dateInputClass =
    "w-full bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted";

const createEmptyTraveler = (): ITravelerFormValues => ({
    firstName: "",
    lastName: "",
    nationalId: "",
    birthDate: "",
    gender: "",
});


type ITravelerFormInput =
    IBookingFormInput["traveler_details"][number];
const createTravelers = (
    reservationDetail: IReservation,
): ITravelerFormInput[] => {
    return Array.from(
        { length: reservationDetail.guests },
        (_, index) => {
            const traveler =
                reservationDetail.traveler_details?.[index];

            return {
                firstName: traveler?.firstName ?? "",
                lastName: traveler?.lastName ?? "",
                nationalId: traveler?.nationalId ?? "",
                birthDate: traveler?.birthDate ?? "",
                gender: traveler?.gender ?? "",
            };
        },
    );
};

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

const parseApiDate = (date: string): DateObject | null => {
    if (!date) return null;

    const parsedDate = new DateObject({
        date,
        calendar: gregorian,
    });

    return parsedDate.convert(persian);
};

const TravelerInfo = ({
    result,
    reservationDetail,
    onBack,
    onContinue,
    isSubmitting,
}: IBookingPageProps) => {
    const minBirthDate = useMemo(
        () => new DateObject({ calendar: persian }).subtract(100, "year"),
        [],
    );

    const maxBirthDate = useMemo(
        () => new DateObject({ calendar: persian }),
        [],
    );

    const {
        register,
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<
        IBookingFormInput,
        unknown,
        IBookingFormOutput
    >({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            traveler_details: createTravelers(reservationDetail),
            sharedEmail: reservationDetail.sharedEmail ?? "",
            sharedMobile: reservationDetail.sharedMobile ?? "",
        },
        mode: "onBlur",
    });

    useEffect(() => {
        reset({
            traveler_details: createTravelers(reservationDetail),
            sharedEmail: reservationDetail.sharedEmail ?? "",
            sharedMobile: reservationDetail.sharedMobile ?? "",
        });
    }, [
        reservationDetail,
        reset,
    ]);

    const onValid = (data: IBookingFormOutput) => {
        if (isSubmitting) return;

        onContinue({
            traveler_details: data.traveler_details,
            sharedEmail: data.sharedEmail,
            sharedMobile: data.sharedMobile,
        });
    };

    const onInvalid = () => {
        toast.error("لطفاً خطاهای فرم را برطرف کنید.");
    };

    return (
        <form
            dir="rtl"
            onSubmit={handleSubmit(onValid, onInvalid)}
            className="mx-auto w-full space-y-5 pb-10"
        >
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
                        <CalendarDays
                            size={15}
                            className="text-primary"
                        />
                        <span className="text-muted">تاریخ ورود:</span>
                        <span className="text-foreground">
                            {reservationDetail.checkIn}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                        <CalendarDays
                            size={15}
                            className="text-primary"
                        />
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
                    {Array.from(
                        { length: reservationDetail.guests },
                        (_, index) => {
                            const travelerErrors =
                                errors.traveler_details?.[index];

                            return (
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
                                            <label className={labelClass}>
                                                نام{" "}
                                                <span className="text-red-500">*</span>
                                            </label>

                                            <input
                                                {...register(
                                                    `traveler_details.${index}.firstName`,
                                                )}
                                                disabled={isSubmitting}
                                                className={`${inputClass} ${
                                                    travelerErrors?.firstName
                                                        ? "border-red-500"
                                                        : ""
                                                }`}
                                                placeholder="نام مسافر"
                                            />

                                            {travelerErrors?.firstName && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {travelerErrors.firstName.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className={labelClass}>
                                                نام خانوادگی{" "}
                                                <span className="text-red-500">*</span>
                                            </label>

                                            <input
                                                {...register(
                                                    `traveler_details.${index}.lastName`,
                                                )}
                                                disabled={isSubmitting}
                                                className={`${inputClass} ${
                                                    travelerErrors?.lastName
                                                        ? "border-red-500"
                                                        : ""
                                                }`}
                                                placeholder="نام خانوادگی"
                                            />

                                            {travelerErrors?.lastName && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {travelerErrors.lastName.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className={labelClass}>
                                                کد ملی{" "}
                                                <span className="text-red-500">*</span>
                                            </label>

                                            <input
                                                {...register(
                                                    `traveler_details.${index}.nationalId`,
                                                    {
                                                        onChange: (event) => {
                                                            const value =
                                                                event.target.value
                                                                    .replace(/\D/g, "")
                                                                    .slice(0, 10);

                                                            setValue(
                                                                `traveler_details.${index}.nationalId`,
                                                                value,
                                                                {
                                                                    shouldValidate: true,
                                                                    shouldDirty: true,
                                                                },
                                                            );
                                                        },
                                                    },
                                                )}
                                                disabled={isSubmitting}
                                                inputMode="numeric"
                                                maxLength={10}
                                                className={`${inputClass} ${
                                                    travelerErrors?.nationalId
                                                        ? "border-red-500"
                                                        : ""
                                                }`}
                                                placeholder="کد ملی"
                                            />

                                            {travelerErrors?.nationalId && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {travelerErrors.nationalId.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className={labelClass}>
                                                تاریخ تولد{" "}
                                                <span className="text-red-500">*</span>
                                            </label>

                                            <Controller
                                                control={control}
                                                name={`traveler_details.${index}.birthDate`}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <div
                                                            className={`flex items-center gap-2 rounded-xl border bg-surface px-4 ${
                                                                fieldState.error
                                                                    ? "border-red-500"
                                                                    : "border-border"
                                                            }`}
                                                        >
                                                            <DatePicker
                                                                value={parseApiDate(
                                                                    field.value,
                                                                )}
                                                                onChange={(value) => {
                                                                    const date =
                                                                        Array.isArray(value)
                                                                            ? value[0] ?? null
                                                                            : value;

                                                                    field.onChange(
                                                                        formatApiDate(date),
                                                                    );
                                                                }}
                                                                calendar={persian}
                                                                locale={persian_fa}
                                                                calendarPosition="bottom-right"
                                                                inputClass={dateInputClass}
                                                                containerClassName="w-full"
                                                                placeholder="انتخاب تاریخ تولد"
                                                                minDate={minBirthDate}
                                                                maxDate={maxBirthDate}
                                                                className="bg-dark"
                                                                editable={false}
                                                                disabled={isSubmitting}
                                                            />

                                                            <CalendarDays
                                                                size={15}
                                                                className="shrink-0 text-muted"
                                                            />
                                                        </div>

                                                        {fieldState.error && (
                                                            <p className="mt-1 text-xs text-red-500">
                                                                {fieldState.error.message}
                                                            </p>
                                                        )}
                                                    </>
                                                )}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass}>
                                                جنسیت{" "}
                                                <span className="text-red-500">*</span>
                                            </label>

                                            <select
                                                {...register(
                                                    `traveler_details.${index}.gender`,
                                                )}
                                                disabled={isSubmitting}
                                                className={`${inputClass} ${
                                                    travelerErrors?.gender
                                                        ? "border-red-500"
                                                        : ""
                                                }`}
                                            >
                                                <option value="">
                                                    انتخاب کنید
                                                </option>
                                                <option value="male">مرد</option>
                                                <option value="female">زن</option>
                                            </select>

                                            {travelerErrors?.gender && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {travelerErrors.gender.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        },
                    )}
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
                        <label className={labelClass}>
                            شماره موبایل{" "}
                            <span className="text-red-500">*</span>
                        </label>

                        <input
                            {...register("sharedMobile", {
                                onChange: (event) => {
                                    const value = event.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 11);

                                    setValue("sharedMobile", value, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    });
                                },
                            })}
                            disabled={isSubmitting}
                            type="tel"
                            inputMode="numeric"
                            maxLength={11}
                            className={`${inputClass} ${
                                errors.sharedMobile ? "border-red-500" : ""
                            }`}
                            placeholder="09xxxxxxxxx"
                        />

                        {errors.sharedMobile && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.sharedMobile.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className={labelClass}>
                            ایمیل{" "}
                            <span className="text-red-500">*</span>
                        </label>

                        <input
                            {...register("sharedEmail")}
                            disabled={isSubmitting}
                            type="email"
                            className={`${inputClass} ${
                                errors.sharedEmail ? "border-red-500" : ""
                            }`}
                            placeholder="example@email.com"
                        />

                        {errors.sharedEmail && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.sharedEmail.message}
                            </p>
                        )}
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
                        type="submit"
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
        </form>
    );
};

export default TravelerInfo;
