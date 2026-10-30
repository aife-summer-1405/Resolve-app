"use client";

import React from "react";
import { AtSign, ChevronLeft, MapPin, PhoneCallIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ContactUsPage = () => {
  return (
    <main
      dir="rtl"
      className=" w-full overflow-hidden py-20 text-white md:px-8"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex items-center justify-start gap-2 text-[11px]">
          <Link
            href="/"
            className="cursor-pointer text-white/50 transition hover:text-[#8CFF45]"
          >
            خانه
          </Link>

          <ChevronLeft size={12} className="text-white/40" />

          <span className="text-[#8CFF45]">ارتباط با ما</span>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <section className="flex flex-col items-start">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-[16px] font-medium text-[#8CFF45]">
                ارتباط با ما
              </span>

              <Image
                src="/icons/Group 34.png"
                alt="آیکون"
                width={30}
                height={25}
              />
            </div>

            <p className="mb-8 text-right text-[13px] leading-8 text-white/80">
              هر ساعت از شبانه روز که باشه تیم پشتیبانی دلتا پاسخگوی سوالات و
              انتقادات شما هستند تا در سریع‌ترین وقت مشکلتان را حل کنیم!
            </p>

            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex h-[49px] w-[320px] items-center justify-start gap-2 pr-5 rounded-[16px] bg-[#303030] text-[13px] text-[#AAAAAA]">
                <PhoneCallIcon size={16} className="-rotate-100" />
                <span>۰۹۲۲۴۶۱۷۹۴ - ۰۵۸۴۶۱۲۱۳۳۰</span>
              </div>

              <div className="flex h-[49px] w-[233px] items-center justify-start gap-2 pr-5 rounded-[16px] bg-[#303030] text-[13px] text-[#AAAAAA]">
                <AtSign size={16} />
                <span>Delta@gmail.com</span>
              </div>

              <div className="flex h-[49px] w-[430px] items-center justify-start gap-2 pr-5 rounded-[16px] bg-[#303030] text-[13px] text-[#AAAAAA]">
                <MapPin size={16} />
                <span>گیلان، رشت، میدان آزادی، جنب چهارراه عظیمی زاده</span>
              </div>
            </div>
          </section>

          <section className="relative mx-auto w-full max-w-[550px]">
            <div className="absolute -inset-3 rounded-[32px] border border-[#444444] bg-[#333333]" />

            <div className="absolute -inset-1.5 rounded-[30px] border border-[#444444] bg-[#2B2B2B]" />

            <form
              onSubmit={(event) => event.preventDefault()}
              className="relative z-10 rounded-[24px] bg-[#191919] p-5 shadow-[0_10px_30px_#00000040]"
            >
              <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="relative">
                  <label
                    htmlFor="firstName"
                    className="absolute -top-[7px] right-4 z-10 bg-[#191919] px-2 text-[11px] text-white/50"
                  >
                    نام و نام خانوادگی:
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="محمد رضا ساداتی"
                    className="h-[48px] w-full rounded-xl border border-[#777777] bg-transparent px-4 text-right text-[12px] text-white outline-none transition focus:border-[#8CFF45]"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="email"
                    className="absolute -top-[7px] right-4 z-10 bg-[#191919] px-2 text-[11px] text-white/50"
                  >
                    ایمیل شما:
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Delta@gmail.com"
                    className="h-[48px] w-full rounded-xl border border-[#777777] bg-transparent px-4 text-right text-[12px] text-white outline-none transition focus:border-[#8CFF45]"
                  />
                </div>
              </div>

              <div className="relative mb-5">
                <label
                  htmlFor="message"
                  className="absolute -top-[7px] right-4 z-10 bg-[#191919] px-2 text-[11px] text-white/50"
                >
                  پیام شما:
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="h-[100px] w-full resize-none rounded-xl border border-[#777777] bg-transparent p-4 text-right text-[12px] text-white outline-none transition focus:border-[#8CFF45]"
                />
              </div>

              <button
                type="submit"
                className="flex h-[42px] w-full items-center justify-center gap-2 rounded-xl bg-[#8CFF45] text-[12px] font-medium text-[#222222] transition hover:bg-[#79E83A]"
              >
                <ChevronLeft size={15} />
                ارسال درخواست
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ContactUsPage;
