"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  PlusCircle,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";

import Pagination from "@/src/components/common/Pagination";
import { useSellerHouses } from "@/src/hooks/Seller_dashboard/useSellerHouses";
import type {
  SellerHousesParams,
  TransactionType,
} from "@/src/types/Seller_Dashboard/SellerHousesType";

const LIMIT = 10;

const TRANSACTION_LABELS: Record<TransactionType, string> = {
  direct_purchase: "فروش",
  rental: "اجاره",
  reservation: "رزرو روزانه",
  mortgage: "رهن",
};

type Filters = {
  transactionType: "all" | TransactionType;
  minPrice: string;
  maxPrice: string;
};

const EMPTY_FILTERS: Filters = {
  transactionType: "all",
  minPrice: "",
  maxPrice: "",
};

const useDebounce = <T,>(value: T, delay = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

const formatNumber = (value: string | number) =>
  Number(value || 0).toLocaleString("fa-IR");

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("fa-IR");

const inputClass =
  "h-8 w-full rounded-xl border border-border bg-background px-2 text-[10px] text-foreground outline-none focus:border-primary";

const SellerPropertiesSection = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search.trim());

  const [showFilters, setShowFilters] = useState(false);
  const [draftFilters, setDraftFilters] = useState<Filters>(EMPTY_FILTERS);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const params = useMemo<SellerHousesParams>(
    () => ({
      page: currentPage,
      limit: LIMIT,
      sort: "last_updated",
      order: "DESC",
      search: debouncedSearch || undefined,
      transaction_type:
        filters.transactionType === "all" ? undefined : filters.transactionType,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    }),
    [currentPage, debouncedSearch, filters]
  );

  const { data, isPending, isError, isFetching, refetch } =
    useSellerHouses(params);

  const houses = data?.houses ?? [];
  const totalPages = Math.max(1, Math.ceil((data?.totalCount ?? 0) / LIMIT));

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    return () =>
      document.removeEventListener("pointerdown", handleOutsideClick);
  }, []);

  const openFilters = () => {
    setDraftFilters(filters);
    setShowFilters(true);
  };

  const applyFilters = () => {
    setFilters(draftFilters);
    setCurrentPage(1);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setDraftFilters(EMPTY_FILTERS);
    setFilters(EMPTY_FILTERS);
    setCurrentPage(1);
    setShowFilters(false);
  };

  const hasActiveFilters =
    filters.transactionType !== "all" ||
    !!filters.minPrice ||
    !!filters.maxPrice;

  const handleEdit = (id: string) => {
    setOpenMenu(null);
    router.push(`/dashboard/properties/add?edit=${id}`);
  };

  const handleDelete = (id: string) => {
    setDeleteTarget(id);
    setOpenMenu(null);
  };

  const confirmDelete = () => {
    // TODO: وقتی endpoint حذف داشتی، useDeleteHouse را اینجا صدا بزن
    // و بعد invalidateQueries({ queryKey: ["houses"] })
    setDeleteTarget(null);
  };

  return (
    <section
      dir="rtl"
      className="relative w-full rounded-xl bg-surface p-3 text-foreground sm:p-4"
    >
      <div className="flex flex-col gap-4 border-b border-dashed border-border pb-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="shrink-0 text-sm font-semibold">املاک من</h2>

        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <div className="relative w-full sm:max-w-[270px]">
            <label
              htmlFor="property-search"
              className="absolute -top-2 right-2 z-10 bg-surface px-1 text-[10px] text-muted"
            >
              جستجو
            </label>

            <Search
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              id="property-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="نام یا آدرس ملک را جستجو کنید"
              className="h-9 w-full rounded-xl border border-border bg-background pr-9 pl-3 text-xs outline-none transition focus:border-primary"
            />
          </div>

          <button
            type="button"
            onClick={openFilters}
            className="relative flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-xs font-medium text-[#202020] transition hover:opacity-90"
          >
            <SlidersHorizontal size={14} />
            فیلترها
            {hasActiveFilters && (
              <span className="absolute -left-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`mt-3 overflow-x-auto transition-opacity ${
          isFetching && !isPending ? "opacity-60" : "opacity-100"
        }`}
      >
        <table className="w-full min-w-[760px] border-separate border-spacing-x-0 border-spacing-y-2 text-center text-xs">
          <thead>
            <tr className="h-9 bg-background text-muted">
              <th className="rounded-r-xl px-2 font-medium">نام ملک</th>
              <th className="px-2 font-medium">قیمت (تومان)</th>
              <th className="px-2 font-medium">نوع معامله</th>
              <th className="px-2 font-medium">امتیاز</th>
              <th className="px-2 font-medium">تعداد اتاق</th>
              <th className="px-2 font-medium">آخرین بروزرسانی</th>
              <th className="rounded-l-xl px-2 font-medium">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {isPending && (
              <tr>
                <td colSpan={7} className="py-10 text-muted">
                  در حال دریافت اطلاعات...
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan={7} className="py-10">
                  <p className="mb-3 text-red-500">
                    دریافت لیست املاک با خطا مواجه شد
                  </p>
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="rounded-lg bg-primary px-4 py-1.5 text-[11px] font-medium text-[#202020]"
                  >
                    تلاش مجدد
                  </button>
                </td>
              </tr>
            )}

            {!isPending && !isError && houses.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-muted">
                  ملکی پیدا نشد
                </td>
              </tr>
            )}

            {houses.map((house) => {
              const cover = house.photos?.[0];

              return (
                <tr
                  key={house.id}
                  className="
                    h-[58px]
                    [&>td]:bg-background
                    [&>td:first-child]:rounded-r-2xl
                    [&>td:last-child]:rounded-l-2xl
                  "
                >
                  <td className="px-2">
                    <div className="flex items-center gap-2">
                      <div className="relative h-12 w-[72px] shrink-0 overflow-hidden rounded-xl bg-[#D9D9D9]">
                        {cover && (
                          <Image
                            src={cover}
                            alt={house.title || "تصویر ملک"}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        )}
                      </div>

                      <span className="max-w-[160px] truncate whitespace-nowrap text-[11px]">
                        {house.title || "—"}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-2">
                    {formatNumber(house.price)}
                  </td>

                  <td className="whitespace-nowrap px-2">
                    {TRANSACTION_LABELS[house.transaction_type] ??
                      house.transaction_type}
                  </td>

                  <td className="whitespace-nowrap px-2">
                    {formatNumber(Number(house.rate).toFixed(1))}
                  </td>

                  <td className="whitespace-nowrap px-2">
                    {formatNumber(house.rooms)}
                  </td>

                  <td className="whitespace-nowrap px-2">
                    {formatDate(house.last_updated)}
                  </td>

                  <td className="px-2">
                    <div
                      className="relative inline-block"
                      ref={openMenu === house.id ? menuRef : null}
                    >
                      <button
                        type="button"
                        aria-label="عملیات"
                        onClick={() =>
                          setOpenMenu(openMenu === house.id ? null : house.id)
                        }
                        className="rounded-md p-1 text-foreground hover:bg-surface"
                      >
                        <MoreHorizontal size={17} />
                      </button>

                      {openMenu === house.id && (
                        <div className="absolute left-0 top-8 z-20 w-28 rounded-xl border border-border bg-surface p-1.5 text-right shadow-lg">
                          <button
                            type="button"
                            onClick={() => handleEdit(house.id)}
                            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[11px] hover:bg-background"
                          >
                            <Pencil size={14} />
                            ویرایش
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(house.id)}
                            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[11px] text-red-500 hover:bg-background"
                          >
                            <Trash2 size={14} />
                            حذف
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        dir="ltr"
        className="mt-3 flex flex-col-reverse items-center justify-between gap-3 sm:flex-row"
      >
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <Link
          href="/dashboard/properties/add/info/first-info?view=seller"
          className="flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-xs font-medium text-[#202020] transition hover:opacity-90"
        >
          <PlusCircle size={16} />
          افزودن ملک
        </Link>
      </div>

      {showFilters && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowFilters(false)}
        >
          <div
            dir="rtl"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-[370px] rounded-xl border border-border bg-surface p-3 text-foreground shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-sm font-medium">فیلتر املاک</h3>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="flex h-7 items-center gap-1 rounded-full border border-[#FF858C] px-3 text-[11px] text-[#FF626C] transition hover:bg-red-50"
              >
                بستن
                <X size={13} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-[9px] text-muted">
                  نوع معامله
                </label>
                <select
                  value={draftFilters.transactionType}
                  onChange={(event) =>
                    setDraftFilters((f) => ({
                      ...f,
                      transactionType: event.target
                        .value as Filters["transactionType"],
                    }))
                  }
                  className={inputClass}
                >
                  <option value="all">همه</option>
                  <option value="direct_purchase">فروش</option>
                  <option value="rental">اجاره</option>
                  <option value="reservation">رزرو روزانه</option>
                  <option value="mortgage">رهن</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[9px] text-muted">
                    حداقل قیمت
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={draftFilters.minPrice}
                    onChange={(event) =>
                      setDraftFilters((f) => ({
                        ...f,
                        minPrice: event.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[9px] text-muted">
                    حداکثر قیمت
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={draftFilters.maxPrice}
                    onChange={(event) =>
                      setDraftFilters((f) => ({
                        ...f,
                        maxPrice: event.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={applyFilters}
                className="rounded-lg bg-primary px-4 py-2 text-[10px] font-medium text-[#202020] transition hover:opacity-90"
              >
                اعمال فیلتر
              </button>

              <button
                type="button"
                onClick={resetFilters}
                className="px-2 py-2 text-[10px] text-muted transition hover:opacity-70"
              >
                پاک کردن فیلتر
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            dir="rtl"
            onClick={(event) => event.stopPropagation()}
            className="flex min-h-[225px] w-full max-w-[315px] flex-col items-center justify-center rounded-2xl border border-border bg-surface px-5 py-5 text-center text-foreground shadow-2xl"
          >
            <AlertTriangle
              size={49}
              strokeWidth={1.8}
              className="mb-7 fill-[#FFC400] text-black"
            />

            <h3 className="text-sm font-bold">حذف ملک</h3>
            <p className="mt-2 text-[10px] text-muted">
              آیا از حذف این ملک مطمئن هستید؟ این عملیات قابل بازگشت نیست.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={confirmDelete}
                className="min-w-[52px] rounded-lg bg-[#FF9900] px-4 py-1.5 text-[11px] font-medium text-white transition hover:opacity-90"
              >
                حذف
              </button>

              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-2 py-1.5 text-[11px] text-foreground transition hover:opacity-70"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SellerPropertiesSection;