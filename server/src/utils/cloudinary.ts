import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config/config';
import fs from 'fs'

cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_KEY,
    api_secret: config.CLOUDINARY_SECRET,
});

export const upload = async(filePath: string) =>{
    try {
         const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
            folder: 'upload'
        });
        console.log('Uploaded successfully to cloudinary', uploadResult.url);
        fs.unlinkSync(filePath);
        console.log(filePath);
        return uploadResult.url;
    } catch (error) {
        console.log('Error at uploading to cloudinary', error);
        fs.unlinkSync(filePath);
        return null;
    }
}