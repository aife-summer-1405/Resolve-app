"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  X,
  Share2,
  Star,
  MapPin,
  BedDouble,
  CarFront,
  Users,
  Bath,
} from "lucide-react";

type ReservationDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  accommodationName: string;
  onPayments: () => void;
  onReservations: () => void;
};

const ReservationDetailsModal = ({
  isOpen,
  onClose,
  accommodationName,
  onPayments,
  onReservations,
}: ReservationDetailsModalProps) => {
  const t = useTranslations("BookingManagementSection");
  const locale = useLocale();
  const isPersian = locale === "fa";

  if (!isOpen) return null;

  const description = isPersian
    ? "آپارتمان و ویلا در قلب شهری عالی که زندگی و آرامش را در کنار هم تجربه خواهید کرد. این اقامتگاه با طراحی مدرن، امکانات مناسب و فضای دلنشین، محلی برای لحظه‌های خوش، آرامش و شروع یک زندگی و سفر خاطره‌انگیز است. محیطی آرام و دلنشین برای خانواده‌ها و دوستان."
    : "A beautiful accommodation in the heart of the city, where you can experience comfort and relaxation together. With modern design, convenient facilities and a pleasant atmosphere, this place is perfect for families and friends.";

  const tags = isPersian
    ? ["آپارتمان", "مسکونی", "بالکن"]
    : ["Apartment", "Residential", "Balcony"];

  const amenities = [
    {
      icon: <BedDouble size={15} />,
      label: isPersian ? "۴ خوابه" : "4 Bedrooms",
    },
    {
      icon: <CarFront size={15} />,
      label: isPersian ? "۱ پارکینگ" : "1 Parking",
    },
    {
      icon: <Users size={15} />,
      label: isPersian ? "۲ حمام" : "2 Bathrooms",
    },
    {
      icon: <Bath size={15} />,
      label: isPersian ? "حیاط" : "Garden",
    },
  ];

  return (
    <div
      dir="ltr"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="my-auto w-full max-w-[660px] overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
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
            {accommodationName}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-[1fr_1fr] sm:gap-3 sm:p-4">
          <div className="flex min-w-0 flex-col">
            <p className="text-justify text-[10px] leading-[2.1] text-muted sm:text-[10px]">
              {description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] text-muted">
                {isPersian ? "برچسب‌ها:" : "Tags:"}
              </span>

              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-primary px-3 py-1 text-[10px] text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-2 flex items-start gap-1 text-[10px] leading-6 text-muted">
              <MapPin
                size={13}
                className="mt-1 shrink-0"
              />
              <span>
                {isPersian
                  ? "آدرس: گیلان، رشت، میدان آزادی، جنب چهارراه ..."
                  : "Address: Gilan, Rasht, Azadi Square, near the intersection ..."}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 text-[10px] text-muted">
              {amenities.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center gap-1"
                >
                  {item.icon}
                  <span>{item.label}</span>

                  {index !== amenities.length - 1 && (
                    <span className="mr-1 text-border">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[190px] overflow-hidden rounded-xl bg-[#D9D9D9] sm:h-[233px]">
            <button
              type="button"
              aria-label={isPersian ? "اشتراک‌گذاری" : "Share"}
              className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-black shadow"
            >
              <Share2 size={14} />
            </button>

            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-[#8B70FF] px-2.5 py-1.5 text-[10px] text-white shadow">
              <Star size={12} fill="currentColor" />
              <span>{isPersian ? "۵ ستاره" : "5 Stars"}</span>
            </div>

            <div className="flex h-full items-center justify-center text-xs text-muted">
              {t("accommodationImage")}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-3 pb-3 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:pb-3">
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

          <div className="flex items-center justify-between gap-4 rounded-lg bg-[#D9D9D9] px-3 py-2 text-[10px] text-[#555] sm:min-w-[295px]">
            <span>
              {isPersian ? "قیمت خرید:" : "Price:"}
            </span>

            <span className="font-medium">
              ۵,۰۰۰,۰۰۰ {t("toman")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailsModal;