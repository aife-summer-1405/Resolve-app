"use client";

import { FC, useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import OfferCard from "../../molecules/cards/OfferCard";
import OfferCardSkeleton from "../../Skeletons/OfferCardSkeleton";
import { getHouses, type House } from "@/src/services/houseService";

const VISIBLE_CARDS = 4;

const PropertyForSaleSection: FC = () => {
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);
  const [offers, setOffers] = useState<House[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await getHouses();
        setOffers(response.houses);
      } catch (error) {
        console.error("خطا در دریافت ملک‌های قابل فروش:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const dotsCount = Math.max(offers.length - VISIBLE_CARDS + 1, 1);

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

        <div className="overflow-hidden pt-1">
          {isLoading ? (
            <div className="flex items-start gap-5">
              {Array.from({ length: VISIBLE_CARDS }).map((_, index) => (
                <div
                  key={index}
                  className="w-[306px] min-w-[306px] shrink-0 lg:w-[calc((100%-60px)/4)] lg:min-w-0"
                >
                  <OfferCardSkeleton />
                </div>
              ))}
            </div>
          ) : offers.length === 0 ? (
            <div className="flex min-h-[250px] items-center justify-center text-center text-white/60">
              در حال حاضر ملکی برای نمایش وجود ندارد.
            </div>
          ) : (
            <div
              className="flex items-start gap-5 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(calc(${activeOfferIndex} * (100% / 4 + 5px)))`,
              }}
            >
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="w-[306px] min-w-[306px] shrink-0 lg:w-[calc((100%-60px)/4)] lg:min-w-0"
                >
                  <OfferCard offer={offer} />
                </div>
              ))}
            </div>
          )}
        </div>

        {!isLoading && offers.length > VISIBLE_CARDS && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: dotsCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`نمایش گروه ${index + 1}`}
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
        )}
      </div>
    </section>
  );
};

export default PropertyForSaleSection;
