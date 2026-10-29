"use client";

import { FC, useState } from "react";
import { ArrowLeft, Building2, MapPin, Star } from "lucide-react";

import FileContainer from "@/src/components/Ui/FileContainer";
import { House } from "@/src/services/houseService";
import OfferCardSkeleton from "../../Skeletons/OfferCardSkeleton";
import ImageFallback from "../ImageFallBack/ImageFallBack";

interface IOfferCardProps {
  offer: House;
  isActive?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const OfferCard: FC<IOfferCardProps> = ({
  offer,
  isLoading = false,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (isLoading) {
    return <OfferCardSkeleton />;
  }

  const originalPrice = Number(offer.price) || 0;

  const price =
    offer.discounted_price !== null
      ? Number(offer.discounted_price) || 0
      : originalPrice;

  const discount =
    originalPrice > 0 && price < originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const images = offer.photos?.length ? offer.photos : ["/images/offer.jpg"];

  const image = images[activeImageIndex] || images[0];

  return (
    <article
      onClick={onClick}
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
              <span>
                {(Number(offer.rate) || 0).toLocaleString("fa-IR", {
                  minimumFractionDigits: 1,
                })}
              </span>
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
        <div className="relative h-full px-[16px] pt-[14px]">
          <div className="relative h-[156px] w-full overflow-hidden rounded-[20px] bg-[#444444]">
            <ImageFallback
              key={image}
              src={image}
              fallbackSrc="/images/offer.jpg"
              alt={offer.title || "تصویر ملک"}
              fill
              sizes="274px"
              className="object-cover"
            />

            {images.length > 1 && (
              <div className="absolute inset-x-0 bottom-[15px] z-10 flex items-center justify-center gap-[10px]">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`نمایش تصویر ${index + 1}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveImageIndex(index);
                    }}
                    className={
                      activeImageIndex === index
                        ? "h-0 w-0 border-x-[4px] border-b-[7px] border-x-transparent border-b-[#8CFF45]"
                        : "h-[7px] w-[7px] rounded-full bg-white/50"
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </FileContainer>

      <div className="mt-[18px] flex h-[36px] items-center justify-between gap-2">
        <h3 className="min-w-0 truncate text-[16px] font-medium text-foreground">
          {offer.title}
        </h3>

        {discount > 0 && (
          <span className="shrink-0 rounded-[12px] bg-[#FF545E] px-[10px] py-[6px] text-[12px] font-medium text-white">
            ٪{discount.toLocaleString("fa-IR")}
          </span>
        )}
      </div>

      <div className="mt-[8px] flex items-center gap-[5px] px-[2px] text-[12px] text-white/50">
        <MapPin size={14} className="shrink-0" />
        <span>{offer.address || "آدرس ثبت نشده"}</span>
      </div>

      <div className="mt-[12px] flex items-center gap-[5px] px-[2px] text-[12px] text-white/50">
        <Building2 size={14} className="shrink-0" />
        <span>
          {offer.rooms} خواب، {offer.capacity} نفر ظرفیت
        </span>
      </div>

      <div
        className={`mt-[28px] flex h-[36px] w-full items-center justify-center gap-[10px] rounded-[12px] px-[12px] transition-colors duration-200 ${
          hovered ? "bg-[#8CFF45] text-[#292929]" : "bg-[#414141] text-white"
        }`}
      >
        <span className="shrink-0 text-[11px] font-semibold">
          {price.toLocaleString("fa-IR")}ت / هر شب
        </span>

        {discount > 0 && (
          <>
            <span
              className={`h-[16px] w-px shrink-0 ${
                hovered ? "bg-black/20" : "bg-white/25"
              }`}
            />

            <span
              className={`truncate text-[10px] line-through ${
                hovered ? "text-black/40" : "text-white/45"
              }`}
            >
              {originalPrice.toLocaleString("fa-IR")}ت
            </span>
          </>
        )}
      </div>
    </article>
  );
};

export default OfferCard;
