import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { MdClose, MdImage } from "react-icons/md";
import { updatePaymentMethodSchema } from "../../Payment/validation/payment";
import { useAdminUploadMutation } from "../../../../slices/redux-slices/upload-photo-api";
import { usePaymentControl } from "../hook/usePyamentControl";
import WarningText from "../../../../constant/ui/WarningText";
import type { PaymentMethod } from "../../../../slices/interfaces/payment-method";

type FormInputs = z.infer<typeof updatePaymentMethodSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  payment?: PaymentMethod;
  currencyId: string;
}

const ACCEPTED_TYPES = ["image/png", "image/jpg", "image/jpeg"];

const UpdatePaymentMethod = ({ open, onClose, payment, currencyId }: Props) => {
  const { updatePayment, updating } = usePaymentControl();
  const [uploadImage, { isLoading: uploading }] = useAdminUploadMutation();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingData, setPendingData] = useState<FormInputs | null>(null);
  const [previewFile, setPreviewFile] = useState<{ name: string; preview: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(updatePaymentMethodSchema),
    defaultValues: {
      currencyId,
      accountName: payment?.accountName ?? "",
      accountNumber: payment?.accountNumber ?? "",
      bankProvider: payment?.bankProvider ?? "",
      qrImage: payment?.qrImage ?? "",
    },
  });

  useEffect(() => {
    if (!payment) return;
    reset({
      currencyId,
      accountName: payment.accountName ?? "",
      accountNumber: payment.accountNumber ?? "",
      bankProvider: payment.bankProvider ?? "",
      qrImage: payment.qrImage ?? "",
    });
    setPreviewFile(null);
  }, [payment, currencyId, reset]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Only PNG, JPG, or JPEG files are allowed");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setPreviewFile({
      name: file.name,
      preview: URL.createObjectURL(file),
    });

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadImage(formData).unwrap();
      setValue("qrImage", res.data, { shouldDirty: true });
      toast.success("QR uploaded");
    } catch {
      toast.error("Upload failed");
      setPreviewFile(null);
    }
  };

  const handleRemoveImage = () => {
    setPreviewFile(null);
    setValue("qrImage", payment?.qrImage ?? "", { shouldDirty: true });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = (data: FormInputs) => {
    setPendingData(data);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingData || !payment) return;

    await updatePayment(payment._id, {
      currencyId,
      ...pendingData,
    });

    setConfirmOpen(false);
    setPendingData(null);
    onClose();
  };

  if (!open || !payment) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
        <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-[#38476d]/30 p-8">

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--surface-container)]"
          >
            <MdClose className="text-xl text-white" />
          </button>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white">
              Update Payment Method
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Edit payment method information.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <div>
              <input
                {...register("accountName")}
                placeholder="Account Name"
                className="w-full rounded-2xl bg-[var(--surface-container)] border border-[#38476d]/20 px-4 py-3 text-white outline-none"
              />
              {errors.accountName && (
                <p className="text-red-400 text-xs mt-1">{errors.accountName.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("accountNumber")}
                placeholder="Account Number"
                className="w-full rounded-2xl bg-[var(--surface-container)] border border-[#38476d]/20 px-4 py-3 text-white outline-none"
              />
              {errors.accountNumber && (
                <p className="text-red-400 text-xs mt-1">{errors.accountNumber.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("bankProvider")}
                placeholder="Bank Provider"
                className="w-full rounded-2xl bg-[var(--surface-container)] border border-[#38476d]/20 px-4 py-3 text-white outline-none"
              />
              {errors.bankProvider && (
                <p className="text-red-400 text-xs mt-1">{errors.bankProvider.message}</p>
              )}
            </div>

            {/* QR */}
            <div className="space-y-2">

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Shown after file chosen */}
              {previewFile ? (
                <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-container)] border border-[#38476d]/20 px-4 py-3">
                  <img
                    src={previewFile.preview}
                    alt="QR preview"
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                  <p className="flex-1 text-sm text-white truncate">
                    {previewFile.name}
                  </p>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition shrink-0"
                  >
                    <MdClose size={14} />
                  </button>
                </div>
              ) : (
                /* Upload trigger button */
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center gap-3 rounded-2xl bg-[var(--surface-container)] border border-dashed border-[#38476d]/60 px-4 py-3 text-[var(--text-secondary)] hover:border-[#8affec]/40 hover:text-white transition"
                >
                  <MdImage size={18} />
                  <span className="text-sm">
                    Upload QR Image
                  </span>
                  <span className="ml-auto text-xs opacity-50">
                    PNG, JPG, JPEG
                  </span>
                </button>
              )}

              {uploading && (
                <p className="text-yellow-400 text-xs">Uploading...</p>
              )}
              {errors.qrImage && (
                <p className="text-red-400 text-xs">{errors.qrImage.message}</p>
              )}

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
                disabled={!isDirty || isSubmitting || updating || uploading}
                className="px-6 py-3 rounded-2xl kinetic-gradient text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Payment
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* Warning */}
      <WarningText
        open={confirmOpen}
        title="Update Payment Method"
        message="Are you sure you want to update this payment method?"
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

export default UpdatePaymentMethod;