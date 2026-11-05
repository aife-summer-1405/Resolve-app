"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
    ShieldCheck,
    LockKeyhole,
    CreditCard,
    CheckCircle2,
    XCircle,
    Clock3,
} from "lucide-react";

const MockPaymentPage = () => {
    const params = useParams<{ id: string }>();
    const searchParams = useSearchParams();

    const paymentId = params?.id;
    const houseId = searchParams?.get("houseId");
    const bookingId = searchParams?.get("bookingId");

    const [loading, setLoading] = useState<"success" | "failed" | null>(null);

const handlePayment = (status: "success" | "failed") => {
    if (!houseId || loading) return;

    setLoading(status);

    const callbackUrl = new URL(
        `/HouseReserve/${houseId}`,
        window.location.origin
    );

    callbackUrl.searchParams.set("status", status);
    callbackUrl.searchParams.set("paymentId", paymentId ?? "");

    if (bookingId) {
        callbackUrl.searchParams.set("bookingId", bookingId);
    }

    window.location.assign(callbackUrl.toString());
};

    return (
        <main
            dir="rtl"
            className="flex min-h-screen items-center justify-center bg-background px-4 py-10"
        >
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
                <div className="bg-surface px-6 py-7 text-center">
                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary text-black">
                        <CreditCard size={32} />
                    </div>

                    <h1 className="text-xl font-bold text-foreground">
                        درگاه پرداخت آنلاین
                    </h1>

                    <p className="mt-2 text-sm text-muted">
                        پرداخت رزرو اقامتگاه
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted">
                        <ShieldCheck size={15} />
                        محیط پرداخت آزمایشی
                    </div>
                </div>

                <div className="space-y-5 p-6">
                    <div className="rounded-2xl border border-border bg-surface p-5">
                        <p className="text-sm text-muted">
                            مبلغ قابل پرداخت
                        </p>

                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-foreground">
                                ۱,۰۰۰
                            </span>
                            <span className="text-sm text-muted">
                                تومان
                            </span>
                        </div>

                        <div className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted">
                                    شناسه پرداخت
                                </span>
                                <span className="font-medium text-foreground">
                                    {paymentId}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-muted">
                                    شناسه رزرو
                                </span>
                                <span className="font-medium text-foreground">
                                    {bookingId ?? "-"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-muted">وضعیت</span>
                                <span className="flex items-center gap-1 text-yellow-500">
                                    <Clock3 size={14} />
                                    در انتظار پرداخت
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <LockKeyhole size={17} className="text-primary" />
                            انتخاب نتیجه پرداخت
                        </div>

                        <button
                            disabled={loading !== null || !houseId}
                            onClick={() => handlePayment("success")}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-black transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <CheckCircle2 size={19} />
                            {loading === "success"
                                ? "در حال انتقال..."
                                : "شبیه‌سازی پرداخت موفق"}
                        </button>

                        <button
                            disabled={loading !== null || !houseId}
                            onClick={() => handlePayment("failed")}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3.5 font-semibold text-foreground transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <XCircle size={19} />
                            {loading === "failed"
                                ? "در حال انتقال..."
                                : "شبیه‌سازی پرداخت ناموفق"}
                        </button>
                    </div>

                    <div className="rounded-xl bg-surface p-3 text-center">
                        <p className="text-xs leading-6 text-muted">
                            این صفحه صرفاً برای تست فرایند پرداخت طراحی شده است.
                            هیچ اطلاعات بانکی دریافت یا پردازش نمی‌شود.
                        </p>
                    </div>
                </div>

                <div className="border-t border-border px-6 py-4">
                    <div className="flex items-center justify-center gap-2 text-xs text-muted">
                        <ShieldCheck size={14} />
                        پرداخت امن آزمایشی
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MockPaymentPage;