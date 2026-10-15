"use client";

import {
    Building2,
    Clock3,
    MapPin,
    Star,
} from "lucide-react";

export const HotelCard = () => {
    return (
        <article
            dir="rtl"
            className="flex w-full flex-col gap-5 border-b border-gray-700 bg-[#303030] p-5 text-white md:flex-row md:items-center md:gap-6 md:px-8 md:py-5"
        >
            <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl border-2 border-lime-400 md:h-[138px] md:w-[148px]">
                <img
                    src="/images/hotel.jpg"
                    alt="هتل سروران ارمین رشت"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-3">
                <span className="flex w-22  items-center gap-1 rounded-lg bg-violet-500 px-3 py-1 text-sm">

                    <Star size={14} fill="currentColor" />
                    <p>                  5 ستاره
                    </p>
                </span>
                <div className="flex flex-wrap items-center justify-between gap-3">

                    <h2 className="text-lg font-bold md:text-xl">
                        هتل سروران ارمین رشت
                    </h2>


                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin size={16} className="shrink-0" />
                    <span>
                        آدرس: گیلان، رشت، میدان آزادی، جنب چهارراه عطا
                    </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock3 size={16} />
                    <span>مدت زمان: ۱ شب</span>
                </div>
            </div>

            <div className="flex shrink-0 flex-col gap-4 md:min-w-[220px] md:items-start">
                <div className="flex flex-row-reverse items-center gap-3">
                    <span className="rounded-lg bg-red-500 px-3 py-1 text-sm font-bold">
                        ٪۱۵
                    </span>

                    <span className="text-sm text-gray-500 line-through">
                        ۲,۸۰۰,۰۰۰ تومان
                    </span>
                </div>

                <p className="text-xl font-bold text-lime-400 md:text-2xl">
                    ۲,۳۸۰,۰۰۰ تومان
                </p>

                <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl border  px-5 py-3 font-bold text-lime-400 transition-colors duration-300 border-lime-400 hover:bg-lime-400 hover:text-gray-900"
                >
                    <Building2 size={20} />
                    بررسی و رزرو هتل
                </button>
            </div>
        </article>
    );
};

export default HotelCard;