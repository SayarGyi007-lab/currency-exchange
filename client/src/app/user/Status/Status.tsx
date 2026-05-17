import { Link, useParams } from "react-router-dom";
import { useGetTransactionByIdQuery } from "../../../slices/redux-slices/transaction-api";
import { MdOutlineSecurity } from "react-icons/md";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { RiSpeedUpFill } from "react-icons/ri";
import { MdOutlineReceiptLong } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GrSecure } from "react-icons/gr";
import { MdHub } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";
import { MdOutlineMarkEmailRead } from "react-icons/md";

const Status = () => {
  const { id } = useParams();

  if (!id) {
    return <div className="text-white p-10">Invalid transaction ID</div>;
  }

  const { data, isLoading } = useGetTransactionByIdQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060e20] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-t-[#c3c0ff] border-r-[#c3c0ff] border-b-transparent border-l-transparent animate-spin" />
          <p className="text-[#9baad6] text-sm font-medium tracking-widest uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  const tx = data?.data;
  

  const statusLabel =
    tx?.status === "completed"
      ? "Completed"
      : tx?.status === "processing"
        ? "Processing"
        : "Pending Review";

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden"
      style={{ background: "radial-gradient(circle at 50% 50%, #142449 0%, #060e20 100%)" }}
    >
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[150px]" style={{ background: "rgba(22,0,135,0.2)" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[180px]" style={{ background: "rgba(91,244,222,0.06)" }} />
        <div className="absolute top-1/4 left-0 w-full h-px rotate-12 blur-sm" style={{ background: "linear-gradient(to right, transparent, rgba(195,192,255,0.15), transparent)" }} />
        <div className="absolute top-3/4 left-0 w-full h-px -rotate-12 blur-sm" style={{ background: "linear-gradient(to right, transparent, rgba(138,255,236,0.12), transparent)" }} />
      </div>

      {/* Main */}
      <main className="relative z-10 flex-grow pt-32 pb-24 px-6 flex flex-col items-center">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start justify-center">
            <div className="relative w-64 h-64 mb-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full ring-spin" style={{ border: "1px solid rgba(195,192,255,0.12)" }} />
              <div className="absolute inset-4 rounded-full ring-spin-reverse" style={{ border: "1px solid rgba(138,255,236,0.18)" }} />
              <div
                className="absolute inset-9 rounded-full"
                style={{
                  borderTop: "2px solid rgba(195,192,255,0.45)",
                  borderLeft: "2px solid rgba(195,192,255,0.45)",
                  borderRight: "2px solid transparent",
                  borderBottom: "2px solid transparent",
                  animation: "rotate-slow 3s linear infinite",
                }}
              />
              {/* Core */}
              <div
                className="glass-panel relative w-40 h-40 rounded-full border border-white/10 flex flex-col items-center justify-center"
                style={{ boxShadow: "0 0 60px rgba(100,94,251,0.2)" }}
              >
                <div className="absolute inset-0 rounded-full shimmer-anim opacity-25" />
                <MdOutlineSecurity className="text-[#8affec] animate-pulse" style={{ fontSize: 52 }} />
                <p className="mt-1 text-[9px] font-bold tracking-[0.3em] text-[#645efb] uppercase">{tx?.status || "Syncing"}</p>
              </div>
              {/* Orbiting nodes */}
              <div className="absolute w-3.5 h-3.5 rounded-full orbit-node" style={{ background: "#8affec", boxShadow: "0 0 14px #8affec", filter: "blur(1px)" }} />
              <div className="absolute w-2.5 h-2.5 rounded-full orbit-node-reverse" style={{ background: "#c3c0ff", boxShadow: "0 0 14px #c3c0ff", filter: "blur(1px)" }} />
            </div>

            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-black tracking-tight text-white mb-5 leading-none uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {statusLabel} <br />
                <span style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", background: "linear-gradient(to right, #c3c0ff, #8affec)", backgroundClip: "text" }}>
                  In Progress
                </span>
              </h1>
              <p className="text-[#9baad6] text-base leading-relaxed max-w-sm">
                Admins are validating your transfer. Security is our absolute priority.
              </p>
              <div className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start">
                <div className="px-4 py-2 rounded-full border border-white/5 bg-white/5 flex items-center gap-2">
                  <MdOutlineVerifiedUser className="text-[#8affec]" style={{ fontSize: 14 }} />
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[#9baad6]">Encrypted</span>
                </div>
                <div className="px-4 py-2 rounded-full border border-white/5 bg-white/5 flex items-center gap-2">
                  <RiSpeedUpFill className="text-[#c3c0ff]" style={{ fontSize: 14 }} />
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[#9baad6]">High Priority</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7 w-full flex flex-col gap-4">

            {/* Main transaction card */}
            <div className="glass-panel rounded-3xl p-10 border border-white/10 relative overflow-hidden" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05), inset 0 2px 4px rgba(0,0,0,0.3)" }}>
              <div className="absolute top-0 right-0 p-8 opacity-[0.04] pointer-events-none text-[120px] leading-none">
                <MdOutlineReceiptLong />
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#9baad6] mb-1">Transaction Identity</span>
                    <h3 className="text-lg font-bold text-white tracking-widest" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      {tx?._id ? `tx-${tx._id.slice(0, 12).toUpperCase()}` : "tx-08X-7729-QL"}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-tight uppercase" style={{ background: "rgba(138,255,236,0.08)", border: "1px solid rgba(138,255,236,0.2)", color: "#8affec" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8affec] animate-ping" />
                    {tx?.status || "Pending Review"}
                  </span>
                </div>

                {/* Amounts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#9baad6] opacity-60">You send</label>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        {tx?.amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
                      </span>
                      {/* need to fix or not (don't remember) ------------------------*/}
                      <span className="text-sm font-semibold text-[#9baad6]">{tx?.fromCurrency?.code || ""}</span> 
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#9baad6] opacity-60">You will receive</label>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-[#8affec]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        {tx?.convertedAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
                      </span>
                      <span className="text-sm font-semibold text-[#8affec]/70">{tx?.toCurrency?.code || ""}</span>
                    </div>
                  </div>

                  {/* Receiver */}
                  <div className="md:col-span-2 p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/[0.08] transition-all">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#9baad6] opacity-60 block mb-3">Recipient Entity</label>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-base"
                        style={{ background: "linear-gradient(135deg, #142449, #38476d)" }}
                      >
                        {tx?.receiverName
                          ? tx.receiverName.split(" ").map((n:string) => n[0]).slice(0, 2).join("")
                          : "ER"}
                      </div>
                      <div className="flex flex-col">
                        <p className="font-bold text-white text-lg leading-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                          {tx?.receiverName || "Elena Richardson"}
                        </p>
                        <p className="text-xs text-[#9baad6] mt-0.5">{tx?.receiverBank || "Global Merchant"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
                  <button
                    onClick={() => (window.location.href = "/")}
                    className="group relative w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-base tracking-widest uppercase flex items-center justify-center gap-3 transition-all hover:scale-[1.03] active:scale-95 overflow-hidden"
                    style={{ background: "linear-gradient(to right, #c3c0ff, #645efb)", color: "#060e20" }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 20px 40px rgba(100,94,251,0.4)")}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <span className="relative z-10" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Return to Home</span>
                    <MdOutlineKeyboardArrowRight className="transition-transform group-hover:translate-x-1 relative z-10" style={{ fontSize: 22 }} />
                    <div className="absolute inset-0 btn-shimmer opacity-20 pointer-events-none" />
                  </button>
                  <p className="text-[11px] text-center sm:text-left text-[#9baad6] leading-tight max-w-[200px] font-medium italic">
                    Transaction will continue processing in the background.
                  </p>
                </div>
              </div>
            </div>

            {/* Noti */}
            <div
              className="rounded-2xl border border-white/5 px-6 py-5 flex items-start gap-4"
              style={{
                background: "linear-gradient(135deg, rgba(20,36,73,0.5) 0%, rgba(8,19,41,0.7) 100%)",
                boxShadow: "inset 0 0 0 1px rgba(138,255,236,0.07)",
              }}
            >
              {/* Icon bubble */}
              <div
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl mt-0.5"
                style={{
                  background: "linear-gradient(135deg, rgba(100,94,251,0.2), rgba(138,255,236,0.12))",
                  border: "1px solid rgba(138,255,236,0.18)",
                }}
              >
                <MdOutlineMarkEmailRead className="text-[#8affec]" style={{ fontSize: 20 }} />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1 min-w-0">
                <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#8affec]/60">
                  Confirmation Sent
                </p>
                <p className="text-sm text-white leading-relaxed">
                  A confirmation email has been sent to{" "}
                  <span className="font-semibold text-[#8affec]">
                    {tx?.receiverEmail || "your registered email"}
                  </span>.{" "}
                  You can safely close this page. Your transaction will continue processing.
                </p>
                <p className="text-[11px] text-[#9baad6] italic mt-0.5">
                  You'll receive updates once the payment is completed or rejected.
                </p>
              </div>
            </div>

            {/* Trust badges row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <GrSecure />, label: "End-to-End Vault", color: "#c3c0ff" },
                { icon: <MdHub />, label: "Global Node Mesh", color: "#8affec" },
                { icon: <MdOutlineSupportAgent />, label: "24/7 Intel Core", color: "#9baad6" },
              ].map(({ icon, label, color }) => (
                <div key={label} className="p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-2 text-center" style={{ background: "rgba(12,25,52,0.4)" }}>
                  <span style={{ fontSize: 20, color, opacity: 0.7 }}>{icon}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#9baad6]">{label}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#9baad6] opacity-80 leading-relaxed">
              Having trouble? We're here to help! Get in touch with our team on the{' '}
              <Link to="/contact" className="text-[#8affec] hover:underline transition-all">
                Contact Page
              </Link>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Status;