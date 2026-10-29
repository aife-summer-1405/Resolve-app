"use client";

const OfferCardSkeleton = () => {
  return (
    <article dir="rtl" className="w-full animate-pulse text-white">
      <div className="relative h-[188px] w-full rounded-[24px] bg-[#393939] p-[14px]">
        <div className="h-[156px] w-full rounded-[20px] bg-[#4A4A4A]" />

        <div className="absolute right-3 top-3 h-[25px] w-[58px] rounded-[10px] bg-[#555555]" />

        <div className="absolute bottom-5 left-4 h-[22px] w-[45px] rounded-lg bg-[#555555]" />
      </div>

      <div className="mt-[18px] flex h-[36px] items-center justify-between gap-2">
        <div className="h-4 w-2/3 rounded-md bg-[#393939]" />
        <div className="h-6 w-10 rounded-[12px] bg-[#393939]" />
      </div>

      <div className="mt-[8px] flex items-center gap-2 px-[2px]">
        <div className="h-3 w-3 shrink-0 rounded-full bg-[#393939]" />
        <div className="h-3 w-1/2 rounded-md bg-[#393939]" />
      </div>

      <div className="mt-[12px] flex items-center gap-2 px-[2px]">
        <div className="h-3 w-3 shrink-0 rounded-full bg-[#393939]" />
        <div className="h-3 w-2/3 rounded-md bg-[#393939]" />
      </div>

      <div className="mt-[28px] flex h-[36px] w-full items-center justify-center rounded-[12px] bg-[#393939]">
        <div className="h-3 w-1/2 rounded-md bg-[#555555]" />
      </div>
    </article>
  );
};

export default OfferCardSkeleton;
