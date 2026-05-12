import dotenv from 'dotenv'

dotenv.config({})

class Config{
    public MONGODB_URI: string;
    // public REDIS_URI: string;

    public JWT_ACCESS_TOKEN: string;
    public JWT_REFRESH_TOKEN: string;

    public PORT: number;
    public CLIENT_URL: string;
    public NODE_ENV: string;

    public REDIS_USERNAME: string;
    public REDIS_PASSWORD: string;
    public REDIS_HOST: string;
    public REDIS_PORT: number

    public SUPER_ADMIN_EMAIL: string;
    public SUPER_ADMIN_PASSWORD: string;

    public CLOUDINARY_NAME: string;
    public CLOUDINARY_KEY: string;
    public CLOUDINARY_SECRET: string;

    public RESEND_KEY: string;

    constructor(){

        this.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || ""
        this.CLOUDINARY_KEY = process.env.CLOUDINARY_KEY || ""
        this.CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET || ""

        this.SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || ""
        this.SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD || ""

        this.REDIS_USERNAME = process.env.REDIS_USERNAME || ""
        this.REDIS_PASSWORD = process.env.REDIS_PASSWORD || ""
        this.REDIS_HOST = process.env.REDIS_HOST || ""
        this.REDIS_PORT = Number(process.env.REDIS_PORT) || 6379

        this.MONGODB_URI = process.env.MONGODB_URI  || '',
        // this.REDIS_URI = process.env.REDIS_URI || ""

        this.JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN || '',
        this.JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN || ''

        this.PORT = Number(process.env.PORT) || 4000,
        this.CLIENT_URL =  process.env.CLIENT_URL || '',
        this.NODE_ENV = process.env.NODE_ENV || 'production'

        this.RESEND_KEY = process.env.RESEND_KEY || ''

    }
}

export const config = new Config()