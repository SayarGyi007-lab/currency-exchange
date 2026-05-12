import { createExchangeRate, getAllExchangeRate, getExchangeRateById, restoreExchangeRate, softDeleteExchangeRate, updateExchangeRate } from "../controllers/exchange-rate.controller";
import { Router } from "express";
import { protect } from "../middlewares/authentication";
import { superAdmin } from "../middlewares/authorization";
import { validate } from "../middlewares/validation";
import { createExchangeRateSchema, updateExchangeRateSchema } from "../validation/exchange-rate";

const router = Router();

router.post("/", protect, superAdmin, validate(createExchangeRateSchema), createExchangeRate);
router.put("/:exchangeRateId", protect, superAdmin, validate(updateExchangeRateSchema), updateExchangeRate);
router.get("/:exchangeRateId", getExchangeRateById);
router.get("/", getAllExchangeRate);
router.patch("/:exchangeRateId/archive", protect, superAdmin, softDeleteExchangeRate);
router.patch("/:exchangeRateId/restore", protect, superAdmin, restoreExchangeRate);

export default router;