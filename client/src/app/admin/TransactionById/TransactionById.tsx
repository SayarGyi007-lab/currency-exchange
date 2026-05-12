import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { STATUS_STYLES } from "../Dashboard/components/TransactionTable";
import { useGetTransactionByIdQuery, useUpdateTransactionStatusMutation } from "../../../slices/redux-slices/transaction-api";
import { CopyItem } from "../../../constant/ui/CopyItem";
import { InfoItem } from "../../../constant/ui/InfoItem";
import { toast } from "react-toastify";

const STATUS_OPTIONS = [
    "pending",
    "received",
    "processing",
    "completed",
    "cancelled",
] as const;

type TransactionStatus =
    | "pending"
    | "received"
    | "processing"
    | "completed"
    | "cancelled";

const TransactionById = () => {

    const { id } = useParams();

    const { data, isLoading } = useGetTransactionByIdQuery(id as string);

    const [updateTransactionStatus, { isLoading: isUpdating }] = useUpdateTransactionStatusMutation();

    const [status, setStatus] = useState<TransactionStatus | "">("");

    const transaction = data?.data;

    useEffect(() => {
        if (transaction?.status) {
            setStatus(transaction.status)
        }
    }, [transaction])

    const handleCopy = async (text: string) => {
        await navigator.clipboard.writeText(text);
    };

    const handleUpdateStatus = async () => {
        if (!status) return;

        try {
            await updateTransactionStatus({
                id: transaction._id,
                status: status as
                    | "pending"
                    | "received"
                    | "processing"
                    | "completed"
                    | "cancelled",
            }).unwrap();

            toast.success("Transaction status updated");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update transaction");
        }
    };

    if (isLoading) {
        return (
            <div className="p-10 text-[var(--text-primary)]">
                Loading...
            </div>
        );
    }

    if (!transaction) {
        return (
            <div className="p-10 text-[var(--text-primary)]">
                Transaction not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--surface)] relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-[var(--secondary)]/10 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-250px] right-[-150px] w-[500px] h-[500px] bg-[var(--tertiary)]/10 blur-[140px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-[1700px] mx-auto p-6 lg:p-10 flex flex-col gap-8">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <div className="flex items-center gap-5">

                        <Link
                            to="/admin/transactions"
                            className="w-12 h-12 rounded-2xl glass-panel border border-white/5 flex items-center justify-center text-[var(--secondary)] hover:scale-105 transition-all duration-300"
                        >
                            <MdArrowBack size={22} />
                        </Link>

                        <div>

                            <p className="uppercase tracking-[0.3em] text-[10px] text-[var(--text-secondary)] font-bold">
                                Transaction Overview
                            </p>

                            <h1 className="text-4xl font-black tracking-tight text-[var(--primary)]">
                                Transaction Details
                            </h1>

                            <p className="text-sm text-[var(--text-secondary)] mt-2 break-all">
                                {transaction._id}
                            </p>

                        </div>

                    </div>

                    <div
                        className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] border backdrop-blur-xl ${STATUS_STYLES[transaction.status]}`}
                    >
                        {transaction.status}
                    </div>

                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {/* Left */}
                    <div className="xl:col-span-2 flex flex-col gap-8">

                        {/* Transaction Information */}
                        <section className="glass-panel rounded-[32px] p-8 border border-white/5">

                            <div className="flex items-center justify-between mb-8">

                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-secondary)] font-bold">
                                        Exchange Data
                                    </p>

                                    <h2 className="text-2xl font-black text-[var(--primary)] mt-2">
                                        Transaction Information
                                    </h2>
                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-[var(--secondary)] animate-pulse" />
                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">

                                <InfoItem
                                    label="Currency Pair"
                                    value={`${transaction.fromCurrency?.code} → ${transaction.toCurrency?.code}`}
                                />

                                <InfoItem
                                    label="Amount"
                                    value={`${transaction.fromCurrency?.symbol}${transaction.amount?.toLocaleString()}`}
                                />

                                <InfoItem
                                    label="Converted Amount"
                                    value={`${transaction.toCurrency?.symbol}${transaction.convertedAmount?.toLocaleString()}`}
                                />

                                <InfoItem
                                    label="Exchange Rate"
                                    value={transaction.exchangeRate}
                                />

                                <InfoItem
                                    label="Base Currency"
                                    value={transaction.baseCurrency}
                                />

                                <InfoItem
                                    label="Base Amount"
                                    value={transaction.baseAmount}
                                />

                                <InfoItem
                                    label="Created At"
                                    value={new Date(transaction.createdAt).toLocaleString()}
                                />

                                <InfoItem
                                    label="Updated At"
                                    value={new Date(transaction.updatedAt).toLocaleString()}
                                />

                            </div>

                        </section>

                        {/* Receiver */}
                        <section className="glass-panel rounded-[32px] p-8 border border-white/5">

                            <div className="mb-8">

                                <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-secondary)] font-bold">
                                    Recipient Data
                                </p>

                                <h2 className="text-2xl font-black text-[var(--primary)] mt-2">
                                    Receiver Information
                                </h2>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <CopyItem
                                    label="Receiver Name"
                                    value={transaction.receiverName}
                                    onCopy={handleCopy}
                                />

                                <CopyItem
                                    label="Bank"
                                    value={transaction.receiverBank}
                                    onCopy={handleCopy}
                                />

                                <CopyItem
                                    label="Account"
                                    value={transaction.receiverAccount}
                                    onCopy={handleCopy}
                                />

                                <CopyItem
                                    label="Phone"
                                    value={transaction.receiverPhone}
                                    onCopy={handleCopy}
                                />

                                <CopyItem
                                    label="Email"
                                    value={transaction.receiverEmail}
                                    onCopy={handleCopy}
                                />

                            </div>

                            {transaction.receiverQr && (
                                <div className="mt-8">

                                    <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-secondary)] font-bold mb-5">
                                        Receiver QR
                                    </p>

                                    <div className="glass-panel rounded-3xl border border-white/5 p-6 flex flex-col items-center">

                                        <img
                                            src={transaction.receiverQr}
                                            alt="Receiver QR"
                                            className="w-full max-w-[180px] max-w-[600px] rounded-2xl object-contain"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => handleCopy(transaction.receiverQr)}
                                            className="mt-6 px-6 py-3 rounded-2xl bg-[var(--secondary)] text-black font-bold hover:scale-[1.02] transition-all"
                                        >
                                            Copy QR Link
                                        </button>

                                    </div>

                                </div>
                            )}

                        </section>

                        {/* Slip */}
                        <section className="glass-panel rounded-[32px] p-8 border border-white/5">

                            <div className="mb-8">

                                <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-secondary)] font-bold">
                                    Verification
                                </p>

                                <h2 className="text-2xl font-black text-[var(--primary)] mt-2">
                                    Payment Slip
                                </h2>

                            </div>

                            <div className="relative overflow-hidden rounded-3xl border border-white/5 group">

                                <img
                                    src={transaction.slipImage}
                                    alt="Slip"
                                    className="w-full max-h-[700px] object-contain transition-all duration-700 group-hover:scale-[1.02]"
                                />

                            </div>

                        </section>

                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col gap-8">

                        {/* Status */}
                        <section className="glass-panel rounded-[32px] p-8 border border-white/5">

                            <div className="mb-7">

                                <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-secondary)] font-bold">
                                    Management
                                </p>

                                <h2 className="text-2xl font-black text-[var(--primary)] mt-2">
                                    Update Status
                                </h2>

                            </div>

                            <div className="flex flex-col gap-5">

                                <select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value as TransactionStatus)
                                    }
                                    className="w-full px-5 py-4 rounded-2xl bg-[var(--surface-container-low)] border border-white/5 text-[var(--text-primary)] outline-none focus:border-[var(--secondary)] transition-all"
                                >
                                    <option value="">Select status</option>

                                    {STATUS_OPTIONS.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    disabled={
                                        !status ||
                                        status === transaction.status ||
                                        isUpdating
                                    }
                                    onClick={handleUpdateStatus}
                                    className="w-full py-4 rounded-2xl kinetic-gradient text-black font-black tracking-wide hover:scale-[1.02] transition-all disabled:opacity-40 disabled:hover:scale-100"
                                >
                                    {isUpdating ? "Updating..." : "Update Status"}
                                </button>

                            </div>

                        </section>

                        {/* Payment Method */}
                        <section className="glass-panel rounded-[32px] p-8 border border-white/5">

                            <div className="mb-7">

                                <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-secondary)] font-bold">
                                    Transfer Method
                                </p>

                                <h2 className="text-2xl font-black text-[var(--primary)] mt-2">
                                    Payment Method
                                </h2>

                            </div>

                            <div className="flex flex-col gap-6">

                                <InfoItem
                                    label="Method"
                                    value={transaction.paymentMethod?.type}
                                />

                                <InfoItem
                                    label="Account Name"
                                    value={transaction.paymentMethod?.accountName}
                                />

                                <InfoItem
                                    label="Account Number"
                                    value={transaction.paymentMethod?.accountNumber}
                                />

                            </div>

                        </section>

                        {/* System Info */}
                        <section className="glass-panel rounded-[32px] p-8 border border-white/5">

                            <div className="mb-7">

                                <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-secondary)] font-bold">
                                    Metadata
                                </p>

                                <h2 className="text-2xl font-black text-[var(--primary)] mt-2">
                                    System Information
                                </h2>

                            </div>

                            <div className="flex flex-col gap-6">

                                <InfoItem
                                    label="User IP"
                                    value={transaction.userIP}
                                />

                                <InfoItem
                                    label="Approved By"
                                    value={transaction.approvedBy?.name || "-"}
                                />

                            </div>

                        </section>

                    </div>

                </div>

            </div>

        </div>
    );
};





export default TransactionById;