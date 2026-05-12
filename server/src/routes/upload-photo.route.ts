import { Router } from "express";
import { protect } from "../middlewares/authentication";
import { uploadPhoto } from "../controllers/upload.controller";
import { upload } from "../middlewares/multer";
import { superAdmin } from "../middlewares/authorization";

const route = Router()

route.post('/',upload.single('file'),uploadPhoto)

route.post('/admin', protect, superAdmin, upload.single('file'),uploadPhoto)

export default route