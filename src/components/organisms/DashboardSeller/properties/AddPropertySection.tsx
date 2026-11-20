"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ChevronLeft, ChevronDown } from "lucide-react";

import { getCategoriesAction } from "@/src/actions/categoryActions";
import type { ICategoriesResponse } from "@/src/types/HousereservesType/CategoriesType";
import type { IProperty } from "@/src/schemas/properties/propertySchema";
import { FieldError } from "./FieldError";
import { stepHref } from "./steps";
import { useAddProperty } from "@/src/providers/AddPropertyFormProvider";

const fieldClass =
  "h-[39px] w-full rounded-2xl border border-border bg-background px-3 text-xs text-foreground outline-none transition placeholder:text-muted/60 focus:border-primary aria-[invalid=true]:border-red-500";

const labelClass =
  "absolute -top-[7px] right-3 z-10 bg-surface px-1 text-[9px] text-muted";

const AddPropertySection = () => {
  const t = useTranslations("addProperty");
  const router = useRouter();
  const { completeStep } = useAddProperty();

  const [categories, setCategories] = useState<ICategoriesResponse["data"]>([]);

  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<IProperty>();

  const categoryName = watch("categories.name");

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

  const onNext = async () => {
    const isValid = await trigger([
      "title",
      "capacity",
      "transaction_type",
      "price",
      "categories.name",
      "caption",
    ]);

    if (!isValid) return;

    completeStep(0);
    router.push(stepHref(1));
  };

  return (
    <>
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
          <FieldError message={errors.title?.message} />
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
          <FieldError message={errors.capacity?.message} />
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
            <option value="mortgage">{t("mortgage")}</option>
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute left-3 top-3 text-muted"
          />
          <FieldError message={errors.transaction_type?.message} />
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
          <FieldError message={errors.price?.message} />
        </div>

        <div className="relative">
          <label htmlFor="category" className={labelClass}>
            {t("propertyType")}
          </label>
          {/* value کنترل‌شده است تا بعد از refresh و لود شدن async گزینه‌ها،
              مقدار ذخیره‌شده درست انتخاب شود */}
          <select
            id="category"
            aria-invalid={!!errors.categories?.name}
            className={`${fieldClass} appearance-none`}
            {...register("categories.name")}
            value={categoryName ?? ""}
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
          <FieldError message={errors.categories?.name?.message} />
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
          <FieldError message={errors.caption?.message} />
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
    </>
  );
};

export default AddPropertySection;