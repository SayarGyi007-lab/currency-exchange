import * as z from "zod";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCurrencySchema } from "../validation/currency";
import { useCreateCurrencyMutation } from "../../../../slices/redux-slices/currency-api";
import { toast } from "react-toastify";

type FormInputs = z.infer<typeof createCurrencySchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  isSuperAdmin: boolean;
}

const AddCurrency = ({ open, onClose, isSuperAdmin }: Props) => {
  const [createCurrency, { isLoading }] = useCreateCurrencyMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(createCurrencySchema),
  });

  if (!open || !isSuperAdmin) return null;

  const onSubmit = async (data: FormInputs) => {
    try {
      console.log(data);
      await createCurrency(data).unwrap();
      reset();
      onClose();
  
      toast.success("Currency created");
    } catch (err:any) {
      console.log(err);
      toast.error( err?.data?.message || "Failed to create currency" );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-[#38476d]/30 p-8">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--surface-container)]"
        >
          <MdClose className="text-xl text-white" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white">Add Currency</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Create a new currency for exchange system.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <input
              {...register("code")}
              placeholder="Currency Code (eg. USD)"
              className="w-full rounded-2xl bg-[var(--surface-container)] border border-[#38476d]/20 px-4 py-3 text-white outline-none"
            />
            <p className="text-red-400 text-xs mt-1">{errors.code?.message}</p>
          </div>

          <div>
            <input
              {...register("name")}
              placeholder="Currency Name (eg. US Dollar)"
              className="w-full rounded-2xl bg-[var(--surface-container)] border border-[#38476d]/20 px-4 py-3 text-white outline-none"
            />
            <p className="text-red-400 text-xs mt-1">{errors.name?.message}</p>
          </div>

          <div>
            <input
              {...register("symbol")}
              placeholder="Symbol (eg. $)"
              className="w-full rounded-2xl bg-[var(--surface-container)] border border-[#38476d]/20 px-4 py-3 text-white outline-none"
            />
            <p className="text-red-400 text-xs mt-1">{errors.symbol?.message}</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl border border-[#38476d] text-[var(--text-secondary)]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-2xl kinetic-gradient text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating..." : "Add Currency"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCurrency;