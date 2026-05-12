export interface QueryParams {
    page: number;
    limit: number;
    skip: number;
    search?: string;
    sortBy: string;
    order: "asc" | "desc";
    status?: string;
    paymentMethod?: string;
    fromCurrency?: string;
    toCurrency?: string
}

export interface Pagination {
    page: number
    limit: number
    total: number
    totalPages: number
}