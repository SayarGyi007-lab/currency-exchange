import { MdContentCopy } from "react-icons/md";

export const CopyItem = ({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-1">

      <p className="text-sm text-[var(--text-secondary)]">
        {label}
      </p>

      <div className="flex items-center justify-between gap-3 bg-[var(--surface-container)] px-4 py-3 rounded-xl">

        <p className="font-medium text-[var(--text-primary)] break-all">
          {value}
        </p>

        <button
          onClick={() => onCopy(value)}
          className="text-[var(--secondary)]"
        >
          <MdContentCopy size={18} />
        </button>

      </div>

    </div>
  );
};