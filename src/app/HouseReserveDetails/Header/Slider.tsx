"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


interface HotelAdSliderProps {
    images: string[];
}

const HeaderSlider = ({ images }: HotelAdSliderProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <div className="flex h-[400px] w-full gap-3">
            <div className="grid grid-cols-2 w-48  gap-2">
                {images.map((image, index) => (
                    <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => thumbsSwiper?.slideTo(index)}
                        className="overflow-hidden rounded-lg "
                    >
                        <img
                            src={image}
                            alt={`تصویر کوچک ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}
            </div>

<Swiper
    onSwiper={setThumbsSwiper}
    modules={[Thumbs, Pagination]}
    pagination={{ clickable: true }}
    className="house-swiper h-full min-w-0 flex-1 overflow-hidden rounded-2xl"
>
    {images.map((image, index) => (
        <SwiperSlide key={`${image}-${index}`}>
            <img
                src={image}
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