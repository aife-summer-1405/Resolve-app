
"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  PlusCircle,
  CheckCircle2,
  XCircle,
  Pencil,
  Trash2,
  Check,
  Clock3,
  X,
  AlertTriangle,
} from "lucide-react";

import Pagination from "@/src/components/common/Pagination";

type PropertyStatus = "active" | "pending" | "inactive";
type PropertyType = "hotel" | "apartment" | "villa";

type Property = {
  id: number;
  name: string;
  price: string;
  priceAmount: number;
  rating: string;
  views: string;
  reservations: string;
  status: PropertyStatus;
  type: PropertyType;
};

const initialProperties: Property[] = [
  {
    id: 1,
    name: "هتل سواران اینین رشت",
    price: "۵۰,۰۰۰,۰۰۰",
    priceAmount: 50000000,
    rating: "۴ از ۵",
    views: "۵ تا",
    reservations: "۵ بار",
    status: "active",
    type: "hotel",
  },
  {
    id: 2,
    name: "هتل سواران اینین رشت",
    price: "۵۰,۰۰۰,۰۰۰",
    priceAmount: 50000000,
    rating: "۴ از ۵",
    views: "۵ تا",
    reservations: "۵ بار",
    status: "pending",
    type: "hotel",
  },
  {
    id: 3,
    name: "هتل سواران اینین رشت",
    price: "۵۰,۰۰۰,۰۰۰",
    priceAmount: 50000000,
    rating: "۴ از ۵",
    views: "۵ تا",
    reservations: "۵ بار",
    status: "inactive",
    type: "hotel",
  },
  {
    id: 4,
    name: "هتل سواران اینین رشت",
    price: "۵۰,۰۰۰,۰۰۰",
    priceAmount: 50000000,
    rating: "۴ از ۵",
    views: "۵ تا",
    reservations: "۵ بار",
    status: "pending",
    type: "hotel",
  },
  {
    id: 5,
    name: "هتل سواران اینین رشت",
    price: "۵۰,۰۰۰,۰۰۰",
    priceAmount: 50000000,
    rating: "۴ از ۵",
    views: "۵ تا",
    reservations: "۵ بار",
    status: "active",
    type: "hotel",
  },
];

