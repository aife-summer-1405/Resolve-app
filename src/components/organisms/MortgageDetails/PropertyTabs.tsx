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

const tabs = [
  { id: "description", label: "توضیحات ملک", icon: FileText },
  { id: "facilities", label: "امکانات ملک", icon: ListChecks },
  { id: "location", label: "موقعیت مکانی", icon: MapPin },
  { id: "reviews", label: "نظرات کاربران", icon: MessageSquare },
] as const;

type TabId = (typeof tabs)[number]["id"];

interface PropertyTabsProps {
  description: string;
  facilities: string[];
  address: string;
}

export default function PropertyTabs({
  description,
  facilities,
  address,
}: PropertyTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  const houseDetails: IHouseDetails = {
    id: "11",
    title: "فروش آپارتمان ۱۲۶ متر در شهرک غرب",
    address,
    photos: [],
    rate: "0",
    discounted_price: null,
    price: "0",
    tags: facilities,
    last_updated: "",
    capacity: 4,
    location: {
      lat: 0,
      lng: 0,
    },
    categories: {
      name: "apartment",
    },
    bathrooms: 2,
    parking: 1,
    rooms: 2,
    yard_type: "private",
    num_comments: 0,
    transaction_type: "rent",
    sellerId: "",
    sellerName: "",
    caption: description,
    favoriteId: null,
    bookings: 0,
    isFavorite: false,
  };

  return (
    <section dir="rtl" className="w-full text-white">
      <div className="flex gap-2 overflow-x-auto border-b border-white/10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm transition ${
                isActive
                  ? "border-[#91FF45] bg-[#91FF45] text-black"
                  : "border-transparent text-white/60 hover:text-white"
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
          <div>
            <p className="whitespace-pre-line text-sm leading-8 text-white/70">
              {description}
            </p>
          </div>
        )}

        {activeTab === "facilities" && (
          <HouseFacilities result={houseDetails} />
        )}
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
        {address}
      </p>
    </div>

    <div className="h-[260px] w-full overflow-hidden rounded-[28px] sm:h-[300px]">
      <iframe
        title="موقعیت مکانی ملک"
        src="https://www.google.com/maps?q=Tehran,Iran&output=embed"
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
        </div>    
      </div>
    )}        
        {activeTab === "reviews" && (
          <div className="flex flex-col gap-8">
            <ReviewForm />
            <ReviewList />
          </div>
        )}

      </div>
    </section>
  );
}
