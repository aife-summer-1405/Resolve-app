export interface IDiscountCode {
  id: string;
  house_id: string;
  code: string;
  discount_percentage: string;
  valid_until: string;
}

export interface IDiscountCodesResponse {
  data: IDiscountCode[];
  totalCount: number;
}

export interface IGetDiscountCodesParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  code?: string;
  discount_percentage?: string;
}
