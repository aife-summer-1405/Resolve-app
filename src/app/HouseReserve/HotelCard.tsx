"use client";

import { Building2, Clock3, MapPin, Star } from "lucide-react";
import type { House } from "@/src/services/houseService";

interface HotelCardProps {
    house: House;
}

const HotelCard = ({ house }: HotelCardProps) => {
    return (
        <article
            dir="rtl"
            className="flex w-full flex-col gap-5 border-b border-gray-700 bg-[#303030] p-5 text-white md:flex-row md:items-center md:gap-6 md:px-8 md:py-5"
        >
            <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl border-2 border-lime-400 md:h-[138px] md:w-[148px]">
                <img
                    src={house.images?.[0] || "/images/hotel.jpg"}
                    alt={house.title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-3">
                <span className="flex w-fit items-center gap-1 rounded-lg bg-violet-500 px-3 py-1 text-sm">
                    <Star size={14} fill="currentColor" />
                    <span>ملک</span>
                </span>

                <h2 className="text-lg font-bold md:text-xl">
                    {house.title}
                </h2>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin size={16} className="shrink-0" />
                    <span>
                        {house.location || "موقعیت ثبت نشده"}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock3 size={16} />
                    <span>
                        {house.area != null
                            ? `متراژ: ${house.area} متر`
                            : "متراژ ثبت نشده"}
                    </span>
                </div>
            </div>

            <div className="flex shrink-0 flex-col gap-4 md:min-w-[220px] md:items-start">
                <p className="text-xl font-bold text-lime-400 md:text-2xl">
                    {house.price != null
                        ? `${Number(house.price).toLocaleString("fa-IR")} تومان`
                        : "قیمت ثبت نشده"}
                </p>

                <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl border border-lime-400 px-5 py-3 font-bold text-lime-400 transition-colors duration-300 hover:bg-lime-400 hover:text-gray-900"
                >
                    <Building2 size={20} />
                    بررسی ملک
                </button>
            </div>
        </article>
    );
};

export default HotelCard;