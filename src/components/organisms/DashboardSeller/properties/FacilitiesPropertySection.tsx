
"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  CheckCircle2,
  MapPin,
  Images,
  SlidersHorizontal,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const FacilitiesPropertySection = () => {
  const t = useTranslations("addProperty");

  const [rooms, setRooms] = useState("5");
  const [bathrooms, setBathrooms] = useState("5");
  const [parking, setParking] = useState("5");
  const [wallType, setWallType] = useState("block");
  const [selectedFeatures, setSelectedFeatures] = useState([
    "modern",
    "apartment",
    "elevator",
  ]);

  const steps = [
    { title: t("initialInfo"), icon: <Info size={17} /> },
    { title: t("address"), icon: <MapPin size={17} /> },
    { title: t("facilities"), icon: <SlidersHorizontal size={17} /> },
    { title: t("images"), icon: <Images size={17} /> },
    { title: t("finalApproval"), icon: <CheckCircle2 size={17} /> },
  ];

  const features = [
    { value: "modern", label: t("modern") },
    { value: "apartment", label: t("apartmentFeature") },
    { value: "elevator", label: t("elevator") },
    { value: "storage", label: t("storage") },
    { value: "balcony", label: t("balcony") },
    { value: "yard", label: t("yard") },
  ];

  const toggleFeature = (value: string) => {
    setSelectedFeatures((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const selectedFeatureItems = features.filter((feature) =>
    selectedFeatures.includes(feature.value)
  );

  return (
    <section
      dir="rtl"
      className="w-full rounded-2xl bg-surface p-3 text-foreground sm:p-5"
    >
      <div className="flex flex-col gap-3 border-b border-dashed border-border pb-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold">{t("title")}</h2>

        <Link
          href="/dashboard/properties"
          className="flex items-center gap-2 text-[11px] text-blue-500 transition hover:opacity-70"
        >
          {t("backToProperties")}
          <ChevronLeft size={14} />
        </Link>
      </div>

      <div className="my-5 flex items-center justify-between gap-2 overflow-x-auto rounded-2xl bg-background px-4 py-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex min-w-max flex-1 items-center gap-2"
          >
            <div
              className={`flex shrink-0 items-center gap-2 text-[10px] ${
                index === 2
                  ? "font-semibold text-foreground"
                  : index < 2
                    ? "font-medium text-primary"
                    : "text-muted"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                  index === 2
                    ? "border-foreground text-foreground"
                    : index < 2
                      ? "border-primary text-primary"
                      : "border-border text-muted"
                }`}
              >
                {step.icon}
              </span>

              {step.title}
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`h-px min-w-4 flex-1 border-t border-dashed ${
                  index < 2 ? "border-primary" : "border-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-7 py-8 sm:grid-cols-2">
        <div className="relative">
          <label className="absolute -top-[7px] right-3 z-10 bg-surface px-1 text-[9px] text-muted">
            {t("roomsCount")}
          </label>

          <input
            type="number"
            min="0"
            value={rooms}
            onChange={(event) => setRooms(event.target.value)}
            placeholder={t("roomsPlaceholder")}
            className="h-[39px] w-full rounded-2xl border border-border bg-background px-3 text-xs text-foreground outline-none transition focus:border-primary"
          />
        </div>

        <div className="relative">
          <label className="absolute -top-[7px] right-3 z-10 bg-surface px-1 text-[9px] text-muted">
            {t("bathroomsCount")}
          </label>

          <input
            type="number"
            min="0"
            value={bathrooms}
            onChange={(event) => setBathrooms(event.target.value)}
            placeholder={t("bathroomsPlaceholder")}
            className="h-[39px] w-full rounded-2xl border border-border bg-background px-3 text-xs text-foreground outline-none transition focus:border-primary"
          />
        </div>

        <div className="relative">
          <label className="absolute -top-[7px] right-3 z-10 bg-surface px-1 text-[9px] text-muted">
            {t("parkingCount")}
          </label>

          <input
            type="number"
            min="0"
            value={parking}
            onChange={(event) => setParking(event.target.value)}
            placeholder={t("parkingPlaceholder")}
            className="h-[39px] w-full rounded-2xl border border-border bg-background px-3 text-xs text-foreground outline-none transition focus:border-primary"
          />
        </div>

        <div className="relative">
          <label className="absolute -top-[7px] right-3 z-10 bg-surface px-1 text-[9px] text-muted">
            {t("wallType")}
          </label>

          <select
            value={wallType}
            onChange={(event) => setWallType(event.target.value)}
            className="h-[39px] w-full appearance-none rounded-2xl border border-border bg-background px-3 text-xs text-foreground outline-none transition focus:border-primary"
          >
            <option value="block">{t("blockWall")}</option>
            <option value="brick">{t("brickWall")}</option>
            <option value="concrete">{t("concreteWall")}</option>
            <option value="other">{t("otherWall")}</option>
          </select>

          <ChevronLeft
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 rotate-[-90deg] text-muted"
          />
        </div>

        <div className="relative sm:col-span-2">
          <label className="absolute -top-[7px] right-3 z-10 bg-surface px-1 text-[9px] text-muted">
            {t("features")}
          </label>

          <div className="flex min-h-[50px] flex-wrap items-center gap-2 rounded-2xl border border-border bg-background px-3 py-2">
            {selectedFeatureItems.map((feature) => (
              <span
                key={feature.value}
                className="flex h-7 items-center gap-2 rounded-xl bg-primary px-3 text-[10px] font-medium text-[#202020]"
              >
                {feature.label}

                <button
                  type="button"
                  onClick={() => toggleFeature(feature.value)}
                  aria-label={`${t("removeFeature")} ${feature.label}`}
                  className="transition hover:opacity-60"
                >
                  <X size={12} />
                </button>
              </span>
            ))}

            <select
              value=""
              onChange={(event) => {
                if (event.target.value) {
                  toggleFeature(event.target.value);
                }
              }}
              className="min-w-[90px] flex-1 bg-transparent py-1 text-xs text-muted outline-none"
            >
              <option value="" disabled>
                {t("selectFeatures")}
              </option>

              {features
                .filter(
                  (feature) => !selectedFeatures.includes(feature.value)
                )
                .map((feature) => (
                  <option key={feature.value} value={feature.value}>
                    {feature.label}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-28 flex flex-wrap items-center justify-start gap-3">
        <Link
          href="/dashboard/properties/add/address"
          className="flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-4 text-xs text-foreground transition hover:border-primary"
        >
          <ChevronRight size={15} />
          {t("previousStep")}
        </Link>

        <Link
          href="/dashboard/properties/add/images"
          className="flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-medium text-[#202020] transition hover:opacity-90"
        >
          {t("nextStep")}
          <ChevronLeft size={15} />
        </Link>
      </div>
    </section>
  );
};

export default FacilitiesPropertySection;
