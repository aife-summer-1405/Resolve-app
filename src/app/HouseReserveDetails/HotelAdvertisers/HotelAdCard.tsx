import Image from "next/image";
import {
    ArrowLeft,
    Star,
    MapPin,
    BedDouble,
    Bath,
    CarFront,
    Sofa,
} from "lucide-react";

export interface HouseCardProps {
    id: number | string;
    title: string;
    city: string;
    area: string;
    bedrooms: number;
    bathrooms: number;
    hasParking: boolean;
    hasFurniture: boolean;
    price: number;
    image?: string;
    rating?: number;
}

const HotelAdCard = ({
    title,
    city,
    area,
    bedrooms,
    bathrooms,
    hasParking,
    hasFurniture,
    price,
    image = "/images/hotel.jpg",
    rating = 4.5,
}: HouseCardProps) => {
    return (
        <article
            dir="rtl"
            className="w-full overflow-hidden rounded-2xl  text-white"
        >
            <div className="relative p-2">
                <div className="absolute right-5 top-3 z-10 flex h-7 items-center gap-1 rounded-lg bg-white px-2 text-xs font-bold text-card">
                    <Star size={13} fill="currentColor" />
                    <span>{rating.toLocaleString("fa-IR")}</span>
                </div>

                <button
                    type="button"
                    aria-label="مشاهده جزئیات ملک"
                    className="absolute left-2 top-0 z-10 flex h-6 w-8 items-center justify-center rounded-full bg-card text-white"
                >
                    <ArrowLeft size={17} />
                </button>

                <div
                    dir="ltr"
                    className="relative flex h-40 scale-x-[-1] items-center justify-center overflow-hidden rounded-xl bg-[#454545] pt-5"
                >
                    <div className="absolute -right-2 top-0 z-10 h-5 w-4/5 bg-background [clip-path:polygon(0_0,100%_0,100%_100%,12%_100%)]" />

                    <div className="relative h-3/5 w-4/5 overflow-hidden rounded-lg bg-red-400 scale-x-[-1] ">
                        <Image
                            src={image}
                            alt="تصویر اقامتگاه"
                            fill
                            sizes="(max-width: 640px) 100vw, 384px"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-3 px-3 pb-3 pt-1">
                <h3 className="text-sm font-semibold">{title}</h3>

                <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin size={13} />
                    <span>{city}، {area}</span>
                </div>

                <div className="flex items-center justify-between gap-2 text-[11px] text-gray-300">
                    <div className="flex items-center gap-1">
                        <BedDouble size={13} />
                        <span>{bedrooms.toLocaleString("fa-IR")} خواب</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Bath size={13} />
                        <span>{bathrooms.toLocaleString("fa-IR")} حمام</span>
                    </div>

                    {hasParking && (
                        <div className="flex items-center gap-1">
                            <CarFront size={13} />
                            <span>پارکینگ</span>
                        </div>
                    )}

                    {hasFurniture && (
                        <div className="flex items-center gap-1">
                            <Sofa size={13} />
                            <span>مبله</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#454545] px-3 py-2 text-xs">
                    <span className="text-gray-300">قیمت خرید:</span>
                    <span className="font-semibold">
                        {price.toLocaleString("fa-IR")} تومان
                    </span>
                </div>
            </div>
        </article>
    );
};

export default HotelAdCard;