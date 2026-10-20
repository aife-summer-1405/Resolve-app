"use client";

import { useEffect, useState } from "react";
import { LucideCalendarDays, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    rating: "۴.۵",
    comment:
      "«لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربرد...»",
    name: "محمد رضا ساداتی",
    date: "۱۳ مرداد - ۱۴۰۴",
    time: "۱۲:۳۳",
  },
  {
    id: 2,
    rating: "۴.۵",
    comment:
      "«لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربرد...»",
    name: "محمد رضا ساداتی",
    date: "۱۳ مرداد - ۱۴۰۴",
    time: "۱۲:۳۳",
  },
  {
    id: 3,
    rating: "۵",
    comment:
      "«تجربه‌ی بسیار خوبی داشتم. فرایند استفاده از خدمات راحت بود و پشتیبانی هم به‌خوبی پاسخ‌گو بود.»",
    name: "علی رضایی",
    date: "۱۵ مرداد - ۱۴۰۴",
    time: "۱۰:۲۰",
  },
  {
    id: 4,
    rating: "۴.۸",
    comment:
      "«محیط کاربری ساده و قابل فهم است و به‌راحتی می‌توان خدمات مورد نیاز را پیدا کرد.»",
    name: "سارا محمدی",
    date: "۱۸ مرداد - ۱۴۰۴",
    time: "۱۶:۴۵",
  },
  {
    id: 5,
    rating: "۴.۸",
    comment:
      "«محیط کاربری ساده و قابل فهم است و به‌راحتی می‌توان خدمات مورد نیاز را پیدا کرد.»",
    name: "سارا محمدی",
    date: "۱۸ مرداد - ۱۴۰۴",
    time: "۱۶:۴۵",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount =
    typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 2;

  const totalSlides = Math.ceil(testimonials.length / visibleCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const visibleTestimonials = testimonials.slice(
    currentIndex * visibleCount,
    currentIndex * visibleCount + visibleCount,
  );

  return (
    <section className="relative w-full overflow-hidden px-5 py-8 text-white md:px-8 md:py-10">
      <div className="mx-auto max-w-343.5">
        <header className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex items-center gap-3">
            <Image
              src="/icons/Group 33.png"
              alt="آیکون"
              width={48}
              height={16}
            />

            <span className="text-[16px] font-medium text-[#8CFF45]">
              نظرا کاربران
            </span>

            <Image
              src="/icons/Group 34.png"
              alt="آیکون"
              width={48}
              height={16}
            />
          </div>

          <h2 className="text-[32px] font-medium leading-8 md:text-[22px]">
            رضایت شما اعتبار و ارزش دلتا را می‌سازد!
          </h2>

          <p className="mt-2 max-w-162.5 text-[16px] leading-5 text-white/80 md:text-[11px]">
            تیم دلتا با ارائه بهترین نیروهای خدماتی و سرویس‌های املاک سعی دارد
            تا بتواند در تمام لحظات کنار شما باشد.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-3">
          {visibleTestimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="relative mt-2 flex h-77.25 w-full min-w-0 flex-col rounded-[24px] bg-[#393939] px-3 pb-3 pt-10 md:max-w-169.5"
            >
              <div className="absolute right-4 top-[-15px] flex h-[32px] w-16.75 items-center justify-center gap-1 rounded-lg bg-white text-[#292929] shadow-md">
                <span className="text-[16px] font-semibold">
                  {testimonial.rating}
                </span>
                <Star size={20} fill="currentColor" strokeWidth={1.5} />
              </div>

              <p className="min-h-0 flex-1 px-1 text-right text-[20px] leading-[2.1] text-white/90">
                {testimonial.comment}
              </p>

              <div className="flex h-20.25 w-full shrink-0 items-center justify-between rounded-2xl bg-[#444444]">
                <div className="mr-5 flex items-center gap-2">
                  <div
                    className="h-14.25 w-14.25 shrink-0 rounded-xl bg-[#D9D9D9]"
                    aria-hidden="true"
                  />

                  <div className="text-right">
                    <h3 className="text-[16px] font-medium text-white">
                      {testimonial.name}
                    </h3>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[16px] text-[#AAAAAA]">
                      <LucideCalendarDays size={16} />
                      <span>{testimonial.date}</span>
                      <span>{testimonial.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className="mt-7 flex items-center justify-center gap-1.5"
          aria-label="صفحه‌های نظرات"
        >
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`رفتن به صفحه ${index + 1}`}
              className={
                index === currentIndex
                  ? "h-0 w-0 border-b-[7px] border-l-[4px] border-r-[4px] border-b-[#8CFF45] border-l-transparent border-r-transparent"
                  : "h-1.25 w-1.25 rounded-full bg-white"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
