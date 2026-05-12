import { useSelector } from "react-redux";
import Currency from "../Dashboard/components/Currency";
import type { RootState } from "../../../slices/store/store";
import { useCurrency } from "../../../hooks/useCurrency";
import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { useCurrencyActions } from "./hook/useCurrencyControl";

const AllCurrencies = () => {

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
  });

  const { archiveCurrency, restoreCurrency, deleteCurrency } =
    useCurrencyActions();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const isSuperAdmin = userInfo?.role === "super_admin";

  const filtered = currency?.filter((c) =>
    tab === "active" ? c.isActive : !c.isActive
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* SEARCH */}
      <div className="flex items-center justify-between">

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search currencies..."
          className="w-full md:w-72 px-4 py-2 rounded-xl bg-[var(--surface-container)] border border-[var(--outline-variant)]/20 outline-none focus:ring-2 focus:ring-[var(--secondary)]/30"
        />

      </div>

      {/* tabs */}
      <div className="flex bg-[var(--surface-container)] p-1 rounded-2xl w-fit border border-[var(--outline-variant)]/20">

        <button
          onClick={() => setTab("active")}
          className={`px-6 py-2 text-sm rounded-xl transition ${
            tab === "active"
              ? "bg-[var(--secondary)] text-black font-semibold"
              : "text-[var(--text-secondary)]"
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setTab("archived")}
          className={`px-6 py-2 text-sm rounded-xl transition ${
            tab === "archived"
              ? "bg-[var(--secondary)] text-black font-semibold"
              : "text-[var(--text-secondary)]"
          }`}
        >
          Archived
        </button>

      </div>

      {/* grid */}
      <Currency
        currency={filtered}
        showActions={true}
        isSuperAdmin={isSuperAdmin}
        onEdit={(c) => console.log("edit", c)}
        onDelete={(id) => deleteCurrency(id)}
        onToggle={(id, isActive) =>
          isActive ? archiveCurrency(id) : restoreCurrency(id)
        }
      />

      {/* pagination */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--outline-variant)]/20">

        <p className="text-sm text-[var(--text-secondary)]">
          Page <span className="text-[var(--primary)] font-semibold">{currencyPagination?.page || 1}</span>{" "}
          of <span className="text-[var(--primary)] font-semibold">{currencyPagination?.totalPages || 1}</span>
        </p>

        <div className="flex gap-3">

          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded-xl bg-[var(--surface-container)] disabled:opacity-40"
          >
            Prev
          </button>

          <button
            disabled={page === currencyPagination?.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-xl bg-[var(--secondary)] text-black font-medium disabled:opacity-40"
          >
            Next
          </button>

        </div>
      </div>

    </div>
  );
};

export default AllCurrencies;