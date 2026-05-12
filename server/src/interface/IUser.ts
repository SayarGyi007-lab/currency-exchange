import { Document, Types } from "mongoose";

// Interface for User document
export interface IUser{
  _id: Types.ObjectId;

  name: string;
  email: string;
  password: string;

  role: "super_admin" | "admin";

  isActive?: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateUser{
    name: string;
    email: string;
    password: string;
}

