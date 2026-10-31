"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { IHouseFilters } from "@/src/types/HousereservesType/HouseFilterType";
import { fieldClass, iconClass, labelClass } from "./filterStyles";
import type { ICategory } from "@/src/types/HousereservesType/CategoriesType";
const DEBOUNCE_MS = 500;

interface FilterbottomProps {
  filters: IHouseFilters;
  categories: ICategory[];
}

type FilterState = {
  minPrice: string;
  maxPrice: string;
  propertyType: string;
};

interface PriceFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const formatPrice = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const PriceField = ({ id, label, value, onChange }: PriceFieldProps) => (
  <div className="group relative min-w-0">
    <input
      id={id}
      min="0"
      inputMode="numeric"
      value={formatPrice(value)}
      onChange={(event) => onChange(event.target.value.replace(/\D/g, ""))}
      dir="rtl"
      className={`${fieldClass} pl-16 text-left`}
      placeholder="قیمت را به انگلیسی وارد نمایید."
    />

    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white">
      تومان
    </span>

    <label htmlFor={id} className={labelClass}>
      {label}
    </label>
  </div>
);

export const Filterbottom = ({ filters, categories }: FilterbottomProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { minPrice, maxPrice, propertyType } = filters;

  const [draft, setDraft] = useState<FilterState>({
    minPrice: minPrice?.toString() ?? "",
    maxPrice: maxPrice?.toString() ?? "",
    propertyType: propertyType ?? "",
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPending = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const applyFilters = (values: FilterState) => {
    const params = new URLSearchParams(window.location.search);

    Object.entries(values).forEach(([key, value]) => {
      const trimmed = value.trim();

      if (trimmed !== "") {
        params.set(key, trimmed);
      } else {
        params.delete(key);
      }
    });

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleChange = (
    key: keyof FilterState,
    value: string,
    immediate = false,
  ) => {
    const next = { ...draft, [key]: value };

    setDraft(next);
    clearPending();

    if (immediate) {
      applyFilters(next);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      applyFilters(next);
    }, DEBOUNCE_MS);
  };

  useEffect(() => {
    if (timeoutRef.current) return;

    setDraft({
      minPrice: minPrice?.toString() ?? "",
      maxPrice: maxPrice?.toString() ?? "",
      propertyType: propertyType ?? "",
    });
  }, [minPrice, maxPrice, propertyType]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="grid gap-4 border-b-2 border-[#4E4E4E] pb-6 md:grid-cols-3">
      <PriceField
        id="min-price"
        label="حداقل قیمت:"
        value={draft.minPrice}
        onChange={(value) => handleChange("minPrice", value)}
      />

      <PriceField
        id="max-price"
        label="حداکثر قیمت:"
        value={draft.maxPrice}
        onChange={(value) => handleChange("maxPrice", value)}
      />

      <div className="group relative min-w-0">
        <select
          id="propertyType"
          value={draft.propertyType}
          onChange={(event) =>
            handleChange("propertyType", event.target.value, true)
          }
          dir="rtl"
          className={`${fieldClass} appearance-none pl-10`}
        >
          <option value="">همه انواع ملک</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <ChevronDown size={20} className={`${iconClass} left-3`} />

        <label htmlFor="propertyType" className={labelClass}>
          نوع ملک:
        </label>
      </div>
    </div>
  );
};