"use client";

import { useState } from "react";
import type { FormEvent, ReactNode, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ChevronLeft,
    Mail,
    MapPin,
    MessageCircle,
    MessageSquare,
    Phone,
    Send,
    Sparkle,
    User,
} from "lucide-react";

/* ───────────── تایپ‌ها ───────────── */
type NavLink = { label: string; href: string; active?: boolean };
type Status = "idle" | "loading" | "success" | "error";
type FieldProps = { legend: string; icon?: ReactNode; children: ReactNode };

/* ───────────── داده‌ها ───────────── */
const guideLinks: NavLink[] = [
    { label: "راهنمای ثبت آگهی", href: "#", active: true },
    { label: "شیوه پرداخت", href: "#" },
    { label: "نحوه رزرو آگهی", href: "#" },
];

const serviceLinks: NavLink[] = [
    { label: "پیشنهاد های مشتریان", href: "#" },
    { label: "پیشنهاد های شما", href: "#" },
    { label: "پیشنهاد های مشتری", href: "#" },
    { label: "شرایط خدمت", href: "#" },
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
    { label: "واتساپ", href: "#", icon: <MessageCircle size={16} aria-hidden /> },
    { label: "تلگرام", href: "#", icon: <Send size={16} aria-hidden /> },
    { label: "اینستاگرام", href: "#", icon: <InstagramIcon /> },
    { label: "لینکدین", href: "#", icon: <LinkedinIcon /> },
];

const inputCls =
    "w-full bg-transparent py-1 text-xs text-neutral-900 placeholder:text-neutral-700/70 focus:outline-none";
const linkCls =
    "inline-flex items-center gap-1.5 text-xs text-neutral-400 transition-colors hover:text-[#a6ff2e] focus-visible:text-[#a6ff2e] focus-visible:outline-none";
const activeLinkCls =
    "inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-neutral-900 transition-colors hover:bg-[#a6ff2e] focus-visible:bg-[#a6ff2e] focus-visible:outline-none";
const headingCls = "mb-4 text-sm font-bold text-white";

/* ───────────── فیلد با لیبل روی کادر ───────────── */
function Field({ legend, icon, children }: FieldProps) {
    return (
        <fieldset className="rounded-xl border border-neutral-800/70 px-3 pb-2 pt-0 transition-colors focus-within:border-neutral-900 focus-within:ring-2 focus-within:ring-neutral-900/20" dir="rtl">
            <legend className="px-1.5 text-[0.7rem] font-medium text-neutral-800" dir="rtl">{legend}</legend>
            <div className="flex items-center gap-2">
                {children}
                {icon}

            </div>
        </fieldset>
    );
}

