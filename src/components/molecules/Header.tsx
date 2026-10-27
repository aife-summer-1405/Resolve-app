
"use client";

import { ChevronDown, Megaphone, User, Sun, Moon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IHeaderProps {
  isOverlay?: boolean;
}

const links = [
  { label: "رزرو سریع", href: "/HouseReserve", hasMenu: true },
  { label: "رهن و اجاره", href: "/rah", hasMenu: true },
  { label: "درباره دلتا", href: "#about" },
  { label: "مقالات ما", href: "#blog" },
  { label: "تماس با ما", href: "#contact" },
];

const Header = ({ isOverlay = false }: IHeaderProps) => {
  const [activeLink, setActiveLink] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const darkMode = document.documentElement.classList.contains("dark");
    setIsDark(darkMode);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;

    document.documentElement.classList.toggle("dark", nextTheme);
    document.documentElement.style.colorScheme = nextTheme ? "dark" : "light";

    setIsDark(nextTheme);
  };

  return (
    <header
      dir="rtl"
      className={`${
        isOverlay
          ? "absolute left-1/2 top-4 z-50 -translate-x-1/2"
          : "relative mx-auto mt-4"
      } flex h-12 w-full max-w-334 items-center justify-between rounded-2xl bg-card ps-2 pe-4 text-xs text-foreground shadow-md`}
    >
      <div className="flex h-full items-center gap-5">
        <Link
          href="/"
          aria-label="دلتا"
          className="block h-8 w-19 rounded-lg bg-surface"
        />

        <span className="h-6 w-px bg-border/30 max-md:hidden" />

        <nav className="flex h-full items-center gap-8 max-md:hidden">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActiveLink(item.href)}
              className={`group relative flex h-full items-center gap-3 border-b-[3px] pt-[3px] transition-colors duration-300 ${
                activeLink === item.href
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/80 hover:border-primary hover:text-primary"
              }`}
            >
              {item.label}
              {item.hasMenu && <ChevronDown size={14} />}

              <span
                className={`absolute -bottom-0.75 right-0 h-0.75 bg-primary transition-all duration-300 ${
                  activeLink === item.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        <Link
          href="/seller"
          className="flex h-8 items-center gap-2 rounded-lg bg-timer px-4 font-semibold text-white transition hover:opacity-90"
        >
          <Megaphone size={16} />
          فروشنده شو!
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {mounted && (
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "فعال کردن لایت مود" : "فعال کردن دارک مود"}
            title={isDark ? "لایت مود" : "دارک مود"}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition hover:bg-primary hover:text-black"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

        <Link
          href="/login"
          className="flex items-center gap-2 font-medium text-foreground transition hover:text-primary"
        >
          <User size={16} />
          ورود / ثبت نام
        </Link>
      </div>
    </header>
  );
};

export default Header;
