
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { IHouseFilters } from "@/src/types/house";

interface FilterbottomProps {
    filters: IHouseFilters;
}

export const Filterbottom = ({ filters }: FilterbottomProps) => {
    const [draft, setDraft] = useState({
        minPrice: filters.minPrice ?? "",
        maxPrice: filters.maxPrice ?? "",
        propertyType: filters.propertyType ?? "",
    });

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        setDraft({
            minPrice: filters.minPrice ?? "",
            maxPrice: filters.maxPrice ?? "",
            propertyType: filters.propertyType ?? "",
        });
    }, [filters.minPrice, filters.maxPrice, filters.propertyType]);

    const fieldClass =
        "w-full rounded-2xl border border-gray-500 bg-[#303030] px-3 py-3 pr-10 pl-10 text-right text-gray-400 outline-none transition-colors focus:border-white focus:text-white";

    const iconClass =
        "pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white";

    const labelClass =
        "absolute right-6 top-0 -translate-y-1/2 bg-[#303030] px-1 text-sm text-gray-400 transition-colors group-focus-within:text-white";

    const updateDraft = (key: keyof typeof draft, value: string) => {
        setDraft((prev) => ({ ...prev, [key]: value }));
    };

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(draft).forEach(([key, value]) => {
            if (value !== "") {
                params.set(key, String(value));
            } else {
                params.delete(key);
            }
        });

        params.set("page", "1");

        router.push(`?${params.toString()}`);
    };

    return (
        <div className="grid gap-4 border-b-2 border-[#4E4E4E] pb-6 md:grid-cols-3">
            <div className="group relative min-w-0">
                <input
                    id="min-price"
                    type="number"
                    min="0"
                    value={draft.minPrice}
                    onChange={(event) =>
                        updateDraft("minPrice", event.target.value)
                    }
                    dir="rtl"
                    className={`${fieldClass} pl-16`}
                />

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white">
                    تومان
                </span>

                <label htmlFor="min-price" className={labelClass}>
                    حداقل قیمت:
                </label>
            </div>

            <div className="group relative min-w-0">
                <input
                    id="max-price"
                    type="number"
                    min="0"
                    value={draft.maxPrice}
                    onChange={(event) =>
                        updateDraft("maxPrice", event.target.value)
                    }
                    dir="rtl"
                    className={`${fieldClass} pl-16`}
                />

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white">
                    تومان
                </span>

                <label htmlFor="max-price" className={labelClass}>
                    حداکثر قیمت:
                </label>
            </div>

            <div className="group relative min-w-0">
                <select
                    id="propertyType"
                    value={draft.propertyType}
                    onChange={(event) =>
                        updateDraft("propertyType", event.target.value)
                    }
                    dir="rtl"
                    className={`${fieldClass} appearance-none`}
                >
                    <option value="">همه انواع ملک</option>
                    <option value="apartment">آپارتمان</option>
                    <option value="villa">ویلا</option>
                    <option value="land">زمین</option>
                    <option value="commercial">تجاری</option>
                </select>

                <ChevronDown
                    size={20}
                    className={`${iconClass} left-3`}
                />

                <label htmlFor="propertyType" className={labelClass}>
                    نوع ملک:
                </label>
            </div>

            <button
                type="button"
                onClick={applyFilters}
                className="rounded-2xl bg-white px-5 py-3 font-semibold text-black md:col-span-3 md:justify-self-start"
            >
                اعمال فیلترها
            </button>
        </div>
    );
};
