"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ChevronLeft, ChevronRight, Camera, Plus, X } from "lucide-react";

import type { IProperty } from "@/src/schemas/properties/propertySchema";
import { useAddProperty } from "@/src/providers/AddPropertyFormProvider";
import { FieldError } from "./FieldError";

const MAX_IMAGES = 4;
const MAX_SIZE_MB = 5;

const ImagesPropertySection = () => {
  const t = useTranslations("addProperty");
  const inputId = useId();
  const { completeStep, goToStep, existingPhotos, setExistingPhotos } =
    useAddProperty();
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<IProperty>();

  const images: File[] = watch("images") ?? [];

  const [fileError, setFileError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  const slots = [
    ...existingPhotos.map((src, i) => ({
      kind: "existing" as const,
      src,
      index: i,
    })),
    ...previews.map((src, i) => ({ kind: "new" as const, src, index: i })),
  ];

  const totalCount = existingPhotos.length + images.length;

  const updateImages = (next: File[]) => {
    setValue("images", next, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(event.target.files ?? []);
    event.target.value = "";

    let error: string | null = null;
    const valid: File[] = [];

    for (const file of picked) {
      if (!file.type.startsWith("image/")) {
        error = "invalidImageType";
        continue;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        error = "imageTooLarge";
        continue;
      }
      valid.push(file);
    }

    const remaining = MAX_IMAGES - totalCount;
    if (valid.length > remaining) error = "tooManyImages";

    setFileError(error);

    const toAdd = valid.slice(0, Math.max(0, remaining));
    if (toAdd.length > 0) updateImages([...images, ...toAdd]);
  };

  const removeSlot = (slot: (typeof slots)[number]) => {
    setFileError(null);

    if (slot.kind === "existing") {
      setExistingPhotos(existingPhotos.filter((_, i) => i !== slot.index));
    } else {
      updateImages(images.filter((_, i) => i !== slot.index));
    }
  };

  const onNext = async () => {
    const ok = await trigger("images");
    if (!ok) return;

    if (totalCount === 0) {
      setFileError("imagesRequired");
      return;
    }

    completeStep(3);
  };

  const errorMessage =
    fileError ?? errors.images?.message ?? errors.images?.root?.message;

  return (
    <>
      <div className="min-h-[390px] py-5 sm:py-7">
        <p className="mb-5 text-[10px] text-muted">{t("imagesSectionLabel")}</p>

        <p className="mb-8 text-lg font-semibold leading-8 text-foreground sm:mb-16">
          <span className="text-primary">{t("imagesDescriptionHighlight")}</span>{" "}
          {t("imagesDescription")}
        </p>

        <div className="mx-auto grid max-w-[660px] grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {Array.from({ length: MAX_IMAGES }).map((_, index) => {
            const slot = slots[index];
            const isAddSlot = index === slots.length;

            return (
              <div
                key={slot ? `${slot.kind}-${slot.index}-${slot.src}` : `empty-${index}`}
                className="relative aspect-square w-full overflow-hidden rounded-[24px]"
              >
                {slot ? (
                  <>
                    <Image
                      src={slot.src}
                      alt={`${t("propertyImageAlt")} ${index + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 640px) 45vw, 148px"
                    />
                    <button
                      type="button"
                      onClick={() => removeSlot(slot)}
                      aria-label={t("removeImage")}
                      className="absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/65 text-white transition hover:bg-black"
                    >
                      <X size={15} />
                    </button>
                  </>
                ) : isAddSlot ? (
                  <label
                    htmlFor={inputId}
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[24px] border border-dashed border-primary text-primary transition hover:bg-primary/5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary">
                      <Plus size={23} strokeWidth={1.4} />
                    </span>
                    <span className="text-[10px] font-medium">{t("addImage")}</span>
                  </label>
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-[24px] border border-dashed border-border text-muted/40">
                    <Camera size={32} strokeWidth={1.3} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <input
          id={inputId}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />

        {errorMessage && (
          <div className="mt-4 text-center">
            <FieldError message={errorMessage} />
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-start gap-3">
        <button
          type="button"
          onClick={() => goToStep(2)}
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

export default ImagesPropertySection;