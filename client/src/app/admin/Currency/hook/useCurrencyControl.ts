import { toast } from "react-toastify";
import {
  useArchiveCurrencyMutation,
  useDeleteCurrencyMutation,
  useRestoreCurrencyMutation,
  useUpdateCurrencyMutation,
} from "../../../../slices/redux-slices/currency-api";
import type { ICreateAndUpdateCurrency } from "../../../../slices/interfaces/currency";

export const useCurrencyActions = () => {
  const [archive] = useArchiveCurrencyMutation();
  const [restore] = useRestoreCurrencyMutation();
  const [remove] = useDeleteCurrencyMutation();
  const [update] = useUpdateCurrencyMutation();

  const archiveCurrency = async (id: string) => {
    try {
      await archive(id).unwrap();
      toast.success("Currency archived");
    } catch {
      toast.error("Failed to archive");
    }
  };

  const restoreCurrency = async (id: string) => {
    try {
      await restore(id).unwrap();
      toast.success("Currency restored");
    } catch {
      toast.error("Failed to restore");
    }
  };

  const deleteCurrency = async (id: string) => {
    try {
      await remove(id).unwrap();
      toast.success("Currency deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const updateCurrency = async (id: string, data: ICreateAndUpdateCurrency) => {
    try {
      await update({ id, ...data }).unwrap();
      toast.success("Currency updated");
    } catch {
      toast.error("Failed to update");
    }
  };

  return {
    archiveCurrency,
    restoreCurrency,
    deleteCurrency,
    updateCurrency,
  };
};