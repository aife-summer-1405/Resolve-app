"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Search,
  Building2,
  Tag,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
  MapPin,
  BedDouble,
  Bath,
  CarFront,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";

import Pagination from "@/src/components/common/Pagination";
import HouseImage from "@/src/components/molecules/HouseImage";

import { useGetAdminHouses } from "@/src/hooks/dashboard_Admin/useGetAdminHouses";
import { useDeleteAdminHouse } from "@/src/hooks/dashboard_Admin/useDeleteAdminHouse";
import type { IAdminHouse } from "@/src/types/Admin_Dashboard/AdminHouses";
import { getAllComments } from "@/src/services/getAllComments";
import EditHouseModal from "./EditHouseModal";

const AdminHousesSection = () => {
  const t = useTranslations("AdminHouses");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<IAdminHouse | null>(null);
  const [houseToDelete, setHouseToDelete] = useState<IAdminHouse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComments, setTotalComments] = useState<number | null>(null);

  const limit = 10;

  const { data, isPending, isError } = useGetAdminHouses();
  const deleteHouse = useDeleteAdminHouse();

  useEffect(() => {
    let isMounted = true;

    const fetchComments = async () => {
      try {
        const response = await getAllComments();

        if (isMounted) {
          setTotalComments(response.totalCount);
        }
      } catch (error) {
        console.error("دریافت تعداد نظرات ناموفق بود:", error);
      }
    };

    fetchComments();

    return () => {
      isMounted = false;
    };
  }, []);

  const houses = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;

  const filteredHouses = houses.filter((house) => {
    const matchesSearch =
      house.title.toLowerCase().includes(search.toLowerCase()) ||
      house.address.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !selectedCategory || house.categories.name === selectedCategory;

    const matchesTransaction =
      !selectedTransaction || house.transaction_type === selectedTransaction;

    return matchesSearch && matchesCategory && matchesTransaction;
  });

  const totalPages = Math.max(1, Math.ceil(filteredHouses.length / limit));

  const paginatedHouses = filteredHouses.slice(
    (currentPage - 1) * limit,
    currentPage * limit,
  );

  const discountedHouses = houses.filter(
    (house) => house.discounted_price != null,
  ).length;

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(Number(price));
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleTransactionChange = (value: string) => {
    setSelectedTransaction(value);
    setCurrentPage(1);
  };

  const handleEditHouse = (house: IAdminHouse) => {
    setSelectedHouse(house);
    setOpenMenuId(null);
  };

  const handleDeleteClick = (house: IAdminHouse) => {
    setHouseToDelete(house);
    setOpenMenuId(null);
  };

  const handleDeleteHouse = () => {
    if (!houseToDelete) return;

    deleteHouse.mutate(houseToDelete.id, {
      onSuccess: () => {
        setHouseToDelete(null);

        if (currentPage > 1 && paginatedHouses.length === 1) {
          setCurrentPage((prev) => prev - 1);
        }
      },
    });
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-foreground">مدیریت املاک</h1>

        <p className="text-xs text-muted">
          مشاهده، جست‌وجو و مدیریت املاک ثبت‌شده در سایت
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="flex items-center justify-between rounded-xl bg-surface p-5">
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted">تعداد کل املاک</span>

            <span className="text-3xl font-bold text-foreground">
              {isPending ? "..." : totalCount}
            </span>
          </div>

          <div className="flex size-14 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <Building2 size={26} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-surface p-5">
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted">املاک دارای تخفیف</span>

            <span className="text-3xl font-bold text-foreground">
              {isPending ? "..." : discountedHouses}
            </span>
          </div>

          <div className="flex size-14 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <Tag size={25} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-surface p-5">
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted">مجموع نظرات ثبت‌شده</span>

            <span className="text-3xl font-bold text-foreground">
              {totalComments === null
                ? "..."
                : totalComments.toLocaleString("en-US")}
            </span>
          </div>

          <div className="flex size-14 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <MessageCircle size={25} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-xl bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-4 border-b border-dashed border-border pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm font-bold text-foreground">لیست املاک</h2>

            <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-background px-3 py-3 transition focus-within:border-[#91FF45] sm:w-80">
              <Search size={18} className="shrink-0 text-muted" />

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="جست‌وجوی نام یا آدرس ملک..."
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative w-full sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-border bg-background py-3 pe-3 ps-9 text-right text-xs text-foreground outline-none"
              >
                <option value="">همه دسته‌بندی‌ها</option>
                <option value="apartment">apartment</option>
                <option value="suite">suite</option>
                <option value="villa">villa</option>
                <option value="garden-villa">garden-villa</option>
                <option value="traditional-house">traditional-house</option>
                <option value="villa-house">villa-house</option>
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>

            <div className="relative w-full sm:w-48">
              <select
                value={selectedTransaction}
                onChange={(e) => handleTransactionChange(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-border bg-background py-3 pe-3 ps-9 text-right text-xs text-foreground outline-none"
              >
                <option value="">همه نوع معاملات</option>
                <option value="direct_purchase">direct_purchase</option>
                <option value="mortgage">mortgage</option>
                <option value="reservation">reservation</option>
                <option value="rental">rental</option>
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] table-fixed border-separate border-spacing-y-2 text-sm">
            <thead>
              <tr className="bg-background text-muted">
                <th className="w-[30%] rounded-s-xl px-4 py-3 text-start font-medium">
                  ملک
                </th>

                <th className="w-[17%] px-4 py-3 text-start font-medium">
                  قیمت
                </th>

                <th className="w-[13%] px-4 py-3 text-start font-medium">
                  نوع معامله
                </th>

                <th className="w-[18%] px-4 py-3 text-start font-medium">
                  امکانات
                </th>

                <th className="w-[12%] px-4 py-3 text-start font-medium">
                  امتیاز
                </th>

                <th className="w-[10%] rounded-e-xl px-4 py-3 text-center font-medium">
                  عملیات
                </th>
              </tr>
            </thead>

            <tbody>
              {isPending ? (
                <tr>
                  <td
                    colSpan={6}
                    className="rounded-xl bg-background px-4 py-12 text-center text-muted"
                  >
                    در حال دریافت اطلاعات املاک...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={6}
                    className="rounded-xl bg-background px-4 py-12 text-center text-red-500"
                  >
                    دریافت اطلاعات املاک با خطا مواجه شد.
                  </td>
                </tr>
              ) : paginatedHouses.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="rounded-xl bg-background px-4 py-12 text-center text-muted"
                  >
                    ملکی پیدا نشد.
                  </td>
                </tr>
              ) : (
                paginatedHouses.map((house) => (
                  <tr key={house.id} className="bg-background text-foreground">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-card">
                          <HouseImage
                            src={house.photos?.[0]}
                            alt={house.title}
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex min-w-0 flex-col gap-2">
                          <span className="truncate text-xs font-semibold text-foreground">
                            {house.title}
                          </span>

                          <span className="flex items-center gap-1 truncate text-[10px] text-muted">
                            <MapPin size={12} className="shrink-0" />
                            {house.address}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <span
                          className="text-xs font-semibold text-foreground"
                          dir="ltr"
                        >
                          {formatPrice(house.discounted_price || house.price)}
                        </span>

                        <span className="text-[10px] text-muted">تومان</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-xs text-muted">
                      {house.transaction_type}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <BedDouble size={14} />
                          {house.rooms}
                        </span>

                        <span className="flex items-center gap-1">
                          <Bath size={14} />
                          {house.bathrooms}
                        </span>

                        <span className="flex items-center gap-1">
                          <CarFront size={14} />
                          {house.parking}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-xs text-foreground" dir="ltr">
                        {house.rate}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <div className="relative inline-flex">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === house.id ? null : house.id,
                            )
                          }
                          className="rounded-lg p-2 text-muted transition hover:bg-card hover:text-[#91FF45]"
                        >
                          <MoreHorizontal size={20} />
                        </button>

                        {openMenuId === house.id && (
                          <>
                            <button
                              type="button"
                              aria-label="بستن منو"
                              onClick={() => setOpenMenuId(null)}
                              className="fixed inset-0 z-10 cursor-default"
                            />

                            <div className="absolute end-8 top-0 z-20 w-36 overflow-hidden rounded-xl bg-surface p-1 text-start shadow-xl">
                              <button
                                type="button"
                                onClick={() => handleEditHouse(house)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-foreground transition hover:bg-card hover:text-[#91FF45]"
                              >
                                <Pencil size={15} />
                                ویرایش ملک
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteClick(house)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-red-500 transition hover:bg-card"
                              >
                                <Trash2 size={15} />
                                حذف ملک
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-2 flex flex-col-reverse items-center justify-between gap-3 pt-4 sm:flex-row">
          <span className="text-xs text-muted">
            {t("page")} {currentPage} / {totalPages}
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      {selectedHouse && (
        <EditHouseModal
          house={selectedHouse}
          onClose={() => setSelectedHouse(null)}
        />
      )}
      {houseToDelete && (
        <div
          dir="rtl"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => {
            if (!deleteHouse.isPending) {
              setHouseToDelete(null);
            }
          }}
        >
          <div
            className="flex w-full max-w-[390px] flex-col items-center rounded-[22px] bg-surface px-5 py-6 text-foreground shadow-2xl sm:px-6 sm:py-7"
            onClick={(e) => e.stopPropagation()}
          >
            <AlertTriangle
              size={62}
              strokeWidth={1.8}
              className="mb-7 fill-[#FFB800] text-black sm:mb-9"
            />

            <h3 className="mb-4 text-center text-sm font-bold sm:text-base">
              حذف ملک
            </h3>

            <p className="mb-7 text-center text-xs leading-6 text-muted sm:mb-8">
              آیا از حذف این ملک اطمینان دارید؟ این عملیات قابل بازگشت نیست.
            </p>

            <span className="mb-7 text-xs font-medium text-foreground">
              {houseToDelete.title}
            </span>

            {deleteHouse.isError && (
              <p className="mb-4 text-xs text-red-500">
                حذف ملک با خطا مواجه شد. لطفاً دوباره تلاش کنید.
              </p>
            )}

            <div className="flex items-center gap-4">
              <button
                type="button"
                disabled={deleteHouse.isPending}
                onClick={handleDeleteHouse}
                className="rounded-lg bg-[#FF9500] px-5 py-2 text-[11px] text-black transition hover:bg-[#E98500] disabled:opacity-50"
              >
                {deleteHouse.isPending ? "در حال حذف..." : "بله، حذف شود"}
              </button>

              <button
                type="button"
                disabled={deleteHouse.isPending}
                onClick={() => setHouseToDelete(null)}
                className="text-[11px] text-foreground transition hover:opacity-70 disabled:opacity-50"
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

export default AdminHousesSection;
