import { upload } from "../utils/cloudinary";
import { AppError } from "../utils/app-error";

class UploadService{
    async uploadPhoto(filePath:string){
        if(!filePath){
            throw new AppError('No files uploaded',400)
        }

        const url = await upload(filePath)

        if(!url){
            throw new AppError("Image upload failed", 500);
        }

        return url
    }
}

export default UploadService