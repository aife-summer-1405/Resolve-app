
import AuthLayout from "@/src/components/auth/AuthLayout";
import SocialLogin from "@/src/components/auth/SocialLogin";
import AuthDivider from "@/src/components/auth/AuthDivider";
import AuthInput from "@/src/components/auth/AuthInput";
import AuthButton from "@/src/components/auth/AuthButton";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="text-right">
        <div className="text-xs text-white/50">
          خانه　 ‹　{" "}
          <span className="text-[#91FF45]">
            ساخت حساب کاربری
          </span>
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
          ! با وارد کردن اطلاعات خود به راحتی وارد پنل خودتون بشید و از پروژه هاتون خبر بگیرید 
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

        <form
          className="space-y-5"
          action="/verify"
          method="get"
        >
          <AuthInput
            id="email"
            label="ایمیل شما"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="مثال: name@email.com"
          />

          <div className="mt-8">
            <AuthButton>
              ارسال کد تأیید
            </AuthButton>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
