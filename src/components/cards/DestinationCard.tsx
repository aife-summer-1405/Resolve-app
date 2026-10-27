"use client";

import { FC } from "react";
import Image from "next/image";
import { IDestination } from "@/src/core/types/IDestination";
import FileContainer from "../Ui/FileContainer";

interface IDestinationCardProps {
  destination: IDestination & {
    rating?: number;
    count?: number;
  };
}

const toFa = (value: number | string) =>
  String(value)
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])
    .replace(".", "٫");

const DestinationCard: FC<IDestinationCardProps> = ({ destination }) => {
  const count = destination.count ?? 56;
  const score = destination.rating ?? 4.5;

  return (
    <article className="group w-[306px] text-white">
      <FileContainer
        background="#393939"
        radius="md"
        size="md"
        label={
          <span className="text-sm font-semibold text-white transition-colors duration-200 group-hover:text-[#2D2D2D]">
            ★ {toFa(score)}
          </span>
        }
        labelHeight="30px"
        labelWidth="100px"
        width="306px"
        classNames={{
          base: "h-[240px] p-4 pt-[32px] !bg-[#393939] transition-colors duration-200 group-hover:!bg-[#8CFF45]",
          innerLabel: "!p-0 flex justify-center items-center",
          wrapperLabel:
            "!bg-[#393939] transition-colors duration-200 group-hover:!bg-[#8CFF45]",
          coverHollow:
            "transition-colors duration-200 group-hover:!text-[#8CFF45]",
        }}
      >
        <div className="absolute inset-x-[18px] bottom-[30px] top-[54px] overflow-hidden rounded-[22px] bg-[#444]">
          <Image
            src={destination.image}
            alt={destination.title}
            fill
            sizes="270px"
            className="object-cover"
          />

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className="h-[7px] w-[7px] rounded-full bg-white/90"
              />
            ))}
          </div>
        </div>
      </FileContainer>

      <div className="mt-4 flex items-center gap-1.5 pe-2">
        <h3 className="text-[16px] font-semibold">{destination.title}</h3>

        <span className="text-[12px] text-white/50">({toFa(count)} مورد)</span>
      </div>
    </article>
  );
};

export default DestinationCard;
