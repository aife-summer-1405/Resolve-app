import ReservationBox from "../Reservationbox";
import TabInfoBox from "../TabInfoBox";
import AboutHouse from "../Tabs/AboutHouse";
import HouseFacilities from "../Tabs/HouseFacilities";
import UserReviews from "../Tabs/Reviews/UserReviews";
import HotelAdList from "../HotelAdvertisers/HotelAdList";
import Header from "../Header/Header";
interface IpageProps {
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

const HouseReserveDetails = async ({ params }: IpageProps) => {

      const { id } = await params;
    return (
        <div className="flex flex-col gap-14">
            <div className="w-full"> <Header /></div>

            <div className="flex gap-10">
                <div className="w-1/5">
                    <ReservationBox />
                </div>

                <TabInfoBox
                    about={<AboutHouse />}
                    facilities={<HouseFacilities />}
                    reviews={<UserReviews />}
                />
            </div>

            <HotelAdList houses={houses} />
        </div>
    );
}
export default HouseReserveDetails;