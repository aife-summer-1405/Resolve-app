"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Search,
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import Pagination from "@/src/components/common/Pagination";
import { useGetAdminBookings } from "@/src/hooks/dashboard_Admin/useGetAdminBookings";
import AdminBookingDetailsModal from "./AdminBookingDetailsModal";
import AdminBookingEditModal from "./AdminBookingEditModal";
import AdminBookingDeleteModal from "./AdminBookingDeleteModal";

const AdminBookingsSection = () => {
  const t = useTranslations("AdminBookingsSection");
  const locale = useLocale();

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null,
  );

  const [modalType, setModalType] = useState<
    "details" | "edit" | "delete" | null
  >(null);

  const limit = 10;

  const { data, isPending, isError } = useGetAdminBookings({
    page: currentPage,
    limit,
    status: selectedStatus || undefined,
  });

  const { data: allData, isPending: allCountLoading } = useGetAdminBookings({
    page: 1,
    limit: 1,
  });

  const { data: pendingData, isPending: pendingCountLoading } =
    useGetAdminBookings({
      page: 1,
      limit: 1,
      status: "pending",
    });

  const { data: confirmedData, isPending: confirmedCountLoading } =
    useGetAdminBookings({
      page: 1,
      limit: 1,
      status: "confirmed",
    });

  const { data: canceledData, isPending: canceledCountLoading } =
    useGetAdminBookings({
      page: 1,
      limit: 1,
      status: "canceled",
    });

  const bookings = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;
  const allBookingsCount = allData?.totalCount ?? 0;

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toString().includes(search) ||
      booking.user_id.toString().includes(search) ||
      booking.houseId.includes(search);

    return matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const paginatedBookings = filteredBookings;

  const pendingBookings = pendingData?.totalCount ?? 0;
  const confirmedBookings = confirmedData?.totalCount ?? 0;
  const canceledBookings = canceledData?.totalCount ?? 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCardClick = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
    setSearch("");
  };

  const handleCloseModal = () => {
    setSelectedBookingId(null);
    setModalType(null);
  };

  const formatDate = (date: string) => {
    if (!date) return "---";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "---";

    return parsedDate.toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US");
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return t("statuses.pending");
      case "confirmed":
        return t("statuses.confirmed");
      case "canceled":
        return t("statuses.canceled");
      default:
        return status || "---";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "confirmed":
        return "bg-green-500/10 text-green-500";
      case "canceled":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-card text-muted";
    }
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-foreground">{t("title")}</h1>

        <p className="text-xs text-muted">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <button
          type="button"
          onClick={() => handleCardClick("")}
          className={`flex items-center justify-between rounded-xl p-5 text-start transition ${
            selectedStatus === ""
              ? "bg-[#91FF45]/10 ring-1 ring-[#91FF45]"
              : "bg-surface hover:bg-card"
          }`}
        >
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted">{t("cards.total")}</span>
            <span className="text-3xl font-bold text-foreground">
              {allCountLoading ? "..." : allBookingsCount}
            </span>
          </div>

          <div className="flex size-14 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <CalendarDays size={26} />
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleCardClick("pending")}
          className={`flex items-center justify-between rounded-xl p-5 text-start transition ${
            selectedStatus === "pending"
              ? "bg-yellow-500/10 ring-1 ring-yellow-500"
              : "bg-surface hover:bg-card"
          }`}
        >
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted">{t("cards.pending")}</span>
            <span className="text-3xl font-bold text-foreground">
              {pendingCountLoading ? "..." : pendingBookings}
            </span>
          </div>

          <div className="flex size-14 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
            <Clock size={25} />
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleCardClick("confirmed")}
          className={`flex items-center justify-between rounded-xl p-5 text-start transition ${
            selectedStatus === "confirmed"
              ? "bg-green-500/10 ring-1 ring-green-500"
              : "bg-surface hover:bg-card"
          }`}
        >
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted">{t("cards.confirmed")}</span>
            <span className="text-3xl font-bold text-foreground">
              {confirmedCountLoading ? "..." : confirmedBookings}
            </span>
          </div>

          <div className="flex size-14 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
            <CheckCircle2 size={25} />
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleCardClick("canceled")}
          className={`flex items-center justify-between rounded-xl p-5 text-start transition ${
            selectedStatus === "canceled"
              ? "bg-red-500/10 ring-1 ring-red-500"
              : "bg-surface hover:bg-card"
          }`}
        >
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted">{t("cards.canceled")}</span>
            <span className="text-3xl font-bold text-foreground">
              {canceledCountLoading ? "..." : canceledBookings}
            </span>
          </div>

          <div className="flex size-14 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
            <XCircle size={25} />
          </div>
        </button>
      </div>

      <div className="flex flex-col gap-5 rounded-xl bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-4 border-b border-dashed border-border pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm font-bold text-foreground">
              {t("listTitle")}
            </h2>

            <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-background px-3 py-3 transition focus-within:border-[#91FF45] sm:w-80">
              <Search size={18} className="shrink-0 text-muted" />

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] table-fixed border-separate border-spacing-y-2 text-sm">
            <thead>
              <tr className="bg-background text-muted">
                <th className="w-[12%] rounded-s-xl px-4 py-3 text-start font-medium">
                  {t("table.bookingId")}
                </th>
                <th className="w-[14%] px-4 py-3 text-start font-medium">
                  {t("table.userId")}
                </th>
                <th className="w-[14%] px-4 py-3 text-start font-medium">
                  {t("table.houseId")}
                </th>
                <th className="w-[24%] px-4 py-3 text-start font-medium">
                  {t("table.reservedDates")}
                </th>
                <th className="w-[18%] px-4 py-3 text-start font-medium">
                  {t("table.status")}
                </th>
                <th className="w-[13%] px-4 py-3 text-start font-medium">
                  {t("table.createdAt")}
                </th>
                <th className="w-[5%] rounded-e-xl px-2 py-3 text-center font-medium">
                  {t("table.actions")}
                </th>
              </tr>
            </thead>

            <tbody>
              {isPending ? (
                <tr>
                  <td
                    colSpan={7}
                    className="rounded-xl bg-background px-4 py-12 text-center text-muted"
                  >
                    {t("loading")}
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={7}
                    className="rounded-xl bg-background px-4 py-12 text-center text-red-500"
                  >
                    {t("error")}
                  </td>
                </tr>
              ) : paginatedBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="rounded-xl bg-background px-4 py-12 text-center text-muted"
                  >
                    {t("empty")}
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="bg-background text-foreground"
                  >
                    <td className="px-4 py-3 text-xs font-semibold">
                      #{booking.id}
                    </td>

                    <td className="px-4 py-3 text-xs text-muted">
                      {booking.user_id}
                    </td>

                    <td className="px-4 py-3 text-xs text-muted">
                      {booking.houseId}
                    </td>

                    <td className="px-4 py-3 text-xs text-muted">
                      <div className="flex flex-col gap-1">
                        {booking.reservedDates.map((date, index) => (
                          <span key={`${date}-${index}`}>
                            {formatDate(date)}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-lg px-3 py-2 text-[10px] ${getStatusStyle(booking.status)}`}
                      >
                        {getStatusLabel(booking.status)}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-xs text-muted">
                      {formatDate(booking.createdAt)}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <div className="relative inline-flex">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === booking.id ? null : booking.id,
                            )
                          }
                          className="rounded-lg p-2 text-muted transition hover:bg-card hover:text-[#91FF45]"
                        >
                          <MoreHorizontal size={20} />
                        </button>

                        {openMenuId === booking.id && (
                          <>
                            <button
                              type="button"
                              aria-label={t("closeMenu")}
                              onClick={() => setOpenMenuId(null)}
                              className="fixed inset-0 z-10 cursor-default"
                            />

                            <div className="absolute end-8 top-0 z-20 w-40 overflow-hidden rounded-xl bg-surface p-1 text-start shadow-xl">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedBookingId(booking.id);
                                  setModalType("details");
                                  setOpenMenuId(null);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-foreground transition hover:bg-card hover:text-[#91FF45]"
                              >
                                <Eye size={15} />
                                {t("actions.details")}
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedBookingId(booking.id);
                                  setModalType("edit");
                                  setOpenMenuId(null);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-foreground transition hover:bg-card hover:text-[#91FF45]"
                              >
                                <Pencil size={15} />
                                {t("actions.edit")}
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedBookingId(booking.id);
                                  setModalType("delete");
                                  setOpenMenuId(null);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-red-500 transition hover:bg-red-500/10"
                              >
                                <Trash2 size={15} />
                                {t("actions.delete")}
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
            {t("pagination", {
              currentPage,
              totalPages,
            })}
          </span>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {selectedBookingId !== null && modalType === "details" && (
        <AdminBookingDetailsModal
          bookingId={selectedBookingId}
          onClose={handleCloseModal}
        />
      )}

      {selectedBookingId !== null && modalType === "edit" && (
        <AdminBookingEditModal
          bookingId={selectedBookingId}
          onClose={handleCloseModal}
          onSuccess={handleCloseModal}
        />
      )}

      {selectedBookingId !== null && modalType === "delete" && (
        <AdminBookingDeleteModal
          bookingId={selectedBookingId}
          onClose={handleCloseModal}
          onSuccess={handleCloseModal}
        />
      )}
    </section>
  );
};

export default AdminBookingsSection;
