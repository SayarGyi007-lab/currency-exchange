import { Request } from "express";

export interface QueryOptions {
    page: number;
    limit: number;
    skip: number;
    search?: string;
    sortBy: string;
    order: "asc" | "desc";
    status?: string;
    paymentMethod?: string;
    fromCurrency?: string;
    toCurrency?: string;
    currency?: string
    isActive?: boolean
    // cursor?: string
}

export const buildQuery = (req: Request): QueryOptions => {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1)

    const rawLimit = parseInt(req.query.limit as string)

    let limit;
    if (rawLimit === 0) {
        limit = 0
    } else {
        limit = Math.min(Math.max(rawLimit || 10, 1), 20)
    }

    const skip = limit === 0 ? 0 : (page - 1) * limit

    const sortBy = (req.query.sortBy as string) || 'createdAt'

    const order = (req.query.order as "asc" | "desc") || 'asc'

    const query: QueryOptions = {
        page,
        limit,
        skip,
        sortBy,
        order
    }

    if (req.query.search) {
        query.search = req.query.search as string
    }

    if (req.query.status) {
        query.status = req.query.status as string
    }

    if (req.query.paymentMethod) {
        query.paymentMethod = req.query.paymentMethod as string
    }

    if (req.query.fromCurrency) {
        query.fromCurrency = req.query.fromCurrency as string;
    }

    if (req.query.toCurrency) {
        query.toCurrency = req.query.toCurrency as string;
    }

    if(req.query.currency){
        query.currency = req.query.currency as string
    }

    if (req.query.isActive !== undefined) {
        query.isActive = req.query.isActive === "true"
    }

    return query
}