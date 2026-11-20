"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { useUpdateAdminUser } from "@/src/hooks/dashboard_Admin/useUpdateAdminUser";
import type {
  IAdminUser,
  IUpdateAdminUserPayload,
} from "@/src/types/Admin_Dashboard/AdminUsers";

interface IProps {
  user: IAdminUser;
  onClose: () => void;
}

const EditAdminUserModal = ({ user, onClose }: IProps) => {
  const t = useTranslations("AdminUsers");

  const [formData, setFormData] = useState({
    email: user.email || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phoneNumber: user.phoneNumber || "",
    emailVerified: user.emailVerified,
    membershipDate: user.membershipDate
      ? new DateObject({
          date: user.membershipDate,
          calendar: gregorian,
          locale: gregorian_en,
        })
          .convert(persian, persian_fa)
          .format("YYYY-MM-DD")
      : "",
    profilePicture: user.profilePicture || "",
  });

  const updateUser = useUpdateAdminUser();

  const handleChange = (
    field: keyof typeof formData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const membershipDate = formData.membershipDate
      ? new DateObject({
          date: formData.membershipDate,
          calendar: persian,
          locale: persian_fa,
        })
          .convert(gregorian, gregorian_en)
          .format("YYYY-MM-DD")
      : null;

    const payload: IUpdateAdminUserPayload = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: `${formData.firstName} ${formData.lastName}`.trim(),
      phoneNumber: formData.phoneNumber || null,
      emailVerified: formData.emailVerified,
      membershipDate,
      profilePicture: formData.profilePicture || null,
    };

    updateUser.mutate(
      {
        userId: user.id,
        payload,
      },
      {
        onSuccess: onClose,
      },
    );
  };

  return (
    <div
      onClick={() => {
        if (!updateUser.isPending) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#222222] p-5 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">{t("editUser")}</h2>

          <button
            type="button"
            onClick={onClose}
            disabled={updateUser.isPending}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs text-gray-400">
              {t("firstName")}

              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-sm text-white outline-none focus:border-[#91FF45]"
              />
            </label>

            <label className="flex flex-col gap-2 text-xs text-gray-400">
              {t("lastName")}

              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-sm text-white outline-none focus:border-[#91FF45]"
              />
            </label>

            <label className="flex flex-col gap-2 text-xs text-gray-400 sm:col-span-2">
              {t("email")}

              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-sm text-white outline-none focus:border-[#91FF45]"
              />
            </label>

            <label className="flex flex-col gap-2 text-xs text-gray-400">
              {t("phone")}

              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                className="rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-sm text-white outline-none focus:border-[#91FF45]"
              />
            </label>

            <label className="flex flex-col gap-2 text-xs text-gray-400">
              {t("membershipDate")}

              <DatePicker
                value={formData.membershipDate || ""}
                onChange={(date) =>
                  handleChange(
                    "membershipDate",
                    date ? date.format("YYYY-MM-DD") : "",
                  )
                }
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                format="YYYY/MM/DD"
                editable={false}
                inputClass="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-sm text-white outline-none focus:border-[#91FF45]"
                containerClassName="w-full"
                portal
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-xs text-gray-400">
            {t("profilePicture")}

            <input
              type="text"
              value={formData.profilePicture}
              onChange={(e) => handleChange("profilePicture", e.target.value)}
              placeholder={t("profilePicturePlaceholder")}
              className="rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-sm text-white outline-none focus:border-[#91FF45]"
            />
          </label>

          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={formData.emailVerified}
              onChange={(e) => handleChange("emailVerified", e.target.checked)}
              className="size-4 accent-[#91FF45]"
            />

            {t("verified")}
          </label>

          {updateUser.isError && (
            <p className="text-xs text-red-400">{t("updateError")}</p>
          )}

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={updateUser.isPending}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/5 disabled:opacity-50"
            >
              {t("cancel")}
            </button>

            <button
              type="submit"
              disabled={updateUser.isPending}
              className="rounded-xl bg-[#91FF45] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#a5ff69] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateUser.isPending ? t("saving") : t("save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdminUserModal;
