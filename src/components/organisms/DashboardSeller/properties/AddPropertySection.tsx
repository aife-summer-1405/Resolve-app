
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
  ChevronDown,
} from "lucide-react";
const AddPropertySection = () => {
  const t = useTranslations("addProperty");
  const [message, setMessage] = useState("");

  const steps = [
    { title: t("initialInfo"), icon: <Info size={17} /> },
    { title: t("address"), icon: <MapPin size={17} /> },
    { title: t("facilities"), icon: <SlidersHorizontal size={17} /> },
    { title: t("images"), icon: <Images size={17} /> },
    { title: t("finalApproval"), icon: <CheckCircle2 size={17} /> },
  ];

  const fieldClass =
    "h-[39px] w-full rounded-2xl border border-border bg-background px-3 text-xs text-foreground outline-none transition focus:border-primary";

  const labelClass =
    "absolute -top-[7px] right-3 z-10 bg-surface px-1 text-[9px] text-muted";

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
                index === 0
                  ? "font-semibold text-foreground"
                  : "text-muted"
              }`}
            >
                <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                  index === 0
                    ? "border-foreground text-foreground"
                    : "border-muted text-muted"
                }`}
              >
                {step.icon}
              </span>
              {step.title}
            </div>

            {index !== steps.length - 1 && (
              <div className="h-px min-w-4 flex-1 border-t border-dashed border-muted" />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-6 px-1 sm:grid-cols-2 sm:px-2">
        <div className="relative">
          <label className={labelClass}>
            {t("propertyName")}
          </label>
          <input
            type="text"
            defaultValue={t("samplePropertyName")}
            className={fieldClass}
          />
        </div>

        <div className="relative">
          <label className={labelClass}>
            {t("capacity")}
          </label>
          <input
            type="number"
            min="1"
            className={fieldClass}
          />
        </div>

        <div className="relative">
          <label className={labelClass}>
            {t("transactionType")}
          </label>
          <select
            defaultValue="sale"
            className={`${fieldClass} appearance-none`}
          >
            <option value="sale">{t("sale")}</option>
            <option value="rent">{t("rent")}</option>
            <option value="daily">{t("daily")}</option>
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute left-3 top-3 text-muted"
          />
        </div>

        <div className="relative">
          <label className={labelClass}>
            {t("price")}
          </label>
          <input
            type="text"
            placeholder={t("currency")}
            className={fieldClass}
          />
        </div>

        <div className="relative">
          <label className={labelClass}>
            {t("propertyType")}
          </label>
          <select
            defaultValue="residential"
            className={`${fieldClass} appearance-none`}
          >
            <option value="residential">
              {t("residential")}
            </option>
            <option value="commercial">
              {t("commercial")}
            </option>
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute left-3 top-3 text-muted"
          />
        </div>

        <div className="relative">
          <label className={labelClass}>
            {t("propertySubtype")}
          </label>
          <select
            defaultValue="apartment"
            className={`${fieldClass} appearance-none`}
          >
            <option value="apartment">
              {t("apartment")}
            </option>
            <option value="villa">
              {t("villa")}
            </option>
            <option value="office">
              {t("office")}
            </option>
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute left-3 top-3 text-muted"
          />
        </div>

        <div className="relative sm:col-span-2">
          <label className={labelClass}>
            {t("description")}
          </label>
          <textarea
            rows={6}
            defaultValue={t("sampleDescription")}
            className="min-h-[155px] w-full resize-none rounded-2xl border border-border bg-background px-3 py-4 text-xs leading-7 text-foreground outline-none transition focus:border-primary"
          />
        </div>
      </div>

      {message && (
        <p className="mt-3 text-xs text-muted">
          {message}
        </p>
      )}

      <div className="mt-3 flex justify-start">
        <Link
            href="/dashboard/properties/add/address"
            className="flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-medium text-[#202020] transition hover:opacity-90"
        >
            {t("nextStep")}
            <ChevronLeft size={15} />
        </Link>
        </div>
    </section>
  );
};

export default AddPropertySection;
