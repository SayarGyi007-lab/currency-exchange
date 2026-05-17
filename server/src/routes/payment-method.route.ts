import { createPaymentMethod, getPaymentByCurrency, getPaymentById, updatePaymentById, getAllPaymentMethods } from "../controllers/payment-method.controller";
import { Router } from "express";
import { protect } from "../middlewares/authentication";
import { superAdmin } from "../middlewares/authorization";
import { validate } from "../middlewares/validation";
import { createPaymentMethodSchema, updatePaymentMethodSchema } from "../validation/payment-method";

const route = Router();

route.post("/", protect, superAdmin, validate(createPaymentMethodSchema), createPaymentMethod);
route.get("/", getAllPaymentMethods);
route.get("/id/:paymentId", getPaymentById);
route.get("/currency/:currencyId", getPaymentByCurrency);
route.put("/:paymentId", protect, superAdmin, validate(updatePaymentMethodSchema), updatePaymentById);

export default route;