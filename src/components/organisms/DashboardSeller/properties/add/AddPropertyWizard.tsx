"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { useAddProperty } from "@/src/providers/AddPropertyFormProvider";
import type { ISellerHousesResponse } from "@/src/types/Seller_Dashboard/SellerHousesType";

import Stepper from "./Stepper";
import FirstInfoStep from "./AddPropertySection";
import AddressStep from "./AddressPropertySection";
import FacilitiesStep from "./FacilitiesPropertySection";
import ImagesStep from "./ImagesPropertySection";
import FinalApprovalStep from "./FinalApprovalPropertySection";
import { useSellerHouseStore } from "@/src/store/sellerHouseStore";

const STEP_COMPONENTS = [
    FirstInfoStep,
    AddressStep,
    FacilitiesStep,
    ImagesStep,
    FinalApprovalStep,
];

type ISellerHouse = ISellerHousesResponse["houses"][number];

const AddPropertyWizard = () => {
    const t = useTranslations("addProperty");

    const {
        step,
        progress,
        hydrated,
        goToStep,
        isEdit,
        editId,
        loadForEdit,
    } = useAddProperty();

    const loadedIdRef = useRef<string | null>(null);

    const house = editId
        ? useSellerHouseStore(
            (state) => state.selectedHouse
        )
        : undefined;

    useEffect(() => {
        if (!isEdit || !editId || !house) return;

        if (loadedIdRef.current === String(house.id)) return;

        loadForEdit(
            {
                title: house.title ?? "",
                address:
                    house.address === "undefined" ? "" : house.address ?? "",
                rate: Number(house.rate ?? 0),
                price: Number(house.price ?? 0),
                tags: house.tags ?? [],
                last_updated: house.last_updated ?? new Date().toISOString(),
                capacity: Number(house.capacity ?? 0),
                location: {
                    lat: Number(house.location?.lat ?? 0),
                    lng: Number(house.location?.lng ?? 0),
                },
                categories: {
                    name: house.categories?.name ?? "",
                },
                bathrooms: Number(house.bathrooms ?? 0),
                parking: Number(house.parking ?? 0),
                rooms: Number(house.rooms ?? 0),
                yard_type: house.yard_type ?? "",
                num_comments: Number(house.num_comments ?? 0),
                transaction_type: house.transaction_type,
                sellerId: Number(house.sellerId ?? 0),
                sellerName: house.sellerName ?? "",
                caption: house.caption ?? "",
                images: [],
            },
            house.photos ?? []
        );

        loadedIdRef.current = String(house.id);
    }, [isEdit, editId, house, loadForEdit]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [step]);

    const CurrentStep = STEP_COMPONENTS[step];

    const isLoadingEdit = isEdit && !house;
    const hasEditError = isEdit && !house && hydrated;

    return (
        <section
            dir="rtl"
            className="w-full rounded-2xl bg-surface p-3 text-foreground sm:p-5"
        >
            <div className="flex flex-col gap-3 border-b border-dashed border-border pb-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-sm font-semibold">
                    {isEdit ? "ویرایش ملک" : t("title")}
                </h2>

                <Link
                    href="/dashboard/properties?view=seller"
                    className="flex items-center gap-2 text-[11px] text-blue-500 transition hover:opacity-70"
                >
                    {t("backToProperties")}
                    <ChevronLeft size={14} />
                </Link>
            </div>

            <Stepper
                currentStep={step}
                maxStep={progress}
                onStepClick={goToStep}
            />

            {isLoadingEdit && (
                <p className="py-10 text-center text-xs text-muted">
                    در حال دریافت اطلاعات ملک...
                </p>
            )}

            {hasEditError && (
                <p className="py-10 text-center text-xs text-red-500">
                    اطلاعات ملک در دسترس نیست. لطفاً از لیست املاک مجدداً وارد شوید.
                </p>
            )}

            {hydrated && (!isEdit || house) && <CurrentStep />}
        </section>
    );
};

export default AddPropertyWizard;