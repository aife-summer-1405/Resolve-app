"use client";

import { FC } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { IDestination } from "@/src/core/types/IDestination";

interface IDestinationCardProps {
  destination: IDestination & { rating?: number; count?: number };
  isActive?: boolean;
  onClick?: () => void;
}

const toFa = (value: number | string) =>
  String(value)
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])
    .replace(".", "٫");

const DestinationCard: FC<IDestinationCardProps> = ({
  destination,
  isActive = false,
  onClick,
}) => {
  const count = destination.count ?? 56;

  return (
    <article onClick={onClick} className="w-[306px] cursor-pointer text-white">
      <div
        className={`relative h-[240px] w-[306px] rounded-[24px] transition-colors duration-200 ${
          isActive ? "bg-[#8CFF45]" : "bg-[#393939]"
        }`}
      >
        <button
          type="button"
          aria-label="مشاهده مقصد"
          onClick={(event) => {
            event.stopPropagation();
            onClick?.();
          }}
          className={`absolute left-[10px] top-[17px] z-10 flex h-[26px] w-[40px] items-center justify-center rounded-[10px] transition-colors ${
            isActive ? "bg-[#2D2D2D] text-white" : "bg-[#454545] text-white"
          }`}
        >
          <ArrowLeft size={18} />
        </button>

        <div className="absolute inset-x-[18px] bottom-[30px] top-[54px] overflow-hidden rounded-[22px] bg-[#444]">
          {/* <Image
            src={destination.image}
            alt=""
            fill
            sizes="270px"
            className="object-cover"
          /> */}

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className="h-[7px] w-[7px] rounded-full bg-white/90"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5 pe-2">
        <h3 className="text-[16px] font-semibold">{destination.title}</h3>

        <span className="text-[12px] text-white/50">({toFa(count)} مورد)</span>
      </div>
    </article>
  );
};

export default DestinationCard;
