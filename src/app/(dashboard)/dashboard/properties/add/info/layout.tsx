"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import Stepper from "@/src/components/organisms/DashboardSeller/properties/add/Stepper";
import {
  addPropertyFormSchema,
  IPropertyOutput,
  propertySchema,
  type IProperty,
} from "@/src/schemas/properties/propertySchema";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
const STEP_PATHS = [
  "/dashboard/properties/add/info",
  "/dashboard/properties/add/info/address",
  "/dashboard/properties/add/info/facilities",
  "/dashboard/properties/add/info/final-approval",
];

export default function AddPropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm<IPropertyOutput, unknown, IProperty>({
    resolver: zodResolver(addPropertyFormSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      address: "",
      rate: 0,
      price: 0,
      tags: [],
      last_updated: new Date().toISOString(),
      capacity: 0,
      location: {
        lat: 0,
        lng: 0,
      },
      categories: {},
      bathrooms: 0,
      parking: 0,
      rooms: 0,
      yard_type: "",
      num_comments: 0,
      transaction_type: "rental",
      sellerId: 0,
      sellerName: "",
      caption: null,
      images: [],
    },
  });
  const PAGE_TITLES: Record<string, string> = {
    "/dashboard/properties/add/info": "اطلاعات اولیه ملک",
    "/dashboard/properties/add/info/address": "آدرس و موقعیت ملک",
    "/dashboard/properties/add/info/facilities": "امکانات و ویژگی‌های ملک",
    "/dashboard/properties/add/info/final-approval": "بررسی نهایی اطلاعات",
    "/dashboard/properties/add/images": "تصاویر ملک",
  };

  const pathname = usePathname();
  const currentStep = STEP_PATHS.findIndex((path) =>
    pathname?.endsWith(path)
  );
  const pageTitle = pathname ? PAGE_TITLES[pathname] ?? "" : "";
  return (
    <FormProvider {...methods}>
      <section dir="rtl" className="w-full rounded-2xl bg-surface p-3 text-foreground sm:p-5">
        <div className="flex flex-col gap-3 border-b border-dashed border-border pb-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-semibold">{pageTitle}</h2>

          <Link
            href="/dashboard/properties"
            className="flex items-center gap-2 text-[11px] text-blue-500 transition hover:opacity-70"
          >
            مشاهده املاک من
            <ChevronLeft size={14} />
          </Link>
        </div>

        <Stepper currentStep={currentStep} />
        {children}
      </section>
    </FormProvider>
  );
}