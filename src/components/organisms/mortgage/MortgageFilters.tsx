
"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  SlidersHorizontal,
  ListFilter,
  Building2,
  Banknote,
  Megaphone,
} from "lucide-react";

export interface MortgageFilterValues {
  location: string;
  propertyType: string;
  transactionType: string;
  sort: string;
  search: string;
  minMortgage: string;
  maxMortgage: string;
  minRent: string;
  maxRent: string;
  minArea: string;
  maxArea: string;
}

interface MortgageFiltersProps {
  onFilterChange: (filters: MortgageFilterValues) => void;
  propertyCount?: number;
}

const initialFilters: MortgageFilterValues = {
  location: "",
  propertyType: "apartment",
  transactionType: "rent",
  sort: "newest",
  search: "",
  minMortgage: "",
  maxMortgage: "",
  minRent: "",
  maxRent: "",
  minArea: "",
  maxArea: "",
};

const fieldClass =
  "h-[42px] w-full min-w-0 rounded-[14px] border border-white/50 bg-transparent px-3 text-xs text-white outline-none transition-colors hover:border-white/70 focus:border-[#91FF45]";

const numberFieldClass =
  "h-[42px] w-full min-w-0 rounded-[14px] border border-white/50 bg-transparent px-3 text-xs text-white outline-none transition-colors focus:border-[#91FF45]";

export default function MortgageFilters({
  onFilterChange,
  propertyCount = 33,
}: MortgageFiltersProps) {
  const [filters, setFilters] =
    useState<MortgageFilterValues>(initialFilters);

  const updateFilter = (
    name: keyof MortgageFilterValues,
    value: string,
  ) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const formatNumber = (value: string) => {
    if (!value) return "";
    return Number(value).toLocaleString("fa-IR");
  };

  const handleNumberChange = (
    name: keyof MortgageFilterValues,
    value: string,
  ) => {
    updateFilter(name, value.replace(/[^\d]/g, ""));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  };

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
              value={filters.search}
              onChange={(event) =>
                updateFilter("search", event.target.value)
              }
              placeholder="نام هتل مورد نظر..."
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
              value={filters.transactionType}
              onChange={(event) =>
                updateFilter("transactionType", event.target.value)
              }
              className={`${fieldClass} appearance-none pl-8`}
            >
              <option value="rent" className="bg-[#303030]">
                رهن و اجاره
              </option>
              <option value="mortgage" className="bg-[#303030]">
                رهن کامل
              </option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            />
          </div>

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
              value={filters.propertyType}
              onChange={(event) =>
                updateFilter("propertyType", event.target.value)
              }
              className={`${fieldClass} appearance-none pl-8`}
            >
              <option value="" className="bg-[#303030]">
                همه ملک‌ها
              </option>
              <option value="apartment" className="bg-[#303030]">
                آپارتمان
              </option>
              <option value="villa" className="bg-[#303030]">
                ویلا
              </option>
              <option value="house" className="bg-[#303030]">
                خانه
              </option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            />
          </div>

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
              value={filters.sort}
              onChange={(event) =>
                updateFilter("sort", event.target.value)
              }
              className={`${fieldClass} appearance-none pl-8`}
            >
              <option value="newest" className="bg-[#303030]">
                جدیدترین آگهی‌ها
              </option>
              <option value="price-asc" className="bg-[#303030]">
                ارزان‌ترین
              </option>
              <option value="price-desc" className="bg-[#303030]">
                گران‌ترین
              </option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            />
          </div>

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

            <input
              id="mortgage-location"
              value={filters.location}
              onChange={(event) =>
                updateFilter("location", event.target.value)
              }
              placeholder="استان، شهر ..."
              className={`${fieldClass} pl-8`}
            />

            <ChevronDown
              size={14}
              className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 text-white/70"
            />
          </div>
          
        </div>
        <div className="order-2 flex shrink-0 items-center justify-center lg:order-none">
          <div className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[15px] border border-white/70 px-4 text-xs sm:w-auto">
            <Megaphone size={15} />
            <span>
              تعداد آگهی:{" "}
              <span className="font-bold">
                {propertyCount.toLocaleString("fa-IR")}
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
          value={filters.minMortgage}
          onChange={(value) =>
            handleNumberChange("minMortgage", value)
          }
          formatNumber={formatNumber}
          className={numberFieldClass}
        />

        <NumberField
          id="mortgage-max-mortgage"
          label="حداکثر رهن:"
          unit="تومان"
          value={filters.maxMortgage}
          onChange={(value) =>
            handleNumberChange("maxMortgage", value)
          }
          formatNumber={formatNumber}
          className={numberFieldClass}
        />

        <div className="hidden h-6 w-px justify-self-center bg-white/60 lg:block" />

        <NumberField
          id="mortgage-min-rent"
          label="حداقل اجاره:"
          unit="تومان"
          value={filters.minRent}
          onChange={(value) =>
            handleNumberChange("minRent", value)
          }
          formatNumber={formatNumber}
          className={numberFieldClass}
        />

        <NumberField
          id="mortgage-max-rent"
          label="حداکثر اجاره:"
          unit="تومان"
          value={filters.maxRent}
          onChange={(value) =>
            handleNumberChange("maxRent", value)
          }
          formatNumber={formatNumber}
          className={numberFieldClass}
        />

        <div className="hidden h-6 w-px justify-self-center bg-white/60 lg:block" />

        <NumberField
          id="mortgage-min-area"
          label="حداقل متراژ:"
          unit="متر"
          value={filters.minArea}
          onChange={(value) =>
            handleNumberChange("minArea", value)
          }
          formatNumber={formatNumber}
          className={numberFieldClass}
        />

        <NumberField
          id="mortgage-max-area"
          label="حداکثر متراژ:"
          unit="متر"
          value={filters.maxArea}
          onChange={(value) =>
            handleNumberChange("maxArea", value)
          }
          formatNumber={formatNumber}
          className={numberFieldClass}
        />
      </div>

       <div className="mt-4 flex flex-wrap items-center justify-start gap-3">
        <button
          type="button"
          onClick={applyFilters}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#91FF45] px-5 text-xs font-bold text-black transition hover:bg-[#7ee632]"
        >
          <Search size={15} />
          اعمال فیلترها
        </button>

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
  formatNumber: (value: string) => string;
  className: string;
}

function NumberField({
  id,
  label,
  unit,
  value,
  onChange,
  formatNumber,
  className,
}: NumberFieldProps) {
  return (
    <div className="relative min-w-0">
      <label
        htmlFor={id}
        className="absolute -top-[7px] right-3 z-10 bg-[#222222] px-1 text-[10px] text-white/60"
      >
        {label}
      </label>

      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={formatNumber(value)}
        onChange={(event) => onChange(event.target.value)}
        placeholder={unit}
        className={className}
      />

      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-white/60">
        {unit}
      </span>
    </div>
  );
}
