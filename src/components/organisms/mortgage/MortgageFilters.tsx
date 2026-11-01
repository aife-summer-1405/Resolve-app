"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  MapPin,
  ChevronDown,
  ListFilter,
  Building2,
  Banknote,
  Megaphone,
} from "lucide-react";

import type { IHouseFilters } from "@/src/types/HousereservesType/HouseFilterType";
import type { ILocation } from "@/src/types/LocationType";
import type { ICategory } from "@/src/types/HousereservesType/CategoriesType";

interface IMortgageFiltersProps {
  filters: IHouseFilters;
  locations: ILocation[];
  categories: ICategory[];
  propertyCount?: number;
}

type FilterState = {
  location: string;
  propertyType: string;
  transactionType: string; // "" = هر دو | "rental" | "mortgage"
  sort: string;
  order: "ASC" | "DESC";
  search: string;
  minMortgage: string;
  maxMortgage: string;
  minRent: string;
  maxRent: string;
  minArea: string;
  maxArea: string;
};

const SEARCH_DELAY = 500;

const fieldClass =
  "h-[42px] w-full min-w-0 rounded-[14px] border border-white/50 bg-transparent px-3 text-xs text-white outline-none transition-colors hover:border-white/70 focus:border-[#91FF45]";

const numberFieldClass =
  "h-[42px] w-full min-w-0 rounded-[14px] border border-white/50 bg-transparent pl-12 pr-3 text-right text-xs text-white outline-none transition-colors focus:border-[#91FF45]";

type NumberKey =
  | "minMortgage"
  | "maxMortgage"
  | "minRent"
  | "maxRent"
  | "minArea"
  | "maxArea";

const toStr = (value: number | undefined) =>
  value === undefined ? "" : String(value);

// تبدیل ارقام فارسی و عربی به لاتین و حذف هر چیز غیر از رقم
const normalizeDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/\D/g, "");

// نمایش با ارقام لاتین و جداکننده‌ی سه‌رقمی
const formatNumber = (value: string) =>
  value ? Number(value).toLocaleString("en-US") : "";

const stateFromFilters = (filters: IHouseFilters): FilterState => {
  const types = filters.transactionType ?? [];

  return {
    location: filters.location ?? "",
    propertyType: filters.propertyType ?? "",
    transactionType: types.length === 1 ? types[0] : "",
    sort: filters.sort ?? "last_updated",
    order: filters.order ?? "DESC",
    search: filters.search ?? "",
    minMortgage: toStr(filters.minMortgage),
    maxMortgage: toStr(filters.maxMortgage),
    minRent: toStr(filters.minRent),
    maxRent: toStr(filters.maxRent),
    minArea: toStr(filters.minArea),
    maxArea: toStr(filters.maxArea),
  };
};

