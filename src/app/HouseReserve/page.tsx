import { IHouseFilters } from "@/src/types/house";
import { FilterTop } from "./FilterTop";
import { MainPart } from "./MainPart";


interface PageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function HouseReserve({ searchParams }: PageProps) {
    const params = await searchParams;

    const getString = (value: string | string[] | undefined) =>
        typeof value === "string" ? value : "";

    const getNumber = (value: string | string[] | undefined) => {
        const parsed = getString(value);
        return parsed !== "" && Number.isFinite(Number(parsed))
            ? Number(parsed)
            : "";
    };

    const transactionType = params.transactionType;
    const transactionTypes = Array.isArray(transactionType)
        ? transactionType.flatMap((value) => value.split(",")).filter(Boolean)
        : transactionType
          ? transactionType.split(",").filter(Boolean)
          : [];

    const filters: IHouseFilters = {
        page: Number(params.page ?? 1),
        limit: Number(params.limit ?? 10),
        transactionType: transactionTypes,
        search: getString(params.search),
        order: params.order === "ASC" ? "ASC" : "DESC",
        sort: getString(params.sort) || "last_updated",
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