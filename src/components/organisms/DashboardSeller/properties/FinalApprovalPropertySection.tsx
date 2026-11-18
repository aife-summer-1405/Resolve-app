
"use client";

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
  BedDouble,
  Trees,
  Wallet,
  CircleDollarSign,
  Building2,
} from "lucide-react";

const FinalApprovalPropertySection = () => {
  const t = useTranslations("addProperty");

  const steps = [
    { title: t("initialInfo"), icon: <Info size={17} /> },
    { title: t("address"), icon: <MapPin size={17} /> },
    { title: t("facilities"), icon: <SlidersHorizontal size={17} /> },
    { title: t("images"), icon: <Images size={17} /> },
    { title: t("finalApproval"), icon: <CheckCircle2 size={17} /> },
  ];

  const propertyDetails = [
    {
      icon: <MapPin size={19} />,
      text: t("previewAddress"),
    },
    {
      icon: <BedDouble size={19} />,
      text: t("previewRoomInfo"),
    },
    {
      icon: <Trees size={19} />,
      text: t("previewFacilities"),
    },
    {
      icon: <Wallet size={19} />,
      text: t("previewTransaction"),
    },
  ];

  const propertyFeatures = [
    {
      icon: <Building2 size={19} />,
      label: t("previewResidential"),
    },
    {
      icon: <Building2 size={19} />,
      label: t("previewApartment"),
    },
  ];

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
                index < 4
                  ? "font-medium text-primary"
                  : "font-medium text-muted"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                  index < 4
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
                  index < 3 ? "border-primary" : "border-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 rounded-2xl border border-[#D1D5DB] bg-background p-3 dark:border-[#555555] sm:p-4 lg:grid-cols-2 lg:gap-6">

        <div className="flex min-w-0 flex-col gap-4">
          <div className="h-[170px] w-full overflow-hidden rounded-xl bg-[#444444] sm:h-[190px]" />

          <div className="space-y-4 py-1">
            {propertyDetails.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-xs sm:text-sm"
              >
                <span className="shrink-0 text-muted">
                  {item.icon}
                </span>

                <span className="leading-7 text-foreground">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-col">
          <h3 className="mb-3 text-center text-sm font-bold sm:text-right sm:text-base">
            {t("previewPropertyName")}
          </h3>

          <p className="text-justify text-[10px] leading-[2.1] text-muted sm:text-[11px]">
            {t("previewDescription")}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-muted">
              {t("previewTags")}:
            </span>

            {[
              t("previewTagApartment"),
              t("previewTagResidential"),
              t("previewTagBalcony"),
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-xl bg-primary px-4 py-1.5 text-[10px] font-medium text-[#202020]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-col items-start gap-3">
            {propertyFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-xs sm:text-sm"
              >
                <span className="text-muted">
                  {feature.icon}
                </span>

                <span>{feature.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-3 pt-5">
            <CircleDollarSign
              size={20}
              className="shrink-0 text-muted"
            />

            <span className="text-base font-semibold tracking-wider text-primary sm:text-lg">
              {t("previewPrice")}
            </span>

            <span className="text-xs font-medium text-primary">
              {t("currency")}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-start gap-3">

        <Link
          href="/dashboard/properties/add/images"
          className="flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-4 text-xs text-foreground transition hover:border-primary"
        >
          <ChevronRight size={15} />
          {t("previousStep")}
        </Link>

        <Link
        href="/dashboard/properties"
        className="flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-medium text-[#202020] transition hover:opacity-90"
        >
        
        {t("submitListing")}
        <CheckCircle2 size={15} />
        </Link>


      </div>
      
    </section>
  );
};

export default FinalApprovalPropertySection;
