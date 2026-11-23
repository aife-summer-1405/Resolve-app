"use client";

import { useState } from "react";
import { X, MapPin } from "lucide-react";

import type { ILocation } from "@/src/types/Admin_Dashboard/Locations";
import { useUpdateLocation } from "@/src/hooks/dashboard_Admin/useUpdateLocation";
interface EditLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: ILocation | null;
}

const EditLocationModal = ({
  isOpen,
  onClose,
  location,
}: EditLocationModalProps) => {
  const [areaName, setAreaName] = useState(location?.areaName ?? "");
  const [lat, setLat] = useState(location?.lat ?? "");
  const [lng, setLng] = useState(location?.lng ?? "");

  const { mutate, isPending } = useUpdateLocation();

  if (!isOpen || !location) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      {
        locationId: location.id,
        payload: {
          area_name: areaName.trim(),
          lat: Number(lat),
          lng: Number(lng),
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-surface p-5 sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-[#91FF45]" />

            <h2 className="text-lg font-bold text-foreground">ویرایش منطقه</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted transition hover:bg-background hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">نام منطقه</label>

            <input
              type="text"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              placeholder="نام منطقه را وارد کنید"
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-[#91FF45]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">عرض جغرافیایی</label>

            <input
              type="number"
              step="any"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="مثلاً 32.6546"
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-[#91FF45]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">طول جغرافیایی</label>

            <input
              type="number"
              step="any"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              placeholder="مثلاً 51.668"
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-[#91FF45]"
            />
          </div>

          <div className="mt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-xl bg-[#91FF45] py-3 text-sm font-bold text-black transition hover:bg-[#7eea35] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-background py-3 text-sm text-foreground transition hover:opacity-80"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLocationModal;
