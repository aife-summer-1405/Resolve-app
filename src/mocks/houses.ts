import type { House } from "@/src/services/houseService";
import type { IHouseFilters } from "@/src/types/house";

const IMG = ["/images/hotel.jpg"];

export const MOCK_HOUSES: House[] = [
    // تهران
    { id: "t1", title: "هتل آپارتمان ولیعصر", price: 2_380_000, area: 85, images: IMG, lat: 35.7219, lng: 51.4096, address: "تهران، خیابان ولیعصر", location: "tehran", propertyType: "apartment", last_updated: "2026-10-17T10:00:00Z" },
    { id: "t2", title: "ویلای تجریش", price: 6_500_000, area: 320, images: IMG, lat: 35.805, lng: 51.43, address: "تهران، تجریش", location: "tehran", propertyType: "villa", last_updated: "2026-10-15T09:00:00Z" },
    { id: "t3", title: "دفتر تجاری انقلاب", price: 3_900_000, area: 120, images: IMG, lat: 35.701, lng: 51.391, address: "تهران، خیابان انقلاب", location: "tehran", propertyType: "commercial", last_updated: "2026-10-12T14:30:00Z" },
    { id: "t4", title: "آپارتمان شهرک غرب", price: 2_900_000, area: 95, images: IMG, lat: 35.76, lng: 51.365, address: "تهران، شهرک غرب", location: "tehran", propertyType: "apartment", last_updated: "2026-10-09T08:15:00Z" },

    // مشهد
    { id: "m1", title: "هتل آپارتمان حرم", price: 1_900_000, area: 70, images: IMG, lat: 36.2879, lng: 59.6157, address: "مشهد، نزدیک حرم", location: "mashhad", propertyType: "apartment", last_updated: "2026-10-16T11:00:00Z" },
    { id: "m2", title: "ویلای وکیل‌آباد", price: 5_200_000, area: 280, images: IMG, lat: 36.3167, lng: 59.54, address: "مشهد، وکیل‌آباد", location: "mashhad", propertyType: "villa", last_updated: "2026-10-13T16:45:00Z" },
    { id: "m3", title: "مغازه‌ی احمدآباد", price: 4_100_000, area: 60, images: IMG, lat: 36.304, lng: 59.57, address: "مشهد، احمدآباد", location: "mashhad", propertyType: "commercial", last_updated: "2026-10-05T12:00:00Z" },

    // کیش
    { id: "k1", title: "ویلای ساحلی کیش", price: 8_800_000, area: 400, images: IMG, lat: 26.54, lng: 54.03, address: "کیش، ساحل مرجان", location: "kish", propertyType: "villa", last_updated: "2026-10-18T07:00:00Z" },
    { id: "k2", title: "آپارتمان بازار کیش", price: 3_200_000, area: 90, images: IMG, lat: 26.565, lng: 53.97, address: "کیش، بازار", location: "kish", propertyType: "apartment", last_updated: "2026-10-14T13:20:00Z" },
    { id: "k3", title: "زمین تجاری کیش", price: 7_000_000, area: 500, images: IMG, lat: 26.53, lng: 53.95, address: "کیش، بلوار ساحلی", location: "kish", propertyType: "land", last_updated: "2026-10-02T09:40:00Z" },

    // اصفهان
    { id: "i1", title: "هتل آپارتمان نقش جهان", price: 2_600_000, area: 80, images: IMG, lat: 32.6577, lng: 51.6779, address: "اصفهان، میدان نقش جهان", location: "isfahan", propertyType: "apartment", last_updated: "2026-10-11T10:10:00Z" },
    { id: "i2", title: "ویلای زاینده‌رود", price: 5_800_000, area: 300, images: IMG, lat: 32.64, lng: 51.66, address: "اصفهان، کنار زاینده‌رود", location: "isfahan", propertyType: "villa", last_updated: "2026-10-08T15:00:00Z" },
    { id: "i3", title: "دفتر تجاری چهارباغ", price: 3_500_000, area: 110, images: IMG, lat: 32.646, lng: 51.669, address: "اصفهان، خیابان چهارباغ", location: "isfahan", propertyType: "commercial", last_updated: "2026-10-01T08:30:00Z" },
    { id: "i4", title: "زمین جلفا", price: 6_100_000, area: 450, images: IMG, lat: 32.633, lng: 51.656, address: "اصفهان، جلفا", location: "isfahan", propertyType: "land", last_updated: "2026-09-28T11:11:00Z" },
];

export function getMockHouses(filters: IHouseFilters = {}): {
    data: House[];
    total: number;
} {
    const {
        location,
        propertyType,
        search,
        minPrice,
        maxPrice,
        sort = "last_updated",
        order = "DESC",
        page = 1,
        limit = 10,
    } = filters;

    const filtered = MOCK_HOUSES.filter((house) => {
        if (location && house.location !== location) return false;
        if (propertyType && house.propertyType !== propertyType) return false;

        if (search) {
            const text = `${house.title} ${house.address ?? ""}`;
            if (!text.includes(search)) return false;
        }

        const price = house.price ?? 0;
        if (typeof minPrice === "number" && price < minPrice) return false;
        if (typeof maxPrice === "number" && price > maxPrice) return false;

        return true;
    });

    const sorted = [...filtered].sort((a, b) => {
        const diff =
            sort === "price"
                ? (a.price ?? 0) - (b.price ?? 0)
                : new Date(a.last_updated ?? 0).getTime() -
                  new Date(b.last_updated ?? 0).getTime();

        return order === "ASC" ? diff : -diff;
    });

    const start = (page - 1) * limit;

    return {
        data: sorted.slice(start, start + limit),
        total: sorted.length,
    };
}