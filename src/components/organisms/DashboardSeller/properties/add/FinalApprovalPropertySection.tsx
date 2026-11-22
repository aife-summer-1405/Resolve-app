"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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

import type { IProperty } from "@/src/schemas/properties/propertySchema";
import { useCreateHouse } from "@/src/hooks/Seller_dashboard/useCreateHouse";
import { useUpdateHouse } from "@/src/hooks/Seller_dashboard/useUpdateHouse";
import { useUploadHousePhotos } from "@/src/hooks/Seller_dashboard/useUploadHousePhotos";
import { useAddProperty } from "@/src/providers/AddPropertyFormProvider";
import { FieldError } from "./FieldError";
import { useSellerHouseStore } from "@/src/store/sellerHouseStore";

type Status = "success" | "saveFailed" | "uploadFailed";

const FinalApprovalPropertySection = () => {
  const t = useTranslations("addProperty");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { getValues, trigger, watch } = useFormContext<IProperty>();
  const {
    isEdit,
    editId,
    existingPhotos,
    getHouseId,
    setHouseId,
    clearDraft,
    goToStep,
  } = useAddProperty();

  const { mutateAsync: createHouse, isPending: isCreating } = useCreateHouse();
  const { mutateAsync: updateHouse, isPending: isUpdating } = useUpdateHouse();
  const { mutateAsync: uploadImages, isPending: isUploading } =
    useUploadHousePhotos();

  const isPending = isCreating || isUpdating || isUploading;

  const values = watch();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [newCover, setNewCover] = useState<string | null>(null);
  const firstImage = values.images?.[0];

  useEffect(() => {
    if (!firstImage) {
      setNewCover(null);
      return;
    }
    const url = URL.createObjectURL(firstImage);
    setNewCover(url);
    return () => URL.revokeObjectURL(url);
  }, [firstImage]);

  const cover = newCover ?? (isEdit ? existingPhotos[0] ?? null : null);

  const transactionLabel = useMemo(() => {
    const map: Record<string, string> = {
      direct_purchase: t("sale"),
      rental: t("rent"),
      reservation: t("daily"),
      mortgage: t("mortgage"),
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

  const uploadNewImages = async (id: number | string, images: File[]) => {
    if (images.length === 0) return true;

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("photos", image);
    });

    try {
      await uploadImages({ id, formData });
      return true;
    } catch {
      return false;
    }
  };
  const clearSelectedHouse = useSellerHouseStore(
    (state) => state.clearSelectedHouse
  );
  const onSubmit = async () => {
    if (isPending) return;
    setSubmitError(null);

    const ok = await trigger();
    if (!ok) {
      setSubmitError("formInvalid");
      return;
    }

    const { images = [], sellerId, sellerName, ...data } = getValues();

    let status: Status = "success";

    try {
      if (isEdit && editId) {
        await updateHouse({
          id: Number(editId),
          data: {
            ...data,
            photos: existingPhotos,
            last_updated: new Date().toISOString(),
          },
        });

        if (!(await uploadNewImages(Number(editId), images))) {
          status = "uploadFailed";
        }

      } else {
        let houseId = getHouseId();

        if (houseId === null) {
          const house = await createHouse({ ...data, sellerId, sellerName });

          if (house?.id === undefined || house?.id === null) {
            throw new Error("House ID not found");
          }

          houseId = house.id;
          setHouseId(houseId);
        }

        if (!(await uploadNewImages(Number(houseId), images))) status = "uploadFailed";
      }
    } catch {
      status = "saveFailed";
    }

    if (!isEdit) await clearDraft();
    await queryClient.invalidateQueries({ queryKey: ["houses"] });

    if (status === "success") {
      toast.success(isEdit ? "ملک با موفقیت ویرایش شد" : "ملک با موفقیت ثبت شد");
      clearSelectedHouse();
    } else if (status === "uploadFailed") {
      toast.error(
        "اطلاعات ملک ذخیره شد ولی آپلود تصاویر ناموفق بود. از بخش ویرایش دوباره تصاویر را اضافه کنید."
      );
    } else {
      toast.error(
        isEdit
          ? "ویرایش ملک ناموفق بود. لطفاً دوباره تلاش کنید."
          : "ثبت ملک ناموفق بود. لطفاً دوباره تلاش کنید."
      );
    }

    router.push("/dashboard/properties?view=seller");
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

          {values.categories?.name && (
            <div className="mt-5 flex items-center gap-2 text-xs sm:text-sm">
              <Building2 size={19} className="text-muted" />
              <span>{values.categories.name}</span>
            </div>
          )}

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

      {submitError && <FieldError message={submitError} />}

      <div className="mt-5 flex flex-wrap items-center justify-start gap-3">
        <button
          type="button"
          onClick={() => goToStep(3)}
          className="flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-4 text-xs text-foreground transition hover:border-primary"
        >
          <ChevronRight size={15} />
          {t("previousStep")}
        </button>

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