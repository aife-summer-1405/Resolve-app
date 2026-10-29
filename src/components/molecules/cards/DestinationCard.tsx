"use client";

import { FC, useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import Image from "next/image";
import FileContainer from "../../Ui/FileContainer";
import { House } from "@/src/services/houseService";

interface IDestinationCardProps {
  destination: House & {
    rating?: number;
    count?: number;
  };
}

const toFa = (value: number | string) =>
  String(value)
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])
    .replace(".", "٫");

const DestinationCard: FC<IDestinationCardProps> = ({ destination }) => {
  const [hovered, setHovered] = useState(false);

  const count = destination.count ?? 56;
  const score = destination.rating ?? 4.5;

  const photos = destination.photos ?? [];

  const image = photos[2] || photos[0] || "/images/offer.jpg";

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full cursor-pointer text-white"
    >
      <FileContainer
        background={hovered ? "#8CFF45" : "#393939"}
        radius="md"
        size="md"
        width="100%"
        height="188px"
        labelWidth="95px"
        labelHeight="32px"
        tagHeight="24px"
        classNames={{
          base: "transition-colors duration-200",
          wrapperLabel: "transition-colors duration-200",
          coverHollow: "transition-shadow duration-200",
          innerLabel: "h-full p-0!",
        }}
        label={
          <div className="flex h-full items-center justify-center">
            <div
              className={`mt-2 flex h-[25px] w-[58px] items-center justify-center gap-1 rounded-[10px] text-[11px] font-semibold shadow-[0_4px_12px_0_#FFFFFF33,inset_-1px_-1px_8px_0_#0000000A] transition-colors duration-200 ${
                hovered ? "bg-[#444444] text-white" : "bg-white text-[#292929]"
              }`}
            >
              <Star size={14} fill="currentColor" />
              <span>{toFa(score)}</span>
            </div>
          </div>
        }
        tag={
          <button
            type="button"
            className={`-mt-1 flex h-[22px] w-[45px] cursor-pointer items-center justify-center rounded-lg ${
              hovered
                ? "bg-[#8CFF45] text-[#292929]"
                : "bg-[#414141] text-white"
            }`}
          >
            <ArrowLeft size={18} />
          </button>
        }
      >
        <div className="relative h-full px-[16px] pt-[22px]">
          <div className="relative h-[150px] w-full overflow-hidden rounded-[22px] bg-[#444444]">
            <Image
              src={image}
              alt={destination.title || "تصویر مقصد"}
              fill
              sizes="(max-width: 768px) 260px, 274px"
              className="object-cover"
            />
          </div>
        </div>
      </FileContainer>

      <div className="mt-[16px] flex items-center gap-1.5 pe-2">
        <h3 className="text-[16px] font-semibold">{destination.title}</h3>

        <span className="text-[12px] text-white/50">({toFa(count)} مورد)</span>
      </div>
    </article>
  );
};

export default DestinationCard;
