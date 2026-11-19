"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import {
  CheckCircle2,
  ChevronRight,
  BedDouble,
  Trees,
  Wallet,
  MapPin,
  CircleDollarSign,
  Building2,
} from "lucide-react";
import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { IProperty } from "@/src/schemas/properties/propertySchema";
import { useCreateHouse } from "@/src/hooks/Seller_dashboard/DashboardPage/useCreateHouse";
import { useUploadHousePhotos } from "@/src/hooks/Seller_dashboard/DashboardPage/useUploadHousePhotos";

const FinalApprovalPropertySection = () => {
  const t = useTranslations("addProperty");
  const router = useRouter();

  const { getValues, trigger, reset } = useFormContext<IProperty>();

  const queryClient = useQueryClient();

  const { mutateAsync: createHouse, isPending: isCreating } = useCreateHouse();
  const { mutateAsync: uploadImages, isPending: isUploading } =
    useUploadHousePhotos();

  const isPending = isCreating || isUploading;

  const createdHouseId = useRef<number | string | null>(null);
  const values = getValues();
  const [submitError, setSubmitError] = useState<string | null>(null);
  useEffect(() => {
    if (!values.title) router.replace("/dashboard/properties/add/info/first-info?view=seller");
  }, [values.title, router]);

  const [cover, setCover] = useState<string | null>(null);
  const firstImage = values.images?.[0];

  useEffect(() => {
    if (!firstImage) {
      setCover(null);
      return;
    }
    const url = URL.createObjectURL(firstImage);
    setCover(url);
    return () => URL.revokeObjectURL(url);
  }, [firstImage]);

  const transactionLabel = useMemo(() => {
    const map: Record<string, string> = {
      sale: t("sale"),
      rental: t("rent"),
      daily: t("daily"),
    };
    return map[values.transaction_type] ?? values.transaction_type;
  }, [values.transaction_type, t]);

  const formattedPrice = Number(values.price || 0).toLocaleString("fa-IR");

  const propertyDetails = [
    { icon: <MapPin size={19} />, text: values.address },
    {
      icon: <BedDouble size={19} />,
      text: `${values.rooms} ${t("roomsCount")} - ${values.bathrooms} ${t(
        "bathroomsCount"
      )} - ${values.parking} ${t("parkingCount")}`,
    },
    { icon: <Trees size={19} />, text: values.yard_type },
    { icon: <Wallet size={19} />, text: transactionLabel },
  ].filter((item) => item.text);

  const onSubmit = async () => {
    if (isPending) return;

    setSubmitError(null);

    const ok = await trigger();

    if (!ok) {
      setSubmitError("formInvalid");
      return;
    }

    const { images = [], ...data } = getValues();

    try {
      if (!createdHouseId.current) {
        const house = await createHouse(data);

        if (house.id === undefined || house.id === null) {
          throw new Error("House ID not found");
        }

        createdHouseId.current = house.id;
      }
    } catch {
      setSubmitError("submitFailed");
      return;
    }

    if (images.length > 0) {
      const formData = new FormData();

      images.forEach((image) => {
        formData.append("photos", image);
      });

      try {
        await uploadImages({
          id: createdHouseId.current,
          formData,
        });
      } catch {
        setSubmitError("imagesUploadFailed");
        return;
      }
    }

    await queryClient.invalidateQueries({ queryKey: ["houses"] });

    createdHouseId.current = null;
    reset();

    router.push("/dashboard/properties");
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-5 rounded-2xl border border-[#D1D5DB] bg-background p-3 dark:border-[#555555] sm:p-4 lg:grid-cols-2 lg:gap-6">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="relative h-[170px] w-full overflow-hidden rounded-xl bg-[#444444] sm:h-[190px]">
            {cover && (
              <Image
                src={cover}
                alt={values.title}
                fill
                unoptimized
                className="object-cover"
              />
            )}
          </div>

          <div className="space-y-4 py-1">
            {propertyDetails.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-xs sm:text-sm"
              >
                <span className="shrink-0 text-muted">{item.icon}</span>
                <span className="leading-7 text-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-col">
          <h3 className="mb-3 text-center text-sm font-bold sm:text-right sm:text-base">
            {values.title}
          </h3>

          {values.caption && (
            <p className="text-justify text-[10px] leading-[2.1] text-muted sm:text-[11px]">
              {values.caption}
            </p>
          )}

          {values.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-muted">{t("previewTags")}:</span>
              {values.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-xl bg-primary px-4 py-1.5 text-[10px] font-medium text-[#202020]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-col items-start gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Building2 size={19} className="text-muted" />
              <span>{transactionLabel}</span>
            </div>
          </div>

          <div className="mt-auto flex items-center gap-3 pt-5">
            <CircleDollarSign size={20} className="shrink-0 text-muted" />
            <span className="text-base font-semibold tracking-wider text-primary sm:text-lg">
              {formattedPrice}
            </span>
            <span className="text-xs font-medium text-primary">
              {t("currency")}
            </span>
          </div>
        </div>
      </div>

      {submitError && (
        <p className="mt-3 text-xs text-red-500">
          {t(submitError as Parameters<typeof t>[0])}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-start gap-3">
        <Link
          href="/dashboard/properties/add/info/images?view=seller"
          className="flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-4 text-xs text-foreground transition hover:border-primary"
        >
          <ChevronRight size={15} />
          {t("previousStep")}
        </Link>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isPending}
          className="flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-medium text-[#202020] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPending ? t("submitting") : t("submitListing")}
          <CheckCircle2 size={15} />
        </button>
      </div>
    </>
  );
};

export default FinalApprovalPropertySection;