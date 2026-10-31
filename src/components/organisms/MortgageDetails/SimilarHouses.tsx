"use client";

import Image from "next/image";
import {
  BedDouble,
  MapPin,
  Star,
} from "lucide-react";
import { useState } from "react";

export interface SimilarProperty {
  id: number;
  title: string;
  location: string;
  image: string;
  area: number;
  rooms: number;
  mortgage: number;
  rent: number;
}

interface SimilarHousesProps {
  properties: SimilarProperty[];
}

export default function SimilarHouses({
  properties,
}: SimilarHousesProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (properties.length === 0) {
    return null;
  }

  return (
    <section dir="rtl" className="w-full text-white">
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {properties.map((property, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={property.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="w-full text-right"
            >
              {/* تصویر کارت */}
              <div
                className={`relative overflow-hidden rounded-[32px] p-3 transition-all duration-300 ${
                  isActive
                    ? "bg-[#8CFF45]"
                    : "bg-[#333333]"
                }`}
              >
                {/* امتیاز */}
                <div className="absolute right-5 top-2 z-10 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-black">
                  <span>۴.۵</span>
                  <Star size={14} fill="currentColor" />
                </div>

                {/* عکس */}
                <div className="relative h-[230px] w-full overflow-hidden rounded-[24px] bg-[#444444]">
                  {property.image ? (
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>

                {/* دکمه فلش */}
                <div className="absolute left-5 top-3 flex h-7 w-12 items-center justify-center rounded-xl bg-white/10">
                  ←
                </div>

                {/* عنوان روی عکس */}
                <div className="absolute bottom-5 right-7 z-10">
                  <h3 className="text-base font-semibold text-white">
                    {property.title}
                  </h3>
                </div>
              </div>

              {/* اطلاعات */}
              <div className="mt-5 px-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">
                    {property.title}
                  </h3>

                  <span className="rounded-full bg-[#FF5B65] px-3 py-2 text-xs">
                    مشابه
                  </span>
                </div>

                {/* موقعیت */}
                <div className="mt-4 flex items-center gap-2 text-sm text-white/50">
                  <MapPin size={17} />
                  <span>{property.location}</span>
                </div>

                {/* اتاق */}
                <div className="mt-3 flex items-center gap-2 text-sm text-white/50">
                  <BedDouble size={17} />
                  <span>{property.rooms} اتاق خواب</span>
                </div>

                {/* متراژ */}
                <div className="mt-3 text-sm text-white/50">
                  متراژ: {property.area} متر
                </div>

                {/* قیمت */}
                <div
                  className={`mt-6 flex items-center justify-between rounded-[18px] px-5 py-4 ${
                    isActive
                      ? "bg-[#8CFF45] text-black"
                      : "bg-[#444444] text-white"
                  }`}
                >
                  <div className="text-right">
                    <p className="text-xs opacity-60">
                      رهن
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {property.mortgage.toLocaleString("fa-IR")} تومان
                    </p>
                  </div>

                  <div className="h-8 w-px bg-current opacity-20" />

                  <div className="text-left">
                    <p className="text-xs opacity-60">
                      اجاره ماهانه
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {property.rent.toLocaleString("fa-IR")} تومان
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pagination */}
      {properties.length > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {properties.map((property, index) => (
            <button
              key={property.id}
              type="button"
              aria-label={`انتخاب ملک ${index + 1}`}
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`h-[6px] rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-[18px] bg-[#8CFF45]"
                  : "w-[6px] bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}