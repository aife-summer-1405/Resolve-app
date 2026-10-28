import { ChevronLeft, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Field from "../../Ui/Field";
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
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-gradient-to-b from-[#85898c] via-[#666a6d] to-[#232323] px-4 pt-20 text-white xl:h-225.25 xl:px-2 xl:pt-6">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-35 h-48 bg-gradient-to-t from-[#232323] via-[#232323]/80 to-transparent xl:h-105" />

      <div className="relative mt-4 flex w-full max-w-321 flex-col items-center xl:mt-6 xl:block xl:h-196.25">
        <div className="relative aspect-1284/286 w-full overflow-hidden md:aspect-auto md:h-[715px] xl:contents">
          <div className="absolute inset-x-0 top-0 z-10 h-full md:h-[286px] xl:left-0 xl:h-71.5 xl:w-321">
            <Image
              src="/images/landing2.png"
              alt="DELTA"
              fill
              sizes="(min-width: 1280px) 1284px, 100vw"
              className="object-contain object-top xl:object-fill"
            />
          </div>

          <div className="pointer-events-none absolute left-1/2 top-[115px] z-20 hidden h-[600px] w-[754px] max-w-none -translate-x-1/2 md:block xl:left-auto xl:right-45 xl:top-28.75 xl:h-150 xl:w-188.5 xl:translate-x-0">
            <Image
              src="/images/landingg1.png"
              alt="ساختمان مدرن"
              fill
              sizes="754px"
            />
          </div>
        </div>

        <div className="relative z-30 mt-4 w-full max-w-md space-y-4 text-center xl:absolute xl:right-235 xl:top-68 xl:mt-0 xl:w-95 xl:max-w-none xl:text-start">
          <p className="text-base font-normal text-white sm:text-lg xl:text-[20px]">
            رزرو، رهن، اجاره و حتی خرید و فروش ملک مورد
          </p>

          <div className="flex w-full items-center justify-center gap-5 xl:w-100">
            <p className="text-base font-normal text-white sm:text-lg xl:text-[20px]">
              نظرتون مثل آب خوردن فقط در دلتا
            </p>
            <span className="hidden h-px w-32 bg-white sm:block" />
          </div>

          <div className="flex flex-wrap justify-center gap-3 xl:justify-start">
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

          <div className="hidden items-center justify-center gap-4 pt-4 sm:flex xl:justify-start xl:pt-6">
            <div>
              <p className="text-lg font-bold">+۸۵۰۰</p>
              <p className="text-sm text-white xl:text-[16px]">
                منطقه برای رزرو، ویلا و کلبه ها
              </p>
            </div>

            <span className="h-10 w-px shrink-0 bg-white" />

            <div>
              <p className="text-lg font-bold">+۵۶۰۰</p>
              <p className="text-sm text-white xl:text-[16px]">
                ملک برای رزرو و رهن اجاره
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-30 mt-8 hidden flex-col items-center gap-2 text-center md:flex xl:absolute xl:top-80 xl:mt-0 xl:items-stretch xl:text-start">
          <div>
            <Image
              src="/images/Group 9940.png"
              alt="مشتری"
              width={100}
              height={50}
            />
          </div>

          <div className="text-white">
            <p className="text-2xl font-semibold sm:text-3xl xl:text-[32px]">
              بیش از ۷۰۰۰ +
            </p>
            <p className="text-base font-normal xl:text-[20px]">
              رضایت مشتریانی که به دلتا اعتماد کرده اند
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-40 mt-8 w-full max-w-286.25 pb-6 xl:absolute xl:bottom-4.5 xl:left-1/2 xl:mt-0 xl:w-286.25 xl:max-w-[calc(100%-16px)] xl:-translate-x-1/2 xl:pb-0">
        <div className="mb-3 flex cursor-pointer items-center gap-4 pe-2 text-xs max-sm:overflow-x-auto">
          <div className="flex h-6.25 w-23.75 shrink-0 items-center gap-3 border-l">
            <Image
              src="/icons/booking (1).png"
              alt="آیکون رزرو"
              width={20}
              height={20}
            />
            <p>رزرو ملک</p>
          </div>

          <div className="flex h-6.25 w-23.75 shrink-0 items-center gap-3 border-l">
            <Image
              src="/icons/house-building (1).png"
              alt="آیکون رهن و اجاره"
              width={20}
              height={20}
            />
            <p className="text-[#8C8C8C]">رهن و اجاره</p>
          </div>

          <div className="flex h-6.25 w-23.75 shrink-0 items-center gap-3">
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
          className="grid w-full grid-cols-1 items-center gap-3 rounded-3xl border border-white/10 bg-card p-4 shadow-xl backdrop-blur-md sm:grid-cols-2 sm:[&>*:first-child]:col-span-2 lg:h-29.25 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:[&>*:first-child]:col-span-1"
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
            className="flex items-center justify-center gap-2 rounded-xl bg-[#91FF45] px-7 py-4 text-xs font-bold text-black transition hover:opacity-90"
          >
            <Search size={14} />
            جستجو کن
          </button>
        </div>
      </div>
    </section>
  );
}
