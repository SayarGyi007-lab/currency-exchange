import { MdEdit } from "react-icons/md";
import type { PaymentMethod } from "../../../../slices/interfaces/payment-method";

interface Props {
  data: PaymentMethod[];
  onEdit?: (payment: PaymentMethod) => void;
  isArchived?: boolean;
}

const PaymentTable = ({ data, onEdit, isArchived }: Props) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-[#38476d]/40 glass-panel">
      <table className="w-full text-left text-sm">

        <thead className="border-b border-[#38476d]/40 text-[var(--text-secondary)]">
          <tr>
            <th className="p-4">Currency</th>
            <th className="p-4">Account Name</th>
            <th className="p-4">Account Number</th>
            <th className="p-4">Bank</th>
            <th className="p-4">QR</th>
            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr
              key={p._id}
              className="border-b border-[#38476d]/20 hover:bg-white/5 transition"
            >

              {/* Currency */}
              <td className="p-4 font-semibold text-white">
                {p.currencyId?.code}{" "}
                <span className="text-xs text-gray-400">
                  ({p.currencyId?.name})
                </span>
              </td>

              <td className="p-4 text-[var(--text-secondary)]">
                {p.accountName}
              </td>

              <td className="p-4 text-[var(--text-secondary)]">
                {p.accountNumber}
              </td>

              <td className="p-4 text-[var(--text-secondary)]">
                {p.bankProvider}
              </td>

              <td className="p-4">
                {p.qrImage ? (
                  <img
                    src={p.qrImage}
                    alt="QR"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500">-</span>
                )}
              </td>

              <td className="p-4 text-right">
                {!isArchived && (
                  <button
                    onClick={() => onEdit?.(p)}
                    className="px-3 py-2 rounded-lg border border-blue-400/20 text-blue-300 hover:bg-blue-400/10 transition"
                  >
                    <MdEdit size={16} />
                  </button>
                )}
              </td>

            </tr>
          ))}

          {!data.length && (
            <tr>
              <td colSpan={6} className="text-center p-8 text-gray-500">
                No payment methods found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};

export default PaymentTable;