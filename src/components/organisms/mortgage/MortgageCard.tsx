import Link from "next/link";
import { Star, MapPin, BedDouble, CarFront, Bath } from "lucide-react";
import FileContainer from "@/src/components/Ui/FileContainer";
import type { House } from "@/src/services/houseService";
import HouseImage from "../../molecules/HouseImage";

interface MortgageCardProps {
  house: House;
}

export default function MortgageCard({ house }: MortgageCardProps) {
  const price = Number(house.price);

  return (
    <article dir="ltr" className="w-full pt-5">
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
        <div className="group h-full rounded-b-[24px] rounded-tl-[24px] bg-[#393939] p-[3px] transition-colors duration-200">
          <div className="grid h-full grid-cols-[minmax(0,1fr)_170px] gap-2 rounded-b-[20px] rounded-tl-[20px] bg-[#393939] p-2 sm:gap-3">
            <div dir="rtl" className="flex min-w-0 flex-col justify-between py-1">
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="min-w-0 truncate text-sm font-semibold text-white sm:text-[15px]">
                    {house.title}
                  </h2>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#8170FF] px-2 py-1 text-[10px] font-medium text-white">
                    <Star size={11} fill="currentColor" />
                    {house.rate} ستاره
                  </span>
                </div>

                <p className="mt-3 flex items-center gap-1 text-[11px] text-white/65">
                  <span className="truncate">آدرس: {house.address}</span>
                  <MapPin size={13} className="shrink-0" />
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-white/70 sm:text-[11px]">
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <BedDouble size={13} />
                    {house.rooms.toLocaleString("fa-IR")} خوابه
                  </span>

                  {house.parking > 0 && (
                    <>
                      <span className="text-white/35">|</span>
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <CarFront size={13} />
                        پارکینگ
                      </span>
                    </>
                  )}

                  {house.bathrooms > 0 && (
                    <>
                      <span className="text-white/35">|</span>
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Bath size={13} />
                        {house.bathrooms.toLocaleString("fa-IR")} حمام
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div dir="ltr" className="flex items-end justify-between gap-2">
                <Link
                  href={`/Mortgage/${house.id}`}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#91FF45] px-3 py-2 text-[10px] font-medium text-[#91FF45] transition-colors duration-200 group-hover:border-[#8CFF45] group-hover:bg-[#8CFF45] group-hover:text-black sm:px-4"
                >
                  <span aria-hidden="true" className="text-base leading-none">
                    ‹
                  </span>
                  <span dir="rtl">مشاهده ملک</span>
                </Link>

                <p className="whitespace-nowrap text-left text-base font-bold text-[#91FF45] sm:text-lg">
                  {Number.isFinite(price) ? price.toLocaleString("fa-IR") : "—"}
                </p>
              </div>
            </div>

            <div className="relative h-full w-full overflow-hidden rounded-[12px]">
              <div className="relative h-full w-full overflow-hidden rounded-[12px]">
                <HouseImage
                  src={house.photos?.[0]}
                  alt={house.title}
                  sizes="(max-width: 640px) 155px, 210px"
                />
              </div>
            </div>
          </div>
        </div>
      </FileContainer>
    </article>
  );
}