"use client";

const DestinationCardSkeleton = () => {
  return (
    <article dir="rtl" className="w-[306px] animate-pulse text-white">
      <div className="h-[188px] w-full rounded-[24px] bg-[#393939] p-[14px]">
        <div className="h-full w-full rounded-[16px] bg-[#4A4A4A]" />
      </div>

      <div className="mt-[16px] flex items-center gap-2 pe-2">
        <div className="h-4 w-32 rounded-md bg-[#393939]" />
        <div className="h-3 w-16 rounded-md bg-[#393939]" />
      </div>
    </article>
  );
};

export default DestinationCardSkeleton;
