export const CustomTooltip = ({ active, payload, label, toSymbol }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel px-4 py-3 rounded-2xl border border-[#38476d]/20 shadow-xl">
        <div className="text-[10px] uppercase font-bold text-[#9baad6] tracking-widest mb-1">
          {label}
        </div>
        <div className="text-lg font-bold font-display text-white">
          {toSymbol}{Number(payload[0].value).toFixed(4)}
        </div>
      </div>
    );
  }
  return null;
};