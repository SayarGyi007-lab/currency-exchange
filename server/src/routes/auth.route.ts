import { validate } from "../middlewares/validation";
import { changePassword, login, logout, refresh, register, update } from "../controllers/auth.controller";
import { Router } from "express";
import { changePasswordSchema, createUserSchema, updateUserSchema } from "../validation/user";
import { protect } from "../middlewares/authentication";
import { both, superAdmin } from "../middlewares/authorization";

const route = Router()

route.post('/register', protect, superAdmin, validate(createUserSchema), register)
route.post('/login', login)
route.post('/logout', protect, logout)
route.put('/:userId', protect, superAdmin, validate(updateUserSchema),update)
route.put('/:userId/change-password',protect, superAdmin, validate(changePasswordSchema),changePassword)
route.post('/refresh',protect,both, refresh)

export default route