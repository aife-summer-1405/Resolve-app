"use client";

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { IHouseDetails } from "@/src/types/HousereservesType/HouseDetailType";
import type {
    IBookingData,
    IReservation,
} from "@/src/types/HousereservesType/BookingType";
import { useCreateBooking } from "@/src/hooks/useCreateBooking";
import TravelerInfo from "./TravelerInfo";
import { Check, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useCreatePayment } from "@/src/hooks/useCreatePayment";

interface IPageProps {
    result: IHouseDetails;
    onBack: () => void;
    setReservation: Dispatch<SetStateAction<IReservation | null>>;
    reservationDetail: IReservation;
}

const BookingPage = ({ result, onBack, reservationDetail, setReservation }: IPageProps) => {
    const [level, setLevel] = useState("traveler-info");
    const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams?.get("status");

    if (status === "success") {
        setLevel("payment");
        sessionStorage.removeItem("reservation");
        sessionStorage.removeItem("reservationHouseId");
    }

    if (status === "failed") {
        setLevel("traveler-info");
    }
}, [searchParams]);
    const { mutate: createBooking, isPending } = useCreateBooking();
    const {
        mutate: createPayment,
        isPending: isPaymentPending,
    } = useCreatePayment();
    const handleTravelerContinue = (data: {
        traveler_details: IBookingData["traveler_details"];
        sharedEmail: string;
        sharedMobile: string;
    }) => {
        const bookingPayload: IBookingData = {
            houseId: reservationDetail.houseId,
            reservedDates: reservationDetail.reservedDates,
            traveler_details: data.traveler_details,
            sharedEmail: data.sharedEmail,
            sharedMobile: data.sharedMobile,
        };

        setReservation((prev) =>
            prev ? { ...prev, ...data } : prev
        );

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
                    }
                );
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    };
    const steps = [
        "انتخاب هتل",
        "مشخصات مسافران",
        "تایید اطلاعات",
        "پرداخت آنلاین",
        "صدور بلیط",
    ];

    const currentStep = 1;
    return (
        <>
            <div className="flex items-center justify-between gap-2 overflow-x-auto rounded-2xl bg-card p-4">
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
            {level === "choose-house" && (
                <div>
                    انتخاب اقامتگاه
                </div>
            )}
            {level === "traveler-info" && (
                <TravelerInfo
                    reservationDetail={reservationDetail}
                    result={result}
                    onBack={onBack}
                    onContinue={handleTravelerContinue}
                    isSubmitting={isPending || isPaymentPending}
                />
            )}

            {level === "payment" && (
    <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <CheckCircle2 size={56} className="mx-auto text-green-500" />

        <h2 className="mt-4 text-xl font-bold text-foreground">
            پرداخت با موفقیت انجام شد
        </h2>

        <p className="mt-3 text-sm text-muted">
            رزرو شما با موفقیت ثبت شد.
        </p>
    </div>
)}
        </>
    );
};

export default BookingPage;