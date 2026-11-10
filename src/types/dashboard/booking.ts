export interface IGetBookingsParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  house_id?: number;
  status?: string;
}