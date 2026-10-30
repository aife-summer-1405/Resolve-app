"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "@/src/components/organisms/auth/AuthLayout";
import SocialLogin from "@/src/components/organisms/auth/SocialLogin";
import AuthDivider from "@/src/components/organisms/auth/AuthDivider";
import AuthButton from "@/src/components/organisms/auth/AuthButton";
import AuthInput from "@/src/components/organisms/auth/AuthInput";
import Link from "next/link";
import Image from "next/image";
import { actionRegister } from "@/src/actions/authActions";
import { IRegisterForm, registerSchema } from "@/src/schemas/auth/registerSchema";

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: IRegisterForm) => {
    setServerError("");

    try {
      const result = await actionRegister(data);

      if (result.success) {
        router.push("/verify");
        return;
      }

      setServerError(result.message || "ارسال کد تأیید انجام نشد.");
    } catch {
      setServerError("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <AuthLayout>
      <div className="text-right">
        <div className="text-xs text-white/50">
          خانه　 ‹　 <span className="text-[#91FF45]">ساخت حساب کاربری</span>
        </div>

        <div className="mt-8 text-sm font-medium text-[#91FF45]">
          !به ما بپیوند
          <Image
            className="absolute -mt-5 left-320"
            src="/icons/Group%2034.png"
            alt="فلش"
            width={55}
            height={10}
          />
        </div>

        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
          !به خانواده دلتا، خوش برگشتی
        </h1>

        <p className="mt-5 text-sm leading-7 text-white/75">
          با وارد کردن اطلاعات خود به راحتی وارد پنل خودتون بشید و از پروژه‌هاتون خبر بگیرید!
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
        <AuthDivider />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

          <div className="mt-8">
            <AuthButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "در حال ارسال..." : "ارسال کد تأیید"}
            </AuthButton>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}