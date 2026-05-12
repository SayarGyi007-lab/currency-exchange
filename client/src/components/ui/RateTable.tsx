import React from "react";

interface MarketRatesTableProps {
  exchangeRates: any[];
  latestRatesMap: Map<string, any>;
}

const MarketRatesTable: React.FC<MarketRatesTableProps> = ({
  latestRatesMap,
}) => {
  const latestRates = Array.from(latestRatesMap.values());

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b border-outline-variant/10">
            <th className="pb-6 text-xs text-[#9baad6]">Pair</th>
            <th className="pb-6 text-xs text-[#9baad6]">Buy Rate</th>
            <th className="pb-6 text-xs text-[#9baad6]">Change</th>
            <th className="pb-6 text-xs text-[#9baad6]">Sell Rate</th>
            <th className="pb-6 text-xs text-[#9baad6]">Change</th>
          </tr>
        </thead>

        <tbody>
          {latestRates.map((r: any, i: number) => (
            <tr key={i} className="border-b border-[#38476d]/5">
              <td className="py-4 text-white font-semibold">
                {r.exchangeRateId.fromCurrency.code} /{" "}
                {r.exchangeRateId.toCurrency.code}
              </td>

              {/* BUY */}
              <td className="py-4 text-tertiary">
                {r.buyNewRate} {r.exchangeRateId.toCurrency.symbol}
              </td>
              <td className="py-4">
                {(() => {
                  const diff = r.buyNewRate - r.buyOldRate;
                  if (diff > 0)
                    return <span className="text-green-400">▲ {diff.toFixed(2)}</span>;
                  if (diff < 0)
                    return <span className="text-red-400">▼ {Math.abs(diff).toFixed(2)}</span>;
                  return <span className="text-gray-400">—</span>;
                })()}
              </td>

              {/* SELL */}
              <td className="py-4 text-tertiary">
                {r.sellNewRate} {r.exchangeRateId.toCurrency.symbol}
              </td>
              <td className="py-4">
                {(() => {
                  const diff = r.sellNewRate - r.sellOldRate;
                  if (diff > 0)
                    return <span className="text-green-400">▲ {diff.toFixed(2)}</span>;
                  if (diff < 0)
                    return <span className="text-red-400">▼ {Math.abs(diff).toFixed(2)}</span>;
                  return <span className="text-gray-400">—</span>;
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketRatesTable;