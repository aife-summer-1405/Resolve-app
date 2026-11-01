"use client";

import {
  Phone,
  UserRound,
  CalendarDays,
  CircleDollarSign,
  ScrollText,
  MessageCircle,
} from "lucide-react";
import type { IHouseDetails } from "@/src/types/HousereservesType/HouseDetailType";

interface ContactInfoProps {
  result: IHouseDetails;
  phoneNumber?: string; 
}

const formatPrice = (value: string | null) =>
  value ? Number(value).toLocaleString("fa-IR") : "—";

const formatDate = (value: string) =>
  value
    ? new Date(value).toLocaleString("fa-IR", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

export default function ContactInfo({
  result,
  phoneNumber,
}: ContactInfoProps) {
  return (
    <section
      dir="rtl"
      className="relative w-full rounded-[32px] border-2 border-[#393939] bg-[#393939] px-4 pb-4 pt-12 text-white shadow-[0_0_0_1px_rgba(22,140,255,0.15)]"
    >
      <div className="absolute left-1/2 top-0 flex h-[50px] w-[80%] -translate-x-1/2 -translate-y-[1px] items-center justify-center gap-2 rounded-b-[28px] bg-[#555555] px-3">
        <h2 className="whitespace-nowrap text-base font-bold">
          اطلاعات تماس
        </h2>
        <Phone size={21} />
      </div>

      <div className="mt-2 flex flex-col items-center text-center">
        <div className="flex h-[66px] w-[66px] items-center justify-center rounded-[20px] bg-[#555555] text-white/70">
          <UserRound size={30} />
        </div>

        <p className="mt-4 max-w-full truncate text-base font-medium">
          {result.sellerName}
        </p>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-white/50">
          <CalendarDays size={17} />
          <span>{formatDate(result.last_updated)}</span>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-2 text-xs">
        <span className="flex shrink-0 items-center gap-1 text-white/50">
          <CircleDollarSign size={16} />
          قیمت رهن از:
        </span>

        <span className="whitespace-nowrap font-semibold text-primary">
          {formatPrice(result.discounted_price ?? result.price)}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between gap-2 text-xs">
        <span className="flex shrink-0 items-center gap-1 text-white/50">
          <ScrollText size={16} />
          قیمت اجاره از:
        </span>

        <span className="whitespace-nowrap font-semibold text-primary">
          {formatPrice(result.price)}
        </span>
      </div>

      {phoneNumber && (
        <a
          href={`tel:${phoneNumber}`}
          className="mt-8 flex min-h-11.25 w-full items-center justify-center gap-2 rounded-xl bg-primary px-2 py-3 text-sm font-bold text-black transition hover:bg-[#a5ff6b]"
        >
          <span dir="rtl" className="truncate">
            تماس با {phoneNumber.replace(/^(\d{1})\d{4}(\d{4})$/, "$1****$2")}
          </span>
          <Phone size={19} className="shrink-0" />
        </a>
      )}

      <button
        type="button"
        className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-white bg-transparent px-2 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        <span>گفتگو با فروشنده</span>
        <MessageCircle size={18} />
      </button>
    </section>
  );
}