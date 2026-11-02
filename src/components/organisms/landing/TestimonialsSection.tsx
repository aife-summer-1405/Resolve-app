"use client";

import { useEffect, useState } from "react";
import { LucideCalendarDays, Star } from "lucide-react";
import Image from "next/image";
import FileContainer from "../../Ui/FileContainer";
import { getAllComments } from "@/src/services/getAllComments";
import { IHouseComment } from "@/src/types/HousereservesType/HouseCommentsType";
import { useLocale, useTranslations } from "next-intl";

const TestimonialsSection = () => {
  const locale = useLocale();
  const t = useTranslations("TestimonialsSection");
  const isFa = locale === "fa";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState<IHouseComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const visibleCount =
    typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 2;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getAllComments();
        setComments(
          response.comments.filter(
            (comment: IHouseComment) => comment.parent_comment_id === null,
          ),
        );
      } catch (error) {
        console.error("خطا در دریافت نظرات:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  const totalSlides = Math.ceil(comments.length / visibleCount);

  useEffect(() => {
    if (totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const visibleTestimonials = comments.slice(
    currentIndex * visibleCount,
    currentIndex * visibleCount + visibleCount,
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(isFa ? "fa-IR" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString(isFa ? "fa-IR" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section
      dir={isFa ? "rtl" : "ltr"}
      className="relative w-full overflow-hidden px-5 py-8 text-white md:px-8 md:py-10"
    >
      <div className="mx-auto max-w-343.5">
        <header className="mb-8 flex flex-col items-center text-center text-foreground">
          <div className="mb-3 flex items-center gap-3">
            <Image
              src="/icons/Group 33.png"
              alt={t("iconAlt")}
              width={48}
              height={16}
            />

            <span className="text-[16px] font-medium text-[#8CFF45]">
              {t("label")}
            </span>

            <Image
              src="/icons/Group 34.png"
              alt={t("iconAlt")}
              width={48}
              height={16}
            />
          </div>

          <h2 className="text-[32px] font-medium leading-8 md:text-[22px]">
            {t("title")}
          </h2>

          <p className="mt-2 max-w-162.5 text-[16px] leading-5 md:text-[11px]">
            {t("description")}
          </p>
        </header>

        {!isLoading && comments.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-3">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                dir={isFa ? "rtl" : "ltr"}
                className="relative mt-2 w-full min-w-0"
              >
                <FileContainer
                  direction={isFa ? "rtl" : "ltr"}
                  background="#393939"
                  radius="md"
                  size="md"
                  width="100%"
                  height="260px"
                  labelWidth="100px"
                  labelHeight="32px"
                  tagHeight="24px"
                  classNames={{
                    base: "w-full",
                    innerLabel: "h-full p-0!",
                  }}
                  label={
                    <div
                      className={`absolute top-[10px] z-50 flex h-[30px] w-[60px] items-center justify-center gap-1 rounded-[10px] bg-white text-[#292929] shadow-[0_4px_12px_0_#FFFFFF33,inset_-1px_-1px_8px_0_#0000000A] ${
                        isFa ? "right-5" : "left-5"
                      }`}
                    >
                      <span className="text-[16px] font-semibold leading-none">
                        {testimonial.rating}
                      </span>
                      <Star size={16} fill="currentColor" strokeWidth={1.5} />
                    </div>
                  }
                  tag={<div className="h-full w-full" />}
                >
                  <div className="flex h-full flex-col px-3 pb-3 pt-[40px]">
                    <p
                      className={`min-h-0 flex-1 px-1 text-[16px] leading-[2.1] text-white/90 ${
                        isFa ? "text-right" : "text-left"
                      }`}
                    >
                      {testimonial.caption}
                    </p>

                    <div className="flex h-[70px] w-full shrink-0 items-center justify-between rounded-2xl bg-[#444444]">
                      <div
                        className={`flex items-center gap-2 ${
                          isFa ? "mr-5" : "ml-5"
                        }`}
                      >
                        {testimonial.user.profilePicture ? (
                          <Image
                            src={testimonial.user.profilePicture}
                            alt={t("userImageAlt")}
                            width={50}
                            height={50}
                            className="h-[50px] w-[50px] shrink-0 rounded-xl object-cover"
                          />
                        ) : (
                          <div
                            className="h-[50px] w-[50px] shrink-0 rounded-xl bg-[#D9D9D9]"
                            aria-hidden="true"
                          />
                        )}

                        <div className={isFa ? "text-right" : "text-left"}>
                          <h3 className="text-[13px] font-medium text-white">
                            {testimonial.user.firstName}{" "}
                            {testimonial.user.lastName}
                          </h3>

                          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[12px] text-[#AAAAAA]">
                            <LucideCalendarDays size={15} />
                            <span>{formatDate(testimonial.created_at)}</span>
                            <span>{formatTime(testimonial.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FileContainer>
              </div>
            ))}
          </div>
        )}

        {!isLoading && comments.length === 0 && (
          <p className="py-10 text-center text-white/60">
            {t("emptyComments")}
          </p>
        )}

        {isLoading && (
          <p className="py-10 text-center text-white/60">
            {t("loadingComments")}
          </p>
        )}

        {totalSlides > 1 && (
          <div
            className="mt-7 flex items-center justify-center gap-1.5"
            aria-label={t("paginationLabel")}
          >
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={t("goToPage", { number: index + 1 })}
                className={
                  index === currentIndex
                    ? "h-0 w-0 border-b-[7px] border-l-[4px] border-r-[4px] border-b-[#8CFF45] border-l-transparent border-r-transparent"
                    : "h-1.25 w-1.25 rounded-full bg-white"
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