export default function Footer() {
    const [status, setStatus] = useState<Status>("idle");


    return (
        <footer className="bg-[#a6ff2e]" >
            {/* ── نوار بالا: شماره‌ها و لوگو ── */}
            <div className="flex flex-col md:flex-row ">
                <div className="w-full  md:w-4/5">
                    <div className="mx-auto md:w-full flex  items-center justify-between md:rounded-br-[28px]  bg-[#212121] px-5 py-3 sm:px-8">


                        <Link
                            href="/"
                            dir="ltr"
                            aria-label="The Delta Real Estatement"
                            className="flex items-end gap-2 text-white"
                        >
                            <span className="pb-1 text-sm font-medium">The</span>
                            <span className="text-3xl font-black leading-none tracking-wide sm:text-4xl">DELTA</span>
                            <span className="pb-1 text-sm font-medium">Real Estatement</span>
                        </Link>
                    </div>
                </div>
 
                <div className="  m-auto">
                    <a
                        href="tel:+989129177846"
                        dir="ltr"
                        className="flex  items-center gap-2 mt-3 md:mt-0 rounded-full text-white bg-[#0d0e0d] px-4 py-1.5 text-xs font-bold text-neutral-900 transition-opacity hover:opacity-90 sm:text-sm"
                    >
                        <Phone size={14} aria-hidden />
                        <span>۰۹۱۲۹۱۷۷۸۴۶</span>
                        <span aria-hidden>-</span>
                        <span>۰۹۱۵۶۰۹۸۷۶</span>
                    </a>
                </div>
            </div>
            {/* ── بخش سبز: متن، فرم و عکس ── */}
            <div className="relative mx-auto grid w-full max-w-300 grid-cols-1 gap-6 px-5 pt-8 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:pt-10">


                <div className="order-first flex justify-center lg:order-0 lg:justify-start">
                    <Image
                        src="/footerman.png"
                        alt="مشاور دلتا"
                        width={520}
                        height={460}
                        className="h-auto max-h-85 w-auto object-contain lg:max-h-115"
                    />
                </div>

                <div className="pb-10 lg:pb-14 text-right">
                    <p className="mb-3  gap-2 text-[0.7rem] font-medium text-neutral-900">
                        <span className="size-1.5 rounded-full bg-neutral-900" aria-hidden />
                        همیشه کنارتیم
                    </p>

                    <h2 className="mb-3 text-xl font-extrabold leading-snug text-neutral-900 sm:text-2xl">
                        ۲۴ ساعت روز و ۷ روز هفته در اختیار شماییم!
                    </h2>

                    <p className="mb-7  text-xs leading-7 text-neutral-800 sm:text-[0.8rem] text-right" dir="rtl">
                        تیم دلتا با پایه بهترین نیروهای حضوری و سرویس‌های آنلاین، همیشه کنار شماست تا در تمام لحظات پاسخگو باشد.
                    </p>

                    <form className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                legend="نام و نام خانوادگی"
                                icon={<User size={14} className="shrink-0 text-neutral-900" aria-hidden />}
                            >
                                <input name="fullName" required autoComplete="name" placeholder="وارد کنید..." className={inputCls} />
                            </Field>

                            <Field
                                legend="شماره تلفن"
                                icon={<Phone size={14} className="shrink-0 text-neutral-900" aria-hidden />}
                            >
                                <input
                                    name="phone"
                                    type="tel"
                                    inputMode="tel"
                                    required
                                    autoComplete="tel"
                                    placeholder="وارد کنید..."
                                    className={inputCls}
                                />
                            </Field>
                        </div>

                        <Field
                            legend="پیام شما"
                            icon={<MessageSquare size={14} className="mb-auto mt-2 shrink-0 text-neutral-900" aria-hidden />}
                        >
                            <textarea name="message" rows={5} placeholder="وارد کنید..." className={`${inputCls} resize-none`} />
                        </Field>

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#212121] py-2.5 text-xs font-bold text-white transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {status === "loading" ? "در حال ارسال..." : "ارسال پیام"}
                            <ChevronLeft size={14} aria-hidden />
                        </button>

                        <p role="status" aria-live="polite" className="min-h-5 text-center text-xs font-semibold text-neutral-900">
                            {status === "success" && "پیام شما ارسال شد. به‌زودی با شما تماس می‌گیریم."}
                            {status === "error" && "ارسال پیام انجام نشد. لطفاً دوباره تلاش کنید."}
                        </p>
                    </form>
                </div>


            </div>

            <div className="px-3">
                <div className="mx-auto max-w-[1200px] rounded-t-[24px] bg-[#212121] px-5 pb-4 pt-7 text-neutral-400 sm:rounded-t-[32px] sm:px-10 sm:pt-9" dir="rtl">
                    <div className="grid grid-cols-1 gap-8 pb-7 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
                        {/* برند */}
                        <section className="sm:col-span-2 lg:col-span-1">
                            <h3 className="mb-3.5 text-[1.35rem] font-extrabold text-white">پلتفرم دلتا</h3>
                            <p className="max-w-[46ch] text-justify text-[0.78rem] leading-8">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و
                                متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
                            </p>
                            <div className="mt-[18px] flex gap-2.5">
                                <span className="size-10 rounded-[10px] bg-[#1e8be0]" role="img" aria-label="نماد اعتماد" />
                                <span className="size-10 rounded-[10px] bg-neutral-100" role="img" aria-label="ساماندهی" />
                                <span className="size-10 rounded-full bg-[#f5b82e]" role="img" aria-label="نماد ملی" />
                            </div>
                        </section>

                        <nav aria-label="راهنما">
                            <h4 className={headingCls}>نحوه رزرو آگهی</h4>
                            <ul className="space-y-3">
                                {guideLinks.map(({ label, href, active }) => (
                                    <li key={label}>
                                        <Link href={href} className={active ? activeLinkCls : linkCls}>
                                            {active && <ChevronLeft size={14} aria-hidden />}
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <nav aria-label="خدمات مشتریان">
                            <h4 className={headingCls}>خدمات مشتریان</h4>
                            <ul className="space-y-3">
                                {serviceLinks.map(({ label, href }) => (
                                    <li key={label}>
                                        <Link href={href} className={linkCls}>
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <section>
                            <h4 className={headingCls}>راه ارتباطی دلتا</h4>
                            <ul className="space-y-3 text-xs leading-7">
                                <li className="flex items-start gap-2">
                                    <Phone size={14} aria-hidden className="mt-1.5 shrink-0 text-white" />
                                    <a href="tel:+989120000000" dir="ltr">0912 000 0000</a>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Mail size={14} aria-hidden className="mt-1.5 shrink-0 text-white" />
                                    <a href="mailto:Delta@gmail.com" dir="ltr">Delta@gmail.com</a>
                                </li>
                                <li className="flex items-start gap-2">
                                    <MapPin size={14} aria-hidden className="mt-1.5 shrink-0 text-white" />
                                    <span>تهران، خیابان آزادی، جنب چهارراه مصیب‌زاده</span>
                                </li>
                            </ul>
                        </section>
                    </div>

                    <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-neutral-700 pt-[18px] text-center sm:flex-row sm:text-start">
                        <p className="text-[0.72rem]">تمام حقوق مادی و معنوی این اثر برای دلتا محفوظ است.</p>
                        <ul className="flex gap-2.5">
                            {socials.map(({ label, href, icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        aria-label={label}
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