"use client";

import { FC, useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import DestinationCard from "../../molecules/cards/DestinationCard";
import OfferCard from "../../molecules/cards/OfferCard";
import DestinationCardSkeleton from "../../Skeletons/DestinationCardSkeleton";
import OfferCardSkeleton from "../../Skeletons/OfferCardSkeleton";
import { getHouses, type House } from "@/src/services/houseService";

const VISIBLE_CARDS = 4;

const PropertyForSaleSection: FC = () => {
  const [activeDestinationIndex, setActiveDestinationIndex] = useState(2);
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);
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
    "w-[calc((100%_-_36px)/4)] min-w-[180px] shrink-0 [&>article]:!w-full";

  const paginationButtonClass =
    "!appearance-none !rounded-full !border-0 !p-0 !shadow-none before:!content-none after:!content-none";

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden rounded-b-[48px] bg-[#2D2D2D] px-5 pb-16 pt-10 text-white md:px-8 lg:min-h-[860px]"
    >
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#8CFF45]/10 blur-[100px]" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#7569FF]/20 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1376px]">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-[16px] font-medium text-[#8CFF45]">
            خونه از خودت میخوای!
          </span>

          <Image src="/icons/Group 34.png" alt="آیکون" width={30} height={25} />
        </div>

        <div className="mb-7 flex items-center justify-between gap-4">
          <h2 className="text-[22px] font-light md:text-[28px]">
            <span className="font-semibold">خرید و فروش ملک</span> در دلتا
          </h2>

          <button
            type="button"
            className="flex shrink-0 items-center gap-2 rounded-[10px] border border-white/50 px-3 py-1.5 text-[11px] transition hover:border-[#8CFF45] hover:text-[#8CFF45]"
          >
            <ChevronLeft size={13} />
            مشاهده همه
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
          className="flex cursor-grab gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {isLoading
            ? Array.from({ length: VISIBLE_CARDS }).map((_, index) => (
                <div key={index} className={cardWrapperClass}>
                  <OfferCardSkeleton />
                </div>
              ))
            : houses.map((house) => (
                <div key={house.id} className={cardWrapperClass}>
                  <OfferCard offer={house} isActive={false} />
                </div>
              ))}
        </div>

        {!isLoading && houses.length === 0 && (
          <p className="mt-5 text-center text-sm text-white/50">
            در حال حاضر ملکی برای نمایش وجود ندارد.
          </p>
        )}

        {!isLoading && houses.length > 1 && (
          <div className="mt-5 flex items-center justify-center gap-2">
            {houses.map((house, index) => (
              <button
                key={house.id}
                type="button"
                aria-label={`نمایش ملک ${index + 1}`}
                aria-pressed={activeOfferIndex === index}
                onClick={() =>
                  selectCard(index, offerSliderRef, setActiveOfferIndex)
                }
                className={`${paginationButtonClass} !flex !h-[5px] !w-[5px] !min-w-[5px] !shrink-0 !transform-none !transition-colors ${
                  activeOfferIndex === index ? "!bg-[#8CFF45]" : "!bg-white/70"
                }`}
              />
            ))}
          </div>
        )}

        <div className="mt-28 rounded-[28px] bg-[#222222] px-4 py-7 md:px-5 md:py-8">
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

          <div className="mb-7 flex items-center justify-between gap-4">
            <h2 className="text-[22px] font-light md:text-[28px]">
              <span className="font-semibold">جدیدترین مناطق تفریحی</span>
            </h2>

            <button
              type="button"
              className="flex shrink-0 items-center gap-2 rounded-[10px] border border-white/50 px-3 py-1.5 text-[11px] transition hover:border-[#8CFF45] hover:text-[#8CFF45]"
            >
              <ChevronLeft size={13} />
              مشاهده همه
            </button>
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
            className="flex cursor-grab gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {isLoading
              ? Array.from({ length: VISIBLE_CARDS }).map((_, index) => (
                  <div key={index} className={cardWrapperClass}>
                    <DestinationCardSkeleton />
                  </div>
                ))
              : houses.map((house, index) => (
                  <div key={house.id} className={cardWrapperClass}>
                    <DestinationCard destination={house} />
                  </div>
                ))}
          </div>

          {!isLoading && houses.length === 0 && (
            <p className="mt-5 text-center text-sm text-white/50">
              در حال حاضر مقصدی برای نمایش وجود ندارد.
            </p>
          )}

          {!isLoading && houses.length > 1 && (
            <div className="mt-5 flex items-center justify-center gap-2">
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
                  className={`${paginationButtonClass} !flex !h-[5px] !w-[5px] !min-w-[5px] !shrink-0 !transform-none !transition-colors ${
                    activeDestinationIndex === index
                      ? "!bg-[#8CFF45]"
                      : "!bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyForSaleSection;
