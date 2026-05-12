export const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1">

      <p className="text-sm text-[var(--text-secondary)]">
        {label}
      </p>

      <p className="font-medium text-[var(--text-primary)] break-all">
        {value || "-"}
      </p>

    </div>
  );
};