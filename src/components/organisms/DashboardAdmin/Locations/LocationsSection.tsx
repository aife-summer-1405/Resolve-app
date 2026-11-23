"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  AlertTriangle,
} from "lucide-react";

import Pagination from "@/src/components/common/Pagination";

import { useGetLocations } from "@/src/hooks/dashboard_Admin/useGetLocations";

import type { ILocation } from "@/src/types/Admin_Dashboard/Locations";

import AddLocationModal from "./AddLocationModal";
import EditLocationModal from "./EditLocationModal";
import useDeleteLocation from "@/src/hooks/dashboard_Admin/useDeleteLocation";

const LocationsSection = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<ILocation | null>(
    null,
  );
  const [deleteLocation, setDeleteLocation] = useState<ILocation | null>(null);

  const limit = 10;

  const deleteLocationMutation = useDeleteLocation();

  const { data, isLoading, isError } = useGetLocations({
    page: currentPage,
    limit,
  });

  const locations = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;

  const filteredLocations = locations.filter((location) =>
    location.areaName?.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openEditModal = (location: ILocation) => {
    setEditingLocation(location);
    setOpenMenuId(null);
  };

  const handleDelete = async () => {
    if (!deleteLocation) return;

    try {
      await deleteLocationMutation.mutateAsync(deleteLocation.id);

      setDeleteLocation(null);
      setOpenMenuId(null);

      if (locations.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Delete location failed:", error);
    }
  };

  return (
    <section className="mt-2 flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-foreground">مدیریت مناطق</h1>

        <p className="text-xs text-muted">مدیریت و بررسی مناطق ثبت شده</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="flex w-full items-center justify-between rounded-xl bg-surface p-5">
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted">کل مناطق</span>

            <span className="text-3xl font-bold text-foreground">
              {totalCount}
            </span>
          </div>

          <div className="flex size-14 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <MapPin size={26} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-xl bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-4 border-b border-dashed border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-bold text-foreground">لیست مناطق</h2>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-background px-3 py-3 transition focus-within:border-[#91FF45] sm:w-72">
              <Search size={18} className="shrink-0 text-muted" />

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="جستجو بر اساس نام منطقه..."
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#91FF45] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#7ee833]"
            >
              <Plus size={18} />
              افزودن منطقه
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="py-10 text-center text-sm text-muted">
            در حال دریافت مناطق...
          </div>
        )}

        {isError && (
          <div className="py-10 text-center text-sm text-red-500">
            دریافت مناطق با خطا مواجه شد.
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[650px] table-fixed border-separate border-spacing-y-2 text-sm">
                <thead>
                  <tr className="bg-background text-muted">
                    <th className="w-[15%] rounded-s-xl px-4 py-3 text-start font-medium">
                      شناسه
                    </th>

                    <th className="w-[25%] px-4 py-3 text-start font-medium">
                      نام منطقه
                    </th>

                    <th className="w-[20%] px-4 py-3 text-start font-medium">
                      عرض جغرافیایی
                    </th>

                    <th className="w-[20%] px-4 py-3 text-start font-medium">
                      طول جغرافیایی
                    </th>

                    <th className="w-[20%] rounded-e-xl px-4 py-3 text-center font-medium">
                      عملیات
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLocations.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="rounded-xl bg-background px-4 py-12 text-center text-muted"
                      >
                        منطقه‌ای پیدا نشد.
                      </td>
                    </tr>
                  ) : (
                    filteredLocations.map((location) => (
                      <tr
                        key={location.id}
                        className="bg-background text-foreground"
                      >
                        <td className="px-4 py-4 text-xs">{location.id}</td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <MapPin
                              size={15}
                              className="shrink-0 text-[#91FF45]"
                            />

                            <span className="text-xs font-medium">
                              {location.areaName ?? "-"}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-xs text-muted">
                          {location.lat}
                        </td>

                        <td className="px-4 py-4 text-xs text-muted">
                          {location.lng}
                        </td>

                        <td className="px-4 py-4 text-center">
                          <div className="relative inline-flex">
                            <button
                              type="button"
                              onClick={() =>
                                setOpenMenuId(
                                  openMenuId === location.id
                                    ? null
                                    : location.id,
                                )
                              }
                              className="rounded-lg p-2 text-muted transition hover:bg-card hover:text-[#91FF45]"
                            >
                              <MoreHorizontal size={20} />
                            </button>

                            {openMenuId === location.id && (
                              <>
                                <button
                                  type="button"
                                  aria-label="بستن منو"
                                  onClick={() => setOpenMenuId(null)}
                                  className="fixed inset-0 z-10 cursor-default"
                                />

                                <div className="absolute end-10 top-0 z-20 w-36 overflow-hidden rounded-xl bg-surface p-1 text-start shadow-xl">
                                  <button
                                    type="button"
                                    onClick={() => openEditModal(location)}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-foreground transition hover:bg-card hover:text-[#91FF45]"
                                  >
                                    <Pencil size={15} />
                                    ویرایش
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDeleteLocation(location);
                                      setOpenMenuId(null);
                                    }}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-red-500 transition hover:bg-card"
                                  >
                                    <Trash2 size={15} />
                                    حذف
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

            <div className="flex flex-col gap-3 md:hidden">
              {filteredLocations.length === 0 ? (
                <div className="rounded-xl bg-background px-4 py-10 text-center text-xs text-muted">
                  منطقه‌ای پیدا نشد.
                </div>
              ) : (
                filteredLocations.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center gap-3 rounded-xl bg-background p-3"
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <MapPin size={15} className="shrink-0 text-[#91FF45]" />

                        <span className="text-xs font-semibold text-foreground">
                          {location.areaName ?? "-"}
                        </span>
                      </div>

                      <span className="text-[10px] text-muted">
                        شناسه: {location.id}
                      </span>

                      <span className="text-[10px] text-muted" dir="ltr">
                        {location.lat} , {location.lng}
                      </span>
                    </div>

                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === location.id ? null : location.id,
                          )
                        }
                        className="rounded-lg p-2 text-muted hover:bg-card"
                      >
                        <MoreHorizontal size={20} />
                      </button>

                      {openMenuId === location.id && (
                        <>
                          <button
                            type="button"
                            aria-label="بستن منو"
                            onClick={() => setOpenMenuId(null)}
                            className="fixed inset-0 z-10"
                          />

                          <div className="absolute end-8 top-0 z-20 w-32 rounded-xl bg-surface p-1 shadow-xl">
                            <button
                              type="button"
                              onClick={() => openEditModal(location)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs hover:bg-card"
                            >
                              <Pencil size={14} />
                              ویرایش
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setDeleteLocation(location);
                                setOpenMenuId(null);
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-red-500 hover:bg-card"
                            >
                              <Trash2 size={14} />
                              حذف
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-2 flex flex-col-reverse items-center justify-between gap-3 pt-4 sm:flex-row">
              <span className="text-xs text-muted">
                صفحه {currentPage} / {totalPages}
              </span>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>

      <AddLocationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {editingLocation && (
        <EditLocationModal
          isOpen={true}
          location={editingLocation}
          onClose={() => setEditingLocation(null)}
        />
      )}

      {deleteLocation && (
        <div
          dir="rtl"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => {
            if (!deleteLocationMutation.isPending) {
              setDeleteLocation(null);
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
              className="mb-7 fill-[#FFB800] text-black"
            />

            <h3 className="mb-4 text-center text-sm font-bold">حذف منطقه</h3>

            <p className="mb-5 text-center text-xs leading-6 text-muted">
              آیا از حذف این منطقه اطمینان دارید؟
            </p>

            <span className="mb-7 text-xs font-medium">
              {deleteLocation.areaName}
            </span>

            {deleteLocationMutation.isError && (
              <p className="mb-4 text-xs text-red-500">
                حذف منطقه با خطا مواجه شد.
              </p>
            )}

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteLocationMutation.isPending}
                className="rounded-lg bg-[#FF9500] px-5 py-2 text-[11px] text-black transition hover:bg-[#E98500] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleteLocationMutation.isPending
                  ? "در حال حذف..."
                  : "تأیید حذف"}
              </button>

              <button
                type="button"
                disabled={deleteLocationMutation.isPending}
                onClick={() => setDeleteLocation(null)}
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

export default LocationsSection;
