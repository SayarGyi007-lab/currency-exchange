import { validate } from "../middlewares/validation";
import { previewConversion } from "../controllers/conversion.controller";
import { Router } from "express";
import { conversionSchema } from "../validation/conversion";

const route = Router()

route.post('/', validate(conversionSchema), previewConversion)

export default route