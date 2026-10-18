"use client";

import { useState } from "react";
import { ChevronDown, Megaphone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const [activeLink, setActiveLink] = useState("#search");

  const links = [
    { label: "رزرو سریع", href: "#search", hasMenu: true },
    { label: "رهن و اجاره", href: "#rent", hasMenu: true },
    { label: "درباره دلتا", href: "#about" },
    { label: "مقالات ما", href: "#blog" },
    { label: "تماس با ما", href: "#contact" },
  ];

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden
      bg-gradient-to-b from-[#85898c] via-[#666a6d] to-[#202020]
      px-2 pt-6 text-white flex flex-col items-center"
    >
      <header className="relative z-10 mx-auto flex h-12 w-full max-w-[1376px] items-center justify-between rounded-2xl bg-[#363636] ps-2 pe-4 text-xs text-white shadow-[inset_-2px_2px_12px_0_rgba(255,255,255,0.16),0_8px_6px_0_rgba(0,0,0,0.12)]">
        <div className="flex h-full items-center gap-5">
          <Link
            href="/"
            aria-label="دلتا"
            className="block h-8 w-[76px] rounded-lg bg-[#474747]"
          />

          <span className="h-6 w-px bg-white/20 max-md:hidden" />

          <nav className="flex h-full items-center gap-8 max-md:hidden">
            {links.map((value) => (
              <Link
                key={value.href}
                href={value.href}
                onClick={() => setActiveLink(value.href)}
                className={`group relative flex h-full items-center gap-3 border-b-[3px] pt-[3px] transition-colors duration-100 duration-300 ${
                  activeLink === value.href
                    ? "border-[#91FF45] text-[#91FF45]"
                    : "border-transparent text-white/80 hover:border-[#91FF45] hover:text-[#91FF45]"
                }`}
              >
                {value.label}
                {value.hasMenu && <ChevronDown size={14} />}

                <span
                  className={`absolute bottom-[-3px] right-0 h-[3px] bg-[#91FF45] transition-all duration-100 duration-300 ${
                    activeLink === value.href
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
        className="relative mx-auto mt-20 grid max-w-6xl
        grid-cols-2 items-center gap-8 max-md:grid-cols-1"
      >
        <div className="z-10 space-y-5">
          <h1 className="text-3xl font-bold">رزرو، رهن و اجاره ملک</h1>

          <p className="text-lg text-white/80">
            نظرتون مثل آب خوردن، فقط در دلتا
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#search"
              className="rounded-xl bg-lime-400 px-5 py-3
              font-semibold text-black transition hover:bg-lime-300"
            >
              آسون رزرو کن
            </a>

            <a
              href="#rent"
              className="rounded-xl border border-white/30
              px-5 py-3 transition hover:bg-white/10"
            >
              رهن و اجاره ملک
            </a>
          </div>
        </div>

        <div className="relative h-[675px] w-full">
          <Image src="/images/landingg1.png" alt="ساختمان مدرن" fill />
        </div>
      </div>

      <div
        id="search"
        className="relative z-10 mx-auto mt-10 grid max-w-5xl
        grid-cols-4 gap-4 rounded-3xl border border-white/10
        bg-[#292929]/95 p-5 shadow-xl
        max-md:grid-cols-2"
      >
        <input
          type="text"
          placeholder="انتخاب مقصد"
          className="min-w-0 rounded-xl border border-white/20
          bg-transparent p-3 outline-none focus:border-lime-400"
        />

        <input
          type="date"
          aria-label="تاریخ ورود"
          className="min-w-0 rounded-xl border border-white/20
          bg-transparent p-3 outline-none"
        />

        <input
          type="date"
          aria-label="تاریخ خروج"
          className="min-w-0 rounded-xl border border-white/20
          bg-transparent p-3 outline-none"
        />

        <button
          type="button"
          className="rounded-xl bg-lime-400 p-3
          font-bold text-black transition hover:bg-lime-300"
        >
          جستجو کن
        </button>
      </div>
    </section>
  );
}
