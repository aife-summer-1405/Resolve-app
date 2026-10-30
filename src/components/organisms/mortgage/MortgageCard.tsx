"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Star,
  MapPin,
  BedDouble,
  CarFront,
  Bath,
} from "lucide-react";
import FileContainer from "@/src/components/Ui/FileContainer";

export interface MortgageProperty {
  id: number;
  title: string;
  location: string;
  image: string;
  area: number;
  rooms: number;
  floor: string;
  mortgage: number;
  rent: number;
}

interface MortgageCardProps {
  property: MortgageProperty;
}

export default function MortgageCard({ property }: MortgageCardProps) {

  return (
    <article
      dir="ltr"
      className="w-full pt-5"
    >
      <FileContainer
        background="#393939"
        radius="md"
        size="md"
        width="100%"
        height="170px"
        labelWidth="120px"
        labelHeight="33px"
        tagHeight="24px"
        classNames={{
          base: "transition-colors duration-200",
          wrapperLabel: "transition-colors duration-200",
          coverHollow: "transition-shadow duration-200",
          innerLabel: "h-full p-0!",
        }}
        label={null}
      >

          <div
            className="group h-full rounded-b-[24px] rounded-tl-[24px] bg-[#393939] p-[3px] transition-colors duration-200"
          >        
          <div className="grid h-full grid-cols-[minmax(0,1fr)_170px] gap-2 rounded-b-[20px] rounded-tl-[20px] bg-[#393939] p-2 sm:grid-cols-[minmax(0,1fr)_170px] sm:gap-3">
            <div
              dir="rtl"
              className="flex min-w-0 flex-col justify-between py-1"
            >
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="min-w-0 truncate text-sm font-semibold text-white sm:text-[15px]">
                    {property.title}
                  </h2>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#8170FF] px-2 py-1 text-[10px] font-medium text-white">
                    <Star size={11} fill="currentColor" />
                    ۵ ستاره
                  </span>
                </div>

                <p className="mt-3 flex items-center gap-1 text-[11px] text-white/65">
                  <span className="truncate">
                    آدرس: {property.location}
                  </span>
                  <MapPin size={13} className="shrink-0" />
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-white/70 sm:text-[11px]">
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <BedDouble size={13} />
                    {property.rooms} خوابه
                  </span>

                  <span className="text-white/35">|</span>

                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <CarFront size={13} />
                    پارکینگ
                  </span>
                  <span className="text-white/35">|</span>
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <Bath size={13} />
                    ۲ حمام
                  </span>
                </div>
              </div>

              <div
                dir="ltr"
                className="flex items-end justify-between gap-2"
              >

            <Link
              href={`/Mortgage/${property.id}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#91FF45] px-3 py-2 text-[10px] font-medium text-[#91FF45] transition-colors duration-200 group-hover:border-[#8CFF45] group-hover:bg-[#8CFF45] group-hover:text-black sm:px-4"
            >
                <span
                aria-hidden="true"
                className="text-base leading-none"
              >
                ‹
              </span>
              <span dir="rtl">مشاهده ملک</span>

            </Link>                

                <p className="whitespace-nowrap text-left text-base font-bold text-[#91FF45] sm:text-lg">
                  {property.rent.toLocaleString("fa-IR")}
                </p>
              </div>
            </div>

            <div className="relative h-full w-full overflow-hidden rounded-[12px]">
              <Image
                src={property.image}
                alt={property.title}
                fill
                sizes="(max-width: 640px) 155px, 210px"
                className="object-cover"
              />
            </div>            
          </div>
        </div>
      </FileContainer>
    </article>
  );
}
