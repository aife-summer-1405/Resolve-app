
"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Search,
  Share2,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  ExternalLink,
  Send,
  Globe,
  X,
  AlertTriangle,
} from "lucide-react";
import {
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import type { ComponentType } from "react";
import Pagination from "@/src/components/common/Pagination";
import { useGetSocialMediaLinks } from "@/src/hooks/dashboard_Admin/useGetSocialMediaLinks";
import type { ISocialMediaLink } from "@/src/types/Admin_Dashboard/SocialMediaLinks";
import { useCreateSocialMediaLink } from "@/src/hooks/dashboard_Admin/useCreateSocialMediaLink";
import { useUpdateSocialMediaLink } from "@/src/hooks/dashboard_Admin/useUpdateSocialMediaLink";
import { useDeleteSocialMediaLink } from "@/src/hooks/dashboard_Admin/useDeleteSocialMediaLink";

const platformOptions = [
  { value: "instagram" },
  { value: "whatsapp" },
  { value: "linkedin" },
  { value: "youtube" },
  { value: "telegram" },
  { value: "facebook" },
  { value: "twitter" },
  { value: "other" },
  { value: "pinterest" },
  { value: "tiktok" },
  { value: "aparat" },
];

const platformIcons: Record<string, ComponentType<any>> = {
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  telegram: Send,
  facebook: Globe,
  twitter: Globe,
  other: Share2,
};

const SocialMediaLinksSection = () => {
  const t = useTranslations("AdminSocialMediaLinks");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] =
    useState<ISocialMediaLink | null>(null);
  const [deleteLink, setDeleteLink] =
    useState<ISocialMediaLink | null>(null);

  const [formPlatform, setFormPlatform] = useState("instagram");
  const [formUrl, setFormUrl] = useState("");

  const limit = 5;

  const createSocialMediaLink = useCreateSocialMediaLink();
  const updateSocialMediaLink = useUpdateSocialMediaLink();
  const deleteSocialMediaLink = useDeleteSocialMediaLink();

  const { data, isLoading, isError } = useGetSocialMediaLinks({
    page: currentPage,
    limit,
  });

  const links = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;

  const filteredLinks = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return links;

    return links.filter(
      (link) =>
        link.platform.toLowerCase().includes(value) ||
        link.url.toLowerCase().includes(value),
    );
  }, [links, search]);

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const paginatedLinks = filteredLinks;

  const getPlatformLabel = (platform: string) => {
    const isKnownPlatform = platformOptions.some(
      (item) => item.value === platform,
    );

    return isKnownPlatform ? t(platform) : platform;
  };

  const openAddModal = () => {
    setEditingLink(null);
    setFormPlatform("instagram");
    setFormUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (link: ISocialMediaLink) => {
    setEditingLink(link);
    setFormPlatform(link.platform);
    setFormUrl(link.url);
    setOpenMenuId(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formUrl.trim()) return;

    try {
      if (editingLink) {
        await updateSocialMediaLink.mutateAsync({
          id: editingLink.id,
          platform: formPlatform,
          url: formUrl.trim(),
        });
      } else {
        await createSocialMediaLink.mutateAsync({
          platform: formPlatform,
          url: formUrl.trim(),
        });

        setCurrentPage(1);
      }

      setFormPlatform("instagram");
      setFormUrl("");
      setIsModalOpen(false);
      setEditingLink(null);
    } catch (error) {
      console.error(
        editingLink
          ? "Update social media link failed:"
          : "Create social media link failed:",
        error,
      );
    }
  };

  const handleDelete = async () => {
    if (!deleteLink) return;

    try {
      await deleteSocialMediaLink.mutateAsync(deleteLink.id);

      setDeleteLink(null);
      setOpenMenuId(null);
    } catch (error) {
      console.error("Delete social media link failed:", error);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const isSubmitting =
    createSocialMediaLink.isPending || updateSocialMediaLink.isPending;

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-foreground">
          {t("title")}
        </h1>

        <p className="text-xs text-muted">
          {t("description")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="flex w-full items-center justify-between rounded-xl bg-surface p-5">
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted">
              {t("totalLinks")}
            </span>

            <span className="text-3xl font-bold text-foreground">
              {totalCount}
            </span>
          </div>

          <div className="flex size-14 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <Share2 size={26} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-xl bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-4 border-b border-dashed border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-bold text-foreground">
            {t("listTitle")}
          </h2>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-background px-3 py-3 transition focus-within:border-[#91FF45] sm:w-72">
              <Search size={18} className="shrink-0 text-muted" />

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#91FF45] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#7ee833]"
            >
              <Plus size={18} />
              {t("add")}
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="py-10 text-center text-sm text-muted">
            {t("loading")}
          </div>
        )}

        {isError && (
          <div className="py-10 text-center text-sm text-red-500">
            {t("error")}
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[700px] table-fixed border-separate border-spacing-y-2 text-sm">
                <thead>
                  <tr className="bg-background text-muted">
                    <th className="w-[25%] rounded-s-xl px-4 py-3 text-start font-medium">
                      {t("platform")}
                    </th>

                    <th className="w-[55%] px-4 py-3 text-start font-medium">
                      {t("url")}
                    </th>

                    <th className="w-[20%] rounded-e-xl px-4 py-3 text-center font-medium">
                      {t("actions")}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedLinks.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="rounded-xl bg-background px-4 py-12 text-center text-muted"
                      >
                        {t("empty")}
                      </td>
                    </tr>
                  ) : (
                    paginatedLinks.map((link) => {
                      const Icon = platformIcons[link.platform] || Globe;

                      return (
                        <tr
                          key={link.id}
                          className="bg-background text-foreground"
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-card text-foreground">
                                <Icon size={21} />
                              </div>

                              <span className="text-xs font-medium">
                                {getPlatformLabel(link.platform)}
                              </span>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              dir="ltr"
                              className="inline-flex max-w-full items-center gap-2 text-xs text-muted transition hover:text-[#91FF45]"
                            >
                              <span className="truncate">{link.url}</span>
                              <ExternalLink size={14} className="shrink-0" />
                            </a>
                          </td>

                          <td className="px-4 py-4 text-center">
                            <div className="relative inline-flex">
                              <button
                                type="button"
                                onClick={() =>
                                  setOpenMenuId(
                                    openMenuId === link.id ? null : link.id,
                                  )
                                }
                                className="rounded-lg p-2 text-muted transition hover:bg-card hover:text-[#91FF45]"
                              >
                                <MoreHorizontal size={20} />
                              </button>

                              {openMenuId === link.id && (
                                <>
                                  <button
                                    type="button"
                                    aria-label={t("closeMenu")}
                                    onClick={() => setOpenMenuId(null)}
                                    className="fixed inset-0 z-10 cursor-default"
                                  />

                                  <div className="absolute end-10 top-0 z-20 w-36 overflow-hidden rounded-xl bg-surface p-1 text-start shadow-xl">
                                    <button
                                      type="button"
                                      onClick={() => openEditModal(link)}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-foreground transition hover:bg-card hover:text-[#91FF45]"
                                    >
                                      <Pencil size={15} />
                                      {t("edit")}
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setDeleteLink(link);
                                        setOpenMenuId(null);
                                      }}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-red-500 transition hover:bg-card"
                                    >
                                      <Trash2 size={15} />
                                      {t("delete")}
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 md:hidden">
              {paginatedLinks.length === 0 ? (
                <div className="rounded-xl bg-background px-4 py-10 text-center text-xs text-muted">
                  {t("empty")}
                </div>
              ) : (
                paginatedLinks.map((link) => {
                  const Icon = platformIcons[link.platform] || Globe;

                  return (
                    <div
                      key={link.id}
                      className="flex items-center gap-3 rounded-xl bg-background p-3"
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-card">
                        <Icon size={22} />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <span className="text-xs font-semibold text-foreground">
                          {getPlatformLabel(link.platform)}
                        </span>

                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          dir="ltr"
                          className="truncate text-start text-[11px] text-muted"
                        >
                          {link.url}
                        </a>
                      </div>

                      <div className="relative shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === link.id ? null : link.id,
                            )
                          }
                          className="rounded-lg p-2 text-muted hover:bg-card"
                        >
                          <MoreHorizontal size={20} />
                        </button>

                        {openMenuId === link.id && (
                          <>
                            <button
                              type="button"
                              aria-label={t("closeMenu")}
                              onClick={() => setOpenMenuId(null)}
                              className="fixed inset-0 z-10"
                            />

                            <div className="absolute end-8 top-0 z-20 w-32 rounded-xl bg-surface p-1 shadow-xl">
                              <button
                                type="button"
                                onClick={() => openEditModal(link)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs hover:bg-card"
                              >
                                <Pencil size={14} />
                                {t("edit")}
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setDeleteLink(link);
                                  setOpenMenuId(null);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-red-500 hover:bg-card"
                              >
                                <Trash2 size={14} />
                                {t("delete")}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-2 flex flex-col-reverse items-center justify-between gap-3 pt-4 sm:flex-row">
              <span className="text-xs text-muted">
                {t("page", { currentPage, totalPages })}
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

      {isModalOpen && (
        <div
          dir="rtl"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-[440px] flex-col gap-5 rounded-[22px] bg-surface p-5 text-foreground shadow-2xl sm:p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold">
                {editingLink ? t("editTitle") : t("addTitle")}
              </h3>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-2 text-muted transition hover:bg-background"
              >
                <X size={19} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium">
                {t("platform")}
              </label>

              <select
                value={formPlatform}
                onChange={(e) => setFormPlatform(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-[#91FF45]"
              >
                {platformOptions.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                    className="bg-surface"
                  >
                    {t(item.value)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium">
                {t("url")}
              </label>

              <input
                type="url"
                required
                value={formUrl}
                onChange={(e) => setFormUrl(e.target.value)}
                placeholder={t("urlPlaceholder")}
                dir="ltr"
                className="w-full rounded-xl border border-border bg-background px-3 py-3 text-left text-sm text-foreground outline-none transition focus:border-[#91FF45] placeholder:text-muted"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg px-4 py-2.5 text-xs text-muted transition hover:bg-background"
              >
                {t("cancel")}
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-[#91FF45] px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-[#7ee833] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? t("saving")
                  : editingLink
                    ? t("save")
                    : t("create")}
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteLink && (
        <div
          dir="rtl"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setDeleteLink(null)}
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

            <h3 className="mb-4 text-center text-sm font-bold">
              {t("deleteTitle")}
            </h3>

            <p className="mb-5 text-center text-xs leading-6 text-muted">
              {t("deleteDescription")}
            </p>

            <span className="mb-7 text-xs font-medium">
              {getPlatformLabel(deleteLink.platform)}
            </span>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteSocialMediaLink.isPending}
                className="rounded-lg bg-[#FF9500] px-5 py-2 text-[11px] text-black transition hover:bg-[#E98500] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleteSocialMediaLink.isPending
                  ? t("deleting")
                  : t("confirmDelete")}
              </button>

              <button
                type="button"
                onClick={() => setDeleteLink(null)}
                className="text-[11px] text-foreground transition hover:opacity-70"
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

export default SocialMediaLinksSection;
