"use client";

import { ChevronDown, Megaphone, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface HeaderProps {
  isOverlay?: boolean;
}

const links = [
  { label: "رزرو سریع", href: "HouseReserve", hasMenu: true },
  { label: "رهن و اجاره", href: "rah", hasMenu: true },
  { label: "درباره دلتا", href: "#about" },
  { label: "مقالات ما", href: "#blog" },
  { label: "تماس با ما", href: "#contact" },
];

const Header = ({ isOverlay = false }: HeaderProps) => {
  const [activeLink, setActiveLink] = useState("");

  return (
    <header
      dir="rtl"
      className={`${
        isOverlay
          ? "absolute left-1/2 top-4 z-50 -translate-x-1/2"
          : "relative mx-auto mt-4"
      } flex h-12 w-full max-w-334 items-center justify-between rounded-2xl bg-[#363636] ps-2 pe-4 text-xs text-white shadow-[inset_-2px_2px_12px_0_rgba(255,255,255,0.16),0_8px_6px_0_rgba(0,0,0,0.12)]`}
    >
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
                  activeLink === item.href ? "w-full" : "w-0 group-hover:w-full"
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
  );
};

export default Header;
