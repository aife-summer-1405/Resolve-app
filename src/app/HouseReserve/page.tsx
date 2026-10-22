import { Suspense } from "react";
import type { IHouseFilters } from "@/src/types/HouseFilterType";
import { FilterTop } from "./FilterTop";
import { MainPart } from "./MainPart";
import Footer from "@/src/components/footer";

type SearchParamValue = string | string[] | undefined;

interface PageProps {
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
    max = Number.MAX_SAFE_INTEGER,
): number => {
    const n = Number(getString(value));
    return Number.isInteger(n) && n >= 1 ? Math.min(n, max) : fallback;
};

const getNumber = (value: SearchParamValue): number | undefined => {
    const str = getString(value).trim();
    if (str === "") return undefined;

    const n = Number(str);
    return Number.isFinite(n) && n >= 0 ? n : undefined;
};

const getList = (value: SearchParamValue): string[] => {
    const items = Array.isArray(value) ? value : value ? [value] : [];

    return items
        .flatMap((item) => item.split(","))
        .map((item) => item.trim())
        .filter(Boolean);
};

async function HouseReserveContent({ searchParams }: PageProps) {
    const params = await searchParams;

    const sort = getString(params.sort);

    const filters: IHouseFilters = {
        page: getPositiveInt(params.page, 1),
        limit: getPositiveInt(params.limit, DEFAULT_LIMIT, MAX_LIMIT),
        transactionType: getList(params.transactionType),
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
        <div className="mt-10 flex h-[calc(100dvh-40px)] flex-col overflow-hidden">
            <div className="flex min-h-0 flex-1 flex-col gap-6">
                <div className="shrink-0">
                    <FilterTop filters={filters} />
                </div>

                <div className="min-h-0 flex-1">
                    <MainPart filters={filters} />
                </div>
            </div>
        </div>
    );
}

export default function HouseReserve({ searchParams }: PageProps) {
    return (
        <>

            <Suspense
                fallback={
                    <div className="mt-10 h-[calc(100dvh-40px)] animate-pulse rounded-3xl bg-[#eb0808]" />
                }
            >
                <HouseReserveContent searchParams={searchParams} />
            </Suspense>
            <Footer />
        </>
    );
}