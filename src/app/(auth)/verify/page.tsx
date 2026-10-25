"use client";

import AuthLayout from "@/src/components/organisms/auth/AuthLayout";
import AuthButton from "@/src/components/organisms/auth/AuthButton";
import AuthDivider from "@/src/components/organisms/auth/AuthDivider";
import SocialLogin from "@/src/components/organisms/auth/SocialLogin";
import Link from "next/link";
import OtpInput from "@/src/components/organisms/auth/OtpInput";

import { useState } from "react";
export default function VerifyPage() {
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  return (
    <AuthLayout>
      <div dir="rtl" className="text-right">
        <div className="text-xs text-white/50">
          خانه　 ‹　 <span className="text-[#91FF45]">ورود به حساب کاربری</span>
        </div>

        <div className="mt-7 text-sm font-medium text-[#91FF45]">
          خوش برگشتی!
        </div>

        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
          به خانواده دلتا، خوش برگشتی!
        </h1>

        <p className="mt-4 text-sm leading-7 text-white/75">
          با وارد کردن اطلاعات خود به راحتی وارد پنل خودتون بشید و از پروژه
          هاتون خبر بگیرید !
        </p>

        <div
          dir="rtl"
          className="mt-8 grid grid-cols-2 gap-2 rounded-2xl bg-[#303030] p-1.5"
        >
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

        <AuthDivider text=" یا میتونید " />

        <div className="mt-8 flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <OtpInput onCompleteChange={setIsOtpComplete} />
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-xl bg-[#7862FF] px-3 py-3 text-sm text-white">
            <span>◷</span>
            <span>۱:۵۶</span>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-xl border border-[#7862FF] bg-white px-3 py-3 text-xs text-[#222222] transition hover:bg-gray-100"
          >
            ارسال مجدد
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3">
          <Link
            href="/register"
            className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/50 px-3 py-4 text-center text-xs font-medium text-white transition hover:border-[#91FF45] sm:text-sm"
          >
            <span>↻</span>
            تغییر ایمیل
          </Link>

          <div className="min-w-0">
            <Link
              href={isOtpComplete ? "/reset-password" : "#"}
              onClick={(event) => {
                if (!isOtpComplete) {
                  event.preventDefault();
                }
              }}
              aria-disabled={!isOtpComplete}
              className={!isOtpComplete ? "pointer-events-none opacity-50" : ""}
            >
              <AuthButton type="button">مرحله بعد ‹</AuthButton>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
