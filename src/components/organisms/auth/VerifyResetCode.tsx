"use client";

import { useState } from "react";
import AuthLayout from "@/src/components/organisms/auth/AuthLayout";
import AuthButton from "@/src/components/organisms/auth/AuthButton";
import AuthDivider from "@/src/components/organisms/auth/AuthDivider";
import SocialLogin from "@/src/components/organisms/auth/SocialLogin";
import OtpInput from "@/src/components/organisms/auth/OtpInput";
import { actionVerifyResetCode } from "@/src/actions/authActions";
import Link from "next/link";
import { IVerifyResetCodeProps } from "@/src/types/AuthType/Authtype";

export default function VerifyResetCode({
  email,
  onSuccess,
  onBack,
}: IVerifyResetCodeProps) {
  const [code, setCode] = useState("");
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    if (!isCodeComplete || isSubmitting) return;

    setIsSubmitting(true);
    setServerError("");
    setMessage("");

    try {
      const result = await actionVerifyResetCode({
        email,
        code,
      });

      if (result.success) {
        onSuccess(code);
        return;
      }

      setServerError(result.message || "تأیید کد بازیابی ناموفق بود.");
    } catch {
      setServerError("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
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
          تأیید کد بازیابی
        </h1>

        <p className="mt-4 text-sm leading-7 text-white/75">
          کد ارسال‌شده به ایمیل زیر را وارد کنید.
        </p>

        <p dir="ltr" className="mt-2 break-all text-sm text-[#91FF45]">
          {email}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-2 rounded-2xl bg-[#303030] p-1.5">
          <Link
            href="/login"
            className="rounded-xl px-2 py-3 text-center text-sm text-white/65 transition hover:text-white"
          >
            ورود به حساب کاربری
          </Link>

          <Link
            href="/register"
            className="rounded-xl px-2 py-3 text-center text-sm text-white/65 transition hover:text-white"
          >
            ساخت حساب کاربری
          </Link>
        </div>

        <SocialLogin />
        <AuthDivider text="یا می‌توانید" />

        <div className="mt-8">
          <OtpInput onChange={setCode} onCompleteChange={setIsCodeComplete} />
        </div>

        {serverError && (
          <p role="alert" className="mt-4 text-sm text-red-400">
            {serverError}
          </p>
        )}

        {message && (
          <p role="status" className="mt-4 text-sm text-[#91FF45]">
            {message}
          </p>
        )}

        <div className="mt-10 grid grid-cols-2 gap-3">
          <AuthButton type="button" onClick={onBack} disabled={isSubmitting}>
            بازگشت
          </AuthButton>

          <AuthButton
            type="button"
            onClick={handleVerify}
            disabled={!isCodeComplete || isSubmitting}
          >
            {isSubmitting ? "در حال بررسی..." : "تأیید کد"}
          </AuthButton>
        </div>
      </div>
    </AuthLayout>
  );
}
