"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  Megaphone,
  Search,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "رزرو سریع", href: "#search", hasMenu: true },
  { label: "رهن و اجاره", href: "#rent", hasMenu: true },
  { label: "درباره دلتا", href: "#about" },
  { label: "مقالات ما", href: "#blog" },
  { label: "تماس با ما", href: "#contact" },
];

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
  const [activeLink, setActiveLink] = useState("#search");
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      dir="rtl"
      className="relative flex h-225.25 w-full flex-col items-center overflow-hidden
      bg-gradient-to-b from-[#85898c] via-[#666a6d] to-[#232323]
      px-2 pt-6 text-white"
    >
      <header className="relative z-50 mx-auto flex h-12 w-full max-w-334 items-center justify-between rounded-2xl bg-[#363636] ps-2 pe-4 text-xs text-white shadow-[inset_-2px_2px_12px_0_rgba(255,255,255,0.16),0_8px_6px_0_rgba(0,0,0,0.12)]">
        <div className="flex h-full items-center gap-5">
          <Link
            href="/"
            aria-label="دلتا"
            className="block h-8 w-19 rounded-lg bg-[#474747]"
          />

          <span className="h-6 w-px bg-white/20 max-md:hidden" />

          <nav className="flex h-full items-center gap-8 max-md:hidden">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveLink(item.href)}
                className={`group relative flex h-full items-center gap-3 border-b-[3px] pt-[3px] transition-colors duration-300 ${
                  activeLink === item.href
                    ? "border-[#91FF45] text-[#91FF45]"
                    : "border-transparent text-white/80 hover:border-[#91FF45] hover:text-[#91FF45]"
                }`}
              >
                {item.label}
                {item.hasMenu && <ChevronDown size={14} />}

                <span
                  className={`absolute -bottom-0.75 right-0 h-0.75 bg-[#91FF45] transition-all duration-300 ${
                    activeLink === item.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <Link
            href="/seller"
            className="flex h-8 items-center gap-2 rounded-lg bg-[#7B6CFF] px-4 font-semibold transition hover:opacity-90"
          >
            <Megaphone size={16} />
            فروشنده شو!
          </Link>
        </div>

        <Link
          href="/login"
          className="flex items-center gap-2 font-medium transition hover:text-[#8CFF45]"
        >
          <User size={16} />
          ورود / ثبت نام
        </Link>
      </header>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-35 h-105
        bg-gradient-to-t from-[#232323] via-[#232323]/80 to-transparent"
      />
      <div className="relative mt-6 h-196.25 w-321 max-w-full">
        <div className="absolute left-0 top-0 z-10 h-71.5 w-321">
          <Image src="/images/landing2.png" alt="DELTA" fill />
        </div>

        <div className="pointer-events-none absolute right-45 top-28.75 z-20 h-150 w-188.5">
          <Image src="/images/landingg1.png" alt="ساختمان مدرن" fill />
        </div>

        <div className="absolute right-235 top-68 z-30 w-95 space-y-4">
          <p className="text-[20px] font-normal  text-white">
            رزرو، رهن، اجاره و حتی خرید و فروش ملک مورد
          </p>
          <div className=" flex w-100 justify-center items-center gap-5">
            <p className="text-[20px] font-normal  text-white ">
              نظرتون مثل آب خوردن فقط در دلتا
            </p>
            <span className="block h-px solid w-32 bg-white" />
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#search"
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-[#363636]"
            >
              آسون رزرو کن
              <ChevronLeft size={12} />
            </a>
            <a
              href="#rent"
              className="flex items-center gap-2 rounded-lg bg-[#363636] px-4 py-2 text-xs transition hover:bg-[#474747]"
            >
              رهن و اجاره ملک
              <ChevronLeft size={12} />
            </a>
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
            <p className="text-[32px] font-semibold ">بیش از ۷۰۰۰ +</p>
            <p className="text-[20px] font-normal">
              رضایت مشتریانی که به دلتا اعتماد کرده اند
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4.5 left-1/2 z-40 w-286.25 max-w-[calc(100%-16px)] -translate-x-1/2">
        <div className="mb-3 flex items-center gap-4 pe-2 text-xs cursor-pointer">
          <div className=" border-l-1  w-23.75 h-6.25 flex gap-3 items-center">
            <Image
              src="/icons/booking (1).png"
              alt="ایکن"
              width={20}
              height={20}
            />
            <p> رزرو ملک</p>
          </div>
          <div className=" border-l-1 w-23.75 h-6.25 flex gap-3 items-center ">
            <Image
              src="/icons/house-building (1).png"
              alt="ایکن"
              width={20}
              height={20}
            />
            <p className="text-[#8C8C8C]">رهن و اجاره</p>
          </div>
          <div className=" w-23.75 h-6.25 flex gap-3 items-center">
            <Image
              src="/icons/money-check-edit.png"
              alt="ایکن"
              width={20}
              height={20}
            />
            <p className="text-[#8C8C8C]"> خرید و فروش</p>
          </div>
        </div>
        <div
          id="search"
          className="grid h-29.25 w-full grid-cols-[1.4fr_1fr_1fr_1fr_auto] items-center gap-3
          rounded-3xl border border-white/10 bg-[#292929]/80 p-4
          shadow-xl backdrop-blur-md max-md:h-auto max-md:grid-cols-2"
        >
          {fields.map((field) => (
            <label
              key={field.label}
              className={`relative rounded-xl border px-3 py-3 ${
                field.wide ? "border-white/40" : "border-white/30"
              }`}
            >
              <span className="absolute -top-2 right-3 bg-[#2f2f2f] px-1 text-[10px] text-white">
                {field.label}
              </span>
              <input
                type="text"
                placeholder={field.placeholder}
                className={`w-full min-w-0 bg-transparent text-xs outline-none ${
                  field.wide
                    ? "placeholder:text-white"
                    : "placeholder:text-white/60"
                }`}
              />
            </label>
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
