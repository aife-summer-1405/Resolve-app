import ReservationBox from "../../HouseReserveDetails/Reservationbox";
import TabInfoBox from "../../HouseReserveDetails/TabInfoBox";
import AboutHouse from "../../HouseReserveDetails/Tabs/AboutHouse";
import HouseFacilities from "../../HouseReserveDetails/Tabs/HouseFacilities";
import UserReviews from "../../HouseReserveDetails/Tabs/Reviews/UserReviews";
import HotelAdList from "../../HouseReserveDetails/HotelAdvertisers/HotelAdList";
import Header from "../../HouseReserveDetails/Header/Header";
import { getHouseById } from "@/src/services/getHouseById";
import { getHouseComments } from "@/src/services/getHouseComments";
import type { IHouseCommentsResponse } from "@/src/types/HouseCommentsType";

interface IPageProps {
    params: Promise<{ id: string }>;
}

const house = {
    id: 1,
    title: "آپارتمان لوکس غزالیه",
    city: "گیلان",
    area: "رشت",
    bedrooms: 2,
    bathrooms: 1,
    hasParking: true,
    hasFurniture: false,
    price: 50000000,
    image: "/images/hotel.jpg",
    rating: 4.5,
};

const houses = Array.from({ length: 12 }, (_, index) => ({
    ...house,
    id: index + 1,
}));

const HouseReserveDetails = async ({ params }: IPageProps) => {
    const { id } = await params;

    const result = await getHouseById(id);

    let reviews: IHouseCommentsResponse | null = null;
    let commentsError = false;

    try {
        reviews = await getHouseComments(Number(id));
    } catch {
        commentsError = true;
    }

    return (
        <div className="flex flex-col gap-14">
            <div className="w-full">
                <Header result={result} />
            </div>

            <div className="flex flex-col md:flex-row  gap-10">
                <div className="md:w-1/5">
                    <ReservationBox result={result} />
                </div>

                <TabInfoBox
                    about={<AboutHouse result={result} />}
                    facilities={<HouseFacilities result={result} />}
                    reviews={
                        commentsError ? (
                            <div className="rounded-xl bg-card p-6 text-center text-muted">
                                دریافت نظرات با خطا مواجه شد. لطفاً بعداً دوباره تلاش کنید.
                            </div>
                        ) : reviews ? (
                            <UserReviews
                                reviews={reviews}
                                houseId={id}
                            />
                        ) : null
                    }
                />
            </div>

            <HotelAdList houses={houses} />
        </div>
    );
};

export default HouseReserveDetails;