import { config } from "../config/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler";
import { AppError } from "../utils/app-error";
import generateTokens from "../utils/token";
import { User } from "../models/user";
import { redis } from "../config/redis";

export interface AuthRequest extends Request {
    user?: {
        _id: string;
        name: string;
        email: string;
        role: "super_admin" | "admin";
        isActive: boolean;
    };
}

const protect = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    const accessToken =
        authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

    const refreshToken = req.headers["x-refresh-token"] as string | undefined;

    if (!accessToken && !refreshToken) {
        throw new AppError("Unauthorized, no token", 401);
    }

    try {

        const isBlacklisted = await redis.get(`bl:${accessToken}`);
        if (isBlacklisted) {
            throw new AppError("Token is blacklisted", 401);
        }
        //  verify access token
        const decoded = jwt.verify(
            accessToken!,
            config.JWT_ACCESS_TOKEN!
        ) as JwtPayload;

        const user = await User.findById(decoded.id).select(
            "name email role isActive"
        );

        console.log("ACCESS TOKEN USER:", decoded);

        if (!user) throw new AppError("User not found", 404);
        if (!user.isActive) throw new AppError("User is inactive", 403);

        req.user = {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
        };

        return next();
    } catch (err) {

        // no refresh token → reject
        if (!refreshToken) {
            throw new AppError("Session expired", 401);
        }

        try {

            const stored = await redis.get(`rt:${refreshToken}`);
            if (!stored) {
                throw new AppError("Invalid refresh token", 401);
            }
            const decoded = jwt.verify(
                refreshToken,
                config.JWT_REFRESH_TOKEN!
            ) as JwtPayload;

            const user = await User.findById(decoded.id).select(
                "name email role isActive"
            );

            if (!user) throw new AppError("User not found", 404);

            const tokens = generateTokens(user._id.toString(), user.role);

            res.setHeader("x-access-token", tokens.accessToken);
            res.setHeader("x-refresh-token", tokens.refreshToken);

            req.user = {
                _id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
            };

            return next();

        } catch (error) {
            throw new AppError(
                "Refresh token expired, please login again",
                401
            );
        }
    }
}
);

export { protect };