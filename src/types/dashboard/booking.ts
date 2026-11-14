export interface IGetBookingsParams {
  page?: number;
  limit?: number;
  created_at?: string;
  sort?: string;
  order?: "ASC" | "DESC";
  house_id?: number;
  status?: string;
}