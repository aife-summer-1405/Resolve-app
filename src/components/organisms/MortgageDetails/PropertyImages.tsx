
"use client";

import { useState } from "react";

export default function PropertyImages() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      dir="ltr"
      className="grid w-full grid-cols-1 gap-3 md:grid-cols-[minmax(130px,0.65fr)_minmax(0,1.35fr)]"
    >
      <div className="order-2 grid grid-cols-2 gap-3 md:order-1 md:grid-cols-1 md:grid-rows-2">
        {[1, 2].map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`نمایش تصویر ${index + 1}`}
            className={`relative h-[125px] overflow-hidden rounded-[22px] border-2 bg-[#393939] transition sm:h-[150px] md:h-auto md:min-h-[130px] ${
              activeIndex === index
                ? "border-[#168CFF]"
                : "border-transparent"
            }`}
          >
            {index === 2 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/35 text-base font-bold text-white">
                +۱۲ عکس دیگر
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="relative order-1 h-[260px] min-w-0 overflow-hidden rounded-[24px] bg-[#393939] sm:h-[320px] md:order-2 md:h-[350px] lg:h-[380px]">
        <div className="absolute inset-0" />
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/70 px-4 py-2">
          {[0, 1, 2, 3, 4].map((index) => (
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
      </div>
    </section>
  );
}
