import * as z from "zod";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import WarningText from "../../../../constant/ui/WarningText";
import type { User } from "../../../../slices/interfaces/user";
import { changePasswordSchema } from "../validation/user";

type FormInputs = z.infer<typeof changePasswordSchema>;

interface Props {
  open: boolean;
  user: User;
  loading?: boolean;
  onClose: () => void;
  onSubmit?: (id: string, data: FormInputs) => Promise<void>;
}

const ChangePassword = ({
  open,
  user,
  loading,
  onClose,
  onSubmit,
}: Props) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingData, setPendingData] = useState<FormInputs | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: ""
    },
  });

  if (!open || !user) return null;

  const submit = (data: FormInputs) => {
    setPendingData(data);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingData || !onSubmit) return;

    await onSubmit(user._id, pendingData);

    reset();

    setPendingData(null);
    setConfirmOpen(false);
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
              Change Password
            </h2>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Update account password securely
            </p>
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-5">

            <div>
              <input
                type="password"
                {...register("currentPassword")}
                placeholder="Current Password"
                className="w-full rounded-2xl bg-[var(--surface-container)] border border-[#38476d]/20 px-4 py-3 text-white outline-none"
              />

              {errors.currentPassword && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                {...register("newPassword")}
                placeholder="New Password"
                className="w-full rounded-2xl bg-[var(--surface-container)] border border-[#38476d]/20 px-4 py-3 text-white outline-none"
              />

              {errors.newPassword && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.newPassword.message}
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
                disabled={!isDirty || isSubmitting || loading}
                className="px-6 py-3 rounded-2xl kinetic-gradient text-black font-bold disabled:opacity-50"
              >
                Change Password
              </button>

            </div>

          </form>
        </div>
      </div>

      <WarningText
        open={confirmOpen}
        title="Change Password"
        message="Are you sure you want to change this password?"
        confirmText="Yes"
        confirmVariant="success"
        onCancel={()=>{
          setConfirmOpen(false)
          setPendingData(null)
        }}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ChangePassword;