"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { MouseEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  MoreHorizontal,
  PlusCircle,
  XCircle,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";
import FormInput from "@/src/components/molecules/FormInput/FormInput";
import Pagination from "@/src/components/common/Pagination";

interface IFavorite {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  address: string;
  propertyType: string;
  location: string;
}

interface IFavoriteFilters {
  propertyType: string;
  location: string;
  minPrice: string;
  maxPrice: string;
}

const FavoritesSection = () => {
  const t = useTranslations("FavoritesSection");
  const locale = useLocale();

  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [currentPage, setCurrentPage] = useState(1);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<IFavoriteFilters>({
    propertyType: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const favorites = useMemo<IFavorite[]>(
    () => [
      {
        id: 1,
        name: locale === "fa" ? "هتل سرایوان رشت" : "Saravan Hotel Rasht",
        price: "۱۰,۸۰۰,۰۰۰",
        priceValue: 10800000,
        address:
          locale === "fa"
            ? "گیلان، رشت، میدان آزادی، جنب چهارراه عطا، ..."
            : "Gilan, Rasht, Azadi Square, next to Ata intersection, ...",
        propertyType: "apartment",
        location: "rasht",
      },
      {
        id: 2,
        name: locale === "fa" ? "هتل سرایوان رشت" : "Saravan Hotel Rasht",
        price: "۱۰,۸۰۰,۰۰۰",
        priceValue: 10800000,
        address:
          locale === "fa"
            ? "گیلان، رشت، میدان آزادی، جنب چهارراه عطا، ..."
            : "Gilan, Rasht, Azadi Square, next to Ata intersection, ...",
        propertyType: "apartment",
        location: "rasht",
      },
      {
        id: 3,
        name: locale === "fa" ? "هتل سرایوان رشت" : "Saravan Hotel Rasht",
        price: "۱۰,۸۰۰,۰۰۰",
        priceValue: 10800000,
        address:
          locale === "fa"
            ? "گیلان، رشت، میدان آزادی، جنب چهارراه عطا، ..."
            : "Gilan, Rasht, Azadi Square, next to Ata intersection, ...",
        propertyType: "apartment",
        location: "rasht",
      },
      {
        id: 4,
        name: locale === "fa" ? "هتل سرایوان رشت" : "Saravan Hotel Rasht",
        price: "۱۰,۸۰۰,۰۰۰",
        priceValue: 10800000,
        address:
          locale === "fa"
            ? "گیلان، رشت، میدان آزادی، جنب چهارراه عطا، ..."
            : "Gilan, Rasht, Azadi Square, next to Ata intersection, ...",
        propertyType: "apartment",
        location: "rasht",
      },
      {
        id: 5,
        name: locale === "fa" ? "هتل سرایوان رشت" : "Saravan Hotel Rasht",
        price: "۱۰,۸۰۰,۰۰۰",
        priceValue: 10800000,
        address:
          locale === "fa"
            ? "گیلان، رشت، میدان آزادی، جنب چهارراه عطا، ..."
            : "Gilan, Rasht, Azadi Square, next to Ata intersection, ...",
        propertyType: "apartment",
        location: "rasht",
      },
    ],
    [locale],
  );

  const filteredFavorites = useMemo(() => {
    return favorites.filter((favorite) =>
      favorite.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [favorites, search]);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        event.target instanceof Element &&
        !event.target.closest("[data-favorite-menu]") &&
        !event.target.closest("[data-favorite-popup]")
      ) {
        setActiveMenu(null);
      }
    };

    const handleScroll = () => {
      setActiveMenu(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  const handleMenuClick = (
    event: MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    if (activeMenu === id) {
      setActiveMenu(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    setMenuPosition({
      top: rect.bottom + 6,
      left: Math.max(8, Math.min(rect.right - 80, window.innerWidth - 136)),
    });

    setActiveMenu(id);
  };

  const handleCloseFilters = () => {
    setIsFiltersOpen(false);
  };

  const handleApplyFilters = () => {
    setIsFiltersOpen(false);
  };

  return (
    <section dir="rtl" className="w-full rounded-xl bg-surface p-4 sm:p-5">
      <div className="flex flex-col gap-5 border-b border-dashed border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          {t("savedList")}
        </h2>

        <div className="flex items-center gap-3">
          <div className="relative min-w-0 flex-1 sm:w-[268px] sm:flex-none [&_input]:!h-10">
            <FormInput
              name="search"
              label={t("search")}
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => setIsFiltersOpen(true)}
            className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-medium text-black transition-opacity hover:opacity-90"
          >
            {t("filters")}
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="mt-4 w-full overflow-x-auto">
        <table className="w-full min-w-[680px] border-separate border-spacing-y-3 text-right">
          <thead>
            <tr className="bg-background text-xs text-foreground">
              <th className="w-1/10 rounded-r-xl px-3 py-3 font-medium"></th>

              <th className="w-1/4 px-3 py-3 font-medium">{t("name")}</th>

              <th className="w-1/6 px-3 py-3 text-center font-medium">
                {t("price")}
              </th>

              <th className="w-2/5 px-3 py-3 font-medium">{t("address")}</th>

              <th className="w-1/10 rounded-l-xl px-3 py-3 text-center font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {filteredFavorites.map((favorite) => (
              <tr key={favorite.id} className="text-xs text-foreground">
                <td className="px-2 py-1">
                  <div className="flex items-center justify-center">
                    <div className="h-[60px] w-[88px] shrink-0 rounded-xl bg-[#D9D9D9]" />
                  </div>
                </td>

                <td className="whitespace-nowrap px-3 py-3">{favorite.name}</td>

                <td className="whitespace-nowrap px-3 py-3 text-center">
                  {favorite.price}
                </td>

                <td className="px-3 py-3">
                  <span className="block truncate">{favorite.address}</span>
                </td>

                <td data-favorite-menu className="px-3 py-3 text-center">
                  <button
                    type="button"
                    onClick={(e) => handleMenuClick(e, favorite.id)}
                    aria-label={t("actions")}
                    className="rounded-md p-1 text-foreground transition-colors hover:bg-background"
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredFavorites.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-xs text-muted"
                >
                  {t("empty")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted">
          {t("page")} {currentPage}
        </span>

        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
      </div>

      {activeMenu !== null &&
        createPortal(
          <div
            data-favorite-popup
            style={{
              position: "fixed",
              top: menuPosition.top,
              left: menuPosition.left,
            }}
            className="z-[9999] w-32 rounded-xl border border-border bg-surface p-1.5 shadow-lg"
          >
            <button
              type="button"
              onClick={() => setActiveMenu(null)}
              className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-[11px] text-foreground hover:bg-background"
            >
              {t("reserve")}
              <PlusCircle size={14} />
            </button>

            <button
              type="button"
              onClick={() => setActiveMenu(null)}
              className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-[11px] text-foreground hover:bg-background"
            >
              {t("delete")}
              <XCircle size={14} />
            </button>
          </div>,
          document.body,
        )}

      {isFiltersOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3"
          onClick={handleCloseFilters}
        >
          <div
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[520px] rounded-[10px] bg-surface p-4"
          >
            <div className="flex items-center justify-between border-b border-dashed border-border pb-4">
              <h3 className="text-sm font-medium text-foreground">
                {t("filterTitle")}
              </h3>

              <button
                type="button"
                onClick={handleCloseFilters}
                className="flex h-[38px] items-center gap-2 rounded-full border border-red-400 px-4 text-[11px] text-red-500"
              >
                {t("close")}
                <X size={15} />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6">
              <div className="relative">
                <label className="absolute -top-[7px] start-3 z-10 bg-surface px-1 text-[9px] text-muted">
                  {t("propertyType")}
                </label>

                <select
                  value={filters.propertyType}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      propertyType: e.target.value,
                    }))
                  }
                  className="h-[42px] w-full appearance-none rounded-[14px] border border-[#BDBDBD] bg-transparent ps-3 pe-8 text-[10px] text-foreground outline-none focus:border-primary"
                >
                  <option value="">{t("apartment")}</option>
                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-[7px] start-3 z-10 bg-surface px-1 text-[9px] text-muted">
                  {t("destination")}
                </label>

                <select
                  value={filters.location}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="h-[42px] w-full appearance-none rounded-[14px] border border-[#BDBDBD] bg-transparent ps-3 pe-8 text-[10px] text-foreground outline-none focus:border-primary"
                >
                  <option value="">{t("destinationPlaceholder")}</option>
                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-[7px] start-3 z-10 bg-surface px-1 text-[9px] text-muted">
                  {t("minPrice")}
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minPrice: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  placeholder={t("toman")}
                  className="h-[42px] w-full rounded-[14px] border border-[#BDBDBD] bg-transparent px-3 text-[10px] text-foreground outline-none placeholder:text-muted focus:border-primary"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-[7px] start-3 z-10 bg-surface px-1 text-[9px] text-muted">
                  {t("maxPrice")}
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  placeholder={t("toman")}
                  className="h-[42px] w-full rounded-[14px] border border-[#BDBDBD] bg-transparent px-3 text-[10px] text-foreground outline-none placeholder:text-muted focus:border-primary"
                />
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={handleApplyFilters}
                className="h-[40px] rounded-[10px] bg-primary px-5 text-[11px] font-medium text-black transition-opacity hover:opacity-90"
              >
                {t("applyFilter")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FavoritesSection;
