import { GoArrowRight } from "react-icons/go";

interface ExchangeRateCardProps {
    rate: {
        _id: string;
        fromCurrency: { code: string; symbol: string };
        toCurrency: { code: string; symbol: string };
        buyRate: number;
        sellRate: number;
        updatedAt: string;
    };
    buyTrend: "up" | "down" | "steady" | "new";
    buyPercent: number;
    sellTrend: "up" | "down" | "steady" | "new";
    sellPercent: number;
    onViewChart: (from: string, to: string) => void;
    isActive?: boolean
}

function getTrendColor(trend: string) {
    if (trend === "up") return "text-green-400";
    if (trend === "down") return "text-red-400";
    if (trend === "new") return "text-blue-400";
    return "text-gray-400";
}

function formatTrend(trend: string, percent: number) {
    if (trend === "new") return "New";
    return `${trend === "up" ? "+" : ""}${percent.toFixed(2)}%`;
}

const ExchangeRateCard = ({
    rate,
    buyTrend,
    buyPercent,
    sellTrend,
    sellPercent,
    onViewChart,
}: ExchangeRateCardProps) => {
    return (
        <div className="bg-[#101e3e] p-6 rounded-xl border border-[#38476d]/20 hover:border-[#5b7cff]/40 transition-all">
            <div className="flex -space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full border-2 border-[#101e3e] bg-blue-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-400">
                        {rate.fromCurrency.symbol || "payments"}
                    </span>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#101e3e] bg-green-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-400">
                        {rate.toCurrency.symbol || "attach_money"}
                    </span>
                </div>
            </div>

            <h4 className="text-lg font-bold text-white mb-4">
                {rate.fromCurrency.code} / {rate.toCurrency.code}
            </h4>

            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs text-[#9baad6]">Buy</p>
                    <p className="text-2xl font-semibold text-white">{rate.buyRate}</p>
                    <div className={`flex items-center gap-1 text-sm ${getTrendColor(buyTrend)}`}>
                        <span>{formatTrend(buyTrend, buyPercent)}</span>
                    </div>
                </div>

                <div className="h-12 w-px bg-[#38476d]/40" />

                <div className="text-right">
                    <p className="text-xs text-[#9baad6]">Sell</p>
                    <p className="text-2xl font-semibold text-white">{rate.sellRate}</p>
                    <div className={`flex items-center justify-end gap-1 text-sm ${getTrendColor(sellTrend)}`}>
                        <span>{formatTrend(sellTrend, sellPercent)}</span>
                    </div>
                </div>
            </div>

            <div className="text-xs text-[#6b7bb5] mt-4 flex items-center justify-between">
                <span>
                    Updated: {new Date(rate.updatedAt).toLocaleDateString()}
                </span>

                <p
                    onClick={() =>
                        onViewChart(
                            rate.fromCurrency.code,
                            rate.toCurrency.code
                        )
                    }
                    className="text-sm text-green-400 flex items-center gap-1 cursor-pointer hover:text-green-300 transition"
                >
                    View Chart <GoArrowRight />
                </p>
            </div>
        </div>
    );
};

export default ExchangeRateCard;