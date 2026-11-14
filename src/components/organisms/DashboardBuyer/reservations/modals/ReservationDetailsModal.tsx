"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  X,
  Star,
  MapPin,
  BedDouble,
  CarFront,
  Users,
  Bath,
  RefreshCw,
} from "lucide-react";
import { useGetHouseById } from "@/src/hooks/useGetHouseById";

type ReservationDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  accommodationId: number;
  onPayments: () => void;
  onReservations: () => void;
};

const ReservationDetailsModal = ({
  isOpen,
  onClose,
  accommodationId,
  onPayments,
  onReservations,
}: ReservationDetailsModalProps) => {
  const t = useTranslations("BookingManagementSection");
  const locale = useLocale();
  const isPersian = locale === "fa";

  const {
    data: house,
    isLoading,
    isError,
    refetch,
  } = useGetHouseById(String(accommodationId), isOpen);

  const formatPrice = (price: string | null) => {
    if (!price) return "—";

    return new Intl.NumberFormat(isPersian ? "fa-IR" : "en-US").format(
      Number(price),
    );
  };

  const getYardLabel = (yardType: string) => {
    if (yardType === "none") return null;

    const yardLabels: Record<string, { fa: string; en: string }> = {
      private: { fa: "حیاط اختصاصی", en: "Private Yard" },
      shared: { fa: "حیاط مشترک", en: "Shared Yard" },
    };

    return yardLabels[yardType]?.[isPersian ? "fa" : "en"] ?? yardType;
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div
        dir={isPersian ? "rtl" : "ltr"}
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-3 sm:p-5"
      >
        <div className="w-full max-w-165 animate-pulse overflow-hidden rounded-xl border border-border bg-surface p-4">
          <div className="mb-5 flex items-center justify-between">
            <div className="h-8 w-20 rounded-lg bg-card" />
            <div className="h-5 w-40 rounded-lg bg-card" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-4">
              <div className="h-5 w-3/4 rounded bg-card" />
              <div className="h-4 w-full rounded bg-card" />
              <div className="h-4 w-full rounded bg-card" />
              <div className="h-4 w-2/3 rounded bg-card" />
              <div className="flex gap-2">
                <div className="h-7 w-16 rounded-lg bg-card" />
                <div className="h-7 w-20 rounded-lg bg-card" />
                <div className="h-7 w-16 rounded-lg bg-card" />
              </div>
            </div>

            <div className="h-[190px] rounded-xl bg-card sm:h-[233px]" />
          </div>

          <div className="mt-5 flex justify-between gap-3">
            <div className="h-9 w-24 rounded-lg bg-card" />
            <div className="h-9 w-36 rounded-lg bg-card" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !house) {
    return (
      <div
        dir={isPersian ? "rtl" : "ltr"}
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-3"
      >
        <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 text-center">
          <p className="mb-4 text-sm text-red-500">
            {isPersian
              ? "دریافت اطلاعات اقامتگاه با خطا مواجه شد."
              : "Failed to load accommodation details."}
          </p>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => refetch()}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-black"
            >
              <RefreshCw size={14} />
              {isPersian ? "تلاش مجدد" : "Try again"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-xs text-foreground"
            >
              {t("close")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const price = house.discounted_price ?? house.price;
  const yardLabel = getYardLabel(house.yard_type);

const amenities = [
  {
    icon: <BedDouble size={15} />,
    label: isPersian
      ? `${house.rooms} اتاق خواب`
      : `${house.rooms} Bedrooms`,
  },
  {
    icon: <CarFront size={15} />,
    label: isPersian
      ? `${house.parking} پارکینگ`
      : `${house.parking} Parking`,
  },
  {
    icon: <Bath size={15} />,
    label: isPersian
      ? `${house.bathrooms} حمام`
      : `${house.bathrooms} Bathrooms`,
  },
  {
    icon: <Users size={15} />,
    label: isPersian
      ? `ظرفیت: ${house.capacity} نفر`
      : `Capacity: ${house.capacity}`,
  },
  ...(yardLabel
    ? [
        {
          icon: <MapPin size={15} />,
          label: yardLabel,
        },
      ]
    : []),
];

  return (
    <div
      dir={isPersian ? "rtl" : "ltr"}
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="my-auto w-full max-w-165 overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-dashed border-border px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 rounded-full border border-red-400 px-3 py-1.5 text-xs text-red-500 transition hover:bg-red-50"
          >
            {t("close")}
            <X size={15} />
          </button>

          <h2 className="text-base font-bold text-foreground sm:text-lg">
            {house.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:p-4">
          <div className="flex min-w-0 flex-col">
            <p className="text-justify text-[11px] leading-[2.1] text-muted">
              {house.caption}
            </p>

            {house.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-muted">
                  {isPersian ? "برچسب‌ها:" : "Tags:"}
                </span>

                {house.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-primary px-3 py-1 text-[10px] text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-3 flex items-start gap-1 text-[10px] leading-6 text-muted">
              <MapPin size={13} className="mt-1 shrink-0" />
              <span>{house.address}</span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 text-[10px] text-muted">
              {amenities.map((item, index) => (
                <div key={item.label} className="flex items-center gap-1">
                  {item.icon}
                  <span>{item.label}</span>

                  {index !== amenities.length - 1 && (
                    <span className="mx-1 text-border">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[190px] overflow-hidden rounded-xl bg-card sm:h-[233px]">
            {house.photos?.[0] ? (
              <img
                src={house.photos[0]}
                alt={house.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-muted">
                {t("accommodationImage")}
              </div>
            )}

            <div className="absolute left-3 top-3 flex items-center gap-1 rounded-lg bg-[#8B70FF] px-2.5 py-1.5 text-[10px] text-white shadow">
              <Star size={12} fill="currentColor" />
              <span>{Number(house.rate).toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-3 pb-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onPayments}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-black transition hover:opacity-90"
            >
              {t("payments")}
            </button>

            <button
              type="button"
              onClick={onReservations}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-black transition hover:opacity-90"
            >
              {t("reservations")}
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg bg-card px-3 py-2 text-[10px] text-foreground sm:min-w-[220px]">
            <span>
              {isPersian
                ? house.transaction_type === "mortgage"
                  ? "مبلغ ودیعه:"
                  : "قیمت:"
                : house.transaction_type === "mortgage"
                  ? "Deposit:"
                  : "Price:"}
            </span>

            <span className="font-medium">
              {formatPrice(price)} {t("toman")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailsModal;