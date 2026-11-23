export interface ILocation {
  id: string;
  areaName: string | null;
  lat: string;
  lng: string;
}

export interface ILocationsResponse {
  data: ILocation[];
  totalCount: number;
}
