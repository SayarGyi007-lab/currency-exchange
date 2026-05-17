import type { StatusKey } from "../../Dashboard/hook/useDashboardStats";

const STATUS_STYLES: Record<StatusKey, string> = {
  pending:
    "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20",
  received:
    "bg-blue-400/10 text-blue-400 border border-blue-400/20",
  processing:
    "bg-[var(--secondary)]/10 text-[var(--secondary)] border border-[var(--secondary)]/20",
  completed:
    "bg-[var(--tertiary)]/10 text-[var(--tertiary)] border border-[var(--tertiary)]/20",
  cancelled:
    "bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/20",
};

interface Column<T> {
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface Props<T> {
  title?: string;
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
  headerAction?: React.ReactNode
}

function TransactionsTable<T>({
  title,
  data,
  columns,
  emptyMessage = "No transactions found",
  headerAction
}: Props<T>) {
  return (
    <div className="lg:col-span-2 bg-[var(--surface-container-low)] rounded-xl overflow-hidden shadow-2xl border border-[var(--outline-variant)]/10">

      {/* Header */}
      {title && (
        <div className="p-6 border-b border-[var(--outline-variant)]/10 flex justify-between items-center bg-[var(--surface-container)]">

          <h2 className="text-lg font-bold text-[var(--secondary)]">
            {title}
          </h2>

          {headerAction}

        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>
            <tr className="text-[var(--text-secondary)] text-xs uppercase tracking-widest bg-[var(--surface-container)]/50">

              {columns.map((col) => (
                <th
                  key={col.header}
                  className="px-6 py-4 font-medium"
                >
                  {col.header}
                </th>
              ))}

            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--outline-variant)]/5">

            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-10 text-center text-xs text-[var(--text-secondary)]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item: any) => (
                <tr
                  key={item._id}
                  className="hover:bg-[var(--surface-variant)]/30 transition-colors"
                >

                  {columns.map((col) => (
                    <td
                      key={col.header}
                      className={`px-6 py-4 whitespace-nowrap ${col.className ?? ""}`}
                    >
                      {col.render(item)}
                    </td>
                  ))}

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default TransactionsTable;

export { STATUS_STYLES };