"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { IProperty } from "@/src/schemas/properties/propertySchema";
import { useAddProperty } from "@/src/providers/AddPropertyFormProvider";
import { FieldError } from "./FieldError";

const fieldClass =
  "h-[39px] w-full rounded-2xl border border-border bg-background px-3 text-xs text-foreground outline-none transition placeholder:text-muted/60 focus:border-primary aria-[invalid=true]:border-red-500";

const labelClass =
  "absolute -top-[7px] right-3 z-10 bg-surface px-1 text-[9px] text-muted";

const FacilitiesPropertySection = () => {
  const t = useTranslations("addProperty");
  const { completeStep, goToStep } = useAddProperty();

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<IProperty>();

  const selectedFeatures = watch("tags") ?? [];
  const [newFeature, setNewFeature] = useState("");

  const updateTags = (tags: string[]) => {
    setValue("tags", tags, { shouldDirty: true, shouldValidate: true });
  };

  const addFeature = () => {
    const value = newFeature.trim();
    if (!value || selectedFeatures.includes(value)) return;

    updateTags([...selectedFeatures, value]);
    setNewFeature("");
  };

  const removeFeature = (value: string) => {
    updateTags(selectedFeatures.filter((item) => item !== value));
  };

  const onNext = async () => {
    const isValid = await trigger([
      "rooms",
      "bathrooms",
      "parking",
      "yard_type",
      "tags",
    ]);

    if (!isValid) return;

    completeStep(2);
  
  };

  const numberFields = [
    { name: "rooms", label: t("roomsCount") },
    { name: "bathrooms", label: t("bathroomsCount") },
    { name: "parking", label: t("parkingCount") },
  ] as const;

  return (
    <>
      <div className="grid grid-cols-1 gap-x-10 gap-y-7 px-1 py-8 sm:grid-cols-2 sm:px-2">
        {numberFields.map(({ name, label }) => (
          <div key={name} className="relative">
            <label htmlFor={name} className={labelClass}>
              {label}
            </label>
            <input
              id={name}
              type="number"
              min="0"
              aria-invalid={!!errors[name]}
              className={fieldClass}
              {...register(name, { valueAsNumber: true })}
            />
            <FieldError message={errors[name]?.message} />
          </div>
        ))}

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
          <FieldError message={errors.yard_type?.message} />
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
                  onClick={() => removeFeature(feature)}
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

          <FieldError
            message={errors.tags?.root?.message ?? errors.tags?.message}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-start gap-3">
      <button
  type="button"
  onClick={() => goToStep(1)}
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

export default FacilitiesPropertySection;