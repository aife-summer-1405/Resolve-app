
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

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

import type { IProperty } from "@/src/schemas/properties/propertySchema";
import { useState } from "react";
import { useCreateHouse } from "@/src/hooks/Seller_dashboard/DashboardPage/useCreateHouse";

const FacilitiesPropertySection = () => {
  const t = useTranslations("addProperty");
  const router = useRouter();

  const {
    register,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<IProperty>();

  const selectedFeatures = watch("tags") ?? [];

const [newFeature, setNewFeature] = useState("");
const addFeature = () => {
  const value = newFeature.trim();

  if (!value || selectedFeatures.includes(value)) return;

  setValue("tags", [...selectedFeatures, value], {
    shouldDirty: true,
    shouldValidate: true,
  });

  setNewFeature("");
};

  const fieldClass =
    "h-[39px] w-full rounded-2xl border border-border bg-background px-3 text-xs text-foreground outline-none transition placeholder:text-muted/60 focus:border-primary aria-[invalid=true]:border-red-500";

  const labelClass =
    "absolute -top-[7px] right-3 z-10 bg-surface px-1 text-[9px] text-muted";

  const toggleFeature = (value: string) => {
    const updatedFeatures = selectedFeatures.includes(value)
      ? selectedFeatures.filter((item) => item !== value)
      : [...selectedFeatures, value];

    setValue("tags", updatedFeatures, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

const { mutateAsync: createHouse, isPending } = useCreateHouse();

const onNext = async () => {
  const isValid = await trigger([
    "rooms",
    "bathrooms",
    "parking",
    "yard_type",
    "tags",
  ]);

  if (!isValid) return;

    // const formData = getValues();
//     const response = await createHouse(formData);
// console.log("response", response);

    // if (response.id) {
    //   console.log(33333333333)
      router.push("/dashboard/properties/add/info/images?view=seller");
    // }

};

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


      <div className="grid grid-cols-1 gap-x-10 gap-y-7 px-1 py-8 sm:grid-cols-2 sm:px-2">
        <div className="relative">
          <label htmlFor="rooms" className={labelClass}>
            {t("roomsCount")}
          </label>

          <input
            id="rooms"
            type="number"
            min="0"
            aria-invalid={!!errors.rooms}
            className={fieldClass}
            {...register("rooms", { valueAsNumber: true })}
          />

          {errors.rooms && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.rooms.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="bathrooms" className={labelClass}>
            {t("bathroomsCount")}
          </label>

          <input
            id="bathrooms"
            type="number"
            min="0"
            aria-invalid={!!errors.bathrooms}
            className={fieldClass}
            {...register("bathrooms", { valueAsNumber: true })}
          />

          {errors.bathrooms && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.bathrooms.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="parking" className={labelClass}>
            {t("parkingCount")}
          </label>

          <input
            id="parking"
            type="number"
            min="0"
            aria-invalid={!!errors.parking}
            className={fieldClass}
            {...register("parking", { valueAsNumber: true })}
          />

          {errors.parking && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.parking.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="yard_type" className={labelClass}>
            {t("yardType")}
          </label>

          <input
            id="yard_type"
            type="text"
            aria-invalid={!!errors.yard_type}
            placeholder={t("yardType")}
            className={fieldClass}
            {...register("yard_type")}
          />

          {errors.yard_type && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.yard_type.message}
            </p>
          )}
        </div>

        <div className="relative sm:col-span-2">
  <label htmlFor="tags" className={labelClass}>
    {t("features")}
  </label>

  <div className="flex min-h-[50px] flex-wrap items-center gap-2 rounded-2xl border border-border bg-background px-3 py-2">
    {selectedFeatures.map((feature) => (
      <span
        key={feature}
        className="flex h-7 items-center gap-2 rounded-xl bg-primary px-3 text-[10px] font-medium text-[#202020]"
      >
        {feature}

        <button
          type="button"
          onClick={() => toggleFeature(feature)}
          aria-label={`${t("removeFeature")} ${feature}`}
          className="transition hover:opacity-60"
        >
          <X size={12} />
        </button>
      </span>
    ))}

    <input
      id="tags"
      type="text"
      value={newFeature}
      onChange={(event) => setNewFeature(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          addFeature();
        }
      }}
      placeholder={t("selectFeatures")}
      className="min-w-[120px] flex-1 bg-transparent py-1 text-xs text-foreground outline-none placeholder:text-muted"
    />
  </div>

  {errors.tags && (
    <p className="mt-1 text-[10px] text-red-500">
      {errors.tags.message}
    </p>
  )}
</div>
      </div>

      <div className="mt-28 flex flex-wrap items-center justify-start gap-3">
        <Link
          href="/dashboard/properties/add/info/address?view=seller"
          className="flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-4 text-xs text-foreground transition hover:border-primary"
        >
          <ChevronRight size={15} />
          {t("previousStep")}
        </Link>

        <button
  type="button"
  onClick={onNext}
  disabled={isPending}
>
  {isPending ? "در حال ثبت..." : "مرحله بعد"}
</button>
      </div>
    </section>
  );
};

export default FacilitiesPropertySection;
