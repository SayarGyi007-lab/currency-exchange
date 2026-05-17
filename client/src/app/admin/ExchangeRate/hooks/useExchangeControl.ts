import { toast } from "react-toastify";
import { useUpdateExchangeRateMutation } from "../../../../slices/redux-slices/exchange-rate-api";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../slices/store/store";

export const useExchangeRateActions = () => {
    const [update] = useUpdateExchangeRateMutation();

    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    const updateExchangeRate = async (id: string, data: any): Promise<void> => {
        try {
            await update({
                id,
                ...data,
                changedBy: userInfo?.role,
            }).unwrap();

            toast.success("Exchange rate updated");
        } catch {
            toast.error("Failed to update");
        }
    };

    return {
        updateExchangeRate,
    };
};