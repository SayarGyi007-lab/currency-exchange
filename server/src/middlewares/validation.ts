import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const validate = (schema: ZodType<any>) =>
    (req: Request, res: Response, next: NextFunction) =>{
        const result = schema.safeParse(req.body)

        if(!result.success){
            res.status(400).json({errors: result.error.flatten().fieldErrors})
            return
        }

        req.body = result.data
        next()        
    }