"use client";

import { useState } from "react";

type IResetPasswordStep =
  | "request-resetcode"
  | "verifyreset-code"
  | "reset-password";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<IResetPasswordStep>(
    "request-resetcode"
  );

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <main className="mx-auto w-full max-w-md p-6">
      {step === "request-resetcode" && (
        <section className="space-y-4">
          <h1 className="text-xl font-bold">فراموشی رمز عبور</h1>

          <p className="text-sm text-muted">
            ایمیل خود را وارد کنید تا کد تأیید برای شما ارسال شود.
          </p>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="ایمیل"
            className="w-full rounded-xl border border-border bg-card p-3"
          />

          <button
            type="button"
            onClick={() => setStep("verifyreset-code")}
            className="w-full rounded-xl bg-primary p-3 font-semibold text-black"
          >
            ارسال کد تأیید
          </button>
        </section>
      )}

      {step === "verifyreset-code" && (
        <section className="space-y-4">
          <h1 className="text-xl font-bold">تأیید ایمیل</h1>

          <p className="text-sm text-muted">
            کد ارسال‌شده به ایمیل {email} را وارد کنید.
          </p>

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={verificationCode}
            onChange={(event) =>
              setVerificationCode(event.target.value.replace(/\D/g, ""))
            }
            placeholder="کد تأیید"
            className="w-full rounded-xl border border-border bg-card p-3"
          />

          <button
            type="button"
            onClick={() => setStep("request-resetcode")}
            className="w-full rounded-xl border border-border p-3"
          >
            بازگشت
          </button>

          <button
            type="button"
            onClick={() => setStep("reset-password")}
            disabled={verificationCode.length !== 6}
            className="w-full rounded-xl bg-primary p-3 font-semibold text-black disabled:opacity-50"
          >
            تأیید کد
          </button>
        </section>
      )}

      {step === "reset-password" && (
        <section className="space-y-4">
          <h1 className="text-xl font-bold">تعیین رمز عبور جدید</h1>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="رمز عبور جدید"
            className="w-full rounded-xl border border-border bg-card p-3"
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="تکرار رمز عبور"
            className="w-full rounded-xl border border-border bg-card p-3"
          />

          <button
            type="button"
            onClick={() => setStep("verifyreset-code")}
            className="w-full rounded-xl border border-border p-3"
          >
            بازگشت
          </button>

          <button
            type="button"
            disabled={
              password.length < 8 ||
              password !== confirmPassword
            }
            className="w-full rounded-xl bg-primary p-3 font-semibold text-black disabled:opacity-50"
          >
            تغییر رمز عبور
          </button>
        </section>
      )}
    </main>
  );
}