import { getAllRateHistory, getRateHistoryByExchange } from "../controllers/rate-history.controller";
import { Router } from "express";
import { protect } from "../middlewares/authentication";
import { superAdmin } from "../middlewares/authorization";

const route = Router()

route.get( "/", getAllRateHistory );

route.get( "/exchange/:exchangeRateId", getRateHistoryByExchange );


export default route