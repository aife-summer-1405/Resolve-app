"use client";

import { FC, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { IOffer } from "@/src/core/types/IOffer";
import OfferCard from "../../molecules/cards/OfferCard";

const PropertyForSaleSection: FC = () => {
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);

  const offers: IOffer[] = [
    {
      id: "1",
      title: "آپارتمان لوکس زعفرانیه",
      image: "/images/offer.jpg",
      rating: 4.5,
      discount: 15,
      location: "گیلان، رشت",
      amenities: "۴ خوابه، ۱ پارکینگ، ۲ حمام، حیاط",
      originalPrice: 5000000,
      price: 5000000,
    },
    {
      id: "2",
      title: "آپارتمان لوکس زعفرانیه",
      image: "/images/offer.jpg",
      rating: 4.5,
      discount: 15,
      location: "گیلان، رشت",
      amenities: "۴ خوابه، ۱ پارکینگ، ۲ حمام، حیاط",
      originalPrice: 5000000,
      price: 5000000,
    },
    {
      id: "3",
      title: "آپارتمان لوکس زعفرانیه",
      image: "/images/offer.jpg",
      rating: 4.5,
      discount: 15,
      location: "گیلان، رشت",
      amenities: "۴ خوابه، ۱ پارکینگ، ۲ حمام، حیاط",
      originalPrice: 5000000,
      price: 5000000,
    },
    {
      id: "4",
      title: "آپارتمان لوکس زعفرانیه",
      image: "/images/offer.jpg",
      rating: 4.5,
      discount: 15,
      location: "گیلان، رشت",
      amenities: "۴ خوابه، ۱ پارکینگ، ۲ حمام، حیاط",
      originalPrice: 5000000,
      price: 5000000,
    },
    {
      id: "5",
      title: "آپارتمان لوکس زعفرانیه",
      image: "/images/offer.jpg",
      rating: 4.5,
      discount: 15,
      location: "گیلان، رشت",
      amenities: "۴ خوابه، ۱ پارکینگ، ۲ حمام، حیاط",
      originalPrice: 5000000,
      price: 5000000,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden rounded-b-[64px] bg-[#2D2D2D] px-5 pb-16 pt-[240px] text-white shadow-[0_12px_32px_0_rgba(0,0,0,0.06)] md:px-8 lg:min-h-[1671px]">
      <div className="pointer-events-none absolute -left-32 top-[110px] h-72 w-72 rounded-full bg-[#8CFF45]/20 blur-[100px]" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#7569FF]/30 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1376px]">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-[16px] font-medium text-[#8CFF45]">
            خونه از خودت میخوای!
          </span>

          <Image src="/icons/Group 34.png" alt="" width={30} height={25} />
        </div>

        <div className="mb-12 flex items-center justify-between gap-4">
          <h2 className="text-[32px] font-light">
            <span className="font-semibold">خرید و فروش ملک</span> در دلتا
          </h2>

          <button
            type="button"
            className="flex shrink-0 items-center gap-2 rounded-[14px] border border-white/60 px-4 py-2 text-sm transition hover:border-[#8CFF45] hover:text-[#8CFF45]"
          >
            <ChevronLeft size={14} />
            مشاهده همه
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

        <div className="mt-12 flex items-center justify-center gap-2">
          {offers.map((offer, index) => (
            <button
              key={offer.id}
              type="button"
              aria-label={`انتخاب کارت ${index + 1}`}
              aria-pressed={activeOfferIndex === index}
              onClick={() => setActiveOfferIndex(index)}
              className="flex h-[10px] w-[10px] items-center justify-center"
            >
              {activeOfferIndex === index ? (
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

export default PropertyForSaleSection;
