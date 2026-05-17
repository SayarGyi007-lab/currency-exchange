import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../slices/store/store";
import { setTransactionData } from "../../../../slices/redux-slices/transaction-slice";
import FormInput from "../../../../constant/ui/FormInput";
import Button from "../../../../constant/ui/Button";


interface CurrencyConverterCardProps {
  amount: number;
  from: string;
  to: string;
  result: number;
  currencyOptions: string[];
  onAmountChange: (value: number) => void;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  convertRate: (amount: number, from: string, to: string) => number;
  isRatesReady: (from: string, to: string) => boolean;
  bridge?: string | null;
  // onExecute?: () => void;
  currencyMap: Record<string, string>;
  exchangeRates: any[];
}

const CurrencyConverterCard = ({
  amount,
  from,
  to,
  result,
  currencyOptions,
  onAmountChange,
  onFromChange,
  onToChange,
  isRatesReady,
  bridge,
  currencyMap,
  // onExecute,
}: CurrencyConverterCardProps) => {
  const navigate = useNavigate()
  const { steps } = useSelector((state: RootState) => state.transaction);
  const selectClass =
    "bg-[#101e3e] text-white rounded-full border border-[#38476d] px-4 py-2";

  const ready = isRatesReady(from, to);
  const rate = steps?.length
    ? steps.reduce((acc, s) => acc * s.rate, 1)
    : null; const unavailable = from && to && from !== to && !ready;
  const dispatch = useDispatch();

  const executeHandler = () => {
    if (!steps || steps.length === 0) {
      console.error("No conversion steps from backend");
      return;
    }

    // Use FIRST step for IDs
    const firstStep = steps[0];
    const finalRate = steps.reduce((acc, s) => acc * s.rate, 1);

    dispatch(
      setTransactionData({
        amount,
        from,
        to,
        result,

        exchangeRate: Number(finalRate.toFixed(4)),
        exchangeRateId: firstStep.exchangeRateId,

        fromCurrencyId: currencyMap[from],
        toCurrencyId: currencyMap[to],
      })
    );

    navigate("/payment");
  };

  const fromOptions = currencyOptions.filter((c) => c !== to);
  const toOptions = currencyOptions.filter((c) => c !== from);


  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] opacity-20 blur-xl" />
      <div className="relative glass-panel rounded-[2rem] p-8 border border-[#38476d]/20 shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-white">Convert Currency</h3>

          {/* Cross-currency badge */}
          {bridge && (
            <div className="flex items-center gap-1.5 bg-[#101e3e] rounded-full px-3 py-1.5 border border-yellow-500/30">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse flex-shrink-0" />
              <span className="text-xs text-yellow-400 font-bold tracking-wide">
                via {bridge}
              </span>
            </div>
          )}
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <FormInput
            label="You Send"
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
            rightSlot={
              <select
                value={from}
                onChange={(e) => onFromChange(e.target.value)}
                className={selectClass}
              >
                {fromOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            }
          />

          {/* Route indicator — shown when cross-currency bridge is used */}
          {bridge ? (
            <div className="flex items-center gap-2 px-1 py-1">
              <div className="flex-1 h-px bg-[#38476d]/40" />
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#9baad6] font-medium">{from}</span>
                <span className="text-[#38476d]">›</span>
                <span className="text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/20">
                  {bridge}
                </span>
                <span className="text-[#38476d]">›</span>
                <span className="text-[#9baad6] font-medium">{to}</span>
              </div>
              <div className="flex-1 h-px bg-[#38476d]/40" />
            </div>
          ) : (
            // Minimal divider for direct pairs
            <div className="flex items-center gap-2 px-1">
              <div className="flex-1 h-px bg-[#38476d]/20" />
              <span className="text-[#38476d] text-xs">↓</span>
              <div className="flex-1 h-px bg-[#38476d]/20" />
            </div>
          )}

          <FormInput
            label="You Receive"
            type="text"
            value={unavailable ? "No route available" : result.toFixed(4)}
            readOnly
            rightSlot={
              <select
                value={to}
                onChange={(e) => onToChange(e.target.value)}
                className={selectClass}
              >
                {toOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            }
          />
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#38476d]/20">
          <div className="flex justify-between text-sm mb-4">
            <span className="text-[#9baad6]">
              {unavailable ? (
                <span className="text-red-400">
                  No conversion path for {from} → {to}
                </span>
              ) : rate ? (
                <>
                  Rate: 1 {from} ≈ {rate.toFixed(4)} {to}
                  {bridge && (
                    <span className="ml-2 text-yellow-400/60 text-xs">
                      (cross-rate via {bridge})
                    </span>
                  )}
                </>
              ) : (
                "—"
              )}
            </span>
            {!unavailable && rate && (
              <span className="text-green-400 font-bold">Live</span>
            )}
          </div>

          <Button onClick={executeHandler} disabled={!!unavailable}>
            Execute Exchange
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterCard;