import { toast } from "react-toastify"
import { useChangePasswordMutation, useRegisterMutation, useUpdateUserMutation } from "../../../../slices/redux-slices/auth-api"
import { useArchiveUserMutation, useDeleteUserMutation, useRestoreUserMutation } from "../../../../slices/redux-slices/user-api"
import type { IChangePassword, IUpdateUser, IUserRegister } from "../../../../slices/interfaces/auth"

export const useUserControl = () => {
    const [add] = useRegisterMutation()
    const [update] = useUpdateUserMutation()
    const [change] = useChangePasswordMutation()

    const [archive] = useArchiveUserMutation()
    const [restore] = useRestoreUserMutation()
    const [deleteUser] = useDeleteUserMutation()

    const addUser = async (data: IUserRegister) => {
        try {
            await add(data).unwrap()
            toast.success("Registeration successful");
        } catch (error) {
            toast.error("Failed to register");
        }
    }

    const updateUser = async (id: string, data: IUpdateUser) => {
        try {
            await update({ id, ...data }).unwrap()
            toast.success("Update successful");
        } catch (error) {
            toast.error("Failed to update");
        }
    }

    const changePasswrod = async (id: string, data: IChangePassword) => {
        try {
            await change({ id, data }).unwrap()
            toast.success("Change password successful");
        } catch (error) {
            toast.error("Failed to change password");
        }
    }

    const archiveUser = async (id: string) => {
        try {
            await archive(id).unwrap();
            toast.success("User archived");

        } catch (error) {
            toast.error("Failed to archive user");
        }
    }

    const restoreUser = async (id: string) => {
        try {
            await restore(id).unwrap()
            toast.success('User restore')
        } catch (error) {
            toast.error("Failed to restore user");
        }
    }

    const deleteUserAction = async (id: string) => {
        try {
            await deleteUser(id).unwrap()
            toast.success("Delete user successful");
        } catch (error) {
            toast.error("Failed to delete user");
        }
    }

    return { addUser, updateUser, changePasswrod, archiveUser, restoreUser, deleteUserAction }
}