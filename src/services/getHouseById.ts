import type { IHouseDetails } from "../types/HouseDetailType";

export const getHouseById = async (
    id: string,
): Promise<IHouseDetails> => {
    const response = await fetch(
        `${process.env.API_URL}/houses/${id}`,
    );

    if (!response.ok) {
        throw new Error("دریافت جزئیات خانه ناموفق بود");
    }

    return response.json();
};