"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/src/components/organisms/auth/AuthLayout";
import AuthButton from "@/src/components/organisms/auth/AuthButton";
import AuthDivider from "@/src/components/organisms/auth/AuthDivider";
import SocialLogin from "@/src/components/organisms/auth/SocialLogin";
import Link from "next/link";
import OtpInput from "@/src/components/organisms/auth/OtpInput";
import {
  actionResendOtp,
  actionVerifyOtp,
} from "@/src/actions/auth";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const [seconds, setSeconds] = useState(116);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = window.setInterval(() => {
      setSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [seconds]);

  const formatTime = (value: number) => {
    const minutes = Math.floor(value / 60);
    const remainingSeconds = value % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleVerify = async () => {
    if (!isOtpComplete || isSubmitting) return;

    setIsSubmitting(true);
    setServerError("");
    setMessage("");

    try {
      const result = await actionVerifyOtp({ otp });

      if (result.success) {
        router.push("/complete-register");
        return;
      }

      setServerError(result.message || "تأیید کد ناموفق بود.");
    } catch {
      setServerError("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (seconds > 0 || isResending) return;

    setIsResending(true);
    setServerError("");
    setMessage("");

    try {
      const result = await actionResendOtp();

      if (result.success) {
        setSeconds(116);
        setOtp("");
        setIsOtpComplete(false);
        setMessage(result.message || "کد جدید ارسال شد.");
      } else {
        setServerError(result.message || "ارسال مجدد کد ناموفق بود.");
      }
    } catch {
      setServerError("ارسال مجدد کد با خطا مواجه شد.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout>
      <div dir="rtl" className="text-right">
        <div className="text-xs text-white/50">
          خانه　 ‹　 <span className="text-[#91FF45]">تأیید حساب کاربری</span>
        </div>

        <div className="mt-7 text-sm font-medium text-[#91FF45]">
          به ما بپیوند!
        </div>

        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
          تأیید حساب کاربری
        </h1>

        <p className="mt-4 text-sm leading-7 text-white/75">
          کد تأییدی را که برای ایمیل شما ارسال شده وارد کنید.
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
            className="rounded-xl bg-[#91FF45] px-2 py-3 text-center text-sm font-medium text-[#222] shadow-[0_0_18px_#91ff4530]"
          >
            ساخت حساب کاربری
          </Link>
        </div>

        <SocialLogin />
        <AuthDivider text="یا می‌توانید" />

        <div className="mt-8 flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <OtpInput
              onChange={setOtp}
              onCompleteChange={setIsOtpComplete}
            />
          </div>

          <div className="shrink-0 rounded-xl bg-[#7862FF] px-3 py-3 text-sm text-white">
            <span>◷ </span>
            <span>{formatTime(seconds)}</span>
          </div>

          <button
            type="button"
            disabled={seconds > 0 || isResending}
            onClick={handleResend}
            className="shrink-0 rounded-xl border border-[#7862FF] bg-white px-3 py-3 text-xs text-[#222] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isResending
              ? "در حال ارسال..."
              : seconds > 0
                ? "ارسال مجدد"
                : "ارسال مجدد"}
          </button>
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

        <div className="mt-12 grid grid-cols-2 gap-3">
          <Link
            href="/register"
            className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/50 px-3 py-4 text-center text-xs font-medium text-white transition hover:border-[#91FF45] sm:text-sm"
          >
            <span>↻</span>
            تغییر ایمیل
          </Link>

          <AuthButton
            type="button"
            disabled={!isOtpComplete || isSubmitting}
            onClick={handleVerify}
          >
            {isSubmitting ? "در حال بررسی..." : "تأیید کد ‹"}
          </AuthButton>
        </div>
      </div>
    </AuthLayout>
  );
}