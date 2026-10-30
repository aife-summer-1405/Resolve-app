"use client";

import {
  Star,
  MessageSquareText,
  CalendarDays,
  ChevronLeft,
} from "lucide-react";

const reviews = [
  {
    id: 1,
    rating: 4.5,
    name: "محمد رضا ساداتی",
    date: "۱۲ مرداد ۱۴۰۱ - ۱۲:۳۳",
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله...",
    reply: {
      name: "محمد رضا ساداتی",
      date: "۱۲ مرداد ۱۴۰۱ - ۱۲:۳۳",
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله...",
    },
  },
  {
    id: 2,
    rating: 4.5,
    name: "محمد رضا ساداتی",
    date: "۱۲ مرداد ۱۴۰۱ - ۱۲:۳۳",
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله...",
    reply: {
      name: "محمد رضا ساداتی",
      date: "۱۲ مرداد ۱۴۰۱ - ۱۲:۳۳",
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله...",
    },
  },
];

export default function ReviewList() {
  return (
    <section dir="rtl" className="mt-7 w-full">
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="relative flex min-w-0 flex-col rounded-[18px] bg-[#363636] p-3 pt-8 sm:p-4 sm:pt-8"
          >
            {/* امتیاز نظر */}
            <div className="absolute -top-2 right-4 flex h-6 items-center gap-1 rounded-lg bg-white px-2 text-[11px] font-semibold text-[#222222]">
              <Star size={12} className="fill-current" />
              <span>{review.rating.toLocaleString("fa-IR")}</span>
            </div>

            <p className="min-h-[64px] text-justify text-[11px] leading-6 text-white/90 sm:text-xs">
              «{review.text}»
            </p>

            <div className="my-3 flex items-center gap-3">
              <button
                type="button"
                className="flex h-9 shrink-0 items-center gap-2 rounded-xl bg-[#7569FF] px-3 text-[11px] font-medium text-white transition hover:bg-[#6659ef]"
              >
                <span>پاسخ کاربران</span>
                <MessageSquareText size={14} />
              </button>

              <div className="h-[2px] flex-1 bg-white/75" />
            </div>

            <div className="mb-2 flex flex-wrap items-center gap-2 text-[9px] text-white/55">
              <span>{review.name}</span>

              <span className="h-3 w-px bg-white/40" />

              <CalendarDays size={11} />

              <span>{review.date}</span>
            </div>

            <p className="mb-3 min-h-[48px] text-justify text-[10px] leading-6 text-white/80">
              «{review.reply.text}»
            </p>
            <div className="mt-auto flex min-w-0 items-center gap-2 rounded-2xl bg-[#444444] p-2">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/80 text-base text-[#222222]">
                م
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-medium text-white">
                  {review.reply.name}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-1 text-[9px] text-white/50">
                  <CalendarDays size={10} />
                  <span>{review.reply.date}</span>
                </div>
              </div>
              <button
                type="button"
                className="flex h-8 shrink-0 items-center gap-1 rounded-xl border border-white/60 px-2 text-[10px] text-white transition hover:bg-white/10"
              >
                <ChevronLeft size={12} />
                <span>ثبت پاسخ</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-center gap-1.5">
        {[0, 1, 2, 3, 4].map((page) => (
          <button
            key={page}
            type="button"
            aria-label={`صفحه ${page + 1}`}
            className={`rounded-full transition-all ${
              page === 0
                ? "size-2 bg-[#91FF45]"
                : "size-1.5 bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
}