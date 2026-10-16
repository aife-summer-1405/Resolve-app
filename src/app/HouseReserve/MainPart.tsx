import { getHouses } from "@/src/services/houseService";
import { Filterbottom } from "./Filterb";
import HotelCard from "./HotelCard";
import type { IHouseFilters } from "@/src/types/house";

interface MainPartProps {
    filters: IHouseFilters;
}

export const MainPart = async ({ filters }: MainPartProps) => {
    const houses = await getHouses(filters);
console.log(444,houses)
    return (
        <div className="flex h-full min-h-0 flex-row-reverse gap-8 overflow-hidden rounded-3xl bg-[#303030] px-6 py-7">
            <div className="flex min-h-0 w-3/5 flex-col">
                <div className="shrink-0">
                    <Filterbottom filters={filters} />
                </div>
{/* 
                <div className="mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto">
                    {houses.map((house) => (
                        <HotelCard key={house.id} house={house} />
                    ))}
                </div> */}
            </div>

            <div className="w-2/5 rounded-2xl bg-amber-800" />
        </div>
    );
};