"use client";

import { useState } from "react";
import {
  Search,
  TicketPercent,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
  CalendarDays,
  Building2,
  ChevronDown,
  Plus,
  ChartNoAxesCombined,
  SlidersHorizontal,
} from "lucide-react";

import Pagination from "@/src/components/common/Pagination";
import AddDiscountCodeModal from "./AddDiscountCodeModal";
import EditDiscountCodeModal from "./EditDiscountCodeModal";
import DeleteDiscountCodeModal from "./DeleteDiscountCodeModal";

import { useGetDiscountCodes } from "@/src/hooks/dashboard_Admin/useGetDiscountCodes";
import { useCreateDiscountCode } from "@/src/hooks/dashboard_Admin/useCreateDiscountCode";
import { useUpdateDiscountCode } from "@/src/hooks/dashboard_Admin/useUpdateDiscountCode";
import { useDeleteDiscountCode } from "@/src/hooks/dashboard_Admin/useDeleteDiscountCode";

import type {
  IDiscountCode,
  IDiscountCodePayload,
} from "@/src/types/Admin_Dashboard/DiscountCodes";

type IStatusFilter = "all" | "active" | "expired";

const DiscountCodesSection = () => {
  const [search, setSearch] = useState("");
  const [discountFilter, setDiscountFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<IStatusFilter>("all");

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<IDiscountCode | null>(null);
  const [codeToDelete, setCodeToDelete] = useState<IDiscountCode | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [currentTime] = useState(() => new Date().getTime());

  const limit = 10;

  const createDiscountCode = useCreateDiscountCode();
  const updateDiscountCode = useUpdateDiscountCode();
  const deleteDiscountCode = useDeleteDiscountCode();

  const { data, isPending, isError } = useGetDiscountCodes({
    page: currentPage,
    limit,
    code: search.trim() || undefined,
    discount_percentage: discountFilter === "all" ? undefined : discountFilter,
  });

  const discountCodes = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const isExpired = (date: string) => {
    return new Date(date).getTime() < currentTime;
  };

  const activeCount = discountCodes.filter(
    (item) => !isExpired(item.valid_until),
  ).length;

  const expiredCount = discountCodes.filter((item) =>
    isExpired(item.valid_until),
  ).length;

  const filteredCodes = discountCodes.filter((item) => {
    if (statusFilter === "active") return !isExpired(item.valid_until);
    if (statusFilter === "expired") return isExpired(item.valid_until);
    return true;
  });

  const averageDiscount =
    discountCodes.length > 0
      ? (
          discountCodes.reduce(
            (total, item) => total + Number(item.discount_percentage),
            0,
          ) / discountCodes.length
        ).toFixed(1)
      : "0";

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fa-IR");
  };

  const handleAdd = async (data: IDiscountCodePayload) => {
    await createDiscountCode.mutateAsync(data);
    setIsAddModalOpen(false);
  };

  const handleEdit = async (id: string, data: IDiscountCodePayload) => {
    await updateDiscountCode.mutateAsync({
      id,
      data,
    });

    setSelectedCode(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDiscountCode.mutateAsync(id);
      setCodeToDelete(null);
    } catch (error) {
      console.error("Delete discount code error:", error);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleDiscountChange = (value: string) => {
    setDiscountFilter(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value as IStatusFilter);
    setCurrentPage(1);
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-foreground">
          مدیریت کدهای تخفیف
        </h1>

        <p className="text-xs text-muted">مدیریت و بررسی کدهای تخفیف ثبت شده</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="flex w-full items-center justify-between rounded-xl bg-surface p-5">
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted">کل تخفیف‌ها</span>

            <span className="text-3xl font-bold text-foreground">
              {totalCount}
            </span>
          </div>

          <div className="flex size-14 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <TicketPercent size={26} />
          </div>
        </div>

        <div className="flex w-full items-center justify-between rounded-xl bg-surface p-5">
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted">میانگین تخفیف</span>

            <span className="text-3xl font-bold text-foreground">
              {averageDiscount}%
            </span>
          </div>

          <div className="flex size-14 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <ChartNoAxesCombined size={24} />
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-5 rounded-xl bg-surface p-5">
          <div className="flex flex-1 flex-col gap-3">
            <span className="text-sm text-muted">وضعیت تخفیف‌ها</span>

            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground outline-none"
            >
              <option value="all" className="bg-surface text-foreground">
                همه وضعیت‌ها
              </option>

              <option value="active" className="bg-surface text-foreground">
                فعال ({activeCount})
              </option>

              <option value="expired" className="bg-surface text-foreground">
                منقضی ({expiredCount})
              </option>
            </select>
          </div>

          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <SlidersHorizontal size={24} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-xl bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
            <div className="relative w-full sm:w-48">
              <select
                value={discountFilter}
                onChange={(e) => handleDiscountChange(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-lg border border-border bg-background px-3 py-3 pl-9 text-sm text-foreground outline-none focus:border-[#91FF45]"
              >
                <option value="all">همه درصدها</option>
                <option value="5">۵ درصد</option>
                <option value="10">۱۰ درصد</option>
                <option value="12">۱۲ درصد</option>
                <option value="15">۱۵ درصد</option>
                <option value="18">۱۸ درصد</option>
                <option value="20">۲۰ درصد</option>
                <option value="25">۲۵ درصد</option>
                <option value="30">۳۰ درصد</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#91FF45] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#7ee832] sm:w-auto"
            >
              <Plus size={18} />
              افزودن تخفیف
            </button>
          </div>

          <div className="relative w-full flex-1 sm:max-w-sm">
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="جستجو بر اساس کد تخفیف یا شناسه ملک..."
              className="w-full rounded-lg border border-border bg-background py-3 pr-10 pl-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-[#91FF45]"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[850px] table-fixed border-separate border-spacing-y-2 text-sm">
            <thead>
              <tr className="text-muted">
                <th className="w-[8%] px-3 py-3 text-right font-medium">
                  شناسه
                </th>

                <th className="w-[18%] px-3 py-3 text-right font-medium">
                  کد تخفیف
                </th>

                <th className="w-[15%] px-3 py-3 text-right font-medium">
                  شناسه ملک
                </th>

                <th className="w-[15%] px-3 py-3 text-right font-medium">
                  درصد تخفیف
                </th>

                <th className="w-[18%] px-3 py-3 text-right font-medium">
                  تاریخ اعتبار
                </th>

                <th className="w-[16%] px-3 py-3 text-right font-medium">
                  وضعیت
                </th>

                <th className="w-[10%] px-3 py-3 text-center font-medium">
                  عملیات
                </th>
              </tr>
            </thead>

            <tbody>
              {isPending ? (
                <tr>
                  <td
                    colSpan={7}
                    className="rounded-lg bg-background px-4 py-10 text-center text-sm text-muted"
                  >
                    در حال دریافت کدهای تخفیف...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={7}
                    className="rounded-lg bg-background px-4 py-10 text-center text-sm text-red-500"
                  >
                    دریافت کدهای تخفیف با خطا مواجه شد.
                  </td>
                </tr>
              ) : filteredCodes.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="rounded-lg bg-background px-4 py-10 text-center text-sm text-muted"
                  >
                    کد تخفیفی پیدا نشد.
                  </td>
                </tr>
              ) : (
                filteredCodes.map((item) => {
                  const expired = isExpired(item.valid_until);

                  return (
                    <tr key={item.id} className="bg-background">
                      <td className="rounded-r-lg px-3 py-4 text-foreground">
                        {item.id}
                      </td>

                      <td className="px-3 py-4 font-semibold text-foreground">
                        <span className="flex items-center gap-2">
                          <TicketPercent size={16} className="text-[#91FF45]" />
                          {item.code}
                        </span>
                      </td>

                      <td className="px-3 py-4 text-muted">
                        <span className="flex items-center gap-2">
                          <Building2 size={15} />
                          {item.house_id}
                        </span>
                      </td>

                      <td className="px-3 py-4 font-semibold text-[#91FF45]">
                        {item.discount_percentage}%
                      </td>

                      <td className="px-3 py-4 text-muted">
                        <span className="flex items-center gap-2">
                          <CalendarDays size={15} />
                          {formatDate(item.valid_until)}
                        </span>
                      </td>

                      <td className="px-3 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ${
                            expired
                              ? "bg-red-500/10 text-red-400"
                              : "bg-green-500/10 text-green-500"
                          }`}
                        >
                          {expired ? (
                            <XCircle size={14} />
                          ) : (
                            <CheckCircle2 size={14} />
                          )}

                          {expired ? "منقضی شده" : "فعال"}
                        </span>
                      </td>

                      <td className="relative rounded-l-lg px-3 py-4 text-center">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === item.id ? null : item.id,
                            )
                          }
                          className="rounded-lg p-2 text-muted transition hover:bg-surface hover:text-foreground"
                        >
                          <MoreHorizontal size={19} />
                        </button>

                        {openMenuId === item.id && (
                          <>
                            <button
                              type="button"
                              aria-label="بستن منو"
                              onClick={() => setOpenMenuId(null)}
                              className="fixed inset-0 z-10 cursor-default"
                            />

                            <div className="absolute left-8 top-12 z-20 flex w-36 flex-col rounded-lg border border-border bg-surface p-1 shadow-xl">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedCode(item);
                                  setOpenMenuId(null);
                                }}
                                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-right text-xs text-foreground transition hover:bg-background"
                              >
                                <Pencil size={15} />
                                ویرایش
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setCodeToDelete(item);
                                  setOpenMenuId(null);
                                }}
                                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-right text-xs text-red-400 transition hover:bg-red-500/10"
                              >
                                <Trash2 size={15} />
                                حذف
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
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
      </div>

      <AddDiscountCodeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
        isPending={createDiscountCode.isPending}
      />

      <EditDiscountCodeModal
        isOpen={!!selectedCode}
        selectedCode={selectedCode}
        onClose={() => setSelectedCode(null)}
        onSubmit={handleEdit}
        isPending={updateDiscountCode.isPending}
      />

      <DeleteDiscountCodeModal
        isOpen={!!codeToDelete}
        selectedCode={codeToDelete}
        onClose={() => setCodeToDelete(null)}
        onConfirm={handleDelete}
        isPending={deleteDiscountCode.isPending}
      />
    </section>
  );
};

export default DiscountCodesSection;
