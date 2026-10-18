import { getHouses, type House } from "@/src/services/houseService";
// import HotelCard from "./HotelCard";
import type { IHouseFilters } from "@/src/types/house";
import { Filterbottom } from "./Filterb";
import { HouseMap, MapMarker } from "./HouseMap";
import HotelCard from "./HotelCard";

interface MainPartProps {
    filters: IHouseFilters;
}

export const MainPart = async ({ filters }: MainPartProps) => {
    const result = await getHouses(filters);

    // تا وقتی شکل جواب API قطعی نشده، هر دو حالت (آرایه یا { data }) رو قبول می‌کنه
    const houses: House[] = Array.isArray(result) ? result : (result.data ?? []);

    const markers: MapMarker[] = houses
        .filter(
            (house) =>
                Number.isFinite(Number(house.lat)) &&
                Number.isFinite(Number(house.lng)),
        )
        .map((house) => ({
            id: house.id,
            lat: Number(house.lat),
            lng: Number(house.lng),
            title: house.title,
        }));

    return (
        <div className="flex h-full min-h-0 flex-row-reverse gap-8 overflow-hidden rounded-3xl bg-[#303030] px-6 py-7">
            <div className="flex min-h-0 w-3/5 flex-col">
                <div className="shrink-0">
                    <Filterbottom filters={filters} />
                </div>
<div className="mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto">
    {houses.map((house) => (
        <HotelCard key={house.id} house={house} />
    ))}
</div>
            </div>

            <div className="w-2/5 overflow-hidden rounded-2xl">
                <HouseMap markers={markers} />
            </div>
        </div>
    );
};