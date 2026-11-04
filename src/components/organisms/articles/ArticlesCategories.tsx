"use client";

import { useState } from "react";
import { MoveLeft } from "lucide-react";
import FileContainer from "@/src/components/Ui/FileContainer";

const categories = [
  { id: 1, name: "ملک و ویلایی" },
  { id: 2, name: "ملک و ویلایی" },
  { id: 3, name: "ملک و ویلایی" },
  { id: 4, name: "ملک و ویلایی" },
  { id: 5, name: "ملک و ویلایی" },
  { id: 6, name: "ملک و ویلایی" },
];

export default function ArticlesCategories() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="w-full overflow-x-auto pb-4 pt-8">
      <div className="flex w-max min-w-full items-start justify-center gap-10 px-1">
        {categories.map((category) => {
          const isHovered = hovered === category.id;

          return (
            <div
              key={category.id}
              className="w-[178px] shrink-0"
              onMouseEnter={() => setHovered(category.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <FileContainer
                direction="rtl"
                background={isHovered ? "#8CFF45" : "#303030"}
                radius="sm"
                size="md"
                width="100%"
                height="55px"
                labelWidth="72px"
                labelHeight="24px"
                tagHeight="28px"
                classNames={{
                  base: "transition-colors duration-200",
                  wrapperLabel: "transition-colors duration-200",
                  coverHollow: "transition-shadow duration-200",
                  innerLabel: "flex h-full items-center justify-center p-0!",
                }}
                label={
                  <div className="flex h-full items-center justify-center">
                    <div
                      className={`flex h-[22px] w-[58px] items-center justify-center rounded-full transition-colors duration-200 ${
                        isHovered
                          ? "bg-white text-[#292929]"
                          : "bg-[#414141] text-white"
                      }`}
                    >
                      <MoveLeft size={17} />
                    </div>
                  </div>
                }
              >
                <div
                  className={`flex h-full w-full items-center justify-center rounded-[14px] text-[14px] font-medium transition-colors duration-200 ${
                    isHovered ? "text-[#292929]" : "text-white"
                  }`}
                >
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <span>✦</span>
                    {category.name}
                    <span>✦</span>
                  </span>
                </div>
              </FileContainer>
            </div>
          );
        })}
      </div>
    </section>
  );
}