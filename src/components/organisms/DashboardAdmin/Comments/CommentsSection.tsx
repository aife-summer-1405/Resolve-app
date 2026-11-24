"use client";

import { useState } from "react";
import {
  Search,
  Star,
  X,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  MessageSquare,
} from "lucide-react";

import Pagination from "@/src/components/common/Pagination";
import EditCommentModal from "./EditCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";

import type { IComment } from "@/src/types/Admin_Dashboard/Comments";
import { useGetAdminComments } from "@/src/hooks/dashboard_Admin/useGetAdminComments";
import { useGetAdminCommentById } from "@/src/hooks/dashboard_Admin/useGetAdminCommentById";
import { useDeleteAdminComment } from "@/src/hooks/dashboard_Admin/useDeleteAdminComment";

const formatDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
};

const CommentsSection = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  );
  const [editingComment, setEditingComment] = useState<IComment | null>(null);
  const [deletingComment, setDeletingComment] = useState<IComment | null>(null);
  const [openOperationsId, setOpenOperationsId] = useState<string | null>(null);

  const limit = 10;

  const { data, isLoading, isError } = useGetAdminComments({
    page: currentPage,
    limit,
  });

  const {
    data: commentDetails,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useGetAdminCommentById(selectedCommentId ?? "");

  const deleteComment = useDeleteAdminComment();

  const comments = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;

  const filteredComments = comments.filter((comment) => {
    const searchValue = search.trim().toLowerCase();

    return (
      comment.title?.toLowerCase().includes(searchValue) ||
      comment.caption?.toLowerCase().includes(searchValue) ||
      comment.user.firstName?.toLowerCase().includes(searchValue) ||
      comment.user.lastName?.toLowerCase().includes(searchValue) ||
      comment.house.title?.toLowerCase().includes(searchValue) ||
      comment.house.address?.toLowerCase().includes(searchValue)
    );
  });

  const averageRating =
    comments.length > 0
      ? (
          comments.reduce(
            (total, comment) => total + Number(comment.rating),
            0,
          ) / comments.length
        ).toFixed(1)
      : "0";

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const openDetails = (comment: IComment) => {
    setOpenOperationsId(null);
    setSelectedCommentId(comment.id);
  };

  const closeDetails = () => {
    setSelectedCommentId(null);
  };

  const openEditModal = (comment: IComment) => {
    setOpenOperationsId(null);
    setEditingComment(comment);
  };

  const closeEditModal = () => {
    setEditingComment(null);
  };

  const openDeleteModal = (comment: IComment) => {
    setOpenOperationsId(null);
    setDeletingComment(comment);
  };

  const closeDeleteModal = () => {
    if (deleteComment.isPending) return;
    setDeletingComment(null);
  };

  const handleDeleteComment = async (id: string) => {
    await deleteComment.mutateAsync(id);
    setDeletingComment(null);
  };

  const toggleOperations = (commentId: string) => {
    setOpenOperationsId((prev) => (prev === commentId ? null : commentId));
  };

  return (
    <section className="mt-2 flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-foreground">مدیریت نظرات</h1>

        <p className="text-xs text-muted">
          مدیریت و بررسی نظرات و امتیازهای کاربران
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="flex w-full items-center justify-between rounded-xl bg-surface p-5">
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted">کل نظرات</span>

            <span className="text-3xl font-bold text-foreground">
              {totalCount}
            </span>
          </div>

          <div className="flex size-14 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <MessageSquare size={26} />
          </div>
        </div>

        <div className="flex w-full items-center justify-between rounded-xl bg-surface p-5">
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted">میانگین امتیازها</span>

            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-foreground" dir="ltr">
                {averageRating}
              </span>

              <Star size={20} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>

          <div className="flex size-14 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <Star size={26} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-xl bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-4 border-b border-dashed border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-bold text-foreground">
            لیست نظرات کاربران
          </h2>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-background px-3 py-3 transition focus-within:border-[#91FF45] sm:w-80">
              <Search size={18} className="shrink-0 text-muted" />

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="جستجو در نظرات، کاربران و املاک..."
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="py-10 text-center text-sm text-muted">
            در حال دریافت نظرات...
          </div>
        )}

        {isError && (
          <div className="py-10 text-center text-sm text-red-500">
            دریافت نظرات با خطا مواجه شد.
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[900px] table-fixed border-separate border-spacing-y-2 text-sm">
                <thead>
                  <tr className="bg-background text-muted">
                    <th className="w-[20%] rounded-s-xl px-3 py-3 text-start font-medium">
                      کاربر
                    </th>

                    <th className="w-[22%] px-3 py-3 text-start font-medium">
                      ملک
                    </th>

                    <th className="w-[8%] px-3 py-3 text-center font-medium">
                      شناسه
                    </th>

                    <th className="w-[10%] px-3 py-3 text-center font-medium">
                      امتیاز
                    </th>

                    <th className="w-[12%] px-3 py-3 text-center font-medium">
                      نوع نظر
                    </th>

                    <th className="w-[18%] px-3 py-3 text-start font-medium">
                      تاریخ ثبت
                    </th>

                    <th className="w-[10%] rounded-e-xl px-3 py-3 text-center font-medium">
                      عملیات
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredComments.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="rounded-xl bg-background px-4 py-12 text-center text-muted"
                      >
                        نظری پیدا نشد.
                      </td>
                    </tr>
                  ) : (
                    filteredComments.map((comment) => (
                      <tr
                        key={comment.id}
                        className="bg-background text-foreground"
                      >
                        <td className="px-3 py-4">
                          <span className="text-xs font-medium">
                            {comment.user.firstName} {comment.user.lastName}
                          </span>
                        </td>

                        <td className="px-3 py-4">
                          <span className="truncate text-xs font-medium">
                            {comment.house.title}
                          </span>
                        </td>

                        <td className="px-3 py-4 text-center text-xs" dir="ltr">
                          {comment.id}
                        </td>

                        <td className="px-3 py-4">
                          <div className="flex items-center justify-center gap-1">
                            <Star
                              size={14}
                              className="fill-yellow-400 text-yellow-400"
                            />

                            <span className="text-xs" dir="ltr">
                              {comment.rating}
                            </span>
                          </div>
                        </td>

                        <td className="px-3 py-4 text-center">
                          {comment.parent_comment_id === null ? (
                            <span className="rounded-lg bg-[#91FF45]/10 px-2 py-1 text-[10px] text-[#91FF45]">
                              نظر اصلی
                            </span>
                          ) : (
                            <span className="rounded-lg bg-yellow-400/10 px-2 py-1 text-[10px] text-yellow-400">
                              پاسخ
                            </span>
                          )}
                        </td>

                        <td className="px-3 py-4 text-xs text-muted">
                          {formatDate(comment.created_at)}
                        </td>

                        <td className="px-3 py-4 text-center">
                          <div className="relative inline-flex">
                            <button
                              type="button"
                              onClick={() => toggleOperations(comment.id)}
                              className="rounded-lg p-2 text-muted transition hover:bg-card hover:text-[#91FF45]"
                            >
                              <MoreHorizontal size={20} />
                            </button>

                            {openOperationsId === comment.id && (
                              <>
                                <button
                                  type="button"
                                  aria-label="بستن منو"
                                  onClick={() => setOpenOperationsId(null)}
                                  className="fixed inset-0 z-10 cursor-default"
                                />

                                <div className="absolute end-8 top-0 z-20 w-36 overflow-hidden rounded-xl border border-border bg-surface p-1 text-start shadow-xl">
                                  <button
                                    type="button"
                                    onClick={() => openDetails(comment)}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-foreground transition hover:bg-card hover:text-[#91FF45]"
                                  >
                                    <Eye size={15} />
                                    جزئیات
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => openEditModal(comment)}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-foreground transition hover:bg-card hover:text-[#91FF45]"
                                  >
                                    <Pencil size={15} />
                                    ویرایش
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => openDeleteModal(comment)}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-foreground transition hover:bg-card hover:text-red-500"
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

            {/* Mobile Cards */}
            <div className="flex flex-col gap-3 md:hidden">
              {filteredComments.length === 0 ? (
                <div className="rounded-xl bg-background px-4 py-10 text-center text-xs text-muted">
                  نظری پیدا نشد.
                </div>
              ) : (
                filteredComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex flex-col gap-3 rounded-xl bg-background p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-foreground">
                        {comment.user.firstName} {comment.user.lastName}
                      </span>

                      {comment.parent_comment_id === null ? (
                        <span className="rounded-lg bg-[#91FF45]/10 px-2 py-1 text-[10px] text-[#91FF45]">
                          نظر اصلی
                        </span>
                      ) : (
                        <span className="rounded-lg bg-yellow-400/10 px-2 py-1 text-[10px] text-yellow-400">
                          پاسخ
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-xs text-muted">
                        {comment.house.title}
                      </span>

                      <span className="shrink-0 text-[10px] text-muted">
                        شناسه: {comment.id}
                      </span>
                    </div>

                    <p className="line-clamp-2 text-xs leading-6 text-muted">
                      {comment.caption}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-muted">
                          <Star
                            size={13}
                            className="fill-yellow-400 text-yellow-400"
                          />

                          {comment.rating}
                        </span>

                        <span className="text-[10px] text-muted">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>

                      <div className="relative inline-flex">
                        <button
                          type="button"
                          onClick={() => toggleOperations(comment.id)}
                          className="rounded-lg p-2 text-muted transition hover:bg-card hover:text-[#91FF45]"
                        >
                          <MoreHorizontal size={20} />
                        </button>

                        {openOperationsId === comment.id && (
                          <>
                            <button
                              type="button"
                              aria-label="بستن منو"
                              onClick={() => setOpenOperationsId(null)}
                              className="fixed inset-0 z-10 cursor-default"
                            />

                            <div className="absolute end-8 bottom-0 z-20 w-36 overflow-hidden rounded-xl border border-border bg-surface p-1 text-start shadow-xl">
                              <button
                                type="button"
                                onClick={() => openDetails(comment)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-foreground transition hover:bg-card hover:text-[#91FF45]"
                              >
                                <Eye size={15} />
                                جزئیات
                              </button>

                              <button
                                type="button"
                                onClick={() => openEditModal(comment)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-foreground transition hover:bg-card hover:text-[#91FF45]"
                              >
                                <Pencil size={15} />
                                ویرایش
                              </button>

                              <button
                                type="button"
                                onClick={() => openDeleteModal(comment)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-foreground transition hover:bg-card hover:text-red-500"
                              >
                                <Trash2 size={15} />
                                حذف
                              </button>
                            </div>
                          </>
                        )}
                      </div>
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

      {selectedCommentId && (
        <div
          dir="rtl"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={closeDetails}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-2xl bg-surface p-5 text-foreground shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-sm font-bold">جزئیات نظر</h2>

              <button
                type="button"
                onClick={closeDetails}
                className="rounded-lg p-2 text-muted transition hover:bg-background hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {isDetailsLoading && (
              <div className="py-10 text-center text-sm text-muted">
                در حال دریافت جزئیات نظر...
              </div>
            )}

            {isDetailsError && (
              <div className="py-10 text-center text-sm text-red-500">
                دریافت جزئیات نظر با خطا مواجه شد.
              </div>
            )}

            {!isDetailsLoading && !isDetailsError && commentDetails && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-background p-3">
                    <span className="mb-2 block text-[11px] text-muted">
                      شناسه نظر
                    </span>

                    <span className="text-sm font-semibold">
                      {commentDetails.id}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-3">
                    <span className="mb-2 block text-[11px] text-muted">
                      امتیاز
                    </span>

                    <span className="flex items-center gap-1 text-sm font-semibold">
                      <Star
                        size={15}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      {commentDetails.rating}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs text-muted">عنوان نظر</span>

                  <p className="rounded-xl bg-background p-3 text-sm font-medium">
                    {commentDetails.title}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs text-muted">متن نظر</span>

                  <p className="rounded-xl bg-background p-3 text-xs leading-7 text-foreground">
                    {commentDetails.caption}
                  </p>
                </div>

                <div className="flex flex-col gap-3 rounded-xl bg-background p-3">
                  <span className="text-xs font-semibold text-foreground">
                    اطلاعات کاربر
                  </span>

                  <span className="text-xs text-muted">
                    {commentDetails.user.firstName}{" "}
                    {commentDetails.user.lastName}
                  </span>
                </div>

                <div className="flex flex-col gap-3 rounded-xl bg-background p-3">
                  <span className="text-xs font-semibold text-foreground">
                    اطلاعات ملک
                  </span>

                  <span className="text-xs text-muted">
                    {commentDetails.house.title}
                  </span>

                  <p className="text-xs leading-6 text-muted">
                    {commentDetails.house.address}
                  </p>

                  <span className="text-[10px] text-muted">
                    شناسه ملک: {commentDetails.house.id}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs text-muted">تاریخ ثبت</span>

                  <div className="rounded-xl bg-background p-3 text-xs text-muted">
                    {formatDate(commentDetails.created_at)}
                  </div>
                </div>

                {commentDetails.parent_comment_id && (
                  <div className="rounded-xl bg-yellow-400/10 p-3">
                    <span className="text-xs text-yellow-400">
                      این نظر پاسخ به نظر شماره{" "}
                      {commentDetails.parent_comment_id} است.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <EditCommentModal
        isOpen={editingComment !== null}
        onClose={closeEditModal}
        comment={editingComment}
      />

      <DeleteCommentModal
        isOpen={deletingComment !== null}
        selectedComment={deletingComment}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteComment}
        isPending={deleteComment.isPending}
      />
    </section>
  );
};

export default CommentsSection;
