import { Suspense } from "react";
import Link from "next/link";
import MortgageFilters from "./MortgageFilters";
import MortgageCard from "./MortgageCard";
import MortgagePagination from "./MortgagePagination";
import { getHouses } from "@/src/services/houseService";
import type { IHouseFilters } from "@/src/types/HousereservesType/HouseFilterType";
import type { ILocation } from "@/src/types/LocationType";
import type { ICategory } from "@/src/types/HousereservesType/CategoriesType";

interface IMortgageListProps {
  filters: IHouseFilters;
}

interface IMortgageContentProps {
  filters: IHouseFilters;
  locations: ILocation[];
  categories: ICategory[];
}

const MortgageListSkeleton = () => (
  <div
    className="grid grid-cols-1 gap-5 xl:grid-cols-2"
    role="status"
    aria-label="در حال دریافت آگهی‌ها"
  >
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="h-[200px] animate-pulse rounded-2xl bg-[#303030]"
      />
    ))}
  </div>
);

const MortgageList = async ({ filters }: IMortgageListProps) => {
  console.log("filters",filters)

  const result = await getHouses(filters);
  const limit = filters.limit ?? 10;
const totalPages = Math.max(1, Math.ceil((result.totalCount ?? 0) / limit));
  const houses = result.houses ?? [];
  console.log("result.totalCount",result.totalCount)

  if (houses.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#303030] px-4 py-12 text-center text-white/70">
        ملکی با این مشخصات پیدا نشد.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {houses.map((house) => (
          <MortgageCard key={house.id} house={house} />
        ))}
      </div>

      <div className="mt-8">
        <MortgagePagination
          currentPage={filters.page ?? 1}
          totalPages={totalPages ?? 1}
        />
      </div>
    </>
  );
};

export default function MortgageContent({
  filters,
  locations,
  categories,
}: IMortgageContentProps) {
  
  return (
    <div
      dir="rtl"
      className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8"
    >
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
          <span className="text-[#91FF45]">
            {filters.location
              ? `رهن و اجاره آپارتمان ${filters.location}`
              : "همه شهرها"}
          </span>
        </nav>
      </header>

      <MortgageFilters
        filters={filters}
        locations={locations}
        categories={categories}
      />

      <div className="mt-10">
        <Suspense
          key={JSON.stringify(filters)}
          fallback={<MortgageListSkeleton />}
        >
          <MortgageList filters={filters} />
        </Suspense>
      </div>
    </div>
  );
}