"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { IHouseDetails } from "@/src/types/HousereservesType/HouseDetailType";

interface ISliderProps {
    result: IHouseDetails;
}

const DEFAULT_IMAGE = "/images/house-default.jpg";

const HeaderSlider = ({ result }: ISliderProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    const photos = result.photos?.length
        ? result.photos
        : [DEFAULT_IMAGE];

    const handleImageError = (
        event: React.SyntheticEvent<HTMLImageElement>
    ) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = DEFAULT_IMAGE;
    };

    return (
        <div className="flex h-[400px] w-full gap-3">
            <div className="grid w-48 grid-cols-2 gap-2">
                {photos.map((image, index) => (
                    <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => thumbsSwiper?.slideTo(index)}
                        className="overflow-hidden rounded-lg"
                    >
                        <img
                            src={image || DEFAULT_IMAGE}
                            onError={handleImageError}
                            alt={`تصویر کوچک ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}
            </div>

            <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="house-swiper h-full min-w-0 flex-1 overflow-hidden rounded-2xl"
            >
                {photos.map((image, index) => (
                    <SwiperSlide key={`${image}-${index}`}>
                        <img
                            src={image || DEFAULT_IMAGE}
                            onError={handleImageError}
                            alt={`تصویر اقامتگاه ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeaderSlider;