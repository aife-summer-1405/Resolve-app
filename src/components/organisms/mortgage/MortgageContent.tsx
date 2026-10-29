"use client";

import { useMemo, useState } from "react";
import MortgageFilters, {
  type MortgageFilterValues,
} from "./MortgageFilters";
import MortgageCard, { type MortgageProperty } from "./MortgageCard";
import MortgagePagination from "./MortgagePagination";
import Link from "next/link";

const properties: MortgageProperty[] = [
  {
    id: 1,
    title: "آپارتمان دوخوابه در تهران",
    location: "تهران، سعادت‌آباد",
    image: "/images/Rectangle 6609.png",
    area: 120,
    rooms: 2,
    floor: "۳",
    mortgage: 1500000000,
    rent: 15000000,
  },
  {
    id: 2,
    title: "آپارتمان نوساز و خوش‌نقشه",
    location: "تهران، پونک",
    image: "/images/Rectangle 6609.png",
    area: 95,
    rooms: 2,
    floor: "۲",
    mortgage: 1000000000,
    rent: 10000000,
  },
  {
    id: 3,
    title: "واحد مسکونی نورگیر",
    location: "تهران، جنت‌آباد",
    image: "/images/Rectangle 6609.png",
    area: 85,
    rooms: 2,
    floor: "۴",
    mortgage: 800000000,
    rent: 8000000,
  },
  {
    id: 4,
    title: "آپارتمان بزرگ و دلباز",
    location: "تهران، شهرک غرب",
    image: "/images/Rectangle 6609.png",
    area: 145,
    rooms: 3,
    floor: "۵",
    mortgage: 2000000000,
    rent: 20000000,
  },
  {
    id: 5,
    title: "واحد مسکونی مناسب خانواده",
    location: "تهران، تهرانپارس",
    image: "/images/Rectangle 6609.png",
    area: 100,
    rooms: 2,
    floor: "۱",
    mortgage: 900000000,
    rent: 9000000,
  },
  {
    id: 6,
    title: "آپارتمان مدرن و شیک",
    location: "تهران، مرزداران",
    image: "/images/Rectangle 6609.png",
    area: 110,
    rooms: 2,
    floor: "۶",
    mortgage: 1200000000,
    rent: 12000000,
  },
];

const ITEMS_PER_PAGE = 10;

const initialFilters: MortgageFilterValues = {
  location: "",
  propertyType: "",
  minMortgage: "",
  maxMortgage: "",
  minRent: "",
  maxRent: "",
};

export default function MortgageContent() {
  const [filters, setFilters] =
    useState<MortgageFilterValues>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesLocation =
        !filters.location.trim() ||
        property.location
          .toLowerCase()
          .includes(filters.location.trim().toLowerCase());

      const matchesMortgage =
        (!filters.minMortgage ||
          property.mortgage >= Number(filters.minMortgage)) &&
        (!filters.maxMortgage ||
          property.mortgage <= Number(filters.maxMortgage));

      const matchesRent =
        (!filters.minRent || property.rent >= Number(filters.minRent)) &&
        (!filters.maxRent || property.rent <= Number(filters.maxRent));

      return matchesLocation && matchesMortgage && matchesRent;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  const safeCurrentPage = Math.min(
    currentPage,
    Math.max(totalPages, 1),
  );

  const visibleProperties = filteredProperties.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );

  const handleFilterChange = (newFilters: MortgageFilterValues) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div dir="rtl" className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">

    <header className="mb-8 text-right">
      <nav
        aria-label="مسیر صفحه"
        className="flex flex-wrap items-center gap-2 text-sm text-white/60"
      >
        <Link href="/" className="transition hover:text-[#91FF45]">
          خانه
        </Link>
        <span>‹</span>
        <Link href="/Mortgage" className="transition hover:text-[#91FF45]">
          رهن و اجاره
        </Link>
        <span>‹</span>
        <span>رهن و اجاره آپارتمان</span>
        <span>‹</span>
        <span className="text-[#91FF45]">رهن و اجاره آپارتمان رشت</span>
      </nav>
    </header>
    
      <MortgageFilters onFilterChange={handleFilterChange} />

      <div className="mt-10">
        {visibleProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {visibleProperties.map((property) => (
              <MortgageCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#303030] px-4 py-12 text-center text-white/70">
            ملکی با این مشخصات پیدا نشد.
          </div>
        )}

        <div className="mt-8">
          <MortgagePagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
