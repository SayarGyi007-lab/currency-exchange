import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllExchangeRate } from "../../hooks/useExchangeRate";
import { useGetAllRateHistory } from "../../hooks/useRateHistory";
import CurrencyConverterCard from "../../components/ui/CurrencyConverter";
import MarketRatesTable from "../../components/ui/RateTable";
import { usePreviewConversionMutation } from "../../slices/redux-slices/conversion-api";
import { useDispatch } from "react-redux";
import  {setSteps}  from "../../slices/redux-slices/transaction-slice";

const HomePage = () => {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("");
  const [result, setResult] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { exchangeRates, isLoading } = useAllExchangeRate();
  const [previewConversion] = usePreviewConversionMutation();
  const { rateHistory } = useGetAllRateHistory();

  // ✅ currency map (code → id)
  const currencyMap = useMemo(() => {
    const map: Record<string, string> = {};
    exchangeRates.forEach((r: any) => {
      map[r.fromCurrency.code] = r.fromCurrency._id;
      map[r.toCurrency.code] = r.toCurrency._id;
    });
    return map;
  }, [exchangeRates]);

  // ✅ currency options
  const currencyOptions = useMemo(() => {
    const set = new Set<string>();
    exchangeRates.forEach((r: any) => {
      set.add(r.fromCurrency.code);
      set.add(r.toCurrency.code);
    });
    return Array.from(set);
  }, [exchangeRates]);

  // default "to"
  useEffect(() => {
    if (currencyOptions.length > 1 && !to) {
      const firstOther = currencyOptions.find((c) => c !== from);
      if (firstOther) setTo(firstOther);
    }
  }, [currencyOptions, from, to]);

  // ✅ MAIN FIX: use backend preview
  useEffect(() => {
    const fetchConversion = async () => {
      if (!from || !to || !amount) return;
      if (!currencyMap[from] || !currencyMap[to]) return;

      try {
        const res = await previewConversion({
          fromCurrency: currencyMap[from],
          toCurrency: currencyMap[to],
          amount,
        }).unwrap();

        const data = res.data;

        // ✅ result from backend
        setResult(data.finalAmount);

        // 🔥 THIS WAS MISSING
        dispatch(setSteps(data.steps));

      } catch (err) {
        console.error("Conversion failed", err);
        setResult(0);
      }
    };

    fetchConversion();
  }, [amount, from, to, currencyMap]);

  // rate history
  const latestRatesMap = useMemo(() => {
    const map = new Map<string, any>();
    rateHistory.forEach((r: any) => {
      if (!r.exchangeRateId) return;
      const key = r.exchangeRateId._id ?? r.exchangeRateId;

      if (
        !map.has(key) ||
        new Date(r.createdAt) > new Date(map.get(key).createdAt)
      ) {
        map.set(key, r);
      }
    });
    return map;
  }, [rateHistory]);

  return (
    <div className="min-h-screen">
      <section className="pt-24 px-8">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <h1 className="text-6xl font-bold text-white">
              Global Flow <br />
              <span className="text-[#c3c0ff]">Digital Speed.</span>
            </h1>
            <p className="text-[#9baad6] mt-4 max-w-lg">
              Real-time exchange system powered by your backend rates.
            </p>
          </div>

          {/* RIGHT */}
          <CurrencyConverterCard
            amount={amount}
            from={from}
            to={to}
            result={result}
            currencyOptions={currencyOptions}
            onAmountChange={setAmount}
            onFromChange={setFrom}
            onToChange={setTo}

            // ❌ no longer needed for logic (UI only if you want)
            convertRate={() => result}
            isRatesReady={() => !!result}

            bridge={null} // optional now (backend decides path)
            currencyMap={currencyMap}
            exchangeRates={exchangeRates}
          />
        </div>
      </section>

      {/* MARKET */}
      <section className="py-20 px-8 bg-[#0b1220]">
        <div className="max-w-screen-2xl mx-auto">

          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold text-white">Live Market</h2>
            <p
              onClick={() => navigate("/exchange")}
              className="cursor-pointer hover:underline text-green-400"
            >
              Explore
            </p>
          </div>

          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : (
            <MarketRatesTable
              exchangeRates={exchangeRates}
              latestRatesMap={latestRatesMap}
            />
          )}

        </div>
      </section>
    </div>
  );
};

export default HomePage;