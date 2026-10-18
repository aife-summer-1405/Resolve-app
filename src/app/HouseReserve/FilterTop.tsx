"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation"; 
import {
    ChevronDown,
    LocationEdit,
    Megaphone,
    Search,
    SortDesc,
    X,
    SlidersHorizontal,
} from "lucide-react";
import { IHouseFilters } from "@/src/types/house";

interface FilterTopProps {
    filters: IHouseFilters;
}


type FilterState = {
    location: string;
    sort: string;
    order: "ASC" | "DESC";
    search: string;
};

interface FiltersProps {
    draft: FilterState;
    onLocationChange: (location: string) => void;
    onSortChange: (sort: string, order: "ASC" | "DESC") => void;
    onSearchChange: (search: string) => void;
}

const fieldClass =
    "w-full rounded-2xl border border-gray-500 bg-[#303030] px-3 py-3 pr-10 pl-10 text-right text-gray-400 outline-none transition-colors focus:border-white focus:text-white";

const iconClass =
    "pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white";

const labelClass =
    "absolute right-6 top-0 -translate-y-1/2 bg-[#303030] px-1 text-sm text-gray-400 transition-colors group-focus-within:text-white";

const Filters = ({
    draft,
    onLocationChange,
    onSortChange,
    onSearchChange,
}: FiltersProps) => {
    return (
        <>
            <div className="group relative min-w-0 flex-1">
                <select
                    value={draft.location}
                    onChange={(event) => onLocationChange(event.target.value)}
                    dir="rtl"
                    className={`${fieldClass} appearance-none`}
                >
                    <option value="">استان، شهر و...</option>
                    <option value="tehran">تهران</option>
                    <option value="mashhad">مشهد</option>
                    <option value="kish">کیش</option>
                    <option value="isfahan">اصفهان</option>
                </select>

                <ChevronDown size={20} className={`${iconClass} left-3`} />
                <LocationEdit size={20} className={`${iconClass} right-3`} />

                <label className={labelClass}>موقعیت ملک:</label>
            </div>

            <div className="group relative min-w-0 flex-1">
                <select
                    value={`${draft.sort}:${draft.order}`}
                    onChange={(event) => {
                        const [sort, order] = event.target.value.split(":");

                        onSortChange(sort, order as "ASC" | "DESC");
                    }}
                    dir="rtl"
                    className={`${fieldClass} appearance-none`}
                >
                    <option value="last_updated:DESC">جدیدترین</option>
                    <option value="last_updated:ASC">قدیمی‌ترین</option>
                    <option value="price:ASC">قیمت: از کم به زیاد</option>
                    <option value="price:DESC">قیمت: از زیاد به کم</option>
                </select>

                <ChevronDown size={20} className={`${iconClass} left-3`} />
                <SortDesc size={20} className={`${iconClass} right-3`} />

                <label className={labelClass}>مرتب‌سازی بر اساس:</label>
            </div>

            <div className="group relative min-w-0 flex-[2]">
                <input
                    type="text"
                    value={draft.search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder=" "
                    dir="rtl"
                    className={fieldClass}
                />

                <Search size={20} className={`${iconClass} left-3`} />

                <label className={`${labelClass} right-10`}>جستجو:</label>
            </div>
        </>
    );
};

export const FilterTop = ({ filters }: FilterTopProps) => {
    const router = useRouter();
    const pathname = usePathname(); 

    const [isOpen, setIsOpen] = useState(false);

    const [draft, setDraft] = useState<FilterState>({
        location: filters.location ?? "",
        sort: filters.sort ?? "last_updated",
        order: filters.order ?? "DESC",
        search: filters.search ?? "",
    });

    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearSearchTimeout = () => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
            searchTimeout.current = null;
        }
    };

    const applyFilters = (values: FilterState) => {
        const params = new URLSearchParams(window.location.search);

        const valuesToApply = {
            location: values.location,
            sort: values.sort,
            order: values.order,
            search: values.search.trim(),
        };

        Object.entries(valuesToApply).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        params.set("page", "1");

        setDraft(values);

  
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleLocationChange = (location: string) => {
        clearSearchTimeout();

        applyFilters({
            ...draft,
            location,
        });

        setIsOpen(false); 
    };

    const handleSortChange = (
        sort: string,
        order: "ASC" | "DESC",
    ) => {
        clearSearchTimeout();

        applyFilters({
            ...draft,
            sort,
            order,
        });

        setIsOpen(false); 
    };

    const handleSearchChange = (search: string) => {
        const nextDraft = {
            ...draft,
            search,
        };

        setDraft(nextDraft);
        clearSearchTimeout();

        searchTimeout.current = setTimeout(() => {
            applyFilters(nextDraft);
            searchTimeout.current = null;
        }, 500); 
    };

    useEffect(() => {
        if (searchTimeout.current) return;

        setDraft({
            location: filters.location ?? "",
            sort: filters.sort ?? "last_updated",
            order: filters.order ?? "DESC",
            search: filters.search ?? "",
        });
    }, [filters.location, filters.sort, filters.order, filters.search]);

    useEffect(() => {
        return () => {
            clearSearchTimeout();
        };
    }, []);

    return (
        <>
            <div className="flex flex-row-reverse flex-wrap items-center justify-between gap-4 rounded-3xl bg-[#303030] px-6 py-6">
                <div className="hidden w-2/3 flex-row-reverse gap-4 md:flex">
                    <Filters
                        draft={draft}
                        onLocationChange={handleLocationChange}
                        onSortChange={handleSortChange}
                        onSearchChange={handleSearchChange}
                    />
                </div>

                <div className="hidden items-center gap-2 rounded-2xl border border-gray-500 p-3 text-gray-400 md:flex">
                    <Megaphone size={20} />
                    <p>تعداد آگهی: 33</p>
                </div>

                <div className="flex w-full items-center gap-3 md:hidden">
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-gray-500 px-4 py-3 text-gray-400"
                    >
                        <Search size={20} />
                        <span className="flex-1 text-right">
                            جستجوی موقعیت و...
                        </span>
                        <SlidersHorizontal size={20} />
                    </button>

                    <div className="flex shrink-0 items-center gap-2 text-sm text-gray-400">
                        <Megaphone size={18} />
                        <span>33 آگهی</span>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-end bg-black/60 md:hidden"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="filter-modal-title"
                        dir="rtl"
                        className="max-h-[85dvh] w-full overflow-y-auto rounded-t-3xl bg-[#303030] p-5"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-8 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                aria-label="بستن فیلترها"
                                className="rounded-full p-2 text-gray-300 hover:bg-white/10"
                            >
                                <X size={22} />
                            </button>

                            <h2
                                id="filter-modal-title"
                                className="text-lg font-semibold text-white"
                            >
                                جستجو و فیلتر
                            </h2>
                        </div>

                        <div className="flex flex-col gap-7">
                            <Filters
                                draft={draft}
                                onLocationChange={handleLocationChange}
                                onSortChange={handleSortChange}
                                onSearchChange={handleSearchChange}
                            />

                            <div className="flex items-center justify-between rounded-2xl border border-gray-500 p-4 text-gray-300">
                                <span>تعداد آگهی</span>
                                <span>33</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};