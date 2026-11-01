import type { Metadata } from "next";
import MortgageContent from "@/src/components/organisms/mortgage/MortgageContent";
import type { IHouseFilters } from "@/src/types/HousereservesType/HouseFilterType";
import { getLocations } from "@/src/services/locationService";
import { getCategories } from "@/src/services/getCategoryService";

export const metadata: Metadata = {
  title: "رهن و اجاره | دلتا",
  description: "مشاهده و جست‌وجوی آگهی‌های رهن و اجاره ملک",
};

type SearchParamValue = string | string[] | undefined;

interface IPageProps {
  searchParams: Promise<Record<string, SearchParamValue>>;
}

const ALLOWED_SORTS: readonly string[] = ["last_updated", "price"];
const DEFAULT_SORT = "last_updated";
const DEFAULT_LIMIT = 2;
const MAX_LIMIT = 50;

const getString = (value: SearchParamValue): string =>
  (Array.isArray(value) ? value[0] : value) ?? "";

const getPositiveInt = (
  value: SearchParamValue,
  fallback: number,
  max = Number.MAX_SAFE_INTEGER,
): number => {
  const number = Number(getString(value));
  return Number.isInteger(number) && number >= 1
    ? Math.min(number, max)
    : fallback;
};

const getNumber = (value: SearchParamValue): number | undefined => {
  const str = getString(value).trim();
  if (!str) return undefined;
  const number = Number(str);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
};

export default async function MortgagePage({ searchParams }: IPageProps) {
  const [params, locationsResponse, categoriesResponse] = await Promise.all([
    searchParams,
    getLocations(),
    getCategories(),
  ]);

  const sort = getString(params.sort);

  const filters: IHouseFilters = {
    page: getPositiveInt(params.page, 1),
    limit: getPositiveInt(params.limit, DEFAULT_LIMIT, MAX_LIMIT),
    transactionType:["rental","mortgage"],
    search: getString(params.search).trim(),
    order: params.order === "ASC" ? "ASC" : "DESC",
    sort: ALLOWED_SORTS.includes(sort) ? sort : DEFAULT_SORT,
    propertyType: getString(params.propertyType),
    location: getString(params.location),
    minPrice: getNumber(params.minPrice),
    maxPrice: getNumber(params.maxPrice),
    minRent: getNumber(params.minRent),
    maxRent: getNumber(params.maxRent),
    minMortgage: getNumber(params.minMortgage),
    maxMortgage: getNumber(params.maxMortgage),
    minArea: getNumber(params.minArea),
    maxArea: getNumber(params.maxArea),
  };

  return (
    <main className="mt-10 min-h-screen">
      <MortgageContent
        filters={filters}
        locations={locationsResponse.data}
        categories={categoriesResponse.data}
      />
    </main>
  );
}