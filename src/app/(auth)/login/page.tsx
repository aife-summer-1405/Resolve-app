"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "@/src/components/organisms/auth/AuthLayout";
import SocialLogin from "@/src/components/organisms/auth/SocialLogin";
import AuthDivider from "@/src/components/organisms/auth/AuthDivider";
import AuthInput from "@/src/components/organisms/auth/AuthInput";
import AuthButton from "@/src/components/organisms/auth/AuthButton";
import { loginSchema, ILoginForm } from "@/src/schemas/auth/loginSchema";
import { actionLogin } from "@/src/actions/auth";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ILoginForm) => {
    setServerError("");

    try {
      const result = await actionLogin(data);

      if (result.success) {
        router.push("/");
        return;
      }

      setServerError(result.message || "ورود انجام نشد.");
    } catch {
      setServerError("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <AuthLayout>
      <div className="text-right">
        <div className="text-xs text-white/50">
          خانه ‹　<span className="text-primary">ورود به حساب کاربری</span>
        </div>

        <div className="mt-8 text-sm font-medium text-primary">
          !خوش برگشتی
          <Image
            className="absolute -mt-5 left-320"
            src="/icons/Group 34.png"
            alt="فلش"
            width={55}
            height={10}
          />
        </div>

        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
          !به خانواده دلتا، خوش برگشتی
        </h1>

        <p className="mt-5 text-sm leading-7 text-white/75">
          با وارد کردن اطلاعات خود به راحتی وارد پنل خودتون بشید و از
          پروژه‌هاتون خبر بگیرید!
        </p>

        <div
          dir="rtl"
          className="mt-8 grid grid-cols-2 gap-2 rounded-2xl bg-[#303030] p-1.5"
        >
          <Link
            href="/login"
            className="rounded-xl bg-[#91FF45] px-2 py-3 text-center text-sm font-medium text-[#222] shadow-[0_0_18px_#91ff4530]"
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
        <AuthDivider />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div dir="rtl" className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <AuthInput
              id="email"
              label="ایمیل شما"
              type="email"
              autoComplete="email"
              placeholder="مثال: name@email.com"
              registration={register("email")}
              error={errors.email}
            />

            <AuthInput
              id="password"
              label="کلمه عبور"
              type="password"
              autoComplete="current-password"
              placeholder="کلمه عبور خود را وارد کنید"
              registration={register("password")}
              error={errors.password}
            />
          </div>

          <div className="text-left">
            <Link
              href="/reset-password"
              className="text-[14px] text-white/80 transition hover:text-primary"
            >
              ← رمز عبور خود را فراموش کردم
            </Link>
          </div>

          {serverError && (
            <p role="alert" className="text-sm text-red-400">
              {serverError}
            </p>
          )}

          <div className="mt-8">
            <AuthButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "در حال ورود..." : "‹　ورود به حساب کاربری"}
            </AuthButton>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}