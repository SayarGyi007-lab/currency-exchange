import * as z from "zod";
import { transactionFormSchema } from "../../validation/transaction";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTransactionMutation } from "../../slices/redux-slices/transaction-api";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { MdSecurity } from "react-icons/md";
import { IoArrowForward, IoQrCodeOutline } from "react-icons/io5";
import { BsBank } from "react-icons/bs";
import Button from "../../constant/ui/Button";
import { useAllExchangeRate } from "../../hooks/useExchangeRate";
import { useUploadMutation } from "../../slices/redux-slices/upload-photo-api";
import { useSelector } from "react-redux";
import type { RootState } from "../../slices/store/store";
import { toast } from "react-toastify";

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

    const [createTransaction, { isLoading }] = useCreateTransactionMutation();
    const [upload] = useUploadMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormInputs>({
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

    console.log(paymentMethodId);
    console.log("exchangeRateId:", exchangeRateId);
    if (!paymentMethodId) {
        return <p style={{ color: "var(--primary)", padding: "2.5rem" }}>Invalid access</p>;
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSlipFile(file);
        setSlipPreview(URL.createObjectURL(file));
    };

    const handleQrFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setQrFile(file);
        setQrPreview(URL.createObjectURL(file));
    };

    const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
        try {
            let slipUrl = "";
            let qrUrl = "";

            // upload slip
            if (slipFile) {
                const formDataUpload = new FormData();
                formDataUpload.append("file", slipFile);

                const res = await upload(formDataUpload).unwrap();
                slipUrl = res.data;
            }

            // upload qr (optional)
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
                receiverQr: receiveMethod === "qr" ? (qrUrl || formData.receiverQr) : undefined,
            }).unwrap();

            console.log('transaction data', res.data);
            
            const id = res.data._id;

            console.log('transactionid',id);
            

            reset();
            navigate(`/status/${id}`);

        } catch (err: any) {
            const backendErrors = err?.data?.errors;

            if (backendErrors) {
                // Show each validation error as a separate toast
                Object.values(backendErrors).forEach((msg) => {
                    toast.error(String(msg));
                });
            } else {
                toast.error(err?.data?.message || "Transaction failed. Please try again.");
            }
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

                        {/* ── Section 1: Transaction Summary ── */}
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

                        {/* ── Section 2: Proof of Payment ── */}
                        <section>
                            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6"
                                style={{ color: "var(--tertiary)" }}>
                                Proof of Payment
                            </h3>
                            <label
                                className="group relative rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-300"
                                style={{
                                    background: "var(--surface-container-lowest)",
                                    border: "2px dashed rgba(56,71,109,0.3)",
                                    minHeight: "160px",
                                }}
                            >
                                {slipPreview ? (
                                    <div className="relative">
                                        <img
                                            src={slipPreview}
                                            alt="Slip preview"
                                            className="max-h-48 object-contain rounded-xl"
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSlipPreview(null);
                                                setSlipFile(null);
                                            }}
                                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10"
                                            style={{ background: "var(--error)", color: "#fff" }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div
                                            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
                                            style={{ background: "var(--surface-container)" }}
                                        >
                                            <LiaCloudUploadAltSolid style={{ color: "var(--secondary)", fontSize: 32 }} />
                                        </div>
                                        <p className="font-headline text-lg font-medium mb-1" style={{ color: "var(--primary)" }}>
                                            Upload transfer slip
                                        </p>
                                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                            Drag and drop or click to browse (PDF, PNG, JPG)
                                        </p>
                                    </>
                                )}
                                {!slipPreview && (
                                    <input
                                        type="file"
                                        accept="image/*,application/pdf"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleFileChange}
                                    />
                                )}
                            </label>
                        </section>

                        {/* ── Section 3: Receive Method ── */}
                        <section>
                            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6"
                                style={{ color: "var(--tertiary)" }}>
                                Receive Method
                            </h3>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setReceiveMethod("bank")}
                                    className="flex-1 flex items-center justify-center gap-3 p-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
                                    style={{
                                        border: receiveMethod === "bank"
                                            ? "1px solid var(--tertiary)"
                                            : "1px solid rgba(56,71,109,0.3)",
                                        background: receiveMethod === "bank"
                                            ? "rgba(138,255,236,0.1)"
                                            : "var(--surface-container-lowest)",
                                        color: receiveMethod === "bank" ? "var(--tertiary)" : "var(--text-secondary)",
                                    }}
                                >
                                    <BsBank style={{ fontSize: 18 }} />
                                    Bank Transfer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setReceiveMethod("qr")}
                                    className="flex-1 flex items-center justify-center gap-3 p-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
                                    style={{
                                        border: receiveMethod === "qr"
                                            ? "1px solid var(--tertiary)"
                                            : "1px solid rgba(56,71,109,0.3)",
                                        background: receiveMethod === "qr"
                                            ? "rgba(138,255,236,0.1)"
                                            : "var(--surface-container-lowest)",
                                        color: receiveMethod === "qr" ? "var(--tertiary)" : "var(--text-secondary)",
                                    }}
                                >
                                    <IoQrCodeOutline style={{ fontSize: 18 }} />
                                    QR Deposit
                                </button>
                            </div>
                        </section>

                        {/* ── Section 4: Receiver Details ── */}
                        <section>
                            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6"
                                style={{ color: "var(--tertiary)" }}>
                                Receiver Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Receiver Name */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-wider pl-1"
                                        style={{ color: "var(--text-secondary)" }}>
                                        Receiver Name
                                    </label>
                                    <input
                                        {...register("receiverName")}
                                        placeholder="Full Legal Name"
                                        className="w-full rounded-xl p-4 outline-none"
                                        style={{
                                            background: "var(--surface-container-lowest)",
                                            border: "none",
                                            color: "var(--primary)",
                                        }}
                                    />
                                    {errors.receiverName && (
                                        <p className="text-xs pl-1" style={{ color: "var(--error)" }}>
                                            {errors.receiverName.message}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-wider pl-1"
                                        style={{ color: "var(--text-secondary)" }}>
                                        Phone Number
                                    </label>
                                    <input
                                        {...register("receiverPhone")}
                                        placeholder="Enter Phone"
                                        type="tel"
                                        className="w-full rounded-xl p-4 outline-none"
                                        style={{
                                            background: "var(--surface-container-lowest)",
                                            border: "none",
                                            color: "var(--primary)",
                                        }}
                                    />
                                    {errors.receiverPhone && (
                                        <p className="text-xs pl-1" style={{ color: "var(--error)" }}>
                                            {errors.receiverPhone.message}
                                        </p>
                                    )}

                                    <label className="text-xs font-bold uppercase tracking-wider pl-1"
                                        style={{ color: "var(--text-secondary)" }}>
                                        Email
                                    </label>
                                    <input
                                        {...register("receiverEmail")}
                                        placeholder="Enter Email"
                                        type="tel"
                                        className="w-full rounded-xl p-4 outline-none"
                                        style={{
                                            background: "var(--surface-container-lowest)",
                                            border: "none",
                                            color: "var(--primary)",
                                        }}
                                    />
                                    {errors.receiverEmail && (
                                        <p className="text-xs pl-1" style={{ color: "var(--error)" }}>
                                            {errors.receiverEmail.message}
                                        </p>
                                    )}

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold uppercase tracking-wider pl-1"
                                            style={{ color: "var(--text-secondary)" }}>
                                            Receiver Bank
                                        </label>
                                        <input
                                            {...register("receiverBank")}
                                            placeholder="Bank Name"
                                            className="w-full rounded-xl p-4 outline-none"
                                            style={{
                                                background: "var(--surface-container-lowest)",
                                                border: "none",
                                                color: "var(--primary)",
                                            }}
                                        />
                                        {errors.receiverBank && (
                                            <p className="text-xs pl-1" style={{ color: "var(--error)" }}>
                                                {errors.receiverBank.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold uppercase tracking-wider pl-1"
                                            style={{ color: "var(--text-secondary)" }}>
                                            Account Number
                                        </label>
                                        <input
                                            {...register("receiverAccount")}
                                            placeholder="IBAN or Account ID"
                                            className="w-full rounded-xl p-4 outline-none"
                                            style={{
                                                background: "var(--surface-container-lowest)",
                                                border: "none",
                                                color: "var(--primary)",
                                            }}
                                        />
                                        {errors.receiverAccount && (
                                            <p className="text-xs pl-1" style={{ color: "var(--error)" }}>
                                                {errors.receiverAccount.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* QR fields */}
                                {receiveMethod === "qr" && (
                                    <div className="md:col-span-2 flex flex-col gap-4">

                                        {/* QR image upload */}
                                        <div
                                            className="p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6"
                                            style={{ background: "rgba(16,30,62,0.4)", border: "1px solid rgba(56,71,109,0.15)" }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-white p-1 rounded-lg flex-shrink-0">
                                                    <div className="w-full h-full rounded flex items-center justify-center"
                                                        style={{ background: "var(--surface-container-highest)" }}>
                                                        <IoQrCodeOutline style={{ color: "var(--text-secondary)", opacity: 0.4, fontSize: 32 }} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-headline font-bold" style={{ color: "var(--primary)" }}>
                                                        Receiver QR Code
                                                    </p>
                                                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                                                        Upload QR image or enter reference below
                                                    </p>
                                                </div>
                                            </div>

                                            {/* QR uploader */}
                                            <div className="relative">
                                                {qrPreview ? (
                                                    <div className="relative w-32 h-32">
                                                        <img
                                                            src={qrPreview}
                                                            alt="QR"
                                                            className="w-full h-full object-contain rounded-xl bg-white p-1"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => { setQrPreview(null); setQrFile(null); }}
                                                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                                            style={{ background: "var(--error)", color: "#fff" }}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <label
                                                        className="w-32 h-32 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all"
                                                        style={{
                                                            background: "var(--surface-container-lowest)",
                                                            border: "2px dashed rgba(56,71,109,0.3)",
                                                        }}
                                                    >
                                                        <IoQrCodeOutline style={{ color: "var(--secondary)", fontSize: 28 }} />
                                                        <span className="text-[10px] mt-1 font-bold uppercase tracking-wider"
                                                            style={{ color: "var(--text-secondary)" }}>
                                                            Upload QR
                                                        </span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={handleQrFileChange}
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                )}

                            </div>
                        </section>

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
                                disabled={isLoading}
                                className="flex-1 py-6 rounded-full font-display text-xl font-black tracking-wider uppercase"
                                style={{ boxShadow: "0 10px 40px -10px rgba(100,94,251,0.6)" }}
                            >
                                {isLoading ? "Submitting..." : "Submit Transaction"}
                            </Button>
                        </div>

                    </form>
                </div>
            </main>
        </div>
    );
};

export default Transaction;