
import { FilterTop } from "./FilterTop";
import { MainPart } from "./MainPart";

const HouseReserve = () => {
    return (
        <div className="mt-10 flex h-[calc(100dvh-40px)] flex-col overflow-hidden">
            <div className="flex min-h-0 flex-1 flex-col gap-6">
                <div className="shrink-0">
                    <FilterTop />
                </div>

                <div className="min-h-0 flex-1">
                    <MainPart />
                </div>
            </div>
        </div>
    );
};

export default HouseReserve;
