import type { ILocationsResponse } from "@/src/types/LocationType";

export async function getLocations(): Promise<ILocationsResponse> {
    const response = await fetch(
        `${process.env.API_URL}/api/locations?page=1&limit=1000`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            next: {
                revalidate: 3600,
            },
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch locations: ${response.status}`);
    }

    return response.json();
}