const SellerPropertiesSection = () => {
  const t = useTranslations("sellerProperties");
  const locale = useLocale();
  const isFa = locale === "fa";
  const router = useRouter();

  const [search, setSearch] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [priceValue, setPriceValue] = useState(100000000);

  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [message, setMessage] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);

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

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  const getStatus = (status: PropertyStatus) => {
    if (status === "active") {
      return {
        label: t("active"),
        className: "bg-[#91FF45] text-[#202020]",
        icon: <CheckCircle2 size={12} />,
      };
    }

    if (status === "pending") {
      return {
        label: t("pending"),
        className: "bg-[#FFC400] text-[#202020]",
        icon: <Clock3 size={12} />,
      };
    }

    return {
      label: t("inactive"),
      className: "bg-[#FF858C] text-[#202020]",
      icon: <XCircle size={12} />,
    };
  };

  const handleActivate = () => {
    setOpenMenu(null);
  };

  const handleDelete = (id: number) => {
    setDeleteTarget(id);
    setOpenMenu(null);
  };

  const confirmDelete = () => {
    setDeleteTarget(null);
  };

  const handleEdit = (id: number) => {
    setOpenMenu(null);
    router.push(`/dashboard/properties/add?edit=${id}`);
  };

  return (
    <section
      dir="rtl"
      className="relative w-full rounded-xl bg-surface p-3 text-foreground sm:p-4"
    >
      <div className="flex flex-col gap-4 border-b border-dashed border-border pb-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="shrink-0 text-sm font-semibold">
          {t("title")}
        </h2>

        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <div className="relative w-full sm:max-w-[270px]">
            <label
              htmlFor="property-search"
              className="absolute -top-2 right-2 z-10 bg-surface px-1 text-[10px] text-muted"
            >
              {t("search")}
            </label>

            <Search
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              id="property-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("searchPlaceholder")}
              className="h-9 w-full rounded-xl border border-border bg-background pr-9 pl-3 text-xs outline-none transition focus:border-primary"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-xs font-medium text-[#202020] transition hover:opacity-90"
          >
            <SlidersHorizontal size={14} />
            {t("filters")}
          </button>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[760px] border-separate border-spacing-y-2 border-spacing-x-0 text-center text-xs">
          <thead>
            <tr className="h-9 bg-background text-muted">
              <th className="rounded-r-xl px-2 font-medium">
                {t("propertyName")}
              </th>
              <th className="px-2 font-medium">{t("price")}</th>
              <th className="px-2 font-medium">{t("rating")}</th>
              <th className="px-2 font-medium">{t("views")}</th>
              <th className="px-2 font-medium">
                {t("reservations")}
              </th>
              <th className="px-2 font-medium">{t("status")}</th>
              <th className="rounded-l-xl px-2 font-medium">
                {t("actions")}
              </th>
            </tr>
          </thead>

          <tbody>
            {initialProperties.map((property) => {
              const status = getStatus(property.status);

              return (
                <tr
                  key={property.id}
                  className="
                    h-[58px]
                    [&>td]:bg-background
                    [&>td:first-child]:rounded-r-2xl
                    [&>td:last-child]:rounded-l-2xl
                  "
                >
                  <td className="rounded-r-lg px-2">
                    <div className="flex items-center gap-2">
                      <div className="h-12 w-[72px] shrink-0 rounded-xl bg-[#D9D9D9]" />

                      <span className="whitespace-nowrap text-[11px]">
                        {property.name}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-2">
                    {property.price}
                  </td>

                  <td className="whitespace-nowrap px-2">
                    {property.rating}
                  </td>

                  <td className="whitespace-nowrap px-2">
                    {property.views}
                  </td>

                  <td className="whitespace-nowrap px-2">
                    {property.reservations}
                  </td>

                  <td className="px-2">
                    <span
                      className={`inline-flex min-w-[58px] items-center justify-center gap-1 rounded-full px-2 py-1 text-[10px] ${status.className}`}
                    >
                      {status.label}
                      {status.icon}
                    </span>
                  </td>

                  <td className="relative rounded-l-lg px-2">
                    <button
                      type="button"
                      aria-label={t("actions")}
                      onClick={() =>
                        setOpenMenu(
                          openMenu === property.id ? null : property.id
                        )
                      }
                      className="rounded-md p-1 text-foreground hover:bg-surface"
                    >
                      <MoreHorizontal size={17} />
                    </button>

                    {openMenu === property.id && (
                      <div
                        ref={menuRef}
                        className="absolute left-2 top-10 z-20 w-28 rounded-xl border border-border bg-surface p-1.5 text-right shadow-lg"
                      >
                        <button
                          type="button"
                          onClick={handleActivate}
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[11px] hover:bg-background"
                        >
                          <Check size={14} />
                          {t("activate")}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEdit(property.id)}
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[11px] hover:bg-background"
                        >
                          <Pencil size={14} />
                          {t("edit")}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(property.id)}
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[11px] text-red-500 hover:bg-background"
                        >
                          <Trash2 size={14} />
                          {t("delete")}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {message && (
        <div className="mt-2 flex items-center justify-between rounded-lg bg-background px-3 py-2 text-xs text-muted">
          {message}

          <button
            type="button"
            onClick={() => setMessage("")}
            className="text-foreground"
          >
            ×
          </button>
        </div>
      )}

      <div
        dir="ltr"
        className="mt-3 flex flex-col-reverse items-center justify-between gap-3 sm:flex-row"
      >
        <Pagination
          currentPage={currentPage}
          totalPages={9}
          onPageChange={setCurrentPage}
        />

        <Link
          href="/dashboard/properties/add"
          className="flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-xs font-medium text-[#202020] transition hover:opacity-90"
        >
          <PlusCircle size={16} />
          {t("addProperty")}
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
              <h3 className="text-sm font-medium">
                {t("filterTitle")}
              </h3>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="flex h-7 items-center gap-1 rounded-full border border-[#FF858C] px-3 text-[11px] text-[#FF626C] transition hover:bg-red-50"
              >
                {t("close")}
                <X size={13} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-[9px] text-muted">
                  {t("propertyType")}
                </label>

                <select
                  value={propertyType}
                  onChange={(event) =>
                    setPropertyType(event.target.value)
                  }
                  className="h-8 w-full rounded-xl border border-border bg-background px-2 text-[10px] text-foreground outline-none focus:border-primary"
                >
                  <option value="all">{t("all")}</option>
                  <option value="apartment">{t("apartment")}</option>
                  <option value="hotel">{t("hotel")}</option>
                  <option value="villa">{t("villa")}</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-[9px] text-muted">
                  {t("propertyStatus")}
                </label>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="h-8 w-full rounded-xl border border-border bg-background px-2 text-[10px] text-foreground outline-none focus:border-primary"
                >
                  <option value="all">{t("all")}</option>
                  <option value="active">{t("active")}</option>
                  <option value="pending">{t("pending")}</option>
                  <option value="inactive">{t("inactive")}</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-[9px] text-muted">
                <span>{t("priceRange")}</span>

                <span>
                  {priceValue.toLocaleString(isFa ? "fa-IR" : "en-US")}{" "}
                  {isFa ? "تومان" : "Toman"}
                </span>
              </div>

              <input
                type="range"
                min={5000000}
                max={100000000}
                step={5000000}
                value={priceValue}
                onChange={(event) =>
                  setPriceValue(Number(event.target.value))
                }
                className="h-1.5 w-full cursor-pointer accent-[#91FF45]"
              />
            </div>

            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="rounded-lg bg-primary px-4 py-2 text-[10px] font-medium text-[#202020] transition hover:opacity-90"
              >
                {t("applyFilters")}
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

            <h3 className="text-sm font-bold">
              {t("deleteTitle")}
            </h3>

            <p className="mt-2 text-[10px] text-muted">
              {t("deleteDescription")}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={confirmDelete}
                className="min-w-[52px] rounded-lg bg-[#FF9900] px-4 py-1.5 text-[11px] font-medium text-white transition hover:opacity-90"
              >
                {t("delete")}
              </button>

              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-2 py-1.5 text-[11px] text-foreground transition hover:opacity-70"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SellerPropertiesSection;
