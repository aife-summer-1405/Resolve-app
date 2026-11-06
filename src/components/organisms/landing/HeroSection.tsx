"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronDown, Search, LocationEdit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import Field from "../../Ui/Field";

import type { ILocation } from "@/src/types/LocationType";

interface IHeroSectionProps {
  locations: ILocation[];
}

export default function HeroSection({ locations }: IHeroSectionProps) {
  const t = useTranslations("HeroSection");
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"booking" | "mortgage">("booking");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<DateObject | null>(null);
  const [checkOut, setCheckOut] = useState<DateObject | null>(null);
  const [guests, setGuests] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const locationRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const fields = [
    {
      name: "destination",
      label: t("destination"),
      placeholder: t("destinationPlaceholder"),
      wide: true,
    },
    {
      name: "checkIn",
      label: t("checkIn"),
      placeholder: t("enterPlaceholder"),
    },
    {
      name: "checkOut",
      label: t("checkOut"),
      placeholder: t("enterPlaceholder"),
    },
    {
      name: "guests",
      label: t("guests"),
      placeholder: t("enterPlaceholder"),
    },
  ];

  const updateMenuPosition = () => {
    if (!locationRef.current) return;

    const rect = locationRef.current.getBoundingClientRect();

    setMenuPosition({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  };

  useEffect(() => {
    if (!isLocationOpen) return;

    updateMenuPosition();

    window.addEventListener("resize", updateMenuPosition);

    const handleScroll = (event: Event) => {
      if (menuRef.current?.contains(event.target as Node)) return;

      setIsLocationOpen(false);
    };

    window.addEventListener("scroll", handleScroll, true);

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        !locationRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setIsLocationOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLocationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", handleScroll, true);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isLocationOpen]);

  const handleCheckInChange = (date: DateObject | null) => {
    setCheckIn(date);

    if (
      date &&
      checkOut &&
      checkOut.toDate().getTime() < date.toDate().getTime()
    ) {
      setCheckOut(null);
    }
  };

  const handleSearch = () => {
    if (activeTab === "mortgage") {
      const params = new URLSearchParams();

      if (destination) {
        params.set("location", destination);
      }

      setDestination("");
      setCheckIn(null);
      setCheckOut(null);
      setGuests("");

      router.push(
        `/Mortgage${params.toString() ? `?${params.toString()}` : ""}`,
      );

      return;
    }

    if (!destination && !checkIn && !checkOut) return;

    const params = new URLSearchParams();

    if (destination) {
      params.set("location", destination);
    }

    if (checkIn) {
      params.set("checkIn", checkIn.format("YYYY/MM/DD"));
    }

    if (checkOut) {
      params.set("checkOut", checkOut.format("YYYY/MM/DD"));
    }

    if (guests) {
      params.set("guests", guests);
    }

    setDestination("");
    setCheckIn(null);
    setCheckOut(null);
    setGuests("");

    router.push(
      `/HouseReserve${params.toString() ? `?${params.toString()}` : ""}`,
    );
  };

  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-gradient-to-b from-[#85898c] via-[#666a6d] to-[#232323] px-4 pt-20 text-white xl:h-225.25 xl:px-2 xl:pt-6">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-35 h-48 bg-gradient-to-t from-[#232323] via-[#232323]/80 to-transparent xl:h-105" />

      <div className="relative mt-4 flex w-full max-w-321 flex-col items-center xl:mt-6 xl:block xl:h-196.25">
        <div className="relative aspect-1284/286 w-full overflow-hidden md:aspect-auto md:h-[715px] xl:contents">
          <div className="absolute inset-x-0 top-0 z-10 h-full md:h-[286px] xl:left-0 xl:h-71.5 xl:w-321">
            <Image
              src="/images/landing2.png"
              alt={t("logoAlt")}
              fill
              sizes="(min-width: 1280px) 1284px, 100vw"
              className="object-contain object-top xl:object-fill"
            />
          </div>

          <div className="pointer-events-none absolute left-1/2 top-[115px] z-20 hidden h-[600px] w-[754px] max-w-none -translate-x-1/2 md:block xl:left-auto xl:right-45 xl:top-28.75 xl:h-150 xl:w-188.5 xl:translate-x-0">
            <Image
              src="/images/landingg1.png"
              alt={t("buildingAlt")}
              fill
              sizes="754px"
            />
          </div>
        </div>

        <div className="relative z-30 mt-4 w-full max-w-md space-y-4 text-center xl:absolute xl:right-235 xl:top-68 xl:mt-0 xl:w-95 xl:max-w-none xl:text-start">
          <p className="text-base font-normal text-white sm:text-lg xl:text-[20px]">
            {t("description1")}
          </p>

          <div className="flex w-full items-center justify-center gap-5 xl:w-100">
            <p className="text-base font-normal text-white sm:text-lg xl:text-[20px]">
              {t("description2")}
            </p>
            <span className="hidden h-px w-32 bg-white sm:block" />
          </div>

          <div className="flex flex-wrap justify-center gap-3 xl:justify-start">
            <Link
              href="#search"
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-[#363636]"
            >
              {t("easyReserve")}
              <ChevronLeft size={12} />
            </Link>

            <Link
              href="#rent"
              className="flex items-center gap-2 rounded-lg bg-[#363636] px-4 py-2 text-xs transition hover:bg-[#474747]"
            >
              {t("rentAndLease")}
              <ChevronLeft size={12} />
            </Link>
          </div>

          <div className="hidden items-center justify-center gap-4 pt-4 sm:flex xl:justify-start xl:pt-6">
            <div>
              <p className="text-lg font-bold">+۸۵۰۰</p>
              <p className="text-sm text-white xl:text-[16px]">
                {t("bookingRegions")}
              </p>
            </div>

            <span className="h-10 w-px shrink-0 bg-white" />

            <div>
              <p className="text-lg font-bold">+۵۶۰۰</p>
              <p className="text-sm text-white xl:text-[16px]">
                {t("propertiesForRent")}
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-30 mt-8 hidden flex-col items-center gap-2 text-center md:flex xl:absolute xl:right-0 xl:top-80 xl:mt-0 xl:items-stretch xl:text-start">
          <div>
            <Image
              src="/images/Group 9940.png"
              alt={t("customerAlt")}
              width={100}
              height={50}
            />
          </div>

          <div className="text-white">
            <p className="text-2xl font-semibold sm:text-3xl xl:text-[32px]">
              {t("satisfiedCustomers")}
            </p>
            <p className="text-base font-normal xl:text-[20px]">
              {t("customerTrust")}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-40 mt-8 w-full max-w-286.25 pb-6 xl:absolute xl:bottom-4.5 xl:left-1/2 xl:mt-0 xl:w-286.25 xl:max-w-[calc(100%-16px)] xl:-translate-x-1/2 xl:pb-0">
        <div className="mb-3 flex cursor-pointer items-center gap-4 pe-2 text-xs max-sm:overflow-x-auto ">
          <button
            type="button"
            onClick={() => setActiveTab("booking")}
            className={`flex h-6.25 w-23 items-center gap-2 border-l cursor-pointer ${
              activeTab === "booking" ? "text-white" : "text-[#8C8C8C]"
            }`}
          >
            <Image
              src="/icons/booking (1).png"
              alt={t("bookingIconAlt")}
              width={20}
              height={20}
              className={`brightness-0 invert ${
                activeTab === "booking" ? "opacity-100" : "opacity-40"
              }`}
            />
            <p>{t("booking")}</p>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("mortgage")}
            className={`flex h-6.25 w-23 items-center gap-2 cursor-pointer ${
              activeTab === "mortgage" ? "text-white" : "text-[#8C8C8C]"
            }`}
          >
            <Image
              src="/icons/house-building (1).png"
              alt={t("mortgageIconAlt")}
              width={20}
              height={20}
              className={`brightness-0 invert ${
                activeTab === "mortgage" ? "opacity-100" : "opacity-40"
              }`}
            />
            <p>{t("mortgage")}</p>
          </button>

          {/* <div className="flex h-6.25 w-25 items-center gap-3">
            <Image
              src="/icons/money-check-edit.png"
              alt={t("buyAndSellIconAlt")}
              width={20}
              height={20}
            />
            <p className="text-[#8C8C8C]">{t("buyAndSell")}</p>
          </div> */}
        </div>

        <div
          id="search"
          className="grid w-full grid-cols-1 items-center gap-3 rounded-3xl border border-white/10 bg-card p-4 shadow-xl backdrop-blur-md sm:grid-cols-2 sm:[&>*:first-child]:col-span-2 lg:h-29.25 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:[&>*:first-child]:col-span-1"
        >
          {fields.map((field) => (
            <Field key={field.label} legend={field.label}>
              {field.name === "destination" ? (
                <div
                  ref={locationRef}
                  className="flex w-full items-center gap-2"
                >
                  <LocationEdit
                    size={20}
                    className="shrink-0 text-foreground"
                  />

                  <button
                    type="button"
                    onClick={() => setIsLocationOpen((prev) => !prev)}
                    dir="rtl"
                    className="flex w-full min-w-0 items-center justify-between bg-transparent text-xs text-foreground outline-none"
                  >
                    <span>{destination || "همه شهرها"}</span>

                    <ChevronDown
                      size={20}
                      className={`shrink-0 transition-transform ${
                        isLocationOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              ) : field.name === "checkIn" ? (
                <div className="flex items-center gap-2">
                  <DatePicker
                    value={checkIn}
                    onChange={(date) =>
                      handleCheckInChange(
                        date instanceof DateObject ? date : null,
                      )
                    }
                    calendar={persian}
                    locale={persian_fa}
                    format="YYYY/MM/DD"
                    calendarPosition="bottom-right"
                    portal
                    render={(value, openCalendar) => (
                      <button
                        type="button"
                        onClick={openCalendar}
                        dir="rtl"
                        className="w-full min-w-0 bg-transparent text-right text-xs text-foreground outline-none"
                      >
                        {value || field.placeholder}
                      </button>
                    )}
                  />
                </div>
              ) : field.name === "checkOut" ? (
                <div className="flex items-center gap-2">
                  <DatePicker
                    value={checkOut}
                    onChange={(date) =>
                      setCheckOut(date instanceof DateObject ? date : null)
                    }
                    calendar={persian}
                    locale={persian_fa}
                    format="YYYY/MM/DD"
                    minDate={checkIn || undefined}
                    calendarPosition="bottom-right"
                    portal
                    render={(value, openCalendar) => (
                      <button
                        type="button"
                        onClick={openCalendar}
                        dir="rtl"
                        className="w-full min-w-0 text-xs text-foreground outline-none"
                      >
                        {value || field.placeholder}
                      </button>
                    )}
                  />
                </div>
              ) : (
                <div className="flex w-full items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={guests}
                    placeholder={field.placeholder}
                    onChange={(event) => setGuests(event.target.value)}
                    dir="rtl"
                    className="w-full bg-transparent text-xs text-foreground outline-none"
                  />
                  <span className="shrink-0 text-xs text-foreground">نفر</span>
                </div>
              )}
            </Field>
          ))}

          <button
            type="button"
            onClick={handleSearch}
            disabled={
              activeTab === "mortgage"
                ? false
                : !destination && !checkIn && !checkOut
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-[#91FF45] px-7 py-4 text-xs font-bold text-black transition hover:opacity-90 disabled:opacity-40"
          >
            <Search size={14} />
            {t("search")}
          </button>
        </div>
      </div>

      {isLocationOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            dir="rtl"
            style={{
              position: "fixed",
              top: menuPosition.top,
              left: menuPosition.left,
              width: menuPosition.width,
              zIndex: 9999,
            }}
            className="max-h-70 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] border border-[#8C8C8C] bg-[#363636] py-1 shadow-xl"
          >
            <button
              type="button"
              onClick={() => {
                setDestination("");
                setIsLocationOpen(false);
              }}
              className={`w-full px-3 py-2 text-right text-xs transition hover:bg-[#555555] ${
                destination === ""
                  ? "bg-[#93C5FD] text-[#363636]"
                  : "text-white"
              }`}
            >
              همه شهرها
            </button>

            {locations.map((location) => (
              <button
                key={location.id}
                type="button"
                onClick={() => {
                  setDestination(location.areaName);
                  setIsLocationOpen(false);
                }}
                className={`w-full px-3 py-2 text-right text-xs transition hover:bg-[#555555] ${
                  destination === location.areaName
                    ? "bg-[#93C5FD] text-[#363636]"
                    : "text-white"
                }`}
              >
                {location.areaName}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </section>
  );
}
