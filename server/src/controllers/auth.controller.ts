import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { asyncHandler } from "../utils/async-handler";
import { AppError } from "../utils/app-error";
import { AuthRequest } from "../middlewares/authentication";

const authService = new AuthService()

export const register = asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.register(req.body)
    res.status(201).json({
        success: true,
        user
    })
}
)

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await authService.login(email, password)

    res.status(201).json({
        success: true,
        data: user
    });
})

export const logout = asyncHandler(async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("Access token missing", 401);
    }

    const accessToken = authHeader.split(" ")[1]!;

    const refreshToken = req.headers["x-refresh-token"] as string;

    if (!refreshToken) {
        throw new AppError("Refresh token missing", 401);
    }

    await authService.logout(accessToken, refreshToken);

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});

export const update = asyncHandler(async (req: AuthRequest, res: Response) => {
    
    const {userId} = req.params as {userId: string}

    const user = await authService.updateUser(userId, req.body)

    res.json({
        success: true,
        data: user
    });
})

export const changePassword = asyncHandler(async (req: AuthRequest, res: Response) => {

  const { newPassword } = req.body;
  const { userId } = req.params as {userId: string};

  const result = await authService.changePassword(
    userId,
    newPassword
  );

  res.json(result);

});

export const refresh = asyncHandler((async (req, res) => {
    const tokens = await authService.refresh(req.body.refreshToken);

    res.json(tokens);
}))