export default function MortgageFilters({
  filters,
  locations,
  categories,
  propertyCount = 0,
}: IMortgageFiltersProps) {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();

  const [draft, setDraft] = useState<FilterState>(() =>
    stateFromFilters(filters),
  );

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSearchTimeout = useCallback(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
      searchTimeout.current = null;
    }
  }, []);

  const applyFilters = useCallback(
    (values: FilterState) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");

      const valuesToApply: Record<string, string> = {
        location: values.location,
        propertyType: values.propertyType,
        transactionType: values.transactionType,
        sort: values.sort,
        order: values.order,
        search: values.search.trim(),
        minMortgage: values.minMortgage,
        maxMortgage: values.maxMortgage,
        minRent: values.minRent,
        maxRent: values.maxRent,
        minArea: values.minArea,
        maxArea: values.maxArea,
      };

      Object.entries(valuesToApply).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });

      params.set("page", "1");

      setDraft(values);

      router.replace(`${pathname || "/"}?${params.toString()}`, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  // فیلدهای انتخابی: بلافاصله اعمال می‌شوند
  const handleSelectChange = (patch: Partial<FilterState>) => {
    clearSearchTimeout();
    applyFilters({ ...draft, ...patch });
  };

  // جست‌وجو و فیلدهای عددی: با تأخیر
  const handleDebouncedChange = (patch: Partial<FilterState>) => {
    const nextDraft = { ...draft, ...patch };

    setDraft(nextDraft);
    clearSearchTimeout();

    searchTimeout.current = setTimeout(() => {
      applyFilters(nextDraft);
      searchTimeout.current = null;
    }, SEARCH_DELAY);
  };

  const handleNumberChange = (name: NumberKey, value: string) => {
    handleDebouncedChange({ [name]: normalizeDigits(value) });
  };

  const resetFilters = () => {
    clearSearchTimeout();

    setDraft({
      location: "",
      propertyType: "",
      transactionType: "",
      sort: "last_updated",
      order: "DESC",
      search: "",
      minMortgage: "",
      maxMortgage: "",
      minRent: "",
      maxRent: "",
      minArea: "",
      maxArea: "",
    });

    router.replace(pathname || "/", { scroll: false });
  };

  // همگام‌سازی با URL (مثلاً دکمه‌ی برگشت مرورگر)، مگر وقتی کاربر در حال تایپ است
  useEffect(() => {
    if (searchTimeout.current) return;
    setDraft(stateFromFilters(filters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.location,
    filters.propertyType,
    filters.transactionType,
    filters.sort,
    filters.order,
    filters.search,
    filters.minMortgage,
    filters.maxMortgage,
    filters.minRent,
    filters.maxRent,
    filters.minArea,
    filters.maxArea,
  ]);

  useEffect(() => {
    return () => clearSearchTimeout();
  }, [clearSearchTimeout]);

  return (
    <section dir="rtl" className="w-full text-white">
      <div className="flex flex-col gap-3 rounded-[22px] bg-[#303030] p-3 lg:flex-row lg:items-center lg:gap-4 lg:px-3 lg:py-3">
        <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="relative min-w-0">
            <label
              htmlFor="mortgage-search"
              className="absolute -top-[7px] right-3 z-10 bg-[#303030] px-1 text-[10px] text-white/60"
            >
              جست‌وجو:
            </label>
            <Search
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
            />
            <input
              id="mortgage-search"
              value={draft.search}
              onChange={(event) =>
                handleDebouncedChange({ search: event.target.value })
              }
              placeholder="نام ملک مورد نظر..."
              className={`${fieldClass} pr-9`}
            />
          </div>

          <div className="relative min-w-0">
            <label
              htmlFor="mortgage-transaction"
              className="absolute -top-[7px] right-3 z-10 bg-[#303030] px-1 text-[10px] text-white/60"
            >
              نوع معامله:
            </label>
            <Banknote
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            />
            <select
              id="mortgage-transaction"
              value={draft.transactionType}
              onChange={(event) =>
                handleSelectChange({ transactionType: event.target.value })
              }
              className={`${fieldClass} appearance-none pl-8`}
            >
              <option value="" className="bg-[#303030]">
                رهن و اجاره
              </option>
              <option value="mortgage" className="bg-[#303030]">
                رهن
              </option>
              <option value="rental" className="bg-[#303030]">
                اجاره
              </option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            />
          </div>

          {/* نوع ملک */}
          <div className="relative min-w-0">
            <label
              htmlFor="mortgage-property-type"
              className="absolute -top-[7px] right-3 z-10 bg-[#303030] px-1 text-[10px] text-white/60"
            >
              نوع ملک:
            </label>
            <Building2
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            />
            <select
              id="mortgage-property-type"
              value={draft.propertyType}
              onChange={(event) =>
                handleSelectChange({ propertyType: event.target.value })
              }
              className={`${fieldClass} appearance-none pl-8`}
            >
              <option value="" className="bg-[#303030]">
                همه انواع ملک
              </option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.name}
                  className="bg-[#303030]"
                >
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            />
          </div>

          {/* مرتب‌سازی */}
          <div className="relative min-w-0">
            <label
              htmlFor="mortgage-sort"
              className="absolute -top-[7px] right-3 z-10 bg-[#303030] px-1 text-[10px] text-white/60"
            >
              مرتب‌سازی براساس:
            </label>
            <ListFilter
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            />
            <select
              id="mortgage-sort"
              value={`${draft.sort}:${draft.order}`}
              onChange={(event) => {
                const [sort, order] = event.target.value.split(":");
                handleSelectChange({ sort, order: order as "ASC" | "DESC" });
              }}
              className={`${fieldClass} appearance-none pl-8`}
            >
              <option value="last_updated:DESC" className="bg-[#303030]">
                جدیدترین
              </option>
              <option value="last_updated:ASC" className="bg-[#303030]">
                قدیمی‌ترین
              </option>
              <option value="price:ASC" className="bg-[#303030]">
                قیمت: از کم به زیاد
              </option>
              <option value="price:DESC" className="bg-[#303030]">
                قیمت: از زیاد به کم
              </option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            />
          </div>

          {/* محل */}
          <div className="relative min-w-0">
            <label
              htmlFor="mortgage-location"
              className="absolute -top-[7px] right-3 z-10 bg-[#303030] px-1 text-[10px] text-white/60"
            >
              محل مورد نظر:
            </label>
            <MapPin
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            />
            <select
              id="mortgage-location"
              value={draft.location}
              onChange={(event) =>
                handleSelectChange({ location: event.target.value })
              }
              className={`${fieldClass} appearance-none pl-8`}
            >
              <option value="" className="bg-[#303030]">
                همه شهرها
              </option>
              {locations.map((location) => (
                <option
                  key={location.id}
                  value={location.areaName}
                  className="bg-[#303030]"
                >
                  {location.areaName}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            />
          </div>
        </div>

        <div className="order-2 flex shrink-0 items-center justify-center lg:order-none">
          <div className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[15px] border border-white/70 px-4 text-xs sm:w-auto">
            <Megaphone size={15} />
            <span>
              تعداد آگهی:{" "}
              <span className="font-bold">
                {propertyCount.toLocaleString("en-US")}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-5 border-b border-white/25 px-1 pb-5 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_12px_1fr_1fr_12px_1fr_1fr] lg:items-center lg:gap-x-3">
        <NumberField
          id="mortgage-min-mortgage"
          label="حداقل رهن:"
          unit="تومان"
          value={draft.minMortgage}
          onChange={(value) => handleNumberChange("minMortgage", value)}
        />
        <NumberField
          id="mortgage-max-mortgage"
          label="حداکثر رهن:"
          unit="تومان"
          value={draft.maxMortgage}
          onChange={(value) => handleNumberChange("maxMortgage", value)}
        />

        <div className="hidden h-6 w-px justify-self-center bg-white/60 lg:block" />

        <NumberField
          id="mortgage-min-rent"
          label="حداقل اجاره:"
          unit="تومان"
          value={draft.minRent}
          onChange={(value) => handleNumberChange("minRent", value)}
        />
        <NumberField
          id="mortgage-max-rent"
          label="حداکثر اجاره:"
          unit="تومان"
          value={draft.maxRent}
          onChange={(value) => handleNumberChange("maxRent", value)}
        />

        <div className="hidden h-6 w-px justify-self-center bg-white/60 lg:block" />

        <NumberField
          id="mortgage-min-area"
          label="حداقل متراژ:"
          unit="متر"
          value={draft.minArea}
          onChange={(value) => handleNumberChange("minArea", value)}
        />
        <NumberField
          id="mortgage-max-area"
          label="حداکثر متراژ:"
          unit="متر"
          value={draft.maxArea}
          onChange={(value) => handleNumberChange("maxArea", value)}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-start gap-3">
        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/30 px-4 text-xs text-white transition hover:border-white/60 hover:bg-white/5"
        >
          پاک کردن فیلترها
        </button>
      </div>
    </section>
  );
}

interface NumberFieldProps {
  id: string;
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
}

function NumberField({ id, label, unit, value, onChange }: NumberFieldProps) {
  return (
    <div className="relative min-w-0">
      <label
        htmlFor={id}
        className="absolute -top-[7px] right-3 z-10 bg-background px-1 text-[10px] text-white/60"
      >
        {label}
      </label>

      <input
        id={id}
        type="text"
        inputMode="numeric"
        dir="ltr"
        value={formatNumber(value)}
        onChange={(event) => onChange(event.target.value)}
        placeholder={unit}
        className={numberFieldClass}
      />

      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-white/60">
        {unit}
      </span>
    </div>
  );
}