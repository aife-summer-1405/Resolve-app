
import AuthLayout from "@/src/components/auth/AuthLayout";
import AuthButton from "@/src/components/auth/AuthButton";
import AuthInput from "@/src/components/auth/AuthInput";
import AuthDivider from "@/src/components/auth/AuthDivider";
import SocialLogin from "@/src/components/auth/SocialLogin";
import Link from "next/link";
import Image from "next/image";

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <div dir="rtl" className="text-right">
        <div className="text-xs text-white/50">
          خانه　 ‹　{" "}
          <span className="text-[#91FF45]">
            ورود به حساب کاربری
          </span>
        </div>

        <div className="relative mt-7 text-sm font-medium text-[#91FF45]">
          خوش برگشتی!
          <Image
            className="absolute -mt-5 left-105"
            src="/icons/Group%2034.png"
            alt=""
            width={55}
            height={10}
          />
        </div>

        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
          به خانواده دلتا، خوش برگشتی!
        </h1>

        <p className="mt-5 text-sm leading-7 text-white/75">
          با وارد کردن اطلاعات خود به راحتی وارد پنل خودتون بشید و از پروژه‌هاتون خبر بگیرید!
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

        <AuthDivider />

        <form
            action="/login"
            method="post"
            className="space-y-5"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <AuthInput
              id="phone"
              label="شماره تلفن"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="شماره تلفن خود را وارد کنید"
            />

            <AuthInput
              id="password"
              label="کلمه عبور"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="کلمه عبور خود را وارد کنید"
            />
          </div>

          <div className="pt-5">
            <AuthButton>
               ساخت حساب کاربری
            </AuthButton>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
