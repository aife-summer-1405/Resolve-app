
"use client";

import { useId, useState } from "react";
import Image from "next/image";
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
  Camera,
  Plus,
  X,
} from "lucide-react";

const ImagesPropertySection = () => {
  const t = useTranslations("addProperty");
  const inputId = useId();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const steps = [
    { title: t("initialInfo"), icon: <Info size={17} /> },
    { title: t("address"), icon: <MapPin size={17} /> },
    { title: t("facilities"), icon: <SlidersHorizontal size={17} /> },
    { title: t("images"), icon: <Images size={17} /> },
    { title: t("finalApproval"), icon: <CheckCircle2 size={17} /> },
  ];

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files ?? []);
    const remainingSlots = 4 - selectedImages.length;
    const filesToAdd = files.slice(0, remainingSlots);

    filesToAdd.forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setSelectedImages((current) => {
            if (current.length >= 4) return current;
            return [...current, reader.result as string];
          });
        }
      };

      reader.readAsDataURL(file);
    });

    event.target.value = "";
  };

  const removeImage = (index: number) => {
    setSelectedImages((current) =>
      current.filter((_, imageIndex) => imageIndex !== index)
    );
  };

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
                index === 3
                  ? "font-semibold text-foreground"
                  : index < 3
                    ? "font-medium text-primary"
                    : "text-muted"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                  index === 3
                    ? "border-foreground text-foreground"
                    : index < 3
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

      <div className="min-h-[390px] py-5 sm:py-7">
        <p className="mb-5 text-[10px] text-muted">
          {t("imagesSectionLabel")}
        </p>

        <p className="mb text-lg font-semibold leading-8 text-foreground sm:mb-16">
          <span className="text-primary">
            {t("imagesDescriptionHighlight")}
          </span>
          {" "}
          {t("imagesDescription")}
        </p>

        <div className="mx-auto grid max-w-[660px] grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {Array.from({ length: 3 }).map((_, index) => {
            const image = selectedImages[index];
            const isAddSlot = index === selectedImages.length;

            return (
              <div
                key={index}
                className="relative aspect-square w-full overflow-hidden rounded-[24px]"
              >
                {image ? (
                  <>
                    <Image
                      src={image}
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

                    <span className="text-[10px] font-medium">
                      {t("addImage")}
                    </span>
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
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-start gap-3">
        <Link
          href="/dashboard/properties/add/facilities"
          className="flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-4 text-xs text-foreground transition hover:border-primary"
        >
          <ChevronRight size={15} />
          {t("previousStep")}
        </Link>

        <Link
          href="/dashboard/properties/add/final-approval"
          className="flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-medium text-[#202020] transition hover:opacity-90"
        >
          {t("nextStep")}
          <ChevronLeft size={15} />
        </Link>
      </div>
    </section>
  );
};

export default ImagesPropertySection;
