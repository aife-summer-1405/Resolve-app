import HotelCardSkeleton from "@/src/components/Skeletons/HotelCardSkeleton";

const HouseListLoading = () => {
    return (
        <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
                <HotelCardSkeleton key={index} />
            ))}
        </div>
    );
};

export default HouseListLoading;