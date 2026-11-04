"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import ArticleReviewCard from "./ArticleReviewCard";

const reviews = [
  {
    id: 1,
    caption:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردی.",
    name: "محمد رضا ساداتی",
    date: "۱۲ مرداد ۱۴۰۱",
    rating: 4.5,
  },
  {
    id: 2,
    caption:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردی.",
    name: "محمد رضا ساداتی",
    date: "۱۲ مرداد ۱۴۰۱",
    rating: 4.5,
  },
  {
    id: 3,
    caption:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.",
    name: "علی رضایی",
    date: "۱۵ مرداد ۱۴۰۱",
    rating: 5,
  },
  {
    id: 4,
    caption:
      "تجربه بسیار خوبی بود. مطالب مقاله کاربردی و مفید بودند و اطلاعات خوبی در اختیارم قرار دادند.",
    name: "سارا احمدی",
    date: "۱۸ مرداد ۱۴۰۱",
    rating: 4,
  },
];

export default function ArticleReviewList() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const updatePagination = (instance: SwiperType) => {
    const perView = Number(instance.params.slidesPerView) || 1;
    const perGroup = Number(instance.params.slidesPerGroup) || 1;

    const total = instance.slides.length;

    const pages = Math.max(
      1,
      Math.ceil((total - perView) / perGroup) + 1
    );

    const current = Math.min(
      Math.floor(instance.activeIndex / perGroup),
      pages - 1
    );

    setTotalPages(pages);
    setActiveIndex(instance.isEnd ? pages - 1 : current);
  };

  const goToPage = (index: number) => {
    if (!swiper) return;

    const perGroup = Number(swiper.params.slidesPerGroup) || 1;
    swiper.slideTo(index * perGroup);
  };

  return (
    <div className="flex w-full flex-col">
      <Swiper
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={16}
        breakpoints={{
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 16,
          },
        }}
        onSwiper={(instance) => {
          setSwiper(instance);
          updatePagination(instance);
        }}
        onSlideChange={updatePagination}
        onBreakpoint={updatePagination}
        onUpdate={updatePagination}
        className="w-full"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="h-auto">
            <ArticleReviewCard
              caption={review.caption}
              name={review.name}
              date={review.date}
              rating={review.rating}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-8 flex h-2 items-center justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToPage(index)}
            aria-label={`رفتن به صفحه ${index + 1}`}
            aria-current={activeIndex === index ? "page" : undefined}
            className={`size-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "bg-[#91FF45]"
                : "bg-[#D9D9D9]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}