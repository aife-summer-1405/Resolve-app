"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, Clock3 } from "lucide-react";
import { IOffer } from "@/src/core/types/IOffer";

import Image from "next/image";
import OfferCard from "../../cards/OfferCard";

const OffersSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(6327);

  const offers: IOffer[] = [
    {
      id: "1",
      title: "آپارتمان لوکس زعفرانیه",
      image: "/images/offer.jpg",
      rating: 4.5,
      discount: 15,
      location: "زعفرانیه، تهران",
      amenities: "۲ خواب، ۴ نفر ظرفیت",
      originalPrice: 5000000,
      price: 4250000,
    },
    {
      id: "2",
      title: "آپارتمان لوکس زعفرانیه",
      image: "/images/offer.jpg",
      rating: 4.5,
      discount: 20,
      location: "زعفرانیه، تهران",
      amenities: "۲ خواب، ۴ نفر ظرفیت",
      originalPrice: 5000000,
      price: 4000000,
    },
    {
      id: "3",
      title: "آپارتمان لوکس زعفرانیه",
      image: "/images/offer.jpg",
      rating: 4.5,
      discount: 15,
      location: "زعفرانیه، تهران",
      amenities: "۲ خواب، ۴ نفر ظرفیت",
      originalPrice: 5000000,
      price: 4250000,
    },
    {
      id: "4",
      title: "آپارتمان لوکس زعفرانیه",
      image: "/images/offer.jpg",
      rating: 4.5,
      discount: 25,
      location: "زعفرانیه، تهران",
      amenities: "۲ خواب، ۴ نفر ظرفیت",
      originalPrice: 5000000,
      price: 3750000,
    },
    {
      id: "5",
      title: "آپارتمان لوکس زعفرانیه",
      image: "/images/offer.jpg",
      rating: 4.5,
      discount: 25,
      location: "زعفرانیه، تهران",
      amenities: "۲ خواب، ۴ نفر ظرفیت",
      originalPrice: 5000000,
      price: 3750000,
    },
    {
      id: "6",
      title: "آپارتمان لوکس زعفرانیه",
      image: "/images/offer.jpg",
      rating: 4.5,
      discount: 25,
      location: "زعفرانیه، تهران",
      amenities: "۲ خواب، ۴ نفر ظرفیت",
      originalPrice: 5000000,
      price: 3750000,
    },
    {
      id: "7",
      title: "آپارتمان لوکس زعفرانیه",
      image: "/images/offer.jpg",
      rating: 4.5,
      discount: 25,
      location: "زعفرانیه، تهران",
      amenities: "۲ خواب، ۴ نفر ظرفیت",
      originalPrice: 5000000,
      price: 3750000,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % offers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [offers.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value: number) =>
    String(value)
      .padStart(2, "0")
      .replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <section className="relative mx-auto mt-[75px] w-full max-w-[1376px] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[141px] -top-[151px] z-0 h-[218px] w-[218px] rounded-full bg-[#7569FF]/32 blur-[128px]"
      />
      <div className="absolute -top-[75px] right-0 z-10 h-[75px] w-[225px] rounded-t-[40px] bg-[#2D2D2D]">
        <span
          aria-hidden="true"
          className="absolute -left-10 bottom-0 h-10 w-10"
          style={{
            background:
              "radial-gradient(circle at 0 0, transparent 39px, #2D2D2D 40px)",
          }}
        />

        <div
          dir="ltr"
          className="absolute left-1/2 top-7 flex h-11 w-[149px] -translate-x-1/2 items-center justify-center gap-2 rounded-2xl bg-[#FF5964] text-white"
        >
          <Clock3 size={18} />

          <span className="text-[20px] font-semibold tabular-nums">
            {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
          </span>
        </div>
      </div>
      <div className="relative z-[1] overflow-hidden rounded-[40px] rounded-tr-none bg-[#2D2D2D] px-5 pb-8 pt-7 sm:px-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-[16px] font-medium text-[#8CFF45]">
            بهترین تخفیف
          </span>

          <Image src="/icons/Group 34.png" alt="آیکون" width={30} height={25} />
        </div>

        <div className="mb-10 flex items-center justify-between gap-4">
          <h2 className="text-[32px] font-light">
            پیشنهادهای <span className="font-semibold">ویژه</span> دلتا
          </h2>

          <button
            type="button"
            className="flex shrink-0 items-center gap-2 rounded-[14px] border border-white/60 px-4 py-2 text-sm transition hover:border-[#8CFF45] hover:text-[#8CFF45]"
          >
            <ChevronLeft size={14} />
            مشاهده همه
          </button>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex items-start gap-3 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(calc(${activeIndex} * (100% / 4 + 3px)))`,
            }}
          >
            {offers.map((offer, index) => (
              <div
                key={offer.id}
                className="w-[306px] min-w-[306px] shrink-0 lg:w-[calc((100%-36px)/4)] lg:min-w-0"
              >
                <OfferCard
                  offer={offer}
                  isActive={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {offers.map((offer, index) => (
            <button
              key={offer.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`انتخاب پیشنهاد ${index + 1}`}
              className="flex h-[10px] w-[10px] items-center justify-center"
            >
              {index === activeIndex ? (
                <span className="h-0 w-0 border-x-[5px] border-b-[8px] border-x-transparent border-b-[#8CFF45]" />
              ) : (
                <span className="h-[6px] w-[6px] rounded-full bg-white/70" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
