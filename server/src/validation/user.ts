import * as z from 'zod'

export const createUserSchema = z.object({

    name: z
    .string("Name is required" )
    .min(2, "Name must be at least 2 characters")
    .max(10, "Name must be less than 50 characters"),

    email: z
        .string({message:"Email is required"})
        .email({message: "Invalid email"}),

    password: z    
        .string({message:"Password is required"})
        .min(6,{message: "Passwrod must be at least 6 characters"})
})

export const updateUserSchema = z.object({
  
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(10, "Name must be less than 50 characters")
    .optional(),

    email: z
        .string({message:"Email is required"})
        .email({message: "Invalid email"})
        .optional(),

    role: z.enum(["super_admin","admin"]).optional()
})

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Current password must be at least 6 characters"),

  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters")
});