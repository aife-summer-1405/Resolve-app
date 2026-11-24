"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Search,
  UserRound,
  MoreHorizontal,
  Users,
  SlidersHorizontal,
  BadgeCheck,
  Pencil,
  Trash2,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { useGetAdminUsers } from "@/src/hooks/dashboard_Admin/useGetAdminUsers";
import { useDeleteAdminUser } from "@/src/hooks/dashboard_Admin/useDeleteAdminUser";
import type {
  IAdminUser,
  AdminUserRole,
} from "@/src/types/Admin_Dashboard/AdminUsers";
import Pagination from "@/src/components/common/Pagination";
import EditAdminUserModal from "./EditAdminUserModal";

export const ADMIN_USER_STORAGE_KEY = (id: string | number) =>
  `admin-user:${id}`;

const AdminUsersSection = () => {
  const t = useTranslations("AdminUsers");
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState("buyer");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [debouncedEmail, setDebouncedEmail] = useState("");
  const [selectedUser, setSelectedUser] = useState<IAdminUser | null>(null);
  const [selectedDeleteUser, setSelectedDeleteUser] =
    useState<IAdminUser | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);

  const limit = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedEmail(searchEmail.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [searchEmail]);

  const { data, isLoading, isError } = useGetAdminUsers({
    page: currentPage,
    limit,
    email: debouncedEmail || undefined,
   role: selectedRole ? (selectedRole as AdminUserRole) : undefined,
  });

  const deleteUser = useDeleteAdminUser();

  const users = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const filteredUsers = users.filter((user) => {
    if (selectedStatus === "verified") return user.emailVerified;
    if (selectedStatus === "notVerified") return !user.emailVerified;
    return true;
  });

  const handleSearchChange = (value: string) => {
    setSearchEmail(value);
    setCurrentPage(1);
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleViewUser = (user: IAdminUser) => {
    try {
      sessionStorage.setItem(
        ADMIN_USER_STORAGE_KEY(user.id),
        JSON.stringify(user),
      );
    } catch {
    }
    setOpenMenuId(null);
    router.push(`/dashboard/users/${user.id}`);
  };

  const handleDeleteUser = () => {
    if (!selectedDeleteUser) return;

    deleteUser.mutate(selectedDeleteUser.id, {
      onSuccess: () => {
        setSelectedDeleteUser(null);

        if (filteredUsers.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
      },
    });
  };

  const roleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return t("adminRole");
      case "seller":
        return t("sellerRole");
      case "buyer":
        return t("buyerRole");
      default:
        return role || "-";
    }
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-foreground">{t("title")}</h1>
        <p className="text-xs text-muted">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="flex w-full items-center justify-between rounded-xl bg-surface p-5">
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted">{t("totalUsers")}</span>
            <span className="text-3xl font-bold text-foreground">
              {totalCount}
            </span>
          </div>

          <div className="flex size-14 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <Users size={26} />
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-5 rounded-xl bg-surface p-5">
          <div className="flex flex-1 flex-col gap-3">
            <span className="text-sm text-muted">{t("roleFilter")}</span>

            <select
              value={selectedRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="w-full cursor-pointer bg-transparent text-sm text-foreground outline-none"
            >
             
              <option value="admin" className="bg-surface text-foreground">
               admin
              </option>
              <option value="seller" className="bg-surface text-foreground">
                seller
              </option>
              <option value="buyer" className="bg-surface text-foreground">
               buyer
              </option>
            </select>
          </div>

          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <SlidersHorizontal size={24} />
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-5 rounded-xl bg-surface p-5">
          <div className="flex flex-1 flex-col gap-3">
            <span className="text-sm text-muted">{t("statusFilter")}</span>

            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full cursor-pointer bg-transparent text-sm text-foreground outline-none"
            >
              <option value="" className="bg-surface text-foreground">
                {t("allStatuses")}
              </option>
              <option value="verified" className="bg-surface text-foreground">
                {t("verified")}
              </option>
              <option
                value="notVerified"
                className="bg-surface text-foreground"
              >
                {t("notVerified")}
              </option>
            </select>
          </div>

          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <BadgeCheck size={24} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-xl bg-surface p-4 sm:p-5">
        <div className="flex justify-between gap-4 border-b border-dashed border-border pb-4">
          <h2 className="text-sm font-bold text-foreground">
            {t("usersList")}
          </h2>
          <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-background px-3 py-3 transition focus-within:border-[#91FF45] sm:w-80">
            <Search size={18} className="shrink-0 text-muted" />
            <input
              type="text"
              value={searchEmail}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] table-fixed border-separate border-spacing-y-2 text-sm">
            <thead>
              <tr className="bg-background text-muted">
                <th className="w-[35%] rounded-s-xl px-4 py-3 text-start font-medium">
                  {t("user")}
                </th>
                <th className="w-[20%] px-4 py-3 text-start font-medium">
                  {t("phone")}
                </th>
                <th className="w-[15%] px-4 py-3 text-start font-medium">
                  {t("role")}
                </th>
                <th className="w-[15%] px-4 py-3 text-start font-medium">
                  {t("status")}
                </th>
                <th className="w-[15%] rounded-e-xl px-4 py-3 text-center font-medium">
                  {t("actions")}
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="rounded-xl bg-background px-4 py-12 text-center text-muted"
                  >
                    {t("loading")}
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={5}
                    className="rounded-xl bg-background px-4 py-12 text-center text-red-500"
                  >
                    {t("error")}
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="rounded-xl bg-background px-4 py-12 text-center text-muted"
                  >
                    {t("noUsers")}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="bg-background text-foreground">
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleViewUser(user)}
                        className="flex w-full items-center gap-3 text-start transition hover:opacity-80"
                      >
                        <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-card">
                          {user.profilePicture ? (
                            <Image
                              src={user.profilePicture}
                              alt={user.fullName}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <UserRound size={22} className="text-muted" />
                          )}
                        </div>

                        <div className="flex min-w-0 flex-col items-start gap-1">
                          <span className="w-full truncate text-xs font-medium text-foreground">
                            {user.fullName || "-"}
                          </span>

                          <span
                            className="w-full truncate text-start text-xs text-muted"
                            dir="ltr"
                          >
                            {user.email || "-"}
                          </span>
                        </div>
                      </button>
                    </td>

                    <td className="px-4 py-3 text-xs text-muted" dir="ltr">
                      <span className="block text-start">
                        {user.phoneNumber || "-"}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-xs text-muted">
                      {roleLabel(user.role)}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ${
                          user.emailVerified
                            ? "bg-[#91FF45] text-black"
                            : "bg-[#FFCA28] text-black"
                        }`}
                      >
                        {user.emailVerified ? t("verified") : t("notVerified")}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <div className="relative inline-flex">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === user.id ? null : user.id,
                            )
                          }
                          className="rounded-lg p-2 text-muted transition hover:bg-card hover:text-[#91FF45]"
                        >
                          <MoreHorizontal size={20} />
                        </button>

                        {openMenuId === user.id && (
                          <>
                            <button
                              type="button"
                              aria-label="Close menu"
                              onClick={() => setOpenMenuId(null)}
                              className="fixed inset-0 z-10 cursor-default"
                            />

                            <div className="absolute end-10 top-0 z-20 w-40 overflow-hidden rounded-xl bg-surface p-1 text-start shadow-xl">
                              <button
                                type="button"
                                onClick={() => handleViewUser(user)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-foreground transition hover:bg-card hover:text-[#91FF45]"
                              >
                                <Eye size={15} />
                                {t("viewDetails")}
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setOpenMenuId(null);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-foreground transition hover:bg-card hover:text-[#91FF45]"
                              >
                                <Pencil size={15} />
                                {t("editUser")}
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedDeleteUser(user);
                                  setOpenMenuId(null);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-red-500 transition hover:bg-card"
                              >
                                <Trash2 size={15} />
                                {t("deleteUser")}
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

      {selectedUser && (
        <EditAdminUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {selectedDeleteUser && (
        <div
          dir="rtl"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => {
            if (!deleteUser.isPending) {
              setSelectedDeleteUser(null);
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
              {t("deleteTitle")}
            </h3>

            <p className="mb-7 text-center text-xs leading-6 text-muted sm:mb-8">
              {t("deleteDescription")}
            </p>

            <span className="mb-7 text-xs font-medium text-foreground">
              {selectedDeleteUser.fullName}
            </span>

            {deleteUser.isError && (
              <p className="mb-4 text-xs text-red-500">{t("deleteError")}</p>
            )}

            <div className="flex items-center gap-4">
              <button
                type="button"
                disabled={deleteUser.isPending}
                onClick={handleDeleteUser}
                className="rounded-lg bg-[#FF9500] px-5 py-2 text-[11px] text-black transition hover:bg-[#E98500] disabled:opacity-50"
              >
                {deleteUser.isPending ? t("deleting") : t("confirmDelete")}
              </button>

              <button
                type="button"
                disabled={deleteUser.isPending}
                onClick={() => setSelectedDeleteUser(null)}
                className="text-[11px] text-foreground transition hover:opacity-70 disabled:opacity-50"
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

export default AdminUsersSection;