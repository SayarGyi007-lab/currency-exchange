import React, { forwardRef } from "react"
import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

type Props = {
  label: string
  type?: string
  children?: React.ReactNode
  className?: string
  selectClassName?: string
  rightSlot?: React.ReactNode
} & InputHTMLAttributes<HTMLInputElement>

type FormRef = HTMLInputElement | HTMLSelectElement

const FormInput = forwardRef<FormRef, Props>(
  (
    {
      label,
      type = "text",
      children,
      className = "",
      selectClassName = "",
      rightSlot,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col mb-4">
        <label className="text-xs uppercase text-gray-400 mb-2">{label}</label>

        <div className={rightSlot ? "flex gap-2" : ""}>
          {type === "select" ? (
            <select
              ref={ref as React.Ref<HTMLSelectElement>}
              {...(props as unknown as SelectHTMLAttributes<HTMLSelectElement>)}
              className={`w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-cyan-400 outline-none ${selectClassName}`}
            >
              {children}
            </select>
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
              type={type}
              className={`w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-cyan-400 outline-none ${className}`}
            />
          )}

          {rightSlot && <div className="shrink-0">{rightSlot}</div>}
        </div>
      </div>
    );
  }
);

FormInput.displayName = "FormInput"

export default FormInput