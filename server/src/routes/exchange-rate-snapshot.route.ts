import { getExchangeRateSnapshotHistory } from "../controllers/exchange-rate-snapshot.controller";
import { Router } from "express";

const route = Router()

route.get('/',getExchangeRateSnapshotHistory)

export default route