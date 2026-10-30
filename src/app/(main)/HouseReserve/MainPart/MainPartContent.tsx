import { getHouses, type House } from "@/src/services/houseService";
import type { IHouseFilters } from "@/src/types/HousereservesType/HouseFilterType";
import { Filterbottom } from "../Filterb";
import { HouseMap, type MapMarker } from "../HouseMap";
import HotelCard from "../HotelCard";

interface MainPartProps {
  filters: IHouseFilters;
}

export const MainPartContent = async ({ filters }: MainPartProps) => {
  console.log("filters", filters);
  const result = await getHouses(filters);

  console.log("result", result);
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
    <div className="flex flex-col gap-4 rounded-3xl bg-[#303030] p-3 sm:p-5 lg:h-full lg:min-h-0 lg:flex-row-reverse lg:gap-6 lg:overflow-hidden lg:p-6 xl:gap-8">
      <div className="flex min-w-0 flex-col lg:min-h-0 lg:w-3/5 lg:flex-none">
        <div className="shrink-0">
          <Filterbottom filters={filters} />
        </div>

        <div className="mt-4 space-y-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain">
          {houses.map((house) => (
            <HotelCard key={house.id} house={house} />
          ))}
        </div>
      </div>

      <div className="order-first h-72 w-full shrink-0 overflow-hidden rounded-2xl sm:h-80 md:h-96 lg:order-none lg:h-auto lg:min-h-0 lg:w-2/5 lg:flex-none">
        <HouseMap markers={markers} />
      </div>
    </div>
  );
};
