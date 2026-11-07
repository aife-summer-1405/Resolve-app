"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import Image from "next/image";
import OfferCard from "../../molecules/cards/OfferCard";
import { getHouses, type House } from "@/src/services/houseService";

const OffersSection = () => {
  const t = useTranslations("OffersSection");
  const locale = useLocale();

  const [activeIndex, setActiveIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(6327);
  const [offers, setOffers] = useState<House[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await getHouses();
        setOffers(response.houses);
      } catch (error) {
        console.error("خطا در دریافت پیشنهادهای ویژه:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  useEffect(() => {
    if (offers.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % offers.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [offers.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value: number) =>
    String(value)
      .padStart(2, "0")
      .replace(/\d/g, (digit) =>
        locale === "fa" ? "۰۱۲۳۴۵۶۷۸۹"[Number(digit)] : digit,
      );

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <section className="relative mx-auto w-full max-w-[1440px] text-white">
      <div
        className={`pointer-events-none absolute -top-[151px] z-0 h-[218px] w-[218px] rounded-full bg-[#7569FF]/32 blur-[128px] ${
          locale === "fa" ? "-right-[262px]" : "-left-[262px]"
        }`}
      />

      <div
        className={`absolute -top-18.75 z-10 h-[75px] w-[225px] rounded-t-[40px] bg-[#2D2D2D] ${
          locale === "fa" ? "right-0" : "left-0"
        }`}
      >
        <span
          className={`absolute bottom-0 h-10 w-10 ${
            locale === "fa" ? "-left-10" : "-right-10"
          }`}
          style={{
            background:
              "radial-gradient(circle at 0 0, transparent 39px, #2D2D2D 40px)",
            transform: locale === "en" ? "scaleX(-1)" : "none",
          }}
        />

        <div
          dir="ltr"
          className="absolute left-1/2 top-7 flex h-11 w-[149px] -translate-x-1/2 items-center justify-center gap-2 rounded-2xl bg-[#FF5964] text-white"
        >
          <Clock3 size={18} />
          <span className="text-[20px] font-semibold tabular-nums">
            {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
          </span>
        </div>
      </div>

      <div
        className={`relative z-[1] overflow-hidden rounded-[40px] bg-[#2D2D2D] px-5 pb-8 pt-7 sm:px-8 ${
          locale === "fa" ? "rounded-tr-none" : "rounded-tl-none"
        }`}
      >
        <div className="mb-3 flex items-center gap-3">
          <span className="text-[16px] font-medium text-[#8CFF45]">
            {t("bestDiscount")}
          </span>

          <Image src="/icons/Group 34.png" alt="آیکون" width={30} height={25} />
        </div>

        <div className="mb-10 flex items-center justify-between gap-4">
          <h2 className="text-[32px] font-light">
            {t("titleBefore")}{" "}
            <span className="font-semibold">{t("titleHighlight")}</span>{" "}
            {t("titleAfter")}
          </h2>

          <button
            type="button"
            className="flex shrink-0 items-center gap-2 rounded-[14px] border border-white/60 px-4 py-2 text-sm transition hover:border-[#8CFF45] hover:text-[#8CFF45]"
          >
            {" "}
            {t("viewAll")}
            {locale === "fa" ? (
              <ChevronLeft size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
        </div>

        <div className="overflow-hidden">
          {isLoading ? (
            <div className="flex min-h-[250px] items-center justify-center text-[16px] text-white/70">
              {t("loading")}
            </div>
          ) : offers.length === 0 ? (
            <div className="flex min-h-[250px] items-center justify-center text-[16px] text-white/70">
              {t("empty")}
            </div>
          ) : (
            <div
              className="flex items-start gap-3 transition-transform duration-700 ease-in-out"
              style={{
                transform:
                  locale === "fa"
                    ? `translateX(calc(${activeIndex} * (100% / 4 + 3px)))`
                    : `translateX(calc(${activeIndex} * (100% / 4 + 3px) * -1))`,
              }}
            >
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="w-[306px] min-w-[306px] shrink-0 lg:w-[calc((100%-36px)/4)] lg:min-w-0"
                >
                  <OfferCard offer={offer} isLoading={isLoading} />
                </div>
              ))}
            </div>
          )}
        </div>

        {!isLoading && offers.length > 0 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {offers.map((offer, index) => (
              <button
                key={offer.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={t("selectOffer", { number: index + 1 })}
                className="flex h-[10px] w-[10px] items-center justify-center"
              >
                {index === activeIndex ? (
                  <span className="h-0 w-0 border-x-[5px] border-b-[8px] border-x-transparent border-b-[#8CFF45]" />
                ) : (
                  <span className="h-[6px] w-[6px] rounded-full bg-white/70" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OffersSection;
