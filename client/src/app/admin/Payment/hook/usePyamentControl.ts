import { toast } from "react-toastify"
import { useCreatePaymentMethodMutation, useUpdatePaymentMethodMutation } from "../../../../slices/redux-slices/payment-method-api"
import type { ICreatePaymentMethod, IUpdatePaymentMethod } from "../../../../slices/interfaces/payment-method"

export const usePaymentControl = () => {
    const [add, {isLoading:adding}] = useCreatePaymentMethodMutation()
    const [update, {isLoading: updating}] = useUpdatePaymentMethodMutation()

    const createPayment = async(data: ICreatePaymentMethod) =>{
        try {
            await add(data).unwrap()
            toast.success("Payment create successful");
        } catch (error) {
            toast.error("Failed to create");
        }
    }

    const updatePayment = async(id: string, data: IUpdatePaymentMethod) =>{
        try {
            await update({id, ...data}).unwrap()
            toast.success("Payment update successful");
        } catch (error) {
            toast.error("Failed to update");
        }
    }

    return {
        createPayment,
        updatePayment,
        updating,
        adding
    }

}