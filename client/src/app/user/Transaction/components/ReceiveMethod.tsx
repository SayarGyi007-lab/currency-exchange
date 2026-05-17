import { IoQrCodeOutline } from "react-icons/io5";
import { BsBank } from "react-icons/bs";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface ReceiveMethodProps {
    receiveMethod: "bank" | "qr";
    setReceiveMethod: (method: "bank" | "qr") => void;
    qrPreview: string | null;
    setQrPreview: (url: string | null) => void;
    setQrFile: (file: File | null) => void;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
}

const ReceiveMethod = ({
    receiveMethod,
    setReceiveMethod,
    qrPreview,
    setQrPreview,
    setQrFile,
    register,
    errors,
}: ReceiveMethodProps) => {
    const handleQrFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setQrFile(file);
        setQrPreview(URL.createObjectURL(file));
    };

    return (
        <>
            {/* Receive Method Toggle */}
            <section>
                <h3
                    className="text-xs uppercase tracking-[0.2em] font-bold mb-6"
                    style={{ color: "var(--tertiary)" }}
                >
                    Receive Method
                </h3>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setReceiveMethod("bank")}
                        className="flex-1 flex items-center justify-center gap-3 p-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
                        style={{
                            border:
                                receiveMethod === "bank"
                                    ? "1px solid var(--tertiary)"
                                    : "1px solid rgba(56,71,109,0.3)",
                            background:
                                receiveMethod === "bank"
                                    ? "rgba(138,255,236,0.1)"
                                    : "var(--surface-container-lowest)",
                            color:
                                receiveMethod === "bank"
                                    ? "var(--tertiary)"
                                    : "var(--text-secondary)",
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
                            border:
                                receiveMethod === "qr"
                                    ? "1px solid var(--tertiary)"
                                    : "1px solid rgba(56,71,109,0.3)",
                            background:
                                receiveMethod === "qr"
                                    ? "rgba(138,255,236,0.1)"
                                    : "var(--surface-container-lowest)",
                            color:
                                receiveMethod === "qr"
                                    ? "var(--tertiary)"
                                    : "var(--text-secondary)",
                        }}
                    >
                        <IoQrCodeOutline style={{ fontSize: 18 }} />
                        QR Deposit
                    </button>
                </div>
            </section>

            {/* QR Fields */}
            {receiveMethod === "qr" && (
                <div className="md:col-span-2 flex flex-col gap-4">
                    <div
                        className="p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6"
                        style={{
                            background: "rgba(16,30,62,0.4)",
                            border: "1px solid rgba(56,71,109,0.15)",
                        }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white p-1 rounded-lg flex-shrink-0">
                                <div
                                    className="w-full h-full rounded flex items-center justify-center"
                                    style={{ background: "var(--surface-container-highest)" }}
                                >
                                    <IoQrCodeOutline
                                        style={{
                                            color: "var(--text-secondary)",
                                            opacity: 0.4,
                                            fontSize: 32,
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <p
                                    className="font-headline font-bold"
                                    style={{ color: "var(--primary)" }}
                                >
                                    Receiver QR Code
                                </p>
                                <p
                                    className="text-xs"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    Upload QR image or enter reference below
                                </p>
                            </div>
                        </div>

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
                                        onClick={() => {
                                            setQrPreview(null);
                                            setQrFile(null);
                                        }}
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
                                    <IoQrCodeOutline
                                        style={{ color: "var(--secondary)", fontSize: 28 }}
                                    />
                                    <span
                                        className="text-[10px] mt-1 font-bold uppercase tracking-wider"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
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
        </>
    );
};

export default ReceiveMethod;