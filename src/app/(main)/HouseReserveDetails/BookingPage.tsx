"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import type { IHouseDetails } from "@/src/types/HousereservesType/HouseDetailType";
import type {
    IBookingData,
    IReservation,
} from "@/src/types/HousereservesType/BookingType";
import { useCreateBooking } from "@/src/hooks/useCreateBooking";
import { useCreatePayment } from "@/src/hooks/useCreatePayment";
import TravelerInfo from "./TravelerInfo";
import ConfirmInfo from "./Tabs/ConfirmInfo";

type Level = "traveler-info" | "confirm" | "done";

interface IPageProps {
    result: IHouseDetails;
    onBack: () => void;
    onPaymentSuccess: () => void;
    setReservation: Dispatch<SetStateAction<IReservation | null>>;
    reservationDetail: IReservation;
}

const steps = [
    "انتخاب هتل",
    "مشخصات مسافران",
    "تایید اطلاعات",
    "پرداخت آنلاین",
    "صدور بلیط",
];

const stepIndexByLevel: Record<Level, number> = {
    "traveler-info": 1,
    confirm: 2,
    done: 4,
};

const BookingPage = ({
    result,
    onBack,
    onPaymentSuccess,
    reservationDetail,
    setReservation,
}: IPageProps) => {
    const searchParams = useSearchParams();
    const status = searchParams?.get("status");

    const [level, setLevel] = useState<Level>(() => {
        if (status === "success") return "done";
        // پرداخت ناموفق: اگر مسافران ثبت شده‌اند به صفحه تایید برگرد
        if (status === "failed" && reservationDetail.traveler_details?.length) {
            return "confirm";
        }
        return "traveler-info";
    });

    const { mutate: createBooking, isPending: isBookingPending } =
        useCreateBooking();
    const { mutate: createPayment, isPending: isPaymentPending } =
        useCreatePayment();

    useEffect(() => {
        if (status === "success") onPaymentSuccess();
        if (status === "failed") toast.error("پرداخت ناموفق بود. دوباره تلاش کنید.");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    // مرحله ۱ -> ۲: فقط ذخیره‌ی اطلاعات، بدون API
    const handleTravelerContinue = (data: {
        traveler_details: IBookingData["traveler_details"];
        sharedEmail: string;
        sharedMobile: string;
    }) => {
        setReservation((prev) => (prev ? { ...prev, ...data } : prev));
        setLevel("confirm");
    };

    // مرحله ۲ -> پرداخت: ساخت رزرو و پرداخت
    const handlePay = () => {
        const bookingPayload: IBookingData = {
            houseId: reservationDetail.houseId,
            reservedDates: reservationDetail.reservedDates,
            traveler_details: reservationDetail.traveler_details,
            sharedEmail: reservationDetail.sharedEmail,
            sharedMobile: reservationDetail.sharedMobile,
        };

        createBooking(bookingPayload, {
            onSuccess: (booking) => {
                createPayment(
                    {
                        amount: reservationDetail.total,
                        description: `پرداخت رزرو اقامتگاه ${result.title}`,
                        callbackUrl: `${process.env.NEXT_PUBLIC_CALLBACK_URL}/HouseReserve/${result.id}/paymentcomplete`,
                        bookingId: booking.id,
                    },
                    {
                        onSuccess: (paymentResponse) => {
                            sessionStorage.setItem("bookingId", String(booking.id));

                            const paymentUrl = new URL(paymentResponse.paymentUrl);
                            paymentUrl.searchParams.set("houseId", String(result.id));
                            paymentUrl.searchParams.set("bookingId", String(booking.id));

                            window.location.assign(paymentUrl.toString());
                        },
                        onError: (error) => toast.error(error.message),
                    },
                );
            },
            onError: (error) => toast.error(error.message),
        });
    };

    const currentStep = stepIndexByLevel[level];
    const isSubmitting = isBookingPending || isPaymentPending;

    return (
        <>
            <div className="flex my-5 items-center justify-between gap-2 overflow-x-auto rounded-2xl bg-card p-4 mt-20">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isActive = index === currentStep;

                    return (
                        <div key={step} className="flex shrink-0 items-center gap-2">
                            <div
                                className={`flex items-center gap-2 whitespace-nowrap text-xs ${isCompleted
                                    ? "text-primary"
                                    : isActive
                                        ? "text-foreground"
                                        : "text-muted"
                                    }`}
                            >
                                <span
                                    className={`flex size-7 items-center justify-center rounded-full border ${isCompleted
                                        ? "border-primary bg-primary text-black"
                                        : isActive
                                            ? "border-primary text-primary"
                                            : "border-border"
                                        }`}
                                >
                                    {isCompleted ? <Check size={14} /> : index + 1}
                                </span>
                                {step}
                            </div>

                            {index !== steps.length - 1 && (
                                <div className="h-px w-5 border-t border-dashed border-border" />
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="md:h-200 h-350">
                {level === "traveler-info" && (
                    <TravelerInfo
                        reservationDetail={reservationDetail}
                        result={result}
                        onBack={onBack}
                        onContinue={handleTravelerContinue}
                        isSubmitting={false}
                    />
                )}

                {level === "confirm" && (
                    <ConfirmInfo
                        result={result}
                        reservationDetail={reservationDetail}
                        onBack={() => setLevel("traveler-info")}
                        onEdit={() => setLevel("traveler-info")}
                        onPay={handlePay}
                        isSubmitting={isSubmitting}
                    />
                )}

                {level === "done" && (
                    <div className="mt-40 p-8 text-center">
                        <CheckCircle2 size={56} className="mx-auto text-green-500" />
                        <h2 className="mt-4 text-xl font-bold text-foreground">
                            رزرو بلیط شما با موفقیت انجام شد !                    </h2>
                        <div className="flex flex-col md:flex-row gap-5 justify-center mt-3">
                            <button onClick={onBack} className="text-white border border-white rounded-full p-2">بازگشت به صفحه اصلی</button>
                            <button className="text-primary border border-primary rounded-full p-2">بلیط های من</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default BookingPage;