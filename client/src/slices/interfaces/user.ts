import type { Pagination } from "./pagination"

export interface User {
  id: string
  name: string
  email: string
  isActive: boolean;
  role: "super_admin" | "admin"
  createdAt: string
  updatedAt: string
}


export interface UsersResponse {
  success: boolean
  data: User[]
  pagination: Pagination
}