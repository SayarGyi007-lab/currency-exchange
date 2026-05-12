import type { StatusKey } from "../hook/useDashboardStats";

const STATUS_BAR_COLOR: Record<StatusKey, string> = {
  pending: "bg-amber-400",
  received: "bg-blue-400",
  processing: "bg-[var(--secondary)]",
  completed: "bg-[var(--tertiary)]",
  cancelled: "bg-[var(--error)]",
};

const STATUS_TEXT_COLOR: Record<StatusKey, string> = {
  pending: "text-amber-400",
  received: "text-blue-400",
  processing: "text-[var(--secondary)]",
  completed: "text-[var(--tertiary)]",
  cancelled: "text-[var(--error)]",
};

interface Props {
  statusBreakdown: Record<StatusKey, number>;
}

const StatusBreakdown = ({
  statusBreakdown,
}: Props) => {

  const maxStatus = Math.max(
    ...Object.values(statusBreakdown),
    1
  );

  return (
    <div className="glass-panel rounded-xl p-6 flex flex-col border border-[var(--outline-variant)]/20">

      {/* Header */}
      <h2 className="text-lg font-bold text-[var(--secondary)] mb-6">
        Status Breakdown
      </h2>

      {/* Status List */}
      <div className="space-y-6 flex-1">

        {(Object.entries(statusBreakdown) as [
          StatusKey,
          number
        ][]).map(([status, count]) => (
          <div key={status}>

            <div className="flex justify-between items-center mb-2">

              <span className="text-xs font-medium text-[var(--text-secondary)] capitalize">
                {status}
              </span>

              {/* SAME DATA */}
              <span
                className={`text-xs font-bold ${STATUS_TEXT_COLOR[status]}`}
              >
                {count}
              </span>

            </div>

            <div className="h-1.5 w-full bg-[var(--surface-container-low)] rounded-full overflow-hidden">

              <div
                className={`h-full rounded-full transition-all duration-500 ${STATUS_BAR_COLOR[status]}`}
                style={{
                  width: `${(count / maxStatus) * 100}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

      {/* Bottom Stats */}
      <div className="mt-8 pt-6 border-t border-[var(--outline-variant)]/20">

        <div className="flex items-center justify-between">

          <div className="text-center flex-1 border-r border-[var(--outline-variant)]/20">

            <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest mb-1">
              Total Active
            </p>

            {/* SAME DATA */}
            <p className="text-xl font-bold text-[var(--primary)]">
              {Object.values(statusBreakdown)
                .reduce((acc, curr) => acc + curr, 0)
                .toLocaleString()}
            </p>

          </div>

          <div className="text-center flex-1">

            <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest mb-1">
              Completed
            </p>

            {/* SAME DATA */}
            <p className="text-xl font-bold text-[var(--tertiary)]">
              {statusBreakdown.completed}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default StatusBreakdown;