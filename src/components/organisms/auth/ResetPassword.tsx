
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "@/src/components/organisms/auth/AuthLayout";
import AuthButton from "@/src/components/organisms/auth/AuthButton";
import AuthInput from "@/src/components/organisms/auth/AuthInput";
import {
    resetPasswordSchema,
    type IResetPasswordForm,
} from "@/src/schemas/auth/resetPasswordSchema";
import { actionResetPassword } from "@/src/actions/auth";
import { IResetPasswordProps } from "@/src/types/AuthType/Authtype";



export default function ResetPassword({
    email,
    code,
    onBack,
}: IResetPasswordProps) {
    const router = useRouter();
    const [serverError, setServerError] = useState("");
    const [serverMessage, setServerMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IResetPasswordForm>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: IResetPasswordForm) => {
        setServerError("");
        setServerMessage("");

        try {
            const result = await actionResetPassword({
                email,
                code,
                newPassword: data.newPassword,
            });

            if (result.success) {
                setServerMessage(result.message || "رمز عبور تغییر کرد.");
                router.push("/login");
                return;
            }

            setServerError(result.message || "تغییر رمز عبور ناموفق بود.");
        } catch {
            setServerError("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
        }
    };

    return (
        <AuthLayout>
            <div dir="rtl" className="text-right">
                <div className="text-xs text-white/50">
                    خانه　‹
                    <span className="text-[#91FF45]">فراموشی رمز عبور</span>
                </div>

                <div className="mt-7 text-sm font-medium text-[#91FF45]">
                    بازیابی حساب کاربری
                </div>

                <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
                    تعیین رمز عبور جدید
                </h1>

                <p className="mt-4 text-sm leading-7 text-white/75">
                    رمز عبور جدید خود را وارد کنید. رمز عبور باید حداقل ۸ کاراکتر باشد.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-5"
                >
                    <AuthInput
                        id="newPassword"
                        label="رمز عبور جدید"
                        type="password"
                        autoComplete="new-password"
                        placeholder="رمز عبور جدید"
                        registration={register("newPassword")}
                        error={errors.newPassword}
                    />

                    <AuthInput
                        id="confirmPassword"
                        label="تکرار رمز عبور"
                        type="password"
                        autoComplete="new-password"
                        placeholder="رمز عبور را دوباره وارد کنید"
                        registration={register("confirmPassword")}
                        error={errors.confirmPassword}
                    />

                    {serverError && (
                        <p role="alert" className="text-sm text-red-400">
                            {serverError}
                        </p>
                    )}

                    {serverMessage && (
                        <p role="status" className="text-sm text-primary">
                            {serverMessage}
                        </p>
                    )}

                    <div className="grid grid-cols-2 gap-3 pt-3">
                        <AuthButton
                            type="button"
                            disabled={isSubmitting}
                            onClick={onBack}
                        >
                            بازگشت
                        </AuthButton>

                        <AuthButton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "در حال تغییر..." : "تغییر رمز عبور"}
                        </AuthButton>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
