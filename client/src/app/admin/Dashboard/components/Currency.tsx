import type React from "react";

interface Props {
  currency: any[];
  headerAction?: React.ReactNode;
  showActions?: boolean;
  isSuperAdmin?: boolean;
  onEdit?: (c: any) => void;
  onDelete?: (id: string) => void;
  onToggle?: (id: string, isActive: boolean) => void;
}

const Currency = ({
  currency,
  headerAction,
  showActions = false,
  isSuperAdmin = false,
  onEdit,
  onDelete,
  onToggle,
}: Props) => {
  return (
    <div className="w-full max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h1 className="text-2xl text-white font-semibold tracking-tight">
          Currencies
        </h1>
        <div>{headerAction}</div>
      </div>

      {/* GRID WRAPPER */}
      <div className="rounded-2xl glass-panel border border-[#38476d] p-6">

        {!currency?.length ? (
          <div className="text-center py-10 text-[var(--text-secondary)]">
            No currencies found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {currency.map((c: any) => (
              <div
                key={c._id}
                className="group relative rounded-2xl p-5 bg-[var(--surface-container)] border border-[var(--outline-variant)] hover:border-[var(--secondary)] transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(195,192,255,0.08)]"
              >

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-semibold text-[var(--primary)]">
                      {c.code}
                    </p>
                    <p className="text-xs text-[var(--secondary)]">
                      {c.name}
                    </p>
                  </div>
                  <div className={`w-2.5 h-2.5 rounded-full mt-1 ${
                    c.isActive ? "bg-[var(--tertiary)]" : "bg-[var(--error)]"
                  }`} />
                </div>

                <div className="mt-6 text-xs text-[var(--text-secondary)] space-y-1">
                  <p>Status</p>
                  <p className="font-medium text-[var(--primary)]">
                    {c.isActive ? "Active" : "Archived"}
                  </p>
                </div>

                {showActions && (
                  <div className="mt-5 grid grid-cols-3 gap-2 opacity-0 group-hover:opacity-100 transition-all">

                    <button
                      disabled={!isSuperAdmin}
                      onClick={() => onEdit?.(c)}
                      className="py-2 text-xs rounded-lg bg-[var(--surface-bright)] hover:bg-[var(--secondary)] transition disabled:opacity-40"
                    >
                      Edit
                    </button>

                    <button
                      disabled={!isSuperAdmin}
                      onClick={() => onToggle?.(c._id, c.isActive)}
                      className="py-2 text-xs rounded-lg bg-[var(--surface-bright)] hover:bg-[var(--tertiary)] transition disabled:opacity-40"
                    >
                      {c.isActive ? "Archive" : "Restore"}
                    </button>

                    <button
                      disabled={!isSuperAdmin}
                      onClick={() => onDelete?.(c._id)}
                      className="py-2 text-xs rounded-lg bg-[var(--surface-bright)] hover:bg-[var(--error)] transition disabled:opacity-40"
                    >
                      Delete
                    </button>

                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Currency;