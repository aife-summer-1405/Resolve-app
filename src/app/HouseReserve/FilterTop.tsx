"use client";

import {
    ChevronDown,
    LocationEdit,
    Megaphone,
    Search,
    SortDesc,
} from "lucide-react";

    const fieldClass =
        "w-full rounded-2xl border border-gray-500 bg-[#303030] px-3 py-3 pr-10 pl-10 text-right text-gray-400 outline-none transition-colors focus:border-white focus:text-white";

    const iconClass =
        "pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white";

    const labelClass =
        "absolute right-6 top-0 -translate-y-1/2 bg-[#303030] px-1 text-sm text-gray-400 transition-colors group-focus-within:text-white";
export const FilterTop = () => {
  return (
<div className="flex flex-row-reverse flex-wrap rounded-3xl items-center justify-between gap-8 bg-[#303030] px-6 py-6">
                    <div className="flex flex-row-reverse w-2/3 gap-4">
                        <div className="group relative min-w-56 flex-1">
                            <select
                                id="destination"
                                defaultValue=""
                                dir="rtl"
                                className={`${fieldClass} appearance-none`}
                            >
                                <option value="" disabled>
                                    استان، شهر، هتل و...
                                </option>
                                <option value="tehran">تهران</option>
                                <option value="mashhad">مشهد</option>
                                <option value="kish">کیش</option>
                                <option value="isfahan">اصفهان</option>
                            </select>

                            <ChevronDown
                                size={20}
                                className={`${iconClass} left-3`}
                            />

                            <LocationEdit
                                size={20}
                                className={`${iconClass} right-3`}
                            />

                            <label
                                htmlFor="destination"
                                className={labelClass}
                            >
                                مقصد یا هتل شما:
                            </label>
                        </div>

                        <div className="group relative min-w-56 flex-1">
                            <select
                                id="sort"
                                defaultValue=""
                                dir="rtl"
                                className={`${fieldClass} appearance-none`}
                            >
                                <option value="" disabled>
                                    انتخاب کنید
                                </option>
                                <option value="newest">جدیدترین</option>
                                <option value="oldest">قدیمی‌ترین</option>
                                <option value="price-low">
                                    قیمت: از کم به زیاد
                                </option>
                                <option value="price-high">
                                    قیمت: از زیاد به کم
                                </option>
                                <option value="popular">محبوب‌ترین</option>
                            </select>

                            <ChevronDown
                                size={20}
                                className={`${iconClass} left-3`}
                            />

                            <SortDesc
                                size={20}
                                className={`${iconClass} right-3`}
                            />

                            <label htmlFor="sort" className={labelClass}>
                                مرتب‌سازی بر اساس:
                            </label>
                        </div>

                        <div className="group relative min-w-56 flex-2">
                            <input
                                id="search"
                                type="text"
                                placeholder=" "
                                dir="rtl"
                                className={fieldClass}
                            />

                            <Search
                                size={20}
                                className={`${iconClass} left-3`}
                            />

                            <label
                                htmlFor="search"
                                className={`${labelClass} right-10`}
                            >
                                جستجو:
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse items-center gap-2 rounded-2xl border border-gray-500 p-3 text-gray-400">
                        <Megaphone size={20} />
                        <p>تعداد آگهی: 33</p>
                    </div>
                </div>
  )
}
