"use client";

import { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import UserRevireCard, { type UserReviewCardProps } from "./UserRevireCard";

interface UserReviewListProps {
    reviews: UserReviewCardProps[];
}

const UserReviewList = ({ reviews }: UserReviewListProps) => {
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
            <Swiper
                dir="rtl"
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
                        <UserRevireCard {...review} />
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
                                    ? "w-2 bg-primary"
                                    : "w-2 bg-muted/40"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserReviewList;