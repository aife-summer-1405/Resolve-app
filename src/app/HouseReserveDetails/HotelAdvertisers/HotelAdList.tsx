"use client";

import { useCallback, useState } from "react";
import { ChevronLeft, Home } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import HotelAdCard, { type HouseCardProps } from "./HotelAdCard";

interface HotelAdListProps {
    houses: HouseCardProps[];
}

const HotelAdList = ({ houses }: HotelAdListProps) => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const updatePagination = useCallback((instance: SwiperType) => {
        const perView = Number(instance.params.slidesPerView) || 1;
        const perGroup = Number(instance.params.slidesPerGroup) || 1;
        const total = instance.slides.length;

        const pages = Math.max(1, Math.ceil((total - perView) / perGroup) + 1);
        const current = Math.min(
            Math.floor(instance.activeIndex / perGroup),
            pages - 1
        );

        setTotalPages(pages);
        setActiveIndex(instance.isEnd ? pages - 1 : current);
    }, []);

    const goToPage = (index: number) => {
        if (!swiper) return;

        const perGroup = Number(swiper.params.slidesPerGroup) || 1;
        swiper.slideTo(index * perGroup);
    };

    return (
        <div className="flex flex-col">
            <div className="mb-12 flex w-full flex-row-reverse items-center justify-between rounded-xl bg-card px-4 py-3">
                <div className="flex flex-row-reverse items-center gap-2">
                    <Home />
                    <p>آگهی‌های مشابه</p>
                </div>

                <div className="flex flex-row-reverse items-center gap-1 text-primary">
                    <p>مشاهده همه</p>
                    <ChevronLeft />
                </div>
            </div>

            <Swiper
                dir="rtl"
                slidesPerView={1}
                slidesPerGroup={1}
                spaceBetween={16}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        spaceBetween: 16,
                    },
                    768: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                        spaceBetween: 24,
                    },
                }}
                onSwiper={(instance) => {

                  
                    setSwiper(instance);
                    updatePagination(instance);
                }}
                onSlideChange={updatePagination}
                onBreakpoint={updatePagination}
                onUpdate={updatePagination}
                onResize={updatePagination}
                className="w-full"
            >
                {houses.map((house) => (
                    <SwiperSlide key={house.id} className="h-auto">
                        <HotelAdCard {...house} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => goToPage(index)}
                            aria-label={`رفتن به صفحه ${index + 1}`}
                            aria-current={activeIndex === index ? "page" : undefined}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                activeIndex === index
                                    ? "w-2   bg-primary"
                                    : "w-2 bg-muted/40"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HotelAdList;