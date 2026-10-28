"use client";

import { useState } from "react";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import FileContainer from "@/src/components/Ui/FileContainer";

const categories = [
  { label: "ملک ویلایی", icon: "/icons/v.png" },
  { label: "ملک کلبه", icon: "/icons/k.png" },
  { label: "بومگردی", icon: "/icons/B.png" },
  { label: "استخردار", icon: "/icons/A.png" },
  { label: "ملک ساحلی", icon: "/icons/k.png" },
  { label: "آپارتمان", icon: "/icons/p.png" },
];

const PropertyCategoriesSection = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative mb-30 w-full overflow-hidden px-5 pb-16 pt-30 text-white">
      <div className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-[#8CFF4552]/32 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-344 text-foreground">
        <div className="flex flex-col items-center text-center text-foreground">
          <div className="mb-3 flex items-center gap-3">
            <Image src="/icons/Group 33.png" alt="" width={48} height={16} />

            <span className="text-[16px] font-medium text-[#8CFF45]">
              دسته بندی املاک دلتا
            </span>

            <Image src="/icons/Group 34.png" alt="" width={48} height={16} />
          </div>

          <h2 className="text-[32px] font-medium leading-8 md:text-xl">
            هر ملکی بخوای اینجا پیدا میشه!
          </h2>

          <p className="mt-3 text-[12px] leading-6">
            با کلیک به روی هر دسته بندی می توانید تمام آگهی مربوط به آن را
            مشاهده کنید و به ملک مورد علاقه خود برسید.
          </p>
        </div>

        <div className="mt-8 overflow-x-auto pb-3 pt-9 scrollbar-hide">
          <div className="flex min-w-max items-start gap-4 px-1">
            {categories.map((category) => {
              const isActive = active === category.label;

              return (
                <div
                  key={category.label}
                  onMouseEnter={() => setActive(category.label)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(category.label)}
                  onBlur={() => setActive(null)}
                >
                  <FileContainer
                    background={isActive ? "#8CFF45" : "#303030"}
                    radius="sm"
                    size="md"
                    width="213px"
                    height="65px"
                    labelWidth="90px"
                    labelHeight="25px"
                    tagHeight="44px"
                    classNames={{
                      base: "transition-colors duration-200",
                      wrapperLabel: "transition-colors duration-200",
                      coverHollow: "transition-shadow duration-200",
                      innerLabel:
                        "flex h-full items-center justify-center p-1!",
                    }}
                    label={
                      <div className="pointer-events-none absolute right-[15px] top-[-28px] z-50 flex size-[58px] items-center justify-center rounded-[16px] bg-[#393939]">
                        <Image
                          src={category.icon}
                          alt=""
                          width={56}
                          height={56}
                          className="size-9 object-contain"
                        />
                      </div>
                    }
                    tag={
                      <MoveLeft size={18} className="me-1 mt-3 text-white/70" />
                    }
                  >
                    <button
                      type="button"
                      className={`flex h-full w-full items-center justify-center rounded-[14px] text-xs font-medium transition-colors duration-200 ${
                        isActive ? "text-black" : "text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2 whitespace-nowrap text-[16px]">
                        <span>✦</span>
                        {category.label}
                        <span>✦</span>
                      </span>
                    </button>
                  </FileContainer>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyCategoriesSection;
