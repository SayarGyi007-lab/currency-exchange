import * as z from 'zod'
import { updateUserSchema } from '../validation/user'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '../../../../slices/interfaces/user'
import { useEffect, useState } from 'react'
import WarningText from '../../../../constant/ui/WarningText'
import { MdClose } from 'react-icons/md'

type FormInputs = z.infer<typeof updateUserSchema>

interface Props {
    open: boolean;
    user: User;
    loading?: boolean;
    onClose: () => void;
    onEdit?: (id: string, data: any) => Promise<void>;
}

const UpdateUser = ({
    open,
    user,
    loading,
    onClose,
    onEdit
}: Props) => {

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingData, setPendingData] = useState<FormInputs | null>(null);

    const { register, handleSubmit, formState: { isDirty, isSubmitting, errors }, reset } = useForm<FormInputs>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            role: user.role
        }
    })

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || '',
                email: user.email || '',
                role: user.role
            })
        }
    }, [user, reset])

    const onSubmit = (data: FormInputs) => {
        setPendingData(data);
        setConfirmOpen(true);
    };

    const handleConfirm = async () => {
        if (!pendingData || !onEdit) return;

        await onEdit(user._id, pendingData);

        setConfirmOpen(false);
        setPendingData(null);
        onClose();
    };

    if (!open || !user) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-[#38476d]/30 p-8">

                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--surface-container)]"
                    >
                        <MdClose className="text-xl text-white" />
                    </button>

                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-black text-white">
                            Update User
                        </h2>
                        <p className="mt-2 text-sm text-[var(--text-secondary)]">
                            Edit user information.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        <div>
                            <input
                                {...register('name')}
                                placeholder="User Name"
                                className="w-full rounded-2xl bg-[var(--surface-container)] border border-[#38476d]/20 px-4 py-3 text-white outline-none"
                            />
                            {errors.name && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                {...register('email')}
                                placeholder="User Email"
                                className="w-full rounded-2xl bg-[var(--surface-container)] border border-[#38476d]/20 px-4 py-3 text-white outline-none"
                            />
                            {errors.email && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <select
                                {...register("role")}
                                className="w-full rounded-2xl bg-[var(--surface-container)] border border-[#38476d]/20 px-4 py-3 text-white outline-none"
                            >
                                <option value="admin" className="bg-[#0f172a]">Admin</option>
                                <option value="super_admin" className="bg-[#0f172a]">Super Admin</option>
                            </select>
                            {errors.role && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.role.message}
                                </p>
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
                                disabled={!isDirty || isSubmitting || loading}
                                className="px-6 py-3 rounded-2xl kinetic-gradient text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Update User
                            </button>

                        </div>
                    </form>
                </div>
            </div>

            {/* Warning */}
            <WarningText
                open={confirmOpen}
                title="Update User"
                message="Are you sure you want to update this user?"
                confirmText="Yes"
                confirmVariant="success"
                onCancel={() => {
                    setConfirmOpen(false);
                    setPendingData(null);
                }}
                onConfirm={handleConfirm}
            />
        </>
    )
}

export default UpdateUser
