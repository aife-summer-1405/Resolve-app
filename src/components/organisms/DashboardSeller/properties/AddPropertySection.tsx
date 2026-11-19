
"use client";

import { useEffect, useState } from "react";
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
  ChevronDown,
} from "lucide-react";

import { getCategoriesAction } from "@/src/actions/categoryActions";
import type { ICategoriesResponse } from "@/src/types/HousereservesType/CategoriesType";
import type { IProperty } from "@/src/schemas/properties/propertySchema";

const AddPropertySection = () => {
  const t = useTranslations("addProperty");
  const router = useRouter();

  const [categories, setCategories] = useState<
    ICategoriesResponse["data"]
  >([]);

  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<IProperty>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoriesAction();
        setCategories(response.data);
      } catch (error) {
        console.error("دریافت دسته‌بندی‌ها ناموفق بود", error);
      }
    };

    fetchCategories();
  }, []);

  const steps = [
    { title: t("initialInfo"), icon: <Info size={17} /> },
    { title: t("address"), icon: <MapPin size={17} /> },
    { title: t("facilities"), icon: <SlidersHorizontal size={17} /> },
    { title: t("images"), icon: <Images size={17} /> },
    { title: t("finalApproval"), icon: <CheckCircle2 size={17} /> },
  ];

  const fieldClass =
    "h-[39px] w-full rounded-2xl border border-border bg-background px-3 text-xs text-foreground outline-none transition placeholder:text-muted/60 focus:border-primary aria-[invalid=true]:border-red-500";

  const labelClass =
    "absolute -top-[7px] right-3 z-10 bg-surface px-1 text-[9px] text-muted";

  const onNext = async () => {
    const isValid = await trigger([
      "title",
      "capacity",
      "transaction_type",
      "price",
      "categories.name",
      "caption",
    ]);

    if (isValid) {
      router.push("/dashboard/properties/add/info/address?view=seller");
    }
  };

  return (
    <section
      dir="rtl"
     
    >
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 px-1 sm:grid-cols-2 sm:px-2">
        <div className="relative">
          <label htmlFor="title" className={labelClass}>
            {t("propertyName")}
          </label>

          <input
            id="title"
            type="text"
            aria-invalid={!!errors.title}
            className={fieldClass}
            {...register("title")}
          />

          {errors.title && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="capacity" className={labelClass}>
            {t("capacity")}
          </label>

          <input
            id="capacity"
            type="number"
            min="1"
            aria-invalid={!!errors.capacity}
            className={fieldClass}
            {...register("capacity", { valueAsNumber: true })}
          />

          {errors.capacity && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.capacity.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="transaction_type" className={labelClass}>
            {t("transactionType")}
          </label>

          <select
            id="transaction_type"
            aria-invalid={!!errors.transaction_type}
            className={`${fieldClass} appearance-none`}
            {...register("transaction_type")}
          >
            <option value="direct_purchase">{t("sale")}</option>
            <option value="rental">{t("rent")}</option>
            <option value="reservation">{t("daily")}</option>
            <option value="mortgage">Mortgage</option>
          </select>

          <ChevronDown
            size={15}
            className="pointer-events-none absolute left-3 top-3 text-muted"
          />

          {errors.transaction_type && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.transaction_type.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="price" className={labelClass}>
            {t("price")}
          </label>

          <input
            id="price"
            type="number"
            min="0"
            placeholder={t("currency")}
            aria-invalid={!!errors.price}
            className={fieldClass}
            {...register("price", { valueAsNumber: true })}
          />

          {errors.price && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="category" className={labelClass}>
            {t("propertyType")}
          </label>

          <select
            id="category"
            aria-invalid={!!errors.categories?.name}
            className={`${fieldClass} appearance-none`}
            {...register("categories.name")}
          >
            <option value="" disabled>
              {t("propertyType")}
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <ChevronDown
            size={15}
            className="pointer-events-none absolute left-3 top-3 text-muted"
          />

          {errors.categories?.name && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.categories.name.message}
            </p>
          )}
        </div>

        <div className="relative sm:col-span-2">
          <label htmlFor="caption" className={labelClass}>
            {t("description")}
          </label>

          <textarea
            id="caption"
            rows={6}
            aria-invalid={!!errors.caption}
            className="min-h-[155px] w-full resize-none rounded-2xl border border-border bg-background px-3 py-4 text-xs leading-7 text-foreground outline-none transition placeholder:text-muted/60 focus:border-primary aria-[invalid=true]:border-red-500"
            {...register("caption")}
          />

          {errors.caption && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.caption.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-start">
        <button
          type="button"
          onClick={onNext}
          className="flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-medium text-[#202020] transition hover:opacity-90"
        >
          {t("nextStep")}
          <ChevronLeft size={15} />
        </button>
      </div>
    </section>
  );
};

export default AddPropertySection;
