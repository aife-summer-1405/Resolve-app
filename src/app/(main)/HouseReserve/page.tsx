import { Suspense } from "react";
import type { IHouseFilters } from "@/src/types/HousereservesType/HouseFilterType";
import type { ICategory } from "@/src/types/HousereservesType/CategoriesType";
import { FilterTop } from "./FilterTop";
import MainPart from "./MainPart/MainPart";
import Loading from "@/src/Loading";
import { getLocations } from "@/src/services/locationService";
import { getCategories } from "@/src/services/getCategoryService";

type SearchParamValue = string | string[] | undefined;

interface IPageProps {
    searchParams: Promise<Record<string, SearchParamValue>>;
}

const ALLOWED_SORTS: readonly string[] = ["last_updated", "price"];
const DEFAULT_SORT = "last_updated";
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

const getString = (value: SearchParamValue): string =>
    (Array.isArray(value) ? value[0] : value) ?? "";

const getPositiveInt = (
    value: SearchParamValue,
    fallback: number,
    max = Number.MAX_SAFE_INTEGER
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

    return Number.isFinite(number) && number >= 0
        ? number
        : undefined;
};

async function HouseReserveContent({ searchParams }: IPageProps) {
    const [params, locationsResponse, categoriesResponse] = await Promise.all([
        searchParams,
        getLocations(),
        getCategories(),
    ]);

    const sort = getString(params.sort);

    const filters: IHouseFilters = {
        page: getPositiveInt(params.page, 1),
        limit: getPositiveInt(params.limit, DEFAULT_LIMIT, MAX_LIMIT),
        transactionType: ["reservation"],
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
        <div className="mt-10 flex flex-col lg:h-[calc(100dvh-40px)] lg:overflow-hidden">
            <div className="flex flex-col gap-6 lg:min-h-0 lg:flex-1">
                <div className="shrink-0">
                    <FilterTop
                        filters={filters}
                        locations={locationsResponse.data}
                        categories={categoriesResponse.data}
                    />
                </div>

                <div className="lg:min-h-0 lg:flex-1">
                    <MainPart
                        filters={filters}
                        categories={categoriesResponse.data}
                    />
                </div>
            </div>
        </div>
    );
}

export default function HouseReserve({ searchParams }: IPageProps) {
    return (
        <Suspense fallback={<Loading />}>
            <HouseReserveContent searchParams={searchParams} />
        </Suspense>
    );
}