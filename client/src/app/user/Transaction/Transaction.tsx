import * as z from "zod";
import { transactionFormSchema } from "./validation/transaction";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTransactionMutation } from "../../../slices/redux-slices/transaction-api";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { MdSecurity } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";
import Button from "../../../constant/ui/Button";
import { useAllExchangeRate } from "../../admin/ExchangeRate/hooks/useExchangeRate";
import { useUploadMutation } from "../../../slices/redux-slices/upload-photo-api";
import { useSelector } from "react-redux";
import type { RootState } from "../../../slices/store/store";
import { toast } from "react-toastify";
import ReceiveMethod from "./components/ReceiveMethod";
import ReceiverDetails from "./components/ReceiverDetail";

type FormInputs = z.infer<typeof transactionFormSchema>;

const Transaction = () => {
    const navigate = useNavigate();

    const {
        amount,
        from,
        to,
        result,
        fromCurrencyId,
        toCurrencyId,
        exchangeRateId,
        exchangeRate,
        paymentMethodId,
    } = useSelector((state: RootState) => state.transaction);

    const [receiveMethod, setReceiveMethod] = useState<"bank" | "qr">("bank");
    const [slipPreview, setSlipPreview] = useState<string | null>(null);
    const [slipFile, setSlipFile] = useState<File | null>(null);
    const [qrPreview, setQrPreview] = useState<string | null>(null);
    const [qrFile, setQrFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createTransaction, { isLoading }] = useCreateTransactionMutation();
    const [upload] = useUploadMutation();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({
        resolver: zodResolver(transactionFormSchema),
    });

    const { exchangeRates } = useAllExchangeRate();

    const fromSymbol = useMemo(() => {
        if (!exchangeRates?.length) return from;
        const rate = exchangeRates.find(
            (r: any) => r.fromCurrency.code === from || r.toCurrency.code === from
        );
        return (
            (rate?.fromCurrency.code === from
                ? rate.fromCurrency.symbol
                : rate?.toCurrency.symbol) ?? from
        );
    }, [exchangeRates, from]);

    const toSymbol = useMemo(() => {
        if (!exchangeRates?.length) return to;
        const rate = exchangeRates.find(
            (r: any) => r.fromCurrency.code === to || r.toCurrency.code === to
        );
        return (
            (rate?.fromCurrency.code === to
                ? rate.fromCurrency.symbol
                : rate?.toCurrency.symbol) ?? to
        );
    }, [exchangeRates, to]);

    if (!paymentMethodId) {
        return <p style={{ color: "var(--primary)", padding: "2.5rem" }}>Invalid access</p>;
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/jpg",
        ];

        if (!allowedTypes.includes(file.type)) {
            toast.error(
                "Only PNG, JPG and JPEG files are allowed."
            );

            e.target.value = "";
            return;
        }

        // cleanup old preview
        if (slipPreview) {
            URL.revokeObjectURL(slipPreview);
        }

        setSlipFile(file);
        setSlipPreview(URL.createObjectURL(file));
    };

    const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
        try {
            setIsSubmitting(true);

            let slipUrl = "";
            let qrUrl = "";

            if (slipFile) {
                const formDataUpload = new FormData();
                formDataUpload.append("file", slipFile);

                const res = await upload(formDataUpload).unwrap();
                slipUrl = res.data;
            }

            if (qrFile) {
                const formDataUpload = new FormData();
                formDataUpload.append("file", qrFile);

                const res = await upload(formDataUpload).unwrap();
                qrUrl = res.data;
            }

            const res = await createTransaction({
                fromCurrency: fromCurrencyId,
                toCurrency: toCurrencyId,
                exchangeRateId,
                amount,
                exchangeRate,
                convertedAmount: result,
                paymentMethod: paymentMethodId,
                slipImage: slipUrl,
                receiverName: formData.receiverName,
                receiverBank: formData.receiverBank,
                receiverAccount: formData.receiverAccount,
                receiverPhone: formData.receiverPhone,
                receiverEmail: formData.receiverEmail,
                receiverQr:
                    receiveMethod === "qr"
                        ? (qrUrl || formData.receiverQr)
                        : undefined,
            }).unwrap();

            reset();
            navigate(`/status/${res.data._id}`);

        } catch (err: any) {
            const backendErrors = err?.data?.errors;

            if (backendErrors) {
                Object.values(backendErrors).forEach((msg) => {
                    toast.error(String(msg));
                });
            } else {
                toast.error(
                    err?.data?.message ||
                    "Transaction failed. Please try again."
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center px-6 py-16">
            <main className="w-full max-w-4xl">

                <div
                    className="glass-panel rounded-[2rem] p-8 md:p-12 relative overflow-hidden"
                    style={{ border: "1px solid rgba(56,71,109,0.15)" }}
                >
                    {/* Decorative glows */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
                        style={{ background: "rgba(195,192,255,0.08)" }} />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
                        style={{ background: "rgba(138,255,236,0.04)" }} />

                    {/* Header */}
                    <header className="mb-12 relative z-10">
                        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4"
                            style={{ color: "var(--primary)" }}>
                            Complete Transaction
                        </h1>
                        <p className="max-w-lg" style={{ color: "var(--text-secondary)" }}>
                            Review your transfer details and upload your payment proof to finalize the exchange request.
                        </p>
                    </header>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12 relative z-10">

                        {/* Transaction Summary */}
                        <section>
                            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6"
                                style={{ color: "var(--tertiary)" }}>
                                Transaction Summary
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                {/* You Send */}
                                <div className="p-6 rounded-xl flex items-center gap-4"
                                    style={{ background: "rgba(20,36,73,0.5)", border: "1px solid rgba(56,71,109,0.15)" }}>
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ background: "var(--surface-bright)" }}>
                                        <span className="text-xl font-bold" style={{ color: "var(--secondary)" }}>
                                            {fromSymbol}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold" style={{ color: "var(--text-secondary)" }}>
                                            You Send
                                        </p>
                                        <p className="font-display text-xl font-bold" style={{ color: "var(--primary)" }}>
                                            {amount}{" "}
                                            <span className="text-sm" style={{ color: "var(--secondary)" }}>{from}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Rate */}
                                <div className="p-6 rounded-xl flex items-center gap-4"
                                    style={{ background: "rgba(20,36,73,0.5)", border: "1px solid rgba(56,71,109,0.15)" }}>
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ background: "var(--surface-bright)" }}>
                                        <IoArrowForward style={{ color: "var(--tertiary)", fontSize: 22 }} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold" style={{ color: "var(--text-secondary)" }}>
                                            Rate
                                        </p>
                                        <p className="font-display text-base font-bold" style={{ color: "var(--primary)" }}>
                                            1 {from} ={" "}
                                            <span style={{ color: "var(--tertiary)" }}>
                                                {exchangeRate} {to}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* They Receive */}
                                <div className="p-6 rounded-xl flex items-center gap-4"
                                    style={{
                                        background: "rgba(20,36,73,0.5)",
                                        border: "1px solid rgba(56,71,109,0.15)",
                                        borderLeft: "2px solid var(--tertiary)",
                                    }}>
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ background: "var(--surface-bright)" }}>
                                        <span className="text-xl font-bold" style={{ color: "var(--tertiary)" }}>
                                            {toSymbol}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold" style={{ color: "var(--text-secondary)" }}>
                                            They Receive
                                        </p>
                                        <p className="font-display text-xl font-bold" style={{ color: "var(--primary)" }}>
                                            {result?.toFixed(2)}{" "}
                                            <span className="text-sm" style={{ color: "var(--tertiary)" }}>{to}</span>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* Proof of Payment */}
                        <section>
                            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[var(--tertiary)]">
                                Proof of Payment
                            </h3>

                            <label className="group relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#38476d]/30 p-10 bg-[var(--surface-container-lowest)] transition-all duration-300">
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    accept=".png,.jpg,.jpeg"
                                    className="absolute inset-0 z-0 opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                />

                                {slipPreview ? (
                                    // Preview State 
                                    <div className="relative z-10">
                                        <img
                                            src={slipPreview}
                                            alt="Slip preview"
                                            className="max-h-48 rounded-xl object-contain"
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation(); // Prevents triggering the file input click
                                                URL.revokeObjectURL(slipPreview);
                                                setSlipPreview(null);
                                                setSlipFile(null);
                                            }}
                                            className="absolute -right-2 -top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--error)] text-xs font-bold text-white shadow-md transition-transform hover:scale-110"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    // Empty
                                    <div className="z-10 flex flex-col items-center justify-center pointer-events-none">
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--surface-container)] transition-transform duration-500 group-hover:scale-110">
                                            <LiaCloudUploadAltSolid
                                                className="text-[32px] text-[var(--secondary)]"
                                            />
                                        </div>

                                        <p className="font-headline mb-1 text-lg font-medium text-[var(--primary)]">
                                            Upload transfer slip
                                        </p>

                                        <p className="text-sm text-[var(--text-secondary)]">
                                            PNG, JPG or JPEG only
                                        </p>
                                    </div>
                                )}
                            </label>
                        </section>

                        {/* Receive Method */}
                        <ReceiveMethod
                            receiveMethod={receiveMethod}
                            setReceiveMethod={setReceiveMethod}
                            qrPreview={qrPreview}
                            setQrPreview={setQrPreview}
                            setQrFile={setQrFile}
                            register={register}
                            errors={errors}
                        />

                        {/* Receiver Details */}
                        <ReceiverDetails
                            register={register}
                            errors={errors}
                        />

                        {/* Security Note */}
                        <div
                            className="flex items-start gap-4 p-5 rounded-2xl"
                            style={{ background: "rgba(138,26,30,0.1)", border: "1px solid rgba(255,113,108,0.1)" }}
                        >
                            <MdSecurity style={{ color: "var(--error)", fontSize: 22, flexShrink: 0, marginTop: 2 }} />
                            <div className="text-[11px] leading-relaxed font-medium" style={{ color: "var(--text-secondary)" }}>
                                <span className="block mb-1 uppercase tracking-tighter font-bold" style={{ color: "var(--error)" }}>
                                    Secure Protocol Active
                                </span>
                                All transactions are encrypted using AES-256 standards. Your session is being logged for security and anti-fraud compliance.
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-4 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate(-1)}
                                className="flex-1 py-5 rounded-full font-headline text-lg font-bold"
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex-1 py-6 rounded-full font-display text-xl font-black tracking-wider uppercase transition-all duration-200
                                ${isSubmitting ? "opacity-70 scale-[0.98] cursor-not-allowed" : ""}`}
                                style={{
                                    boxShadow:
                                        "0 10px 40px -10px rgba(100,94,251,0.6)",
                                }}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Submitting...
                                    </div>
                                ) : (
                                    "Submit Transaction"
                                )}
                            </Button>
                        </div>

                    </form>
                </div>
            </main>
        </div>
    );
};

export default Transaction;