export interface ILocation {
    id: string;
    areaName: string;
    lat: string;
    lng: string;
}

export interface ILocationsResponse {
    data: ILocation[];
    totalCount: number;
}