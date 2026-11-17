
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  CheckCircle2,
  MapPin,
  Images,
  SlidersHorizontal,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Location = {
  lat: number;
  lng: number;
};

const PropertyLocationMap = dynamic(
  () => import("./PropertyLocationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-background text-xs text-muted">
        Loading map...
      </div>
    ),
  }
);

const AddressPropertySection = () => {
  const t = useTranslations("addProperty");
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<Location | null>(null);

  const isReady = address.trim().length > 0 && location !== null;

  const steps = [
    { title: t("initialInfo"), icon: <Info size={17} /> },
    { title: t("address"), icon: <MapPin size={17} /> },
    { title: t("facilities"), icon: <SlidersHorizontal size={17} /> },
    { title: t("images"), icon: <Images size={17} /> },
    { title: t("finalApproval"), icon: <CheckCircle2 size={17} /> },
  ];

  return (
    <section
      dir="rtl"
      className="w-full rounded-2xl bg-surface p-3 text-foreground sm:p-5"
    >
      <div className="flex flex-col gap-3 border-b border-dashed border-border pb-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold">
          {t("title")}
        </h2>

        <Link
          href="/dashboard/properties"
          className="flex items-center gap-2 text-[11px] text-blue-500 transition hover:opacity-70"
        >
          <ChevronLeft size={14} />
          {t("backToProperties")}
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
                index === 1
                  ? "font-semibold text-foreground"
                  : index < 1
                    ? "font-medium text-primary"
                    : "text-muted"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                  index === 1
                    ? "border-foreground text-foreground"
                    : index < 1
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
                  index === 0 ? "border-primary" : "border-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div
        dir="ltr"
        className="grid grid-cols-1 items-center gap-6 py-5 lg:grid-cols-2 lg:gap-8"
      >
        <div className="relative order-2 h-[280px] overflow-hidden rounded-2xl border border-border sm:h-[360px] lg:order-1">
          <PropertyLocationMap
            location={location}
            onLocationChange={setLocation}
          />
        </div>

        <div
          dir="rtl"
          className="order-1 flex min-h-[280px] flex-col justify-start gap-10 lg:order-2 lg:pt-2"
        >
          <div className="relative">
            <label className="absolute -top-[7px] right-3 z-10 bg-surface px-1 text-[9px] text-muted">
              {t("propertyAddress")}
            </label>

            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder={t("addressPlaceholder")}
              className="h-[39px] w-full rounded-2xl border border-border bg-background px-3 text-xs text-foreground outline-none transition placeholder:text-muted/60 focus:border-primary"
            />
          </div>

          <div className="space-y-5 text-center lg:text-right">
            <h3 className="text-sm font-semibold leading-8">
              {t("selectLocationTitle")}
            </h3>

            <p className="text-xs leading-8 text-foreground">
              {t("selectLocationDescription")}{" "}
              <span className="font-semibold text-primary">
                {t("selectLocationHighlight")}
              </span>{" "}
              {t("selectLocationEnd")}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background px-4 py-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-primary">
              <MapPin size={17} />
              {t("selectedLocation")}
            </div>

            <p dir="ltr" className="text-left text-[11px] text-muted">
              {location
                ? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`
                : t("locationNotSelected")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-start gap-3">
        <Link
          href="/dashboard/properties/add"
          className="flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-4 text-xs text-foreground transition hover:border-primary"
        >
          <ChevronRight size={15} />
          {t("previousStep")}
        </Link>

        <button
          type="button"
          disabled={!isReady}
          onClick={() =>
            router.push("/dashboard/properties/add/facilities")
          }
          className={`flex h-9 items-center gap-2 rounded-xl px-4 text-xs font-medium text-[#202020] transition ${
            isReady
              ? "bg-primary hover:opacity-90"
              : "cursor-not-allowed bg-primary opacity-40"
          }`}
        >
          {t("nextStep")}
          <ChevronLeft size={15} />
        </button>
      </div>
    </section>
  );
};

export default AddressPropertySection;
