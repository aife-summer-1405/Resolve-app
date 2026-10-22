
import { getHouses, type House } from "@/src/services/houseService";
import type { IHouseFilters } from "@/src/types/house";
import { Filterbottom } from "./Filterb";
import { HouseMap, type MapMarker } from "./HouseMap";
import HotelCard from "./HotelCard";

interface MainPartProps {
    filters: IHouseFilters;
}

export const MainPart = async ({ filters }: MainPartProps) => {


    console.log("filters", filters)
    const result = await getHouses(filters);

    console.log("result", result)
    const houses: House[] = result.houses;
    const markers: MapMarker[] = houses
        .filter(
            (house) =>
                Number.isFinite(house.location.lat) &&
                Number.isFinite(house.location.lng),
        )
        .map((house) => ({
            id: house.id,
            lat: house.location.lat,
            lng: house.location.lng,
            title: house.title,
        }));

    return (
        <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden rounded-3xl bg-[#303030] p-3 sm:p-5 lg:flex-row-reverse lg:gap-6 lg:p-6 xl:gap-8">
            <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:w-3/5 lg:flex-none">
                <div className="shrink-0">
                    <Filterbottom filters={filters} />
                </div>

                <div className="mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain">
                    {houses.map((house) => (
                        <HotelCard key={house.id} house={house} />
                    ))}
                </div>
            </div>

            <div className="h-200 w-full shrink-0 overflow-hidden rounded-2xl sm:h-64 lg:h-auto lg:min-h-0 lg:w-2/5 lg:flex-none">
                <HouseMap markers={markers} />
            </div>
        </div>
    );
};
