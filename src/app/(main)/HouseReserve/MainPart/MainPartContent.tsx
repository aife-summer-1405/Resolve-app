  import { getHouses, type House } from "@/src/services/houseService";
  import type { IHouseFilters } from "@/src/types/HousereservesType/HouseFilterType";
  import type { ICategory } from "@/src/types/HousereservesType/CategoriesType";
  import { Filterbottom } from "../Filterb";
  import { HouseMap, type MapMarker } from "../HouseMap";
  import HotelCard from "../HotelCard";

  interface IMainPartContentProps {
    filters: IHouseFilters;
    categories: ICategory[];
  }

  export const MainPartContent = async ({
    filters,
    categories,
  }: IMainPartContentProps) => {
    const result = await getHouses(filters);

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
     <div className="rounded-3xl bg-[#303030] lg:h-[calc(100vh-80px)] lg:min-h-0 lg:overflow-hidden pb-20">
  <div className="mx-auto flex h-full max-w-[1440px] flex-col gap-4 p-3 sm:p-5 lg:min-h-0 lg:flex-row lg:gap-6 lg:p-6 xl:gap-8">

    <div className="flex min-h-0 min-w-0 flex-col lg:w-3/5 lg:flex-none">
      <div className="shrink-0">
        <Filterbottom
          filters={filters}
          categories={categories}
        />
      </div>

      <div className="mt-4 min-h-0 space-y-4 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain">
        {houses.length === 0 ? (
          <div className="flex min-h-[240px] items-center justify-center rounded-2xl bg-[#393939] p-6 text-center text-sm text-white/60">
            خانه‌ای یافت نشد
          </div>
        ) : (
          houses.map((house) => (
            <HotelCard key={house.id} house={house} />
          ))
        )}
      </div>
    </div>

    <div className="order-first h-72 w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:h-80 md:h-96 lg:order-none lg:h-full lg:min-h-0 lg:w-2/5 lg:flex-none">
      <HouseMap markers={markers} />
    </div>

  </div>
</div>
    );
  };