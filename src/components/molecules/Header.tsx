"use client";

import { ChevronDown, Megaphone, User, Sun, Moon, Menu, X } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          ? "absolute left-1/2 top-3 z-50 -translate-x-1/2 sm:top-4"
          : "relative mx-auto mt-3 sm:mt-4"
      } flex h-12 w-[calc(100%-24px)] max-w-334 items-center justify-between rounded-2xl bg-card ps-2 pe-3 text-xs text-foreground shadow-md sm:pe-4`}
    >
      <div className="flex h-full min-w-0 items-center gap-2 sm:gap-5">
        <Link
          href="/"
          aria-label="دلتا"
          className="block h-8 w-14 shrink-0 rounded-lg bg-surface sm:w-19"
        />

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition hover:bg-primary hover:text-black lg:hidden"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <span className="hidden h-6 w-px bg-border/30 lg:block" />

        <nav className="hidden h-full items-center gap-3 lg:flex xl:gap-6 2xl:gap-8">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActiveLink(item.href)}
              className={`group relative flex h-full shrink-0 items-center gap-1.5 border-b-[3px] pt-[3px] transition-colors duration-300 xl:gap-3 ${
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
          className="flex h-8 shrink-0 items-center gap-1 rounded-lg bg-timer px-2.5 text-[10px] font-semibold text-white transition hover:opacity-90 sm:gap-2 sm:px-4 sm:text-xs"
        >
          <Megaphone size={16} />
          <span className="whitespace-nowrap">فروشنده شو!</span>
        </Link>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-4">
        {mounted && (
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "فعال کردن لایت مود" : "فعال کردن دارک مود"}
            title={isDark ? "لایت مود" : "دارک مود"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition hover:bg-primary hover:text-black sm:h-9 sm:w-9"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

        <Link
          href="/login"
          className="flex shrink-0 items-center gap-1 font-medium text-foreground transition hover:text-primary sm:gap-2"
        >
          <User size={16} />
          <span className="whitespace-nowrap text-[10px] sm:text-xs">
            ورود / ثبت نام
          </span>
        </Link>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 flex w-full flex-col gap-1 rounded-2xl border border-border bg-card p-3 text-foreground shadow-lg lg:hidden"
        >
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                setActiveLink(item.href);
                setIsMenuOpen(false);
              }}
              className={`flex min-h-11 items-center justify-between rounded-xl px-3 py-2 transition-colors ${
                activeLink === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:bg-surface hover:text-primary"
              }`}
            >
              <span>{item.label}</span>
              {item.hasMenu && <ChevronDown size={16} />}
            </Link>
          ))}

          <Link
            href="/seller"
            onClick={() => setIsMenuOpen(false)}
            className="flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-foreground transition hover:bg-surface hover:text-primary"
          >
            <Megaphone size={16} />
            فروشنده شو!
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
