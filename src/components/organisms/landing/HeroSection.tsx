import { ChevronLeft, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/src/components/molecules/Header";
import Field from "../../Ui/Field";

const tabs = ["رزرو ملک", "رهن و اجاره", "خرید و فروش"];

const fields = [
  {
    label: "انتخاب مقصد:",
    placeholder: "استان، شهر، اقامتگاه ....",
    wide: true,
  },
  { label: "تاریخ ورود:", placeholder: "وارد کنید ...." },
  { label: "تاریخ خروج:", placeholder: "وارد کنید ...." },
  { label: "تعداد نفرات:", placeholder: "وارد کنید ...." },
];

export default function HeroSection() {
  return (
    <section className=" relative flex h-225.25 w-full flex-col items-center overflow-hidden bg-gradient-to-b from-[#85898c] via-[#666a6d] to-[#232323] px-2 pt-6 text-white">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-35 h-105 bg-gradient-to-t from-[#232323] via-[#232323]/80 to-transparent" />

      <div className="relative mt-6 h-196.25 w-321 max-w-full">
        <div className="absolute left-0 top-0 z-10 h-71.5 w-321">
          <Image src="/images/landing2.png" alt="DELTA" fill />
        </div>

        <div className="pointer-events-none absolute right-45 top-28.75 z-20 h-150 w-188.5">
          <Image src="/images/landingg1.png" alt="ساختمان مدرن" fill />
        </div>

        <div className="absolute right-235 top-68 z-30 w-95 space-y-4">
          <p className="text-[20px] font-normal text-white">
            رزرو، رهن، اجاره و حتی خرید و فروش ملک مورد
          </p>

          <div className="flex w-100 items-center justify-center gap-5">
            <p className="text-[20px] font-normal text-white">
              نظرتون مثل آب خوردن فقط در دلتا
            </p>
            <span className="block h-px w-32 bg-white" />
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="#search"
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-[#363636]"
            >
              آسون رزرو کن
              <ChevronLeft size={12} />
            </Link>

            <Link
              href="#rent"
              className="flex items-center gap-2 rounded-lg bg-[#363636] px-4 py-2 text-xs transition hover:bg-[#474747]"
            >
              رهن و اجاره ملک
              <ChevronLeft size={12} />
            </Link>
          </div>

          <div className="flex items-center gap-4 pt-6">
            <div>
              <p className="text-lg font-bold">+۸۵۰۰</p>
              <p className="text-[16px] text-white">
                منطقه برای رزرو، ویلا و کلبه ها
              </p>
            </div>

            <span className="h-10 w-px bg-white" />

            <div>
              <p className="text-lg font-bold">+۵۶۰۰</p>
              <p className="text-[16px] text-white">
                ملک برای رزرو و رهن اجاره
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-80 z-30 flex flex-col gap-2">
          <div>
            <Image
              src="/images/Group 9940.png"
              alt="مشتری"
              width={100}
              height={50}
            />
          </div>

          <div className="text-white">
            <p className="text-[32px] font-semibold">بیش از ۷۰۰۰ +</p>
            <p className="text-[20px] font-normal">
              رضایت مشتریانی که به دلتا اعتماد کرده اند
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4.5 left-1/2 z-40 w-286.25 max-w-[calc(100%-16px)] -translate-x-1/2">
        <div className="mb-3 flex cursor-pointer items-center gap-4 pe-2 text-xs">
          <div className="flex h-6.25 w-23.75 items-center gap-3 border-l-1">
            <Image
              src="/icons/booking (1).png"
              alt="آیکون رزرو"
              width={20}
              height={20}
            />
            <p>رزرو ملک</p>
          </div>

          <div className="flex h-6.25 w-23.75 items-center gap-3 border-l-1">
            <Image
              src="/icons/house-building (1).png"
              alt="آیکون رهن و اجاره"
              width={20}
              height={20}
            />
            <p className="text-[#8C8C8C]">رهن و اجاره</p>
          </div>

          <div className="flex h-6.25 w-23.75 items-center gap-3">
            <Image
              src="/icons/money-check-edit.png"
              alt="آیکون خرید و فروش"
              width={20}
              height={20}
            />
            <p className="text-[#8C8C8C]">خرید و فروش</p>
          </div>
        </div>

        <div
          id="search"
          className="grid h-29.25 w-full grid-cols-[1.4fr_1fr_1fr_1fr_auto] items-center gap-3 rounded-3xl border border-white/10 bg-card p-4 shadow-xl backdrop-blur-md max-md:h-auto max-md:grid-cols-2"
        >
    {fields.map((field) => (
  <Field key={field.label} legend={field.label}>
    <input
      type="text"
      placeholder={field.placeholder}
      className={`w-full min-w-0 bg-transparent text-xs text-foreground outline-none ${
        field.wide
          ? "placeholder:text-foreground"
          : "placeholder:text-muted"
      }`}
    />
  </Field>
))}

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-[#91FF45] px-7 py-4 text-xs font-bold text-black transition hover:opacity-90"
          >
            <Search size={14} />
            جستجو کن
          </button>
        </div>
      </div>
    </section>
  );
}
