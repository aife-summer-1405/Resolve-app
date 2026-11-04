
import FileContainer from "@/src/components/Ui/FileContainer";
import { CalendarRange, Star } from "lucide-react";

interface ArticleReviewCardProps {
  caption: string;
  name: string;
  date: string;
  rating: number;
}

export default function ArticleReviewCard({
  caption,
  name,
  date,
  rating,
}: ArticleReviewCardProps) {
  return (
    <article className="relative w-full text-white">
      <FileContainer
        background="#393939"
        direction="rtl"
        radius="md"
        size="md"
        width="100%"
        height="180px"
        labelWidth="90px"
        labelHeight="32px"
        classNames={{
          base: "transition-colors duration-200",
          wrapperLabel: "transition-colors duration-200",
          coverHollow: "transition-shadow duration-200",
          innerLabel: "h-full p-0!",
        }}
        label={
          <div className="flex h-full items-center justify-center">
            <div className="mt-2 flex h-[25px] w-[58px] items-center justify-center gap-1 rounded-[9px] bg-white text-[11px] font-semibold text-[#292929] shadow-[0_4px_12px_0_#FFFFFF33]">
              <Star size={13} fill="currentColor" />
              <span>
                {rating.toLocaleString("fa-IR", {
                  minimumFractionDigits: 1,
                })}
              </span>
            </div>
          </div>
        }
      >
        <div className="flex h-full flex-col justify-between gap-3 px-[13px] pb-[13px] pt-[12px]">
          <p className="line-clamp-3 text-right text-[12px] leading-[2.5] text-white/90 sm:text-[13px]">
            «{caption}»
          </p>

          <div className="flex min-h-[65px] w-full items-center justify-between gap-3 rounded-[20px] bg-[#444444] px-[12px] py-[8px]">
            <div className="flex min-w-0 items-center gap-3">
              <div className="size-[46px] shrink-0 rounded-[13px] bg-[#D9D9D9]" />

              <div className="flex min-w-0 flex-col justify-center gap-[7px] text-right">
                <p className="truncate text-[12px] font-medium text-white sm:text-[13px]">
                  {name}
                </p>

                <div className="flex items-center gap-1 text-[10px] text-[#AAAAAA]">
                  <span>{date}</span>
                  <CalendarRange size={13} className="shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FileContainer>
    </article>
  );
}
