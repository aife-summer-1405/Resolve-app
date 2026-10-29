"use client";

const OfferCardSkeleton = () => {
  return (
    <article dir="rtl" className="w-full animate-pulse text-white">
      <div className="h-[188px] w-full rounded-[24px] bg-[#393939] p-[14px]">
        <div className="h-full w-full rounded-[16px] bg-[#4A4A4A]" />
      </div>

      <div className="mt-[18px] flex h-[36px] items-center justify-between gap-2">
        <div className="h-4 w-2/3 rounded-md bg-[#393939]" />
        <div className="h-6 w-10 rounded-md bg-[#393939]" />
      </div>

      <div className="mt-[8px] flex items-center gap-2 px-[2px]">
        <div className="h-3 w-3 rounded-full bg-[#393939]" />
        <div className="h-3 w-1/2 rounded-md bg-[#393939]" />
      </div>

      <div className="mt-[12px] flex items-center gap-2 px-[2px]">
        <div className="h-3 w-3 rounded-full bg-[#393939]" />
        <div className="h-3 w-2/3 rounded-md bg-[#393939]" />
      </div>

      <div className="mt-[28px] h-[36px] w-full rounded-[12px] bg-[#393939]" />
    </article>
  );
};

export default OfferCardSkeleton;
