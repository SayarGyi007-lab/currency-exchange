import type { Pagination } from "./pagination";

export interface ICreateAndUpdateCurrency{
    code: string; 
    name: string; 
    symbol: string;
}

export interface Currency{
    id: string; 
    code: string; 
    name: string; 
    symbol: string;
    createdAt: Date;    
    updatedAt: Date;  
    isActive: boolean
}

export interface CurrencyResponse{
    success: boolean,
    data: Currency[],
    pagination: Pagination
}