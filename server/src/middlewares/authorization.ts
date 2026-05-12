import { NextFunction, Response } from "express";
import { AuthRequest } from "./authentication";
import { AppError } from "../utils/app-error";

export const superAdmin = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    if (!req.user || req.user.role !== "super_admin") {
        res.status(403);
        throw new AppError("SuperAdmin access required", 403);
    }

    next();
};


export const admin = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    if (!req.user || req.user.role !== "admin") {
        res.status(403);
        throw new AppError("Admin access required",403);
    }

    next();
};

export const both = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    if (!req.user || req.user.role !== "admin" && req.user.role !== "super_admin") {
        res.status(403);
        throw new AppError("Access required",403);
    }

    next();
};
