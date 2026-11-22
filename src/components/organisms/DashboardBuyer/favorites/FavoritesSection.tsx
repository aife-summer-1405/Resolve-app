"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { MouseEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { MoreHorizontal, PlusCircle, XCircle } from "lucide-react";
import FormInput from "@/src/components/molecules/FormInput/FormInput";
import Pagination from "@/src/components/common/Pagination";
import { useUser } from "@/src/hooks/useUser";
import { IGetFavoritesParams } from "@/src/types/dashboard/favorite";
import {
  useDeleteFavorite,
  useGetFavorites,
} from "@/src/hooks/dashboard/useFavorites";

const LIMIT = 10;

type FavoriteSortOption =
  | "updatedAt_DESC"
  | "updatedAt_ASC"
  | "createdAt_DESC"
  | "createdAt_ASC";

const sortOptions: {
  value: FavoriteSortOption;
  label: string;
  sort: "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
}[] = [
  {
    value: "updatedAt_DESC",
    label: "جدیدترین بروزرسانی",
    sort: "updatedAt",
    order: "DESC",
  },
  {
    value: "updatedAt_ASC",
    label: "قدیمی‌ترین بروزرسانی",
    sort: "updatedAt",
    order: "ASC",
  },
  {
    value: "createdAt_DESC",
    label: "جدیدترین ایجاد",
    sort: "createdAt",
    order: "DESC",
  },
  {
    value: "createdAt_ASC",
    label: "قدیمی‌ترین ایجاد",
    sort: "createdAt",
    order: "ASC",
  },
];

const FavoritesSection = () => {
  const t = useTranslations("FavoritesSection");
  const locale = useLocale();
  const router = useRouter();

  const { data: user } = useUser();
  const userId = user?.user.id;

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [sortOption, setSortOption] =
    useState<FavoriteSortOption>("updatedAt_DESC");

  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  const selectedSort = sortOptions.find(
    (option) => option.value === sortOption
  )!;

  const params = useMemo<IGetFavoritesParams>(
    () => ({
      page: currentPage,
      limit: LIMIT,
      sort: selectedSort.sort,
      order: selectedSort.order,
    }),
    [currentPage, selectedSort]
  );

  const {
    data,
    isLoading,
    isError,
  } = useGetFavorites(userId, params);

  const deleteFavorite = useDeleteFavorite();

  const favorites = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / LIMIT));

  const filteredFavorites = useMemo(
    () =>
      favorites.filter((favorite) =>
        favorite.house.title
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [favorites, search]
  );

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
    id: string
  ) => {
    if (activeMenu === id) {
      setActiveMenu(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    setMenuPosition({
      top: rect.bottom + 6,
      left: Math.max(
        8,
        Math.min(rect.right - 80, window.innerWidth - 136)
      ),
    });

    setActiveMenu(id);
  };

  const handleReserve = () => {
    const favorite = favorites.find(
      (item) => item.id === activeMenu
    );

    if (!favorite) return;

    setActiveMenu(null);
    router.push(`/HouseReserve/${favorite.house_id}`);
  };

  const handleDelete = () => {
    if (!activeMenu) return;

    deleteFavorite.mutate(activeMenu);
    setActiveMenu(null);
  };

  const handleSortChange = (value: FavoriteSortOption) => {
    setSortOption(value);
    setCurrentPage(1);
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat(
      locale === "fa" ? "fa-IR" : "en-US"
    ).format(Number(price));
  };

  return (
    <section
      dir="rtl"
      className="w-full rounded-xl bg-surface p-4 sm:p-5"
    >
      <div className="flex flex-col gap-5 border-b border-dashed border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          {t("savedList")}
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1 sm:w-[268px] sm:flex-none [&_input]:!h-10">
            <FormInput
              name="search"
              label={t("search")}
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>

          <div className="w-full sm:w-[190px]">
            <select
              value={sortOption}
              onChange={(event) =>
                handleSortChange(
                  event.target.value as FavoriteSortOption
                )
              }
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 w-full overflow-x-auto">
        <table className="w-full min-w-[680px] border-separate border-spacing-y-3 text-right">
          <thead>
            <tr className="bg-background text-xs text-foreground">
              <th className="w-1/10 rounded-r-xl px-3 py-3 font-medium" />

              <th className="w-1/4 px-3 py-3 font-medium">
                {t("name")}
              </th>

              <th className="w-1/6 px-3 py-3 text-center font-medium">
                {t("price")}
              </th>

              <th className="w-2/5 px-3 py-3 font-medium">
                {t("address")}
              </th>

              <th className="w-1/10 rounded-l-xl px-3 py-3 text-center font-medium" />
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              Array.from({ length: LIMIT }).map((_, index) => (
                <tr key={index}>
                  <td colSpan={5} className="px-3 py-2">
                    <div className="h-14 w-full animate-pulse rounded-xl bg-card" />
                  </td>
                </tr>
              ))
            ) : isError ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-xs text-red-500"
                >
                  خطا در دریافت لیست علاقه‌مندی‌ها
                </td>
              </tr>
            ) : filteredFavorites.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-xs text-muted"
                >
                  {t("empty")}
                </td>
              </tr>
            ) : (
              filteredFavorites.map((favorite) => (
                <tr
                  key={favorite.id}
                  className="text-xs text-foreground"
                >
                  <td className="px-2 py-1">
                    <div className="flex items-center justify-center">
                      {favorite.house.photos?.[0] ? (
                        <img
                          src={favorite.house.photos[0]}
                          alt={favorite.house.title}
                          className="h-[60px] w-[88px] shrink-0 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="h-[60px] w-[88px] shrink-0 rounded-xl bg-card" />
                      )}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {favorite.house.title}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    {formatPrice(favorite.house.price)}
                  </td>

                  <td className="px-3 py-3">
                    <span className="block truncate">
                      {favorite.house.address}
                    </span>
                  </td>

                  <td
                    data-favorite-menu
                    className="px-3 py-3 text-center"
                  >
                    <button
                      type="button"
                      onClick={(event) =>
                        handleMenuClick(event, favorite.id)
                      }
                      aria-label={t("actions")}
                      className="rounded-md p-1 text-foreground transition-colors hover:bg-background"
                    >
                      <MoreHorizontal size={19} />
                    </button>
                  </td>
                </tr>
              ))
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
          totalPages={totalPages}
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
              onClick={handleReserve}
              className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-[11px] text-foreground hover:bg-background"
            >
              {t("reserve")}
              <PlusCircle size={14} />
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteFavorite.isPending}
              className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-[11px] text-foreground hover:bg-background disabled:opacity-50"
            >
              {t("delete")}
              <XCircle size={14} />
            </button>
          </div>,
          document.body
        )}
    </section>
  );
};

export default FavoritesSection;