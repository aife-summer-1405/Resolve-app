"use client";

import { useState } from "react";
import type { ReactNode } from "react";

const tabs = [
    { id: "about", label: "درباره ملک" },
    { id: "facilities", label: "امکانات اقامتگاه" },
    { id: "reviews", label: "نظرات کاربران" },
] as const;

type TabId = (typeof tabs)[number]["id"];

interface TabInfoBoxProps {
    about: ReactNode;
    facilities: ReactNode;
    reviews: ReactNode;
}

const TabInfoBox = ({
    about,
    facilities,
    reviews,
}: TabInfoBoxProps) => {
    const [activeTab, setActiveTab] = useState<TabId>("about");

    const content = {
        about,
        facilities,
        reviews,
    };

    return (
        <section
            dir="rtl"
            className="md:w-4/5 overflow-hidden rounded-2xl  p-6 text-white"
        >
          <div className="mb-4 flex flex-nowrap gap-2 overflow-x-auto rounded-2xl bg-card px-2 py-1">
    {tabs.map((tab) => (
        <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex shrink-0 items-center justify-center whitespace-nowrap rounded-2xl border-b-2 p-2 transition-colors ${
                activeTab === tab.id
                    ? "bg-lime-400 text-black"
                    : "border-transparent text-gray-400 hover:text-white"
            }`}
        >
            {tab.label}
        </button>
    ))}
</div>

            <div className="pt-6">{content[activeTab]}</div>
        </section>
    );
};

export default TabInfoBox;