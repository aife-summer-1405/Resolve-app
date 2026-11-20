"use client";

import { useState } from "react";
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
} from "lucide-react";
import { useGetAdminUsers } from "@/src/hooks/dashboard_Admin/useGetAdminUsers";
import type { IAdminUser } from "@/src/types/Admin_Dashboard/AdminUsers";
import Pagination from "@/src/components/common/Pagination";
import EditAdminUserModal from "./EditAdminUserModal";

const AdminUsersSection = () => {
  const t = useTranslations("AdminUsers");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedUser, setSelectedUser] = useState<IAdminUser | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);

  const limit = 10;

  const { data, isLoading, isError } = useGetAdminUsers({
    page: currentPage,
    limit,
    role: selectedRole
      ? (selectedRole as "admin" | "user" | "seller")
      : undefined,
  });

  const users = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const filteredUsers = users.filter((user) => {
    if (selectedStatus === "verified") return user.emailVerified;
    if (selectedStatus === "notVerified") return !user.emailVerified;

    return true;
  });

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-white">{t("title")}</h1>
        <p className="text-xs text-gray-400">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* Total Users */}
        <div className="flex w-full items-center justify-between rounded-xl bg-[#222222] p-5">
          <div className="flex flex-col gap-3">
            <span className="text-sm text-gray-400">{t("totalUsers")}</span>
            <span className="text-3xl font-bold text-white">{totalCount}</span>
          </div>

          <div className="flex size-14 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <Users size={26} />
          </div>
        </div>

        {/* Role Filter */}
        <div className="flex w-full items-center justify-between gap-5 rounded-xl bg-[#222222] p-5">
          <div className="flex flex-1 flex-col gap-3">
            <span className="text-sm text-gray-400">{t("roleFilter")}</span>

            <select
              value={selectedRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="w-full cursor-pointer bg-transparent text-sm text-white outline-none"
            >
              <option value="" className="bg-[#222222]">
                {t("allRoles")}
              </option>
              <option value="admin" className="bg-[#222222]">
                {t("adminRole")}
              </option>
              <option value="user" className="bg-[#222222]">
                {t("userRole")}
              </option>
              <option value="seller" className="bg-[#222222]">
                {t("sellerRole")}
              </option>
            </select>
          </div>

          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <SlidersHorizontal size={24} />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex w-full items-center justify-between gap-5 rounded-xl bg-[#222222] p-5">
          <div className="flex flex-1 flex-col gap-3">
            <span className="text-sm text-gray-400">{t("statusFilter")}</span>

            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full cursor-pointer bg-transparent text-sm text-white outline-none"
            >
              <option value="" className="bg-[#222222]">
                {t("allStatuses")}
              </option>
              <option value="verified" className="bg-[#222222]">
                {t("verified")}
              </option>
              <option value="notVerified" className="bg-[#222222]">
                {t("notVerified")}
              </option>
            </select>
          </div>

          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#91FF45] text-black">
            <BadgeCheck size={24} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-xl bg-[#222222] p-4 sm:p-5">
        <div className="flex flex-col gap-4 border-b border-dashed border-white/30 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-bold text-white">{t("usersList")}</h2>

          <div className="flex items-center gap-2 rounded-xl border border-white/50 px-3 py-2 sm:w-64">
            <Search size={17} className="shrink-0 text-gray-400" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full bg-transparent text-xs text-white outline-none placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-separate border-spacing-y-2 text-sm">
            <thead>
              <tr className="bg-[#171717] text-gray-400">
                <th className="rounded-s-xl px-4 py-3 text-start font-medium">
                  {t("user")}
                </th>
                <th className="px-4 py-3 text-start font-medium">
                  {t("phone")}
                </th>
                <th className="px-4 py-3 text-start font-medium">
                  {t("role")}
                </th>
                <th className="px-4 py-3 text-start font-medium">
                  {t("status")}
                </th>
                <th className="rounded-e-xl px-4 py-3 text-center font-medium">
                  {t("actions")}
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="rounded-xl bg-[#171717] px-4 py-12 text-center text-gray-400"
                  >
                    {t("loading")}
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={5}
                    className="rounded-xl bg-[#171717] px-4 py-12 text-center text-red-400"
                  >
                    {t("error")}
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="rounded-xl bg-[#171717] px-4 py-12 text-center text-gray-400"
                  >
                    {t("noUsers")}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="bg-[#171717] text-white">
                    <td className="rounded-s-xl px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#3A3A3A]">
                          {user.profilePicture ? (
                            <img
                              src={user.profilePicture}
                              alt={user.fullName}
                              className="size-full object-cover"
                            />
                          ) : (
                            <UserRound size={22} className="text-gray-300" />
                          )}
                        </div>

                        <span className="text-xs font-medium">
                          {user.fullName || "-"}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-xs text-gray-300">
                      {user.phoneNumber || "-"}
                    </td>

                    <td className="px-4 py-3 text-xs text-gray-300">
                      {user.role || "-"}
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

                    <td className="rounded-e-xl px-4 py-3 text-center">
                      <div className="relative inline-flex">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === user.id ? null : user.id,
                            )
                          }
                          className="rounded-lg p-2 text-gray-300 transition hover:bg-white/10 hover:text-[#91FF45]"
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

                            <div className="absolute end-10 top-0 z-20 w-36 overflow-hidden rounded-xl border border-white/10 bg-[#2A2A2A] p-1 text-start shadow-xl">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setOpenMenuId(null);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-gray-200 transition hover:bg-white/10 hover:text-[#91FF45]"
                              >
                                <Pencil size={15} />
                                {t("editUser")}
                              </button>

                              <button
                                type="button"
                                onClick={() => setOpenMenuId(null)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-red-400 transition hover:bg-white/10"
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
          <span className="text-xs text-gray-400">
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
    </section>
  );
};

export default AdminUsersSection;
