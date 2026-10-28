import { Suspense } from "react";
import { MainPartContent } from "./MainPartContent";
import { IHouseFilters } from "@/src/types/HouseFilterType";
import { MainPartLoading } from "./MainPartLoading";

interface MainPartProps {
  filters: IHouseFilters;
}

const MainPart = ({ filters }: MainPartProps) => {
  return (
    <Suspense fallback={<MainPartLoading />}>
      <MainPartContent filters={filters} />
    </Suspense>
  );
};

export default MainPart;
