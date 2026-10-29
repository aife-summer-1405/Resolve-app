"use client";

import { FC, useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import DestinationCard from "../../molecules/cards/DestinationCard";
import OfferCard from "../../molecules/cards/OfferCard";
import DestinationCardSkeleton from "../../Skeletons/DestinationCardSkeleton";
import OfferCardSkeleton from "../../Skeletons/OfferCardSkeleton";
import { getHouses, type House } from "@/src/services/houseService";
import Image from "next/image";

const VISIBLE_CARDS = 4;

const PopularDestinationsSection: FC = () => {
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);
  const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);
  const [houses, setHouses] = useState<House[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const destinationSliderRef = useRef<HTMLDivElement>(null);
  const offerSliderRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  });

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await getHouses();
        setHouses(response.houses);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات ملک‌ها:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const startDrag = (
    event: React.MouseEvent<HTMLDivElement>,
    sliderRef: React.RefObject<HTMLDivElement | null>,
  ) => {
    if (!sliderRef.current || event.button !== 0) return;

    dragRef.current = {
      isDragging: true,
      startX: event.pageX,
      scrollLeft: sliderRef.current.scrollLeft,
    };

    sliderRef.current.style.cursor = "grabbing";
    sliderRef.current.style.userSelect = "none";
  };

  const drag = (
    event: React.MouseEvent<HTMLDivElement>,
    sliderRef: React.RefObject<HTMLDivElement | null>,
  ) => {
    if (!dragRef.current.isDragging || !sliderRef.current) return;

    event.preventDefault();

    const distance = event.pageX - dragRef.current.startX;

    sliderRef.current.scrollLeft = dragRef.current.scrollLeft - distance;
  };

  const stopDrag = (sliderRef: React.RefObject<HTMLDivElement | null>) => {
    dragRef.current.isDragging = false;

    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
      sliderRef.current.style.userSelect = "";
    }
  };

  const selectCard = (
    index: number,
    sliderRef: React.RefObject<HTMLDivElement | null>,
    setActiveIndex: (index: number) => void,
  ) => {
    setActiveIndex(index);

    const slider = sliderRef.current;
    const card = slider?.children[index] as HTMLElement | undefined;

    card?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const updateActiveIndex = (
    sliderRef: React.RefObject<HTMLDivElement | null>,
    setActiveIndex: (index: number) => void,
  ) => {
    const slider = sliderRef.current;

    if (!slider || dragRef.current.isDragging) return;

    const cards = Array.from(slider.children) as HTMLElement[];

    if (!cards.length) return;

    const sliderCenter =
      slider.getBoundingClientRect().left + slider.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(sliderCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const cardWrapperClass =
    "w-[calc((100%_-_48px)/4)] min-w-[260px] shrink-0 [&>article]:!w-full";

  const paginationButtonClass =
    "!appearance-none !rounded-full !border-0 !p-0 !shadow-none before:!content-none after:!content-none";

  return (
    <main className="relative mx-auto w-full max-w-full overflow-x-clip rounded-b-[64px] bg-big-box text-foreground">
      <section className="relative px-5 pb-16 pt-20">
        <div className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-[#8CFF4552]/32 blur-[80px]" />

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

          <div
            ref={destinationSliderRef}
            onMouseDown={(event) => startDrag(event, destinationSliderRef)}
            onMouseMove={(event) => drag(event, destinationSliderRef)}
            onMouseUp={() => stopDrag(destinationSliderRef)}
            onMouseLeave={() => stopDrag(destinationSliderRef)}
            onScroll={() =>
              updateActiveIndex(destinationSliderRef, setActiveDestinationIndex)
            }
            className="flex cursor-grab gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {isLoading
              ? Array.from({ length: VISIBLE_CARDS }).map((_, index) => (
                  <div key={index} className={cardWrapperClass}>
                    <DestinationCardSkeleton />
                  </div>
                ))
              : houses.map((house) => (
                  <div key={house.id} className={cardWrapperClass}>
                    <DestinationCard destination={house} />
                  </div>
                ))}
          </div>

          {!isLoading && houses.length === 0 && (
            <p className="mt-6 text-center text-sm text-white/50">
              در حال حاضر مقصدی برای نمایش وجود ندارد.
            </p>
          )}

          {!isLoading && houses.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {houses.map((house, index) => (
                <button
                  key={house.id}
                  type="button"
                  aria-label={`نمایش مقصد ${index + 1}`}
                  aria-pressed={activeDestinationIndex === index}
                  onClick={() =>
                    selectCard(
                      index,
                      destinationSliderRef,
                      setActiveDestinationIndex,
                    )
                  }
                  className={`${paginationButtonClass} !flex !h-[6px] !w-[6px] !min-w-[6px] !shrink-0 !transform-none !transition-colors ${
                    activeDestinationIndex === index
                      ? "!bg-[#8CFF45]"
                      : "!bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative px-5 pb-20 pt-16">
        <div className="pointer-events-none absolute bottom-10 right-0 h-[300px] w-[300px] rounded-full bg-[#7964FF]/10 blur-[100px]" />

        <div className="relative mx-auto w-full max-w-[1240px]">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="text-[16px] font-medium text-[#8CFF45]">
                  جدیدترین نقاط
                </span>

                <Image
                  src="/icons/Group 34.png"
                  alt="آیکون"
                  width={30}
                  height={25}
                />
              </div>

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

          <div
            ref={offerSliderRef}
            onMouseDown={(event) => startDrag(event, offerSliderRef)}
            onMouseMove={(event) => drag(event, offerSliderRef)}
            onMouseUp={() => stopDrag(offerSliderRef)}
            onMouseLeave={() => stopDrag(offerSliderRef)}
            onScroll={() =>
              updateActiveIndex(offerSliderRef, setActiveOfferIndex)
            }
            className="flex cursor-grab gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {isLoading
              ? Array.from({ length: VISIBLE_CARDS }).map((_, index) => (
                  <div key={index} className={cardWrapperClass}>
                    <OfferCardSkeleton />
                  </div>
                ))
              : houses.map((house, index) => (
                  <div key={house.id} className={cardWrapperClass}>
                    <OfferCard
                      offer={house}
                      isActive={activeOfferIndex === index}
                      onClick={() => setActiveOfferIndex(index)}
                    />
                  </div>
                ))}
          </div>

          {!isLoading && houses.length === 0 && (
            <p className="mt-6 text-center text-sm text-white/50">
              در حال حاضر ملکی برای نمایش وجود ندارد.
            </p>
          )}

          {!isLoading && houses.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {houses.map((house, index) => (
                <button
                  key={house.id}
                  type="button"
                  aria-label={`نمایش ملک ${index + 1}`}
                  aria-pressed={activeOfferIndex === index}
                  onClick={() =>
                    selectCard(index, offerSliderRef, setActiveOfferIndex)
                  }
                  className={`${paginationButtonClass} !flex !h-[6px] !w-[6px] !min-w-[6px] !shrink-0 !transform-none !transition-colors ${
                    activeOfferIndex === index
                      ? "!bg-[#8CFF45]"
                      : "!bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default PopularDestinationsSection;
