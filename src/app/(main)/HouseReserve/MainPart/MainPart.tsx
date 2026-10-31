import { Suspense } from "react";
import { MainPartContent } from "./MainPartContent";
import type { IHouseFilters } from "@/src/types/HousereservesType/HouseFilterType";
import type { ICategory } from "@/src/types/HousereservesType/CategoriesType";
import { MainPartLoading } from "./MainPartLoading";

interface IMainPartProps {
  filters: IHouseFilters;
  categories: ICategory[];
}

const MainPart = ({ filters, categories }: IMainPartProps) => {
  return (
    <Suspense fallback={<MainPartLoading />}>
      <MainPartContent filters={filters} categories={categories} />
    </Suspense>
  );
};

export default MainPart;