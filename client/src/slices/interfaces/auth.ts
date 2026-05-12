export interface IUserLogin{
    email: string
    password: string
}

export interface IUserRegister extends IUserLogin{
    name: string
}

export interface IUpdateUser{
    name: string;
    email: string;
    role: "super_admin" | "admin"
}

export interface IChangePassword{
    // currentPassword: string;
    newPassword: string;
}