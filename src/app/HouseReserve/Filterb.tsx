"use client";

import { ChevronDown } from 'lucide-react';

export const Filterbottom = () => {
    const fieldClass =
        "w-full rounded-2xl border border-gray-500 bg-[#303030] px-3 py-3 pr-10 pl-10 text-right text-gray-400 outline-none transition-colors focus:border-white focus:text-white";

    const iconClass =
        "pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white";

    const labelClass =
        "absolute right-6 top-0 -translate-y-1/2 bg-[#303030] px-1 text-sm text-gray-400 transition-colors group-focus-within:text-white";
    return (

        <div className="grid  grid-cols-3 gap-4 border-b-2 border-[#4E4E4E] pb-6">

            <div className="group relative min-w-56 flex-1">
                <input
                    id="min-price"

                    min="0"
                    defaultValue="0"
                    dir="rtl"
                    className={`${fieldClass} pl-16`}
                />

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white">
                    تومان
                </span>

                <label
                    htmlFor="min-price"
                    className={labelClass}
                >
                    حداقل قیمت:
                </label>
            </div>

            <div className="group relative min-w-56 flex-1">
                <input
                    id="max-price"
                    min="0"
                    defaultValue="0"
                    dir="rtl"
                    className={`${fieldClass} pl-16`}
                />

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white">
                    تومان
                </span>

                <label
                    htmlFor="max-price"
                    className={labelClass}
                >
                    حداکثر قیمت:
                </label>
            </div>
            <div className="group relative min-w-56 flex-1">
                <select
                    id="destination"
                    defaultValue=""
                    dir="rtl"
                    className={`${fieldClass} appearance-none`}
                >
                    <option value="" disabled>
                        انتخاب کنید                                    </option>
                    <option value="tehran">تهران</option>
                    <option value="mashhad">مشهد</option>
                    <option value="kish">کیش</option>
                    <option value="isfahan">اصفهان</option>
                </select>

                <ChevronDown
                    size={20}
                    className={`${iconClass} left-3`}
                />



                <label
                    htmlFor="destination"
                    className={labelClass}
                >
                    : امکانات هتل
                </label>
            </div>
        </div>
    )
}
