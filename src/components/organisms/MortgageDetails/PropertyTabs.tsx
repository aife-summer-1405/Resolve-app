"use client";

import { useState } from "react";
import {
  FileText,
  ListChecks,
  MapPin,
  MessageSquare,
} from "lucide-react";
import HouseFacilities from "@/src/app/(main)/HouseReserveDetails/Tabs/HouseFacilities";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { IHouseDetails } from "@/src/types/HousereservesType/HouseDetailType";
import UserReviews from "@/src/app/(main)/HouseReserveDetails/Tabs/Reviews/UserReviews";

const tabs = [
  { id: "description", label: "توضیحات ملک", icon: FileText },
  { id: "facilities", label: "امکانات ملک", icon: ListChecks },
  { id: "location", label: "موقعیت مکانی", icon: MapPin },
  { id: "reviews", label: "نظرات کاربران", icon: MessageSquare },
] as const;

type TabId = (typeof tabs)[number]["id"];

interface PropertyTabsProps {
  result: IHouseDetails;
}

export default function PropertyTabs({ result }: PropertyTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  const { lat, lng } = result.location;

  return (
    <section dir="rtl" className="w-full text-white">
      <div
  dir="rtl"
  className="mb-4 flex flex-nowrap gap-2 overflow-x-auto rounded-2xl bg-card px-2 py-1"
>
  {tabs.map((tab) => {
    const Icon = tab.icon;
    const isActive = activeTab === tab.id;

    return (
      <button
        key={tab.id}
        type="button"
        onClick={() => setActiveTab(tab.id)}
        className={`flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-2xl border-b-2 p-2 transition-colors ${
          isActive
            ? "bg-lime-400 text-black"
            : "border-transparent text-gray-400 hover:text-white"
        }`}
      >
        <Icon size={17} />
        {tab.label}
      </button>
    );
  })}
</div>

      <div className="min-h-[160px] py-6">
        {activeTab === "description" && (
          <p className="whitespace-pre-line text-sm leading-8 text-white/70">
            {result.caption}
          </p>
        )}

        {activeTab === "facilities" && <HouseFacilities result={result} />}

        {activeTab === "location" && (
          <div
            dir="ltr"
            className="grid grid-cols-1 items-center gap-5 lg:grid-cols-2"
          >
            <div dir="rtl" className="text-right">
              <h2 className="mb-4 text-lg font-semibold text-white">
                موقعیت مکانی ملک
              </h2>
              <p className="text-sm leading-8 text-white/60">
                {result.address}
              </p>
            </div>

            <div className="h-[260px] w-full overflow-hidden rounded-[28px] sm:h-[300px]">
              <iframe
                title="موقعیت مکانی ملک"
                src={`https://www.google.com/maps?q=${lat},${lng}&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <UserReviews houseId={result.id}/>
        )}
      </div>
    </section>
  );
}