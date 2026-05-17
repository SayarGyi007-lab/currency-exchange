import { useState } from "react";
import type { PaymentMethod } from "../../../slices/interfaces/payment-method";
import { usePayment } from "./hook/usePayment";
import PaymentTable from "./components/PyamentTable";
import useDebounce from "../../../hooks/useDebounce";
import AddPaymentMethod from "./components/AddPaymentMethod";
import { MdSearch } from "react-icons/md";
import UpdatePaymentMethod from "./components/UpdatePayment";

const Payment = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"active" | "archived">("active");

  const debounce = useDebounce(search);
  const limit = 10;

  const { payment, paymentPagination, isLoading } = usePayment({
    page,
    limit,
    skip: (page - 1) * limit,
    sortBy: "createdAt",
    order: "desc",
    search: debounce,
    isActive: tab === "active",
  });

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

  const [openAdd, setOpenAdd] = useState(false);

  if (isLoading) {
    return (
      <div className="text-center text-gray-400 py-10">
        Loading payments...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-10">

      {/* Header */}
      <section className="py-6 flex flex-col xl:flex-row xl:items-end justify-between gap-6">

        {/* LEFT */}
        <div className="space-y-4">

          <button
            onClick={() => setOpenAdd(true)}
            className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold transition-all duration-300 hover:bg-white/10 hover:border-[#8affec]/40 hover:shadow-[0_0_20px_rgba(138,255,236,0.15)] active:scale-95"
          >
            <span className="text-[#8affec] text-lg group-hover:rotate-90 transition-transform duration-300">
              +
            </span>
            Add Payment
          </button>

          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-[var(--primary)]">
              Payment Methods
            </h2>

            <p className="text-[var(--text-secondary)] max-w-md">
              Manage bank accounts, QR payment methods and availability.
            </p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col sm:flex-row items-center gap-4">

          {/* Search */}
          <div className="relative w-full sm:w-72">

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search payment..."
              className="w-full bg-[var(--surface-container)] rounded-2xl py-3 pl-11 pr-4 text-sm text-white border border-[#38476d]/20 outline-none"
            />

            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-xl" />

          </div>

          {/* Tabs */}
          <div className="flex bg-[#0f172a]/60 p-1.5 rounded-2xl border border-[#38476d]/50 backdrop-blur-md">

            <button
              onClick={() => {
                setTab("active");
                setPage(1);
              }}
              className={`px-8 py-2.5 rounded-xl text-sm transition-all duration-300
              ${
                tab === "active"
                  ? "bg-[#8affec] text-black font-black shadow-[0_0_20px_rgba(138,255,236,0.3)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Active
            </button>

            <button
              onClick={() => {
                setTab("archived");
                setPage(1);
              }}
              className={`px-8 py-2.5 rounded-xl text-sm transition-all duration-300
              ${
                tab === "archived"
                  ? "bg-[#ff716c] text-white font-black shadow-[0_0_20px_rgba(255,113,108,0.3)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Archived
            </button>

          </div>

        </div>

      </section>

      {/* Table */}
      <PaymentTable
        data={payment}
        onEdit={(p) => setSelectedPayment(p)}
        isArchived={tab === "archived"}
      />

      {/* Pagination */}
      {paymentPagination && (
        <footer className="mt-12 flex justify-between py-8 border-t border-white/5">

          <p className="text-[var(--text-secondary)]">
            Page {page} / {paymentPagination.totalPages}
          </p>

          <div className="flex gap-3">

            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg bg-[var(--surface-container)] text-white disabled:opacity-40"
            >
              Previous
            </button>

            <button
              disabled={page >= paymentPagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg bg-[var(--secondary)] text-black font-medium disabled:opacity-40"
            >
              Next
            </button>

          </div>

        </footer>
      )}

      <AddPaymentMethod
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        isSuperAdmin={true}
        
      />

      {selectedPayment && (
        <UpdatePaymentMethod
          open={!!selectedPayment}
          payment={selectedPayment}
          currencyId={selectedPayment.currencyId._id}
          onClose={() => setSelectedPayment(null)}
        />
      )}


    </div>
  );
};

export default Payment;