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
            className="w-4/5 overflow-hidden rounded-2xl  p-6 text-white"
        >
            <div className="flex gap-8 rounded-2xl py-1 px-2 bg-card mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex w-40 shrink-0 items-center justify-center rounded-2xl border-b-2 p-2  transition-colors ${activeTab === tab.id
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