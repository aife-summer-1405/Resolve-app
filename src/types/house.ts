export interface IHouseFilters {
    page?: number;
    limit?: number;
    transactionType?: string[];
    search?: string;
    order?: "ASC" | "DESC";
    sort?: string;
    propertyType?: string;
    location?: string;
    minPrice?: number | "";
    maxPrice?: number | "";
    minRent?: number | "";
    maxRent?: number | "";
    minMortgage?: number | "";
    maxMortgage?: number | "";
    minArea?: number | "";
    maxArea?: number | "";
}