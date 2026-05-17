import type { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";

const errMsg = (err: FieldErrors<any>[string]): string | undefined =>
    (err as FieldError)?.message;

interface ReceiverDetailsProps {
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
}

const onlyNumbers = (
    e: React.FormEvent<HTMLInputElement>
) => {
    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
};

const Field = ({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) => (
    <div className="flex flex-col gap-2">
        <label
            className="text-xs font-bold uppercase tracking-wider pl-1"
            style={{ color: "var(--text-secondary)" }}
        >
            {label}
        </label>

        {children}

        {error && (
            <p
                className="text-xs pl-1"
                style={{ color: "var(--error)" }}
            >
                {error}
            </p>
        )}
    </div>
);

const ReceiverDetails = ({
    register,
    errors,
}: ReceiverDetailsProps) => {
    return (
        <section>
            <h3
                className="text-xs uppercase tracking-[0.2em] font-bold mb-6"
                style={{ color: "var(--tertiary)" }}
            >
                Receiver Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                {/* Receiver Name */}
                <div className="md:col-span-2">
                    <Field
                        label="Receiver Name"
                        error={errMsg(errors.receiverName)}
                    >
                        <input
                            {...register("receiverName")}
                            placeholder="Full Legal Name"
                            className="w-full rounded-xl p-4 outline-none"
                            style={{
                                background:
                                    "var(--surface-container-lowest)",
                                border: "none",
                                color: "var(--primary)",
                            }}
                        />
                    </Field>
                </div>

                {/* Phone */}
                <Field
                    label="Phone Number"
                    error={errMsg(errors.receiverPhone)}
                >
                    <input
                        {...register("receiverPhone")}
                        placeholder="0812345678"
                        type="text"
                        inputMode="numeric"
                        onInput={onlyNumbers}
                        className="w-full rounded-xl p-4 outline-none"
                        style={{
                            background:
                                "var(--surface-container-lowest)",
                            border: "none",
                            color: "var(--primary)",
                        }}
                    />
                </Field>

                {/* Email */}
                <Field
                    label="Email"
                    error={errMsg(errors.receiverEmail)}
                >
                    <input
                        {...register("receiverEmail")}
                        placeholder="name@example.com"
                        type="email"
                        className="w-full rounded-xl p-4 outline-none"
                        style={{
                            background:
                                "var(--surface-container-lowest)",
                            border: "none",
                            color: "var(--primary)",
                        }}
                    />
                </Field>

                {/* Receiver Bank */}
                <Field
                    label="Receiver Bank"
                    error={errMsg(errors.receiverBank)}
                >
                    <input
                        {...register("receiverBank")}
                        placeholder="Bank Name"
                        className="w-full rounded-xl p-4 outline-none"
                        style={{
                            background:
                                "var(--surface-container-lowest)",
                            border: "none",
                            color: "var(--primary)",
                        }}
                    />
                </Field>

                {/* Account Number */}
                <Field
                    label="Account Number"
                    error={errMsg(errors.receiverAccount)}
                >
                    <input
                        {...register("receiverAccount")}
                        placeholder="1234567890"
                        type="text"
                        inputMode="numeric"
                        onInput={onlyNumbers}
                        className="w-full rounded-xl p-4 outline-none"
                        style={{
                            background:
                                "var(--surface-container-lowest)",
                            border: "none",
                            color: "var(--primary)",
                        }}
                    />
                </Field>

            </div>
        </section>
    );
};

export default ReceiverDetails;