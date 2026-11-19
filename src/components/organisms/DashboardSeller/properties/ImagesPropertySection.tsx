"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ChevronLeft, ChevronRight, Camera, Plus, X } from "lucide-react";

import type { IProperty } from "@/src/schemas/properties/propertySchema";

const MAX_IMAGES = 4;
const MAX_SIZE_MB = 5;

const ImagesPropertySection = () => {
  const t = useTranslations("addProperty");
  const router = useRouter();
  const inputId = useId();

  const {
    watch,
    setValue,
    trigger,
    getValues,
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

  const updateImages = (next: File[]) => {
    setValue("images", next, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(event.target.files ?? []);
    event.target.value = ""; // اجازه انتخاب دوباره همان فایل

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

    if (images.length + valid.length > MAX_IMAGES) error = "tooManyImages";

    setFileError(error);

    const next = [...images, ...valid].slice(0, MAX_IMAGES);
    if (next.length !== images.length) updateImages(next);
  };

  const removeImage = (index: number) => {
    setFileError(null);
    updateImages(images.filter((_, i) => i !== index));
  };



  const onNext = async () => {
    const ok = await trigger("images");

    if (ok) router.push("/dashboard/properties/add/info/final-approval/?view=seller");
  };
  const errorKey = fileError ?? errors.images?.message ?? errors.images?.root?.message;

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
            const preview = previews[index];
            const isAddSlot = index === images.length;

            return (
              <div
                key={index}
                className="relative aspect-square w-full overflow-hidden rounded-[24px]"
              >
                {preview ? (
                  <>
                    <Image
                      src={preview}
                      alt={`${t("propertyImageAlt")} ${index + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 640px) 45vw, 148px"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
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

        {errorKey && (
          <p className="mt-4 text-center text-[11px] text-red-500">
            {t(errorKey as Parameters<typeof t>[0])}
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-start gap-3">
        <Link
          href="/dashboard/properties/add/info/facilities/?view=seller"
          className="flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-4 text-xs text-foreground transition hover:border-primary"
        >
          <ChevronRight size={15} />
          {t("previousStep")}
        </Link>

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