
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import AuthLayout from "@/src/components/organisms/auth/AuthLayout";
import AuthButton from "@/src/components/organisms/auth/AuthButton";
import AuthInput from "@/src/components/organisms/auth/AuthInput";

import { actionRequestResetCode } from "@/src/actions/authActions";
import { IRequestResetCodeForm, requestResetCodeSchema } from "@/src/schemas/auth/requestResetCodeSchema";

interface IRequestResetCodeProps {
  onSuccess: (email: string) => void;
}

export default function RequestResetCode({
  onSuccess,
}: IRequestResetCodeProps) {
  const [serverError, setServerError] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRequestResetCodeForm>({
    resolver: zodResolver(requestResetCodeSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: IRequestResetCodeForm) => {
    setServerError("");
    setServerMessage("");

    try {
      const result = await actionRequestResetCode(data);

      if (result.success) {
        setServerMessage(result.message || "کد بازیابی ارسال شد.");
        onSuccess(data.email);
        return;
      }

      setServerError(
        result.message || "ارسال کد بازیابی انجام نشد."
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
          <span className="text-[#91FF45]">فراموشی رمز عبور</span>
        </div>

        <div className="relative mt-8 text-sm font-medium text-[#91FF45]">
          بازیابی حساب کاربری
          <Image
            className="absolute -top-2 left-0"
            src="/icons/Group%2034.png"
            alt="فلش"
            width={55}
            height={10}
          />
        </div>

        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
          رمز عبورت رو فراموش کردی؟
        </h1>

        <p className="mt-5 text-sm leading-7 text-white/75">
          ایمیلی که باهاش ثبت‌نام کردی وارد کن تا کد بازیابی رمز عبور
          برات ارسال بشه.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          <AuthInput
            id="email"
            label="ایمیل شما"
            type="email"
            autoComplete="email"
            placeholder="مثال: name@email.com"
            registration={register("email")}
            error={errors.email}
          />

          {serverError && (
            <p role="alert" className="text-sm text-red-400">
              {serverError}
            </p>
          )}

          {serverMessage && (
            <p role="status" className="text-sm text-[#91FF45]">
              {serverMessage}
            </p>
          )}

          <div className="pt-3">
            <AuthButton type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "در حال ارسال..."
                : "ارسال کد بازیابی"}
            </AuthButton>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-white/65">
          رمز عبورت رو به یاد آوردی؟{" "}
          <Link
            href="/login"
            className="font-medium text-[#91FF45] transition hover:text-[#a1ff60]"
          >
            ورود به حساب کاربری
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
