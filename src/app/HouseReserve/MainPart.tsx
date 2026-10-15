
import { Filterbottom } from "./Filterb";
import HotelCard from "./HotelCard";

export const MainPart = () => {
    return (
        <div className="flex h-full min-h-0 flex-row-reverse gap-8 overflow-hidden rounded-3xl bg-[#303030] px-6 py-7">
            <div className="flex w-3/5 min-h-0 flex-col">
                <div className="shrink-0">
                    <Filterbottom />
                </div>

                <div className="mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto">
                    {Array.from({ length: 13 }).map((_, index) => (
                        <HotelCard key={index} />
                    ))}
                </div>
            </div>

            <div className="w-2/5 rounded-2xl bg-amber-800" />
        </div>
    );
};
