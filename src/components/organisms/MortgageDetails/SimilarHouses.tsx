"use client";

import { useState } from "react";

import OfferCard from "@/src/components/molecules/cards/OfferCard";
import type { IOffer } from "@/src/core/types/IOffer";

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
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);

  if (properties.length === 0) {
    return null;
  }

  return (
    <section dir="rtl" className="w-full text-white">
      <div className="grid grid-cols-1 justify-items-center gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {properties.map((property, index) => {
          const offer: IOffer = {
            id: String(property.id),
            title: property.title,
            image: property.image,

            rating: 4.5,
            discount: 0,

            location: property.location,

            amenities: `${property.rooms} اتاق خواب`,

            originalPrice: property.mortgage,
            price: property.rent,
          };

          return (
            <OfferCard
              key={property.id}
              offer={offer}
              isActive={activeOfferIndex === index}
              onClick={() => setActiveOfferIndex(index)}
            />
          );
        })}
      </div>

      {properties.length > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {properties.map((property, index) => (
            <button
              key={property.id}
              type="button"
              aria-label={`انتخاب کارت ${index + 1}`}
              aria-pressed={activeOfferIndex === index}
              onClick={() => setActiveOfferIndex(index)}
              className={`h-[6px] rounded-full transition-all duration-300 ${
                activeOfferIndex === index
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