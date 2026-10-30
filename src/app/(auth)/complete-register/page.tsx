"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import AuthLayout from "@/src/components/organisms/auth/AuthLayout";
import AuthButton from "@/src/components/organisms/auth/AuthButton";
import AuthInput from "@/src/components/organisms/auth/AuthInput";
import { actionCompleteRegistration } from "@/src/actions/auth";
import {
    type ICompleteRegistrationForm,
    completeRegistrationSchema,
} from "@/src/schemas/auth/completeRegistrationSchema";

export default function CompleteRegistrationPage() {
    const router = useRouter();
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ICompleteRegistrationForm>({
        resolver: zodResolver(completeRegistrationSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: ICompleteRegistrationForm) => {
        setServerError("");

        try {
            const result = await actionCompleteRegistration(data);

            if (result.success) {
                router.push("/login");
                return;
            }

            setServerError(
                result.message || "تکمیل ثبت‌نام انجام نشد."
            );
        } catch {
            setServerError("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
        }
    };

    return (
        <AuthLayout>
            <div className="text-right">
                <div className="text-xs text-white/50">
                    خانه　‹　
                    <span className="text-primary">
                        تکمیل حساب کاربری
                    </span>
                </div>

                <div className="relative mt-8 text-sm font-medium text-primary">
                    فقط یک قدم تا عضویت!
                    <Image
                        className="absolute -top-3 left-0"
                        src="/icons/Group%2034.png"
                        alt="فلش"
                        width={55}
                        height={10}
                    />
                </div>

                <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
                    تکمیل اطلاعات حساب کاربری
                </h1>

                <p className="mt-5 text-sm leading-7 text-white/75">
                    برای تکمیل ثبت‌نام، شماره تلفن و رمز عبور خود را وارد کنید.
                </p>

                <form
                    dir="rtl"
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-5"
                >
                    <AuthInput
                        id="phoneNumber"
                        label="شماره تلفن همراه"
                        type="tel"
                        autoComplete="tel"
                        placeholder="مثال: 09123456789"
                        registration={register("phoneNumber")}
                        error={errors.phoneNumber}
                    />

                    <AuthInput
                        id="password"
                        label="رمز عبور"
                        type="password"
                        autoComplete="new-password"
                        placeholder="رمز عبور خود را وارد کنید"
                        registration={register("password")}
                        error={errors.password}
                    />

                    {serverError && (
                        <p
                            role="alert"
                            className="text-sm text-red-400"
                        >
                            {serverError}
                        </p>
                    )}

                    <div className="pt-3">
                        <AuthButton
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "در حال تکمیل ثبت‌نام..."
                                : "تکمیل ثبت‌نام"}
                        </AuthButton>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}