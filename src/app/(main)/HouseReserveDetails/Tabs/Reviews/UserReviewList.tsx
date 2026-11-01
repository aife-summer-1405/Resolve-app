"use client";

import { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import UserRevireCard from "./UserRevireCard";
import { useHouseComments } from "@/src/hooks/useHouseComments";

interface IUserReviewListProps {
    houseId: string;
}


const MIN_HEIGHT = "min-h-[260px]";

const SkeletonCard = () => (
    <div
        className={`${MIN_HEIGHT} animate-pulse rounded-xl bg-card p-5`}
        aria-hidden="true"
    >
        <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-muted/30" />
            <div className="flex flex-col gap-2">
                <div className="h-3 w-28 rounded bg-muted/30" />
                <div className="h-3 w-20 rounded bg-muted/20" />
            </div>
        </div>
        <div className="mt-6 flex flex-col gap-3">
            <div className="h-3 w-full rounded bg-muted/20" />
            <div className="h-3 w-11/12 rounded bg-muted/20" />
            <div className="h-3 w-9/12 rounded bg-muted/20" />
        </div>
    </div>
);

const ReviewsSkeleton = () => (
    <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        role="status"
        aria-label="در حال دریافت نظرات کاربران"
    >
        <SkeletonCard />
        <div className="hidden md:block">
            <SkeletonCard />
        </div>
    </div>
);

const UserReviewList = ({ houseId }: IUserReviewListProps) => {
    const {
        data: reviews,
        isPending,
        isError,
        refetch,
        isFetching,
    } = useHouseComments(houseId);

    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const updatePagination = useCallback((instance: SwiperType) => {
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
    }, []);

    const goToPage = (index: number) => {
        if (!swiper) return;

        const perGroup = Number(swiper.params.slidesPerGroup) || 1;
        swiper.slideTo(index * perGroup);
    };

    if (isPending) {
        return <ReviewsSkeleton />;
    }

    if (isError || !reviews) {
        return (
            <div
                className={`${MIN_HEIGHT} flex flex-col items-center justify-center gap-4 rounded-xl bg-card p-6 text-center text-muted`}
            >
                <p>دریافت نظرات با خطا مواجه شد.</p>
                <button
                    type="button"
                    onClick={() => refetch()}
                    disabled={isFetching}
                    className="rounded-xl bg-primary px-5 py-2 font-semibold text-black disabled:opacity-50"
                >
                    {isFetching ? "در حال دریافت..." : "تلاش مجدد"}
                </button>
            </div>
        );
    }

    const comments = reviews.comments.filter(
        (review) => review.parent_comment_id === null
    );

    if (comments.length === 0) {
        return (
            <div
                className={`${MIN_HEIGHT} flex items-center justify-center rounded-xl bg-card p-6 text-center text-muted`}
            >
                هنوز نظری برای این اقامتگاه ثبت نشده است.
            </div>
        );
    }

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
                className={`w-full ${MIN_HEIGHT}`}
            >
                {comments.map((review) => (
                    <SwiperSlide key={review.id} className="h-auto">
                        <UserRevireCard
                            review={review}
                            replies={reviews.comments.filter(
                                (comment) =>
                                    comment.parent_comment_id === review.id
                            )}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* ارتفاع ثابت برای ناحیه‌ی دات‌ها تا با ظاهر شدنشان چیزی پایین نرود */}
            <div className="mt-8 flex h-2 justify-center gap-2">
                {totalPages > 1 &&
                    Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => goToPage(index)}
                            aria-label={`رفتن به صفحه ${index + 1}`}
                            aria-current={
                                activeIndex === index ? "page" : undefined
                            }
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                activeIndex === index
                                    ? "bg-primary"
                                    : "bg-muted/40"
                            }`}
                        />
                    ))}
            </div>
        </div>
    );
};

export default UserReviewList;