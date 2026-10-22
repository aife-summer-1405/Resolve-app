"use client";

import { FC } from "react";
import { ArrowLeft, Star, MapPin, BedDouble } from "lucide-react";
import { IOffer } from "@/src/core/types/IOffer";

interface IOfferCardProps {
  offer: IOffer;
  isActive?: boolean;
  onClick?: () => void;
}

const OfferCard: FC<IOfferCardProps> = ({
  offer,
  isActive = false,
  onClick,
}) => {
  return (
    <article onClick={onClick} className="w-[306px] cursor-pointer text-white">
      <div
        className={`relative h-[232px] w-[306px] rounded-[24px] p-[14px] transition-colors duration-200 ${
          isActive ? "bg-[#8CFF45]" : "bg-[#393939]"
        }`}
      >
        <button
          type="button"
          aria-label="مشاهده اقامتگاه"
          onClick={(event) => event.stopPropagation()}
          className={`absolute left-[10px] top-[9px] z-20 flex h-[28px] w-[40px] items-center justify-center rounded-[10px] transition-colors ${
            isActive ? "bg-[#8CFF45] text-[#292929]" : "bg-[#414141] text-white"
          }`}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="relative mt-[32px] h-[156px] w-[274px] rounded-[20px] bg-[#444444]">
          <div className="absolute inset-0 flex items-end justify-center gap-[10px] pb-[15px]">
            {[0, 1, 2, 3, 4].map((dot) => (
              <span
                key={dot}
                className="h-[7px] w-[7px] rounded-full bg-white/80"
              />
            ))}
          </div>
        </div>

        <div
          className={`absolute right-[14px] top-[14px] flex h-[28px] items-center gap-1 rounded-[10px] px-[10px] text-[11px] font-semibold transition-colors ${
            isActive ? "bg-[#444444] text-white" : "bg-white text-[#292929]"
          }`}
        >
          <Star size={14} fill="currentColor" />
          <span>{offer.rating.toLocaleString("fa-IR")}</span>
        </div>
      </div>

      <div className="mt-[18px] flex h-[36px] items-center justify-between gap-2">
        <h3 className="min-w-0 truncate text-[14px] font-medium text-white">
          {offer.title}
        </h3>

        <span className="shrink-0 rounded-[12px] bg-[#FF545E] px-[10px] py-[6px] text-[12px] font-medium text-white">
          ٪{offer.discount.toLocaleString("fa-IR")}
        </span>
      </div>

      <div className="mt-[8px] flex items-center gap-[5px] px-[2px] text-[12px] text-white/50">
        <MapPin size={14} className="shrink-0" />
        <span>{offer.location}</span>
      </div>

      <div className="mt-[12px] flex items-center gap-[5px] px-[2px] text-[12px] text-white/50">
        <BedDouble size={14} className="shrink-0" />
        <span>{offer.amenities}</span>
      </div>

      <div
        className={`mt-[28px] flex h-[36px] w-[306px] items-center justify-between gap-1 rounded-[12px] px-[12px] transition-colors ${
          isActive ? "bg-[#8CFF45] text-[#292929]" : "bg-[#414141] text-white"
        }`}
      >
        <div className="flex min-w-0 items-center gap-[8px]">
          <span className="shrink-0 text-[11px] font-semibold">
            {offer.price.toLocaleString("fa-IR")}ت
          </span>

          <span
            className={`h-[16px] w-px shrink-0 ${
              isActive ? "bg-black/20" : "bg-white/25"
            }`}
          />

          <span
            className={`truncate text-[10px] line-through ${
              isActive ? "text-black/40" : "text-white/45"
            }`}
          >
            {offer.originalPrice.toLocaleString("fa-IR")}ت
          </span>
        </div>

        <span className="shrink-0 text-[10px]">هر شب</span>
      </div>
    </article>
  );
};

export default OfferCard;
