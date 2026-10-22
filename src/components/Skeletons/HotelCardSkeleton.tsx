"use client";

const HotelCardSkeleton = () => {
    return (
        <article
            dir="rtl"
            className="flex w-full flex-col gap-5 border-b border-gray-700 bg-[#303030] p-5 md:flex-row md:items-center md:gap-6 md:px-8 md:py-5"
        >
            <div className="h-40 w-full shrink-0 animate-pulse rounded-2xl bg-gray-700 md:h-[138px] md:w-[148px]" />

            <div className="flex min-w-0 flex-1 flex-col gap-4">
                <div className="h-7 w-20 animate-pulse rounded-lg bg-gray-700" />

                <div className="h-6 w-3/4 animate-pulse rounded-md bg-gray-700" />

                <div className="h-4 w-2/3 animate-pulse rounded-md bg-gray-700" />

                <div className="h-4 w-1/2 animate-pulse rounded-md bg-gray-700" />
            </div>

            <div className="flex shrink-0 flex-col gap-4 md:min-w-[220px]">
                <div className="h-7 w-36 animate-pulse rounded-md bg-gray-700" />

                <div className="h-12 w-full animate-pulse rounded-xl bg-gray-700 md:w-36" />
            </div>
        </article>
    );
};

export default HotelCardSkeleton;