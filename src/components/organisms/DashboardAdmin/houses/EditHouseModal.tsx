"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { X, Save, ChevronDown } from "lucide-react";

import type {
  IAdminHouse,
  IUpdateAdminHousePayload,
} from "@/src/types/Admin_Dashboard/AdminHouses";
import { useUpdateAdminHouse } from "@/src/hooks/dashboard_Admin/useUpdateAdminHouse";

interface EditHouseModalProps {
  house: IAdminHouse;
  onClose: () => void;
}

const inputClass =
  "w-full rounded-xl bg-background px-3 py-3 text-sm text-foreground outline-none transition focus:ring-1 focus:ring-[#91FF45]";

const selectClass =
  "w-full appearance-none rounded-xl bg-background py-3 pr-3 pl-10 text-sm text-foreground outline-none transition focus:ring-1 focus:ring-[#91FF45]";

const formatDate = (date: string, locale: string) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleString(locale === "fa" ? "fa-IR" : "en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const EditHouseModal = ({ house, onClose }: EditHouseModalProps) => {
  const t = useTranslations("EditHouseModal");
  const locale = useLocale();

  const updateHouse = useUpdateAdminHouse();

  const [formData, setFormData] = useState({
    title: house.title ?? "",
    address: house.address ?? "",
    rate: String(house.rate ?? ""),
    price: String(Number(house.price ?? 0)),
    photos: house.photos?.join("\n") ?? "",
    tags: house.tags?.join(", ") ?? "",
    last_updated: house.last_updated ?? "",
    capacity: String(house.capacity ?? 1),
    lat: String(house.location?.lat ?? 0),
    lng: String(house.location?.lng ?? 0),
    category: house.categories?.name ?? "apartment",
    bathrooms: String(house.bathrooms ?? 0),
    parking: String(house.parking ?? 0),
    rooms: String(house.rooms ?? 0),
    yard_type: house.yard_type ?? "",
    transaction_type: house.transaction_type ?? "rental",
    caption: house.caption ?? "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: IUpdateAdminHousePayload = {
      title: formData.title,
      address: formData.address,
      rate: Number(formData.rate),
      price: Number(formData.price),
      photos: formData.photos
        .split("\n")
        .map((photo) => photo.trim())
        .filter(Boolean),
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      last_updated: formData.last_updated,
      capacity: Number(formData.capacity),
      location: {
        lat: Number(formData.lat),
        lng: Number(formData.lng),
      },
      categories: {
        name: formData.category,
      },
      bathrooms: Number(formData.bathrooms),
      parking: Number(formData.parking),
      rooms: Number(formData.rooms),
      yard_type: formData.yard_type,
      num_comments: house.num_comments ?? 0,
      transaction_type:
        formData.transaction_type as IUpdateAdminHousePayload["transaction_type"],
      caption: formData.caption.trim() || null,
    };

    updateHouse.mutate(
      {
        id: house.id,
        payload,
      },
      {
        onSuccess: onClose,
      },
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !updateHouse.isPending) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-surface shadow-2xl">
        <div className="flex items-center justify-between p-4 sm:p-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-bold text-foreground">
              {t("title")}
            </h2>

            <p className="text-xs text-muted">{t("description")}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={updateHouse.isPending}
            className="rounded-lg p-2 text-muted transition hover:bg-background hover:text-foreground disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-col overflow-hidden"
        >
          <div className="grid grid-cols-1 gap-4 overflow-y-auto p-4 sm:grid-cols-2 sm:p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">{t("houseTitle")}</label>
              <input
                required
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">{t("address")}</label>
              <input
                required
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">{t("price")}</label>
              <input
                required
                type="text"
                inputMode="numeric"
                value={Number(formData.price || 0).toLocaleString("en-US")}
                onChange={(e) =>
                  handleChange(
                    "price",
                    e.target.value.replace(/,/g, "").replace(/\D/g, ""),
                  )
                }
                className={inputClass}
                dir="ltr"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">{t("rate")}</label>
              <input
                required
                type="number"
                min="0"
                step="any"
                value={formData.rate}
                onChange={(e) => handleChange("rate", e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">{t("category")}</label>

              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className={selectClass}
                  dir="rtl"
                >
                  <option value="apartment">apartment</option>
                  <option value="suite">suite</option>
                  <option value="villa">villa</option>
                  <option value="garden-villa">garden-villa</option>
                  <option value="traditional-house">traditional-house</option>
                  <option value="villa-house">villa-house</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">
                {t("transactionType")}
              </label>

              <div className="relative">
                <select
                  value={formData.transaction_type}
                  onChange={(e) =>
                    handleChange("transaction_type", e.target.value)
                  }
                  className={selectClass}
                  dir="rtl"
                >
                  <option value="direct_purchase">direct_purchase</option>
                  <option value="mortgage">mortgage</option>
                  <option value="reservation">reservation</option>
                  <option value="rental">rental</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">{t("capacity")}</label>
              <input
                type="number"
                min="0"
                value={formData.capacity}
                onChange={(e) => handleChange("capacity", e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">{t("rooms")}</label>
              <input
                type="number"
                min="0"
                value={formData.rooms}
                onChange={(e) => handleChange("rooms", e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">{t("bathrooms")}</label>
              <input
                type="number"
                min="0"
                value={formData.bathrooms}
                onChange={(e) => handleChange("bathrooms", e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">{t("parking")}</label>
              <input
                type="number"
                min="0"
                value={formData.parking}
                onChange={(e) => handleChange("parking", e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">{t("yardType")}</label>
              <input
                value={formData.yard_type}
                onChange={(e) => handleChange("yard_type", e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">{t("latitude")}</label>
              <input
                type="number"
                step="any"
                value={formData.lat}
                onChange={(e) => handleChange("lat", e.target.value)}
                className={inputClass}
                dir="ltr"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">{t("longitude")}</label>
              <input
                type="number"
                step="any"
                value={formData.lng}
                onChange={(e) => handleChange("lng", e.target.value)}
                className={inputClass}
                dir="ltr"
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-xs text-muted">{t("photos")}</label>
              <textarea
                rows={3}
                value={formData.photos}
                onChange={(e) => handleChange("photos", e.target.value)}
                className={inputClass}
                dir="ltr"
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-xs text-muted">{t("tags")}</label>
              <input
                value={formData.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-xs text-muted">{t("caption")}</label>
              <textarea
                rows={3}
                value={formData.caption}
                onChange={(e) => handleChange("caption", e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-xs text-muted">{t("lastUpdated")}</label>
              <input
                value={formatDate(formData.last_updated, locale)}
                readOnly
                className={inputClass}
                dir="ltr"
              />
            </div>

            {updateHouse.isError && (
              <p className="text-xs text-red-500 sm:col-span-2">
                {t("updateError")}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 p-4 sm:flex-row sm:justify-end sm:p-5">
            <button
              type="button"
              onClick={onClose}
              disabled={updateHouse.isPending}
              className="rounded-xl bg-background px-5 py-3 text-sm text-foreground transition hover:opacity-80 disabled:opacity-50"
            >
              {t("cancel")}
            </button>

            <button
              type="submit"
              disabled={updateHouse.isPending}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#91FF45] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#7de832] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} />
              {updateHouse.isPending ? t("saving") : t("saveChanges")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHouseModal;
