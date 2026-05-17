import { useSelector } from "react-redux";
import { MdSearch, MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Currency from "./components/Currency";
import type { RootState } from "../../../slices/store/store";
import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { useCurrencyActions } from "./hook/useCurrencyControl";
import AddCurrency from "./components/AddCurrency";
import { useCurrency } from "./hook/useCurrency";


const AllCurrencies = () => {
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"active" | "archived">("active");

  const debounce = useDebounce(search);
  const limit = 6;

  const { currency, currencyPagination } = useCurrency({
    page,
    limit,
    skip: (page - 1) * limit,
    sortBy: "createdAt",
    order: "desc",
    search: debounce,
    isActive: tab === 'active'
  });

  const { archiveCurrency, restoreCurrency, deleteCurrency, updateCurrency } = useCurrencyActions();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const isSuperAdmin = userInfo?.role === "super_admin";


  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <section className="py-6 flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        {/* Left Side */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          >
            <MdArrowBack className="text-lg" />
            Back
          </button>

          {/* Add Button */}
          {isSuperAdmin && (
            <button
              onClick={() => setOpenAdd(true)}
              className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold transition-all duration-300 hover:bg-white/10 hover:border-[#8affec]/40 hover:shadow-[0_0_20px_rgba(138,255,236,0.15)] active:scale-95"
            >
              <span className="text-[#8affec] text-lg group-hover:rotate-90 transition-transform duration-300">+</span>
              Add Currency
            </button>
          )}

          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-[var(--primary)]">
              Currencies
            </h2>
            <p className="text-[var(--text-secondary)] max-w-md">
              Manage available trading pairs, update exchange visibility, and
              control currency accessibility.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-72 group">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search currency..."
              className="w-full bg-[var(--surface-container)] rounded-2xl py-3 pl-11 pr-4 text-sm text-white border border-[#38476d]/20 outline-none"
            />
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-xl" />
          </div>

          {/* Tabs */}
          <div className="flex bg-[#0f172a]/60 p-1.5 rounded-2xl border border-[#38476d]/50 backdrop-blur-md">
            <button onClick={() => { setTab("active"); setPage(1); }} className={`px-8 py-2.5 rounded-xl text-sm transition-all duration-300 ${tab === "active" ? "bg-[#8affec] text-black font-black shadow-[0_0_20px_rgba(138,255,236,0.3)]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
              Active
            </button>
            <button onClick={() => { setTab("archived"); setPage(1); }} className={`px-8 py-2.5 rounded-xl text-sm transition-all duration-300 ${tab === "archived" ? "bg-[#ff716c] text-white font-black shadow-[0_0_20px_rgba(255,113,108,0.3)]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
              Archived
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <Currency
        currency={currency}
        showActions={true}
        isSuperAdmin={isSuperAdmin}
        tab={tab} 
        onEdit={updateCurrency}
        onDelete={deleteCurrency}
        onToggle={(id, isActive) =>
          isActive ? archiveCurrency(id) : restoreCurrency(id)
        }
      />

      {/* Pagination */}
      <footer className="mt-12 flex justify-between py-8 border-t border-white/5">

        <p className="text-[var(--text-secondary)]">
          Page {currencyPagination?.page || 1} / {currencyPagination?.totalPages || 1}
        </p>

        <div className="flex gap-3">

          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 rounded-lg bg-[var(--surface-container)] text-[var(--text-primary)] disabled:opacity-40">
            Previous
          </button>

          <button
            disabled={page === currencyPagination?.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 rounded-lg bg-[var(--secondary)] text-black font-medium disabled:opacity-40">
            Next
          </button>

        </div>

      </footer>

      {/* Add Currency */}
      <AddCurrency
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        isSuperAdmin={isSuperAdmin}
      />
    </div>
  );
};

export default AllCurrencies;