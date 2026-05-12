import { createPaymentMethod, getPaymentByCurrency, getPaymentById, updatePaymentByCurrency } from "../controllers/payment-method.controller";
import { Router } from "express";
import { protect } from "../middlewares/authentication";
import { admin, superAdmin } from "../middlewares/authorization";
import { validate } from "../middlewares/validation";
import { createPaymentMethodSchema, updatePaymentMethodSchema } from "../validation/payment-method";

const route = Router()

route.post('/',protect,superAdmin,validate(createPaymentMethodSchema),createPaymentMethod)
route.get('/:currencyId',getPaymentByCurrency)
route.get('/:paymentId', getPaymentById)
route.put('/:paymentId', protect, superAdmin, validate(updatePaymentMethodSchema), updatePaymentByCurrency)

export default route