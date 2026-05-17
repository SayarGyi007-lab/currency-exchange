import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import WarningText from "../../../../constant/ui/WarningText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateExchangeRateSchema } from "../validation/ExchangeRate";


interface Props {
    open: boolean;
    exchangeRate: any;
    loading?: boolean;
    onClose: () => void;
    onEdit?: (
        id: string,
        data: any
    ) => Promise<void>;
}

type FormInputs = z.infer<typeof updateExchangeRateSchema>;

const UpdateExchangeRate = ({
    open,
    exchangeRate,
    loading = false,
    onClose,
    onEdit,
}: Props) => {

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [pendingData, setPendingData] = useState<FormInputs | null>(null);

    const { register, handleSubmit, formState: { errors, isDirty, isSubmitting }, reset } = useForm<FormInputs>({ resolver: zodResolver( updateExchangeRateSchema ),
        defaultValues: {
            buyRate: 0,
            sellRate: 0,
        },
    });

    useEffect(() => {
        if (exchangeRate) {
            reset({
                buyRate:
                    exchangeRate.buyRate || 0,

                sellRate:
                    exchangeRate.sellRate || 0,
            });
        }
    }, [exchangeRate, reset]);

    if (!open || !exchangeRate)
        return null;

    const onSubmit = ( data: FormInputs ) => {
        setPendingData(data);
        setConfirmOpen(true);
    };

    const handleConfirm = async () => {
            if (
                !pendingData ||
                !onEdit
            )
                return;

            await onEdit(
                exchangeRate._id,
                pendingData
            );

            setConfirmOpen(false);
            setPendingData(null);
            onClose();
        };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

                <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-[#38476d]/30 p-8">

                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--surface-container)]"
                    >
                        <MdClose className="text-xl text-white" />
                    </button>

                    <div className="mb-8">

                        <h2 className="text-3xl font-black text-white">
                            Update Exchange Rate
                        </h2>

                        <p className="mt-2 text-sm text-[var(--text-secondary)]">
                            {exchangeRate?.fromCurrency?.code}
                            {" → "}
                            {exchangeRate?.toCurrency?.code}
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit(
                            onSubmit
                        )}
                        className="space-y-5"
                    >

                        <div>

                            <input
                                type="number"
                                step="0.0001"
                                placeholder="Buy Rate"
                                {...register("buyRate",{valueAsNumber: true})}
                                className="w-full rounded-2xl bg-[var(--surface-container)] border border-[#38476d]/20 px-4 py-3 text-white outline-none"
                            />

                            {errors.buyRate && (
                                <p className="text-red-400 text-xs mt-1">
                                    {
                                        errors.buyRate.message
                                    }
                                </p>
                            )}

                        </div>

                        <div>

                            <input
                                type="number"
                                step="0.0001"
                                placeholder="Sell Rate"
                                {...register("sellRate",{valueAsNumber: true})}
                                className="w-full rounded-2xl bg-[var(--surface-container)] border border-[#38476d]/20 px-4 py-3 text-white outline-none"
                            />

                            {errors.sellRate && (
                                <p className="text-red-400 text-xs mt-1">
                                    {
                                        errors.sellRate.message
                                    }
                                </p>
                            )}

                        </div>

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
                                disabled={
                                    !isDirty ||
                                    isSubmitting ||
                                    loading
                                }
                                className="px-6 py-3 rounded-2xl kinetic-gradient text-black font-bold disabled:opacity-50"
                            >
                                Update Rate
                            </button>

                        </div>

                    </form>

                </div>

            </div>

            <WarningText
                open={confirmOpen}
                title="Update Exchange Rate"
                message="Are you sure you want to update this exchange rate?"
                confirmText="Yes"
                confirmVariant="success"
                onCancel={() => {
                    setConfirmOpen(false);
                    setPendingData(null);
                }}
                onConfirm={handleConfirm}
            />
        </>
    );
};

export default UpdateExchangeRate;