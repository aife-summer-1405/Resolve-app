"use client";

import {
  ChevronDown,
  Megaphone,
  User,
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Languages,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/src/hooks/useUser";
import { logoutAction } from "@/src/actions/authActions";
import { useUserData } from "@/src/providers/UserDataContextProvider";

interface IHeaderProps {
  isOverlay?: boolean;
}

const Header = ({ isOverlay = false }: IHeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Header");
  const queryClient = useQueryClient();

  const { data: user } = useUser();
    const { userlogin, setUserLogin } = useUserData();

  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isPending, startTransition] = useTransition();

  const links = [
    { label: t("quickReserve"), href: "/HouseReserve", hasMenu: true },
    { label: t("mortgage"), href: "/Mortgage", hasMenu: true },
    { label: t("articles"), href: "/Articles" },
    { label: t("contact"), href: "/ContactUs" },
  ];

  useEffect(() => {
    const darkMode = document.documentElement.classList.contains("dark");

    setIsDark(darkMode);
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [pathname]);

  const isActiveLink = (href: string) => {
    const normalizedHref = href.split("#")[0];

    if (!normalizedHref || normalizedHref === "/") {
      return pathname === "/";
    }

    return (
      pathname === normalizedHref ||
      pathname?.startsWith(`${normalizedHref}/`)
    );
  };

  const toggleTheme = () => {
    const nextTheme = !isDark;

    document.documentElement.classList.toggle("dark", nextTheme);
    document.documentElement.style.colorScheme = nextTheme ? "dark" : "light";

    setIsDark(nextTheme);
  };

  const toggleLanguage = () => {
    const nextLocale = locale === "fa" ? "en" : "fa";

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    startTransition(() => {
      router.refresh();
    });
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      await logoutAction();

      queryClient.clear();
      
      setUserLogin(false);
      router.replace("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const avatar = user?.user.profilePicture || "/images/user.png";

  return (
    <header
      className={`fixed left-1/2 top-3 z-50 flex h-12 w-[calc(100%-24px)] max-w-[1440px] -translate-x-1/2 items-center justify-between rounded-2xl bg-card ps-2 pe-3 text-xs text-foreground shadow-md sm:top-4 sm:pe-4`}
    >
      <div className="flex h-full min-w-0 items-center gap-2 sm:gap-5">
        <Link
          href="/"
          aria-label="Delta"
          className="block h-8 w-14 shrink-0 rounded-lg bg-surface sm:w-19"
        />

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition hover:bg-primary hover:text-black lg:hidden"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <span className="hidden h-6 w-px bg-border/30 lg:block" />

        <nav className="hidden h-full items-center gap-3 lg:flex xl:gap-6 2xl:gap-8">
          {links.map((item) => {
            const isActive = isActiveLink(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex h-full shrink-0 items-center gap-1.5 border-b-[3px] pt-[3px] transition-colors duration-300 xl:gap-3 ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground/80 hover:border-primary hover:text-primary"
                }`}
              >
                {item.label}

                {item.hasMenu && <ChevronDown size={14} />}

                <span
                  className={`absolute -bottom-0.75 start-0 h-0.75 bg-primary transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          href="/seller"
          className="hidden h-8 shrink-0 items-center gap-1 rounded-lg bg-timer px-2.5 text-[10px] font-semibold text-white transition hover:opacity-90 sm:gap-2 sm:px-4 sm:text-xs lg:flex"
        >
          <Megaphone size={16} />
          <span className="whitespace-nowrap">{t("becomeSeller")}</span>
        </Link>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-4">
        <button
          type="button"
          onClick={toggleLanguage}
          disabled={isPending}
          title={t("changeLanguage")}
          className="flex h-8 items-center justify-center gap-1 rounded-xl border border-border bg-surface px-2 text-foreground transition hover:bg-primary hover:text-black sm:h-9"
        >
          <Languages size={17} />
          <span className="text-[10px] font-semibold sm:text-xs">
            {locale === "fa" ? "EN" : "FA"}
          </span>
        </button>

        {mounted && (
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t("enableLightMode") : t("enableDarkMode")}
            title={isDark ? t("lightMode") : t("darkMode")}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition hover:bg-primary hover:text-black sm:h-9 sm:w-9"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

        {user ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              aria-expanded={isProfileMenuOpen}
              aria-label={t("profileMenu")}
              className="flex items-center gap-1.5 rounded-xl p-1 transition hover:bg-surface sm:gap-2"
            >
              <img
                src={avatar}
                alt={t("profileImage")}
                className="h-8 w-8 rounded-full border border-border object-cover sm:h-9 sm:w-9"
              />

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isProfileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute end-0 top-full z-[60] mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card p-2 text-foreground shadow-lg">
                <div className="mb-2 border-b border-border px-3 py-2">
                  <p className="truncate text-sm font-semibold">
                    {user.user.firstName || t("user")} {user.user.lastName || t("user")}
                  </p>
                  <p className="truncate text-xs text-muted">{user.user.email}</p>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 transition hover:bg-surface hover:text-primary"
                >
                  <LayoutDashboard size={16} />
                  {t("dashboard")}
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-start text-red-500 transition hover:bg-surface disabled:opacity-50"
                >
                  <LogOut size={16} />
                  {isLoggingOut ? t("loggingOut") : t("logout")}
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="flex shrink-0 items-center gap-1 font-medium text-foreground transition hover:text-primary sm:gap-2"
          >
            <User size={16} />
            <span className="whitespace-nowrap text-[10px] sm:text-xs">
              {t("login")}
            </span>
          </Link>
        )}
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="absolute start-0 top-[calc(100%+8px)] z-50 flex w-full flex-col gap-1 rounded-2xl border border-border bg-card p-3 text-foreground shadow-lg lg:hidden"
        >
          {links.map((item) => {
            const isActive = isActiveLink(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex min-h-11 items-center justify-between rounded-xl px-3 py-2 transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-surface hover:text-primary"
                }`}
              >
                <span>{item.label}</span>
                {item.hasMenu && <ChevronDown size={16} />}
              </Link>
            );
          })}

          <Link
            href="/seller"
            onClick={() => setIsMenuOpen(false)}
            className="flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-foreground transition hover:bg-surface hover:text-primary"
          >
            <Megaphone size={16} />
            {t("becomeSeller")}
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;