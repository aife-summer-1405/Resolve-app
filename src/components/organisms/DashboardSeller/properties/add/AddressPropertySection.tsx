
"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";

import type { IProperty } from "@/src/schemas/properties/propertySchema";
import { FieldError } from "./FieldError";
import { useAddProperty } from "@/src/providers/AddPropertyFormProvider";

const MapLoading = () => {
  const t = useTranslations("addProperty");

  return (
    <div className="flex h-full w-full items-center justify-center bg-background text-xs text-muted">
      {t("loadingMap")}
    </div>
  );
};

const PropertyLocationMap = dynamic(
  () => import("./PropertyLocationMap"),
  {
    ssr: false,
    loading: () => <MapLoading />,
  }
);

const AddressPropertySection = () => {
  const t = useTranslations("addProperty");
  const { completeStep, goToStep } = useAddProperty();

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<IProperty>();

  const location = watch("location");
  const address = watch("address") ?? "";

  const hasLocation = location.lat !== 0 || location.lng !== 0;

  const handleLocationChange = (loc: {
    lat: number;
    lng: number;
  }) => {
    setValue("location", loc, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleAddressChange = (value: string) => {
    setValue("address", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onNext = async () => {
    const isValid = await trigger(["address", "location"]);

    if (!isValid) return;

    completeStep(1);
  };

  return (
    <>
      <div
        dir="ltr"
        className="grid grid-cols-1 items-center gap-6 py-5 lg:grid-cols-2 lg:gap-8"
      >
        <div className="relative order-2 h-[280px] overflow-hidden rounded-2xl border border-border sm:h-[360px] lg:order-1">
          <PropertyLocationMap
            location={hasLocation ? location : null}
            address={address}
            onLocationChange={handleLocationChange}
            onAddressChange={handleAddressChange}
          />
        </div>

        <div
          dir="rtl"
          className="order-1 flex min-h-[280px] flex-col justify-start gap-10 lg:order-2 lg:pt-2"
        >
          <div className="relative">
            <label
              htmlFor="address"
              className="absolute -top-[7px] right-3 z-10 bg-surface px-1 text-[9px] text-muted"
            >
              {t("propertyAddress")}
            </label>

            <input
              id="address"
              type="text"
              placeholder={t("addressPlaceholder")}
              aria-invalid={!!errors.address}
              className="h-[39px] w-full rounded-2xl border border-border bg-background px-3 text-xs text-foreground outline-none transition placeholder:text-muted/60 focus:border-primary aria-[invalid=true]:border-red-500"
              {...register("address")}
            />

            <FieldError message={errors.address?.message} />
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

          <div
            className={`rounded-2xl border bg-background px-4 py-3 ${
              errors.location ? "border-red-500" : "border-border"
            }`}
          >
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-primary">
              <MapPin size={17} />
              {t("selectedLocation")}
            </div>

            <p dir="ltr" className="text-left text-[11px] text-muted">
              {hasLocation
                ? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`
                : t("locationNotSelected")}
            </p>

            <FieldError
              message={
                errors.location?.message ??
                errors.location?.root?.message
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-start gap-3">
        <button
          type="button"
          onClick={() => goToStep(0)}
          className="flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-4 text-xs text-foreground transition hover:border-primary"
        >
          <ChevronRight size={15} />
          {t("previousStep")}
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-medium text-[#202020] transition hover:opacity-90"
        >
          {t("nextStep")}
          <ChevronLeft size={15} />
        </button>
      </div>
    </>
  );
};

export default AddressPropertySection;
