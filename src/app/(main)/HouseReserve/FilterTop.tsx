"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";

import type { ILocation } from "@/src/types/LocationType";
import type { ICategory } from "@/src/types/HousereservesType/CategoriesType";
import type { IHouseFilters } from "@/src/types/HousereservesType/HouseFilterType";

import {
  ChevronDown,
  LocationEdit,
  Megaphone,
  Search,
  SortDesc,
  X,
  SlidersHorizontal,
} from "lucide-react";

import Field from "@/src/components/Ui/Field";

interface IFilterTopProps {
  filters: IHouseFilters;
  locations: ILocation[];
  categories: ICategory[];
}

type FilterState = {
  location: string;
  propertyType: string;
  sort: string;
  order: "ASC" | "DESC";
  search: string;
};

interface IFiltersProps {
  draft: FilterState;
  locations: ILocation[];
  categories: ICategory[];
  onLocationChange: (location: string) => void;
  onPropertyTypeChange: (propertyType: string) => void;
  onSortChange: (sort: string, order: "ASC" | "DESC") => void;
  onSearchChange: (search: string) => void;
}

const fieldClass =
  "w-full min-w-0 bg-transparent text-right text-sm text-textgray outline-none";

const iconClass = "shrink-0 text-textgray";

const SEARCH_DELAY = 500;

function Filters({
  draft,
  locations,
  categories,
  onLocationChange,
  onPropertyTypeChange,
  onSortChange,
  onSearchChange,
}: IFiltersProps) {
  return (
    <>
      <div className="min-w-0 flex-1">
        <Field legend="موقعیت ملک:">
          <div className="flex items-center gap-2">
            <LocationEdit size={20} className={iconClass} />

            <select
              value={draft.location}
              onChange={(event) =>
                onLocationChange(event.target.value)
              }
              dir="rtl"
              className={fieldClass}
            >
              <option value="">همه شهرها</option>

              {locations.map((location) => (
                <option key={location.id} value={location.areaName}>
                  {location.areaName}
                </option>
              ))}
            </select>

            <ChevronDown size={20} className={iconClass} />
          </div>
        </Field>
      </div>

      <div className="min-w-0 flex-1">
        <Field legend="نوع ملک:">
          <div className="flex items-center gap-2">
            <select
              value={draft.propertyType}
              onChange={(event) =>
                onPropertyTypeChange(event.target.value)
              }
              dir="rtl"
              className={fieldClass}
            >
              <option value="">همه انواع ملک</option>

              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <ChevronDown size={20} className={iconClass} />
          </div>
        </Field>
      </div>

      <div className="min-w-0 flex-1">
        <Field legend="مرتب‌سازی بر اساس:">
          <div className="flex items-center gap-2">
            <SortDesc size={20} className={iconClass} />

            <select
              value={`${draft.sort}:${draft.order}`}
              onChange={(event) => {
                const [sort, order] = event.target.value.split(":");

                onSortChange(sort, order as "ASC" | "DESC");
              }}
              dir="rtl"
              className={fieldClass}
            >
              <option value="last_updated:DESC">جدیدترین</option>
              <option value="last_updated:ASC">قدیمی‌ترین</option>
              <option value="price:ASC">قیمت: از کم به زیاد</option>
              <option value="price:DESC">قیمت: از زیاد به کم</option>
            </select>

            <ChevronDown size={20} className={iconClass} />
          </div>
        </Field>
      </div>

      <div className="min-w-0 flex-[2]">
        <Field legend="جستجو:">
          <div className="flex items-center gap-2">
            <Search size={20} className={iconClass} />

            <input
              type="text"
              value={draft.search}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="جستجوی ملک..."
              dir="rtl"
              className={fieldClass}
            />
          </div>
        </Field>
      </div>
    </>
  );
}

export const FilterTop = ({
  filters,
  locations,
  categories,
}: IFilterTopProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  const [draft, setDraft] = useState<FilterState>({
    location: filters.location ?? "",
    propertyType: filters.propertyType ?? "",
    sort: filters.sort ?? "last_updated",
    order: filters.order ?? "DESC",
    search: filters.search ?? "",
  });

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const clearSearchTimeout = useCallback(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
      searchTimeout.current = null;
    }
  }, []);

  const applyFilters = useCallback(
    (values: FilterState) => {
      const params = new URLSearchParams(
        searchParams?.toString() ?? "",
      );

      const valuesToApply: Record<string, string> = {
        location: values.location,
        propertyType: values.propertyType,
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

      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const handleLocationChange = (location: string) => {
    clearSearchTimeout();

    applyFilters({
      ...draft,
      location,
    });

    setIsOpen(false);
  };

  const handlePropertyTypeChange = (propertyType: string) => {
    clearSearchTimeout();

    applyFilters({
      ...draft,
      propertyType,
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
    }, SEARCH_DELAY);
  };

  useEffect(() => {
    if (searchTimeout.current) return;

    setDraft({
      location: filters.location ?? "",
      propertyType: filters.propertyType ?? "",
      sort: filters.sort ?? "last_updated",
      order: filters.order ?? "DESC",
      search: filters.search ?? "",
    });
  }, [
    filters.location,
    filters.propertyType,
    filters.sort,
    filters.order,
    filters.search,
  ]);

  useEffect(() => {
    return () => clearSearchTimeout();
  }, [clearSearchTimeout]);

  const filterProps: IFiltersProps = {
    draft,
    locations,
    categories,
    onLocationChange: handleLocationChange,
    onPropertyTypeChange: handlePropertyTypeChange,
    onSortChange: handleSortChange,
    onSearchChange: handleSearchChange,
  };

  return (
    <>
      <div className="flex flex-row-reverse flex-wrap items-center justify-between gap-4 rounded-3xl bg-card-2 px-6 py-6">
        <div className="hidden w-2/3 flex-row-reverse gap-4 md:flex">
          <Filters {...filterProps} />
        </div>

        <div className="hidden items-center gap-2 rounded-2xl border border-gray-500 p-3 text-textgray md:flex">
          <Megaphone size={20} />
          <p>تعداد آگهی: 33</p>
        </div>

        <div className="flex w-full items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-gray-500 px-4 py-3 text-textgray"
          >
            <Search size={20} />

            <span className="flex-1 text-right">
              جستجوی موقعیت و...
            </span>

            <SlidersHorizontal size={20} />
          </button>

          <div className="flex shrink-0 items-center gap-2 text-sm text-textgray">
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
            className="max-h-[85dvh] w-full overflow-y-auto rounded-t-3xl bg-card-2 p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="بستن فیلترها"
                className="rounded-full p-2 text-textgray hover:bg-black/5 dark:hover:bg-white/10"
              >
                <X size={22} />
              </button>

              <h2
                id="filter-modal-title"
                className="text-lg font-semibold text-foreground"
              >
                جستجو و فیلتر
              </h2>
            </div>

            <div className="flex flex-col gap-7">
              <Filters {...filterProps} />

              <div className="flex items-center justify-between rounded-2xl border border-gray-500 p-4 text-textgray">
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