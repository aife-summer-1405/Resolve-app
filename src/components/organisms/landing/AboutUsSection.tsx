"use client";

import { FC } from "react";
import { CalendarClock, ShieldCheck, Smile, Trophy } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const leftCards = [
  {
    title: "supportTitle",
    description: "supportDescription",
    icon: CalendarClock,
    image: "/images/headphones.png",
  },
  {
    title: "reviewsTitle",
    description: "reviewsDescription",
    icon: Smile,
    image: "/images/heart.png",
  },
];

const rightCards = [
  {
    title: "housesTitle",
    description: "housesDescription",
    icon: ShieldCheck,
    image: "/icons/house.png",
  },
  {
    title: "experienceTitle",
    description: "experienceDescription",
    icon: Trophy,
    image: "/images/trophy.png",
  },
];

type AboutCard = (typeof leftCards)[number] | (typeof rightCards)[number];

function AboutCardItem({
  card,
  side,
}: {
  card: AboutCard;
  side: "left" | "right";
}) {
  const Icon = card.icon;
  const locale = useLocale();
  const t = useTranslations("AboutUsSection");

  const isFa = locale === "fa";

  return (
    <article className="relative h-[224px] min-w-0 overflow-hidden">
      <svg
        viewBox="0 0 446 224"
        preserveAspectRatio="none"
        className={`absolute inset-0 h-full w-full ${
          isFa ? "" : "[transform:scaleX(-1)]"
        }`}
        aria-hidden="true"
      >
        <path
          d="M24 30 H296 Q312 30 322 20 L338 6 Q344 0 354 0 H422 Q446 0 446 24 V200 Q446 224 422 224 H24 Q0 224 0 200 V54 Q0 30 24 30 Z"
          fill="#393939"
        />

        <path
          d="M36 44 H294 Q310 44 320 34 L336 20 Q342 14 352 14 H410 Q432 14 432 36 V188 Q432 210 410 210 H36 Q14 210 14 188 V66 Q14 44 36 44 Z"
          fill={side === "left" ? "#232323" : "#414141"}
        />
      </svg>

      <div className="absolute inset-0">
        <div
          className={`absolute top-[50px] z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#292929] ${
            isFa ? "right-8" : "left-8"
          }`}
        >
          <Icon size={24} strokeWidth={1.8} />
        </div>

        <Image
          src={card.image}
          alt=""
          width={112}
          height={112}
          className={`pointer-events-none absolute top-10 z-10 h-[112px] w-[112px] object-contain ${
            isFa ? "left-2" : "right-2"
          }`}
        />

        <div
          className={`absolute top-[122px] z-20 w-[75%] ${
            isFa ? "right-8 text-right" : "left-8 text-left"
          }`}
        >
          <h3 className="text-[20px] font-semibold leading-7">
            {t(card.title)}
          </h3>

          <p className="mt-2 text-[16px] leading-6 text-white/75">
            {t(card.description)}
          </p>
        </div>
      </div>
    </article>
  );
}

const AboutUsSection: FC = () => {
  const locale = useLocale();
  const t = useTranslations("AboutUsSection");

  const isFa = locale === "fa";

  return (
    <section
      dir={isFa ? "rtl" : "ltr"}
      className="relative w-full overflow-hidden rounded-b-[64px] px-5 pb-12 pt-12 text-white md:px-8"
    >
      <div
        className={`pointer-events-none absolute top-20 h-72 w-72 rounded-full bg-[#7569FF52]/32 blur-[80px] ${
          isFa ? "-right-22" : "-left-22"
        }`}
      />

      <div className="relative z-10 mx-auto max-w-[1378px] text-foreground">
        <header className="mb-14 flex flex-col items-center text-center">
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

          <h2 className="text-[30px] font-medium leading-8">{t("title")}</h2>

          <p className="mt-3 max-w-[700px] text-[16px] leading-6">
            {t("description")}
          </p>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
          <div className="flex flex-col gap-[22px]">
            {rightCards.map((card) => (
              <AboutCardItem key={card.title} card={card} side="right" />
            ))}
          </div>

          <div className="relative order-first h-[470px] min-w-0 lg:order-none">
            <svg
              viewBox="0 0 446 470"
              preserveAspectRatio="none"
              className={`absolute inset-0 h-full w-full ${
                isFa ? "" : "[transform:scaleX(-1)]"
              }`}
              aria-hidden="true"
            >
              <path
                d="M24 30 H296 Q312 30 322 20 L338 6 Q344 0 354 0 H422 Q446 0 446 24 V446 Q446 470 422 470 H24 Q0 470 0 446 V54 Q0 30 24 30 Z"
                fill="#393939"
              />

              <path
                d="M36 44 H294 Q310 44 320 34 L336 20 Q342 14 352 14 H410 Q432 14 432 36 V434 Q432 456 410 456 H36 Q14 456 14 434 V66 Q14 44 36 44 Z"
                fill="#7569FF"
              />
            </svg>

            <div className="absolute inset-0 z-10 flex items-center justify-center px-7 pb-4 pt-12">
              <p className="w-full text-center text-[16px] leading-[36px] text-white">
                {t("middleText")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[22px]">
            {leftCards.map((card) => (
              <AboutCardItem key={card.title} card={card} side="left" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
