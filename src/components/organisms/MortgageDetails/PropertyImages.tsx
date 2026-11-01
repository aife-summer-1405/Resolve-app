"use client";

import { useState } from "react";
import type { IHouseDetails } from "@/src/types/HousereservesType/HouseDetailType";

const DEFAULT_IMAGE = "/images/house-default.jpg";

interface PropertyImagesProps {
  result: IHouseDetails;
}

export default function PropertyImages({ result }: PropertyImagesProps) {
  const photos = result.photos?.length ? result.photos : [DEFAULT_IMAGE];

  const [activeIndex, setActiveIndex] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  const getSrc = (index: number) =>
    failed[index] ? DEFAULT_IMAGE : photos[index] ?? DEFAULT_IMAGE;

  const handleError = (index: number) =>
    setFailed((prev) => ({ ...prev, [index]: true }));

  const thumbIndexes = photos
    .map((_, index) => index)
    .filter((index) => index !== activeIndex)
    .slice(0, 2);

  const hiddenCount = photos.length - 1 - thumbIndexes.length;

  return (
    <section
      dir="ltr"
      className="flex w-full flex-col gap-3 md:h-[350px] md:flex-row lg:h-[380px]"
    >
      {/* ستون کناری */}
      <div className="order-2 flex gap-3 md:order-1 md:w-[32%] md:shrink-0 md:flex-col">
        {[0, 1].map((slot) => {
          const index = thumbIndexes[slot];

          if (index === undefined) {
            return (
              <div
                key={`empty-${slot}`}
                className="h-[125px] min-h-0 flex-1 overflow-hidden rounded-[22px] bg-[#393939] sm:h-[150px] md:h-auto"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={DEFAULT_IMAGE}
                  alt=""
                  className="h-full w-full object-cover opacity-60"
                />
              </div>
            );
          }

          return (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`نمایش تصویر ${index + 1}`}
              className="flex h-[125px] min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[22px] border-2 border-transparent bg-[#393939] transition hover:border-[#168CFF] sm:h-[150px] md:h-auto"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getSrc(index)}
                alt={`${result.title} - ${index + 1}`}
                onError={() => handleError(index)}
                className="h-full w-full object-cover"
              />

              {slot === 1 && hiddenCount > 0 && (
                <span className="absolute flex items-center justify-center text-base font-bold text-white">
                  +{hiddenCount.toLocaleString("fa-IR")} عکس دیگر
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* عکس اصلی */}
      <div className="order-1 flex h-[260px] min-w-0 flex-1 flex-col overflow-hidden rounded-[24px] bg-[#393939] sm:h-[320px] md:order-2 md:h-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getSrc(activeIndex)}
          alt={result.title}
          onError={() => handleError(activeIndex)}
          className="min-h-0 w-full flex-1 object-cover"
        />

        {photos.length > 1 && (
          <div className="flex shrink-0 items-center justify-center gap-2 px-4 py-2">
            {photos.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`نمایش تصویر ${index + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  activeIndex === index
                    ? "scale-125 bg-[#91FF45]"
                    : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}