"use client";

import { FC, useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { IDestination } from "@/src/core/types/IDestination";
import { IOffer } from "@/src/core/types/IOffer";
import DestinationCard from "../../cards/DestinationCard";
import OfferCard from "../../cards/OfferCard";

const PopularDestinationsSection: FC = () => {
  const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);
  const [activeOfferIndex, setActiveOfferIndex] = useState(3);

  const destinations: IDestination[] = [
    {
      id: "1",
      title: "اجاره ویلا در رامسر",
      image: "/images/destination1.jpg",
    },
    {
      id: "2",
      title: "اجاره ویلا در کردان",
      image: "/images/destination2.jpg",
    },
    {
      id: "3",
      title: "اجاره ویلا در کاشان",
      image: "/images/destination3.jpg",
    },
    {
      id: "4",
      title: "اجاره ویلا در شیراز",
      image: "/images/destination4.jpg",
    },
  ];

  const offers: IOffer[] = [
    {
      id: "1",
      title: "آپارتمان لوکس زعفرانیه",
      image: "/images/offer.jpg",
      rating: 4.5,
      discount: 20,
      location: "تهران، زعفرانیه",
      amenities: "۳ اتاق خواب",
      originalPrice: 2500000,
      price: 2000000,
    },
    {
      id: "2",
      title: "ویلای جنگلی نوشهر",
      image: "/images/offer.jpg",
      rating: 4.8,
      discount: 15,
      location: "مازندران، نوشهر",
      amenities: "۲ اتاق خواب",
      originalPrice: 3000000,
      price: 2550000,
    },
    {
      id: "3",
      title: "آپارتمان مدرن کردان",
      image: "/images/offer.jpg",
      rating: 4.6,
      discount: 25,
      location: "البرز، کردان",
      amenities: "۳ اتاق خواب",
      originalPrice: 4000000,
      price: 3000000,
    },
    {
      id: "4",
      title: "ویلای لوکس استخردار",
      image: "/images/offer.jpg",
      rating: 4.9,
      discount: 30,
      location: "مازندران، رامسر",
      amenities: "۴ اتاق خواب",
      originalPrice: 5000000,
      price: 3500000,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDestinationIndex((prev) => (prev + 1) % destinations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [destinations.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOfferIndex((prev) => (prev + 1) % offers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <main
      dir="rtl"
     className="relative mx-auto w-full max-w-full overflow-x-clip bg-big-box text-foreground"
    >

      <section className="relative px-5 pb-16 pt-20">
        <div className="pointer-events-none absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-[#8CFF45]/10 blur-[100px]" />

        <div className="relative mx-auto w-full max-w-[1240px]">
          <div className="mb-8 text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-[12px] text-[#8CFF45]">
              <span className="h-[5px] w-[5px] rounded-full bg-[#8CFF45]" />
              مقصدهای محبوب
              <span className="h-[5px] w-[5px] rounded-full bg-[#8CFF45]" />
            </span>

            <h2 className="text-[24px] font-semibold">
              اجاره ویلا در محبوب‌ترین مقاصد این ماه
            </h2>

            <p className="mt-3 text-[12px] text-white/50">
              بهترین مقصدها برای تجربه یک اقامت دلنشین و به‌یادماندنی
            </p>
          </div>

          <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                isActive={activeDestinationIndex === index}
                onClick={() => setActiveDestinationIndex(index)}
              />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {destinations.map((destination, index) => (
              <button
                key={destination.id}
                type="button"
                aria-label={`رفتن به مقصد ${index + 1}`}
                aria-pressed={activeDestinationIndex === index}
                onClick={() => setActiveDestinationIndex(index)}
                className={`h-[6px] rounded-full transition-all duration-300 ${activeDestinationIndex === index
                    ? "w-[18px] bg-[#8CFF45]"
                    : "w-[6px] bg-white/50"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-20 pt-16">
        <div className="pointer-events-none absolute bottom-10 right-0 h-[300px] w-[300px] rounded-full bg-[#7964FF]/10 blur-[100px]" />

        <div className="relative mx-auto w-full max-w-[1240px]">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
            <div>
              <span className="mb-3 flex items-center gap-2 text-[12px] text-[#8CFF45]">
                با هر مبلغی خونه دار شو
              </span>

              <h2 className="text-[24px] font-semibold">
                رهن و اجاره ملک در دلتا
              </h2>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 rounded-[10px] border border-white/20 px-4 py-2 text-[12px] text-white/70 transition-colors hover:border-[#8CFF45] hover:text-[#8CFF45]"
            >
              مشاهده همه
              <ChevronLeft size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 justify-items-center gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {offers.map((offer, index) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                isActive={activeOfferIndex === index}
                onClick={() => setActiveOfferIndex(index)}
              />
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2">
            {offers.map((offer, index) => (
              <button
                key={offer.id}
                type="button"
                aria-label={`انتخاب کارت ${index + 1}`}
                aria-pressed={activeOfferIndex === index}
                onClick={() => setActiveOfferIndex(index)}
                className={`h-[6px] rounded-full transition-all duration-300 ${activeOfferIndex === index
                    ? "w-[18px] bg-[#8CFF45]"
                    : "w-[6px] bg-white/50"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PopularDestinationsSection;
