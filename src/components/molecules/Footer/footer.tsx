"use client";

import { useState } from "react";
import type { ReactNode, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

type NavLink = { label: string; href: string; active?: boolean };
type Status = "idle" | "loading" | "success" | "error";
type FieldProps = {
  legend: string;
  icon?: ReactNode;
  children: ReactNode;
  direction: "rtl" | "ltr";
};

const guideLinks: NavLink[] = [
  { label: "guide1", href: "#", active: true },
  { label: "guide2", href: "#" },
  { label: "guide3", href: "#" },
];

const serviceLinks: NavLink[] = [
  { label: "service1", href: "#" },
  { label: "service2", href: "#" },
  { label: "service3", href: "#" },
  { label: "service4", href: "#" },
];

const svgBase: SVGProps<SVGSVGElement> = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const InstagramIcon = () => (
  <svg {...svgBase}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg {...svgBase}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const socials = [
  {
    label: "whatsapp",
    href: "#",
    icon: <MessageCircle size={16} aria-hidden />,
  },
  { label: "telegram", href: "#", icon: <Send size={16} aria-hidden /> },
  { label: "instagram", href: "#", icon: <InstagramIcon /> },
  { label: "linkedin", href: "#", icon: <LinkedinIcon /> },
];

const inputCls =
  "w-full bg-transparent py-1 text-xs text-neutral-900 placeholder:text-neutral-700/70 focus:outline-none";

const linkCls =
  "inline-flex items-center gap-1.5 text-xs text-neutral-400 transition-colors hover:text-[#a6ff2e] focus-visible:text-[#a6ff2e] focus-visible:outline-none";

const activeLinkCls =
  "inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-neutral-900 transition-colors hover:bg-[#a6ff2e] focus-visible:bg-[#a6ff2e] focus-visible:outline-none";

const headingCls = "mb-4 text-sm font-bold text-white";

function Field({ legend, icon, children, direction }: FieldProps) {
  return (
    <fieldset
      className="rounded-xl border border-neutral-800/70 px-3 pb-2 pt-0 transition-colors focus-within:border-neutral-900 focus-within:ring-2 focus-within:ring-neutral-900/20"
      dir={direction}
    >
      <legend
        className="px-1.5 text-[0.7rem] font-medium text-neutral-800"
        dir={direction}
      >
        {legend}
      </legend>

      <div className="flex items-center gap-2">
        {children}
        {icon}
      </div>
    </fieldset>
  );
}

export default function Footer() {
  const [status, setStatus] = useState<Status>("idle");

  const locale = useLocale();
  const t = useTranslations("Footer");
  const isFa = locale === "fa";
  const direction = isFa ? "rtl" : "ltr";

  return (
    <footer dir={direction} className="mt-40 bg-[#a6ff2e]">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-4/5">
          <div
            className={`mx-auto flex items-center justify-between bg-[#171717] px-5 py-3 sm:px-8 md:w-full ${
              isFa ? "md:rounded-br-[28px]" : "md:rounded-bl-[28px]"
            }`}
          >
            <Link
              href="/"
              aria-label={t("logoAriaLabel")}
              className="flex items-end gap-2 text-white"
            >
              <Image
                src="/images/Group%20262.png"
                alt={t("logoAlt")}
                width={520}
                height={460}
                className="h-auto w-auto max-h-[80px] max-w-full object-contain"
              />
            </Link>
          </div>
        </div>

        <div className="m-auto">
          <a
            href="tel:+989129177846"
            className="mt-3 flex items-center gap-2 rounded-full bg-[#0d0e0d] px-5 py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90 sm:text-sm md:mt-0"
          >
            <Phone size={14} aria-hidden />
            <span>۰۹۱۲۹۱۷۷۸۴۶</span>
            <span aria-hidden>-</span>
            <span>۰۹۱۵۶۰۹۸۷۶</span>
          </a>
        </div>
      </div>

      <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-6 px-5 pt-8 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:pt-10">
        <div className="relative order-last flex w-full items-end justify-center overflow-hidden lg:order-first lg:justify-start">
          <Image
            src="/footerman.png"
            alt={t("consultantAlt")}
            width={520}
            height={460}
            sizes="(max-width: 639px) 75vw, (max-width: 1023px) 55vw, 520px"
            className="block h-auto w-full max-w-[280px] object-contain object-bottom sm:max-w-[340px] lg:max-w-[460px]"
          />
        </div>

        <div className={`pb-10 lg:pb-14 ${isFa ? "text-right" : "text-left"}`}>
          <p className="mb-3 gap-2 text-[0.7rem] font-medium text-neutral-900">
            <span
              className="size-1.5 rounded-full bg-neutral-900"
              aria-hidden
            />
            {t("alwaysWithYou")}
          </p>

          <h2 className="mb-3 text-xl font-extrabold leading-snug text-neutral-900 sm:text-2xl">
            {t("availabilityTitle")}
          </h2>

          <p
            className={`mb-7 text-xs leading-7 text-neutral-800 sm:text-[0.8rem] ${
              isFa ? "text-right" : "text-left"
            }`}
            dir={direction}
          >
            {t("description")}
          </p>

          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                legend={t("fullName")}
                direction={direction}
                icon={
                  <User
                    size={14}
                    className="shrink-0 text-neutral-900"
                    aria-hidden
                  />
                }
              >
                <input
                  name="fullName"
                  required
                  autoComplete="name"
                  placeholder={t("placeholder")}
                  className={inputCls}
                />
              </Field>

              <Field
                legend={t("phoneNumber")}
                direction={direction}
                icon={
                  <Phone
                    size={14}
                    className="shrink-0 text-neutral-900"
                    aria-hidden
                  />
                }
              >
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  required
                  autoComplete="tel"
                  placeholder={t("placeholder")}
                  className={inputCls}
                />
              </Field>
            </div>

            <Field
              legend={t("yourMessage")}
              direction={direction}
              icon={
                <MessageSquare
                  size={14}
                  className="mb-auto mt-2 shrink-0 text-neutral-900"
                  aria-hidden
                />
              }
            >
              <textarea
                name="message"
                rows={5}
                placeholder={t("placeholder")}
                className={`${inputCls} resize-none`}
              />
            </Field>

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#212121] py-2.5 text-xs font-bold text-white transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? t("sending") : t("sendMessage")}
              {isFa ? (
                <ChevronLeft size={14} aria-hidden />
              ) : (
                <ChevronRight size={14} aria-hidden />
              )}
            </button>

            <p
              role="status"
              aria-live="polite"
              className="min-h-5 text-center text-xs font-semibold text-neutral-900"
            >
              {status === "success" && t("successMessage")}
              {status === "error" && t("errorMessage")}
            </p>
          </form>
        </div>
      </div>

      <div className="relative z-10 -mt-20 px-4 pb-4 sm:px-6 sm:pb-4 lg:px-[17px] lg:pb-4">
        <div className="mx-auto w-full rounded-[32px] bg-[#171717] px-6 pb-4 pt-6 text-neutral-400 sm:px-8 sm:pb-5 sm:pt-7 lg:px-10">
          <div className="grid grid-cols-1 gap-8 pb-7 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
            <section className="sm:col-span-2 lg:col-span-1">
              <h3 className="mb-3.5 text-[1.35rem] font-extrabold text-white">
                {t("platformTitle")}
              </h3>

              <p className="max-w-[46ch] text-justify text-[0.78rem] leading-8">
                {t("platformDescription")}
              </p>

              <div className="mt-[18px] flex gap-2.5">
                <Image
                  src="/icons/z2%201.png"
                  alt={t("trustSymbol")}
                  width={40}
                  height={40}
                  className="size-10 object-contain"
                />

                <Image
                  src="/icons/T1_1591355889268%201%20(1).png"
                  alt={t("samandehi")}
                  width={40}
                  height={40}
                  className="size-10 object-contain"
                />

                <Image
                  src="/icons/file_20191206_1550_36991%201.png"
                  alt={t("nationalSymbol")}
                  width={40}
                  height={40}
                  className="size-10 object-contain"
                />
              </div>
            </section>

            <nav aria-label={t("guideTitle")}>
              <h4 className={headingCls}>{t("guideTitle")}</h4>

              <ul className="space-y-3">
                {guideLinks.map(({ label, href, active }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className={active ? activeLinkCls : linkCls}
                    >
                      {active &&
                        (isFa ? (
                          <ChevronLeft size={14} aria-hidden />
                        ) : (
                          <ChevronRight size={14} aria-hidden />
                        ))}
                      {t(label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={t("customerServices")}>
              <h4 className={headingCls}>{t("customerServices")}</h4>

              <ul className="space-y-3">
                {serviceLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className={linkCls}>
                      {t(label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <section>
              <h4 className={headingCls}>{t("contactTitle")}</h4>

              <ul className="space-y-3 text-xs leading-7">
                <li className="flex items-start gap-2">
                  <Phone
                    size={14}
                    aria-hidden
                    className="mt-1.5 shrink-0 text-white"
                  />
                  <a href="tel:+989120000000" dir="ltr">
                    0912 000 0000
                  </a>
                </li>

                <li className="flex items-start gap-2">
                  <Mail
                    size={14}
                    aria-hidden
                    className="mt-1.5 shrink-0 text-white"
                  />
                  <a href="mailto:Delta@gmail.com" dir="ltr">
                    Delta@gmail.com
                  </a>
                </li>

                <li className="flex items-start gap-2">
                  <MapPin
                    size={14}
                    aria-hidden
                    className="mt-1.5 shrink-0 text-white"
                  />
                  <span>{t("address")}</span>
                </li>
              </ul>
            </section>
          </div>

          <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-neutral-700 pt-[18px] text-center sm:flex-row sm:text-start">
            <p className="text-[0.72rem]">{t("copyright")}</p>

            <ul className="flex gap-2.5">
              {socials.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={t(label)}
                    className="grid size-8 place-items-center rounded-full border border-neutral-700 text-white transition-colors hover:border-[#a6ff2e] hover:bg-[#a6ff2e] hover:text-neutral-900 focus-visible:border-[#a6ff2e] focus-visible:bg-[#a6ff2e] focus-visible:text-neutral-900 focus-visible:outline-none"
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
