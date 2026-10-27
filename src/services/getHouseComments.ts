import { IHouseCommentsResponse } from "../types/HouseCommentsType";

export async function getHouseComments(
    id: number,
): Promise<IHouseCommentsResponse> {
    const response = await fetch(
        `${process.env.API_URL}/api/comments?house_id=${id}`,
    );

    if (!response.ok) {
        throw new Error("دریافت کامنت‌ها ناموفق بود");
    }

    return response.json();
